import { env } from "cloudflare:workers";
import { getD1 } from "@/db";

export const ADMIN_COOKIE = "valam_admin_session";
const TEST_ADMIN_EMAIL = "vrajkp501@gmail.com";

function value(name: string) {
  const runtime = env as unknown as Record<string, unknown>;
  const candidate = runtime[name] ?? process.env[name];
  return typeof candidate === "string" ? candidate : "";
}

function allowedEmails() {
  const configured = value("ADMIN_EMAILS");
  return (configured || TEST_ADMIN_EMAIL).split(",").map((email) => email.trim().toLowerCase()).filter(Boolean);
}

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToBytes(valueToDecode: string) {
  const normalized = valueToDecode.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return Uint8Array.from(atob(padded), (char) => char.charCodeAt(0));
}

export async function sha256(valueToHash: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(valueToHash));
  return bytesToBase64Url(new Uint8Array(digest));
}

function safeEqual(left: string, right: string) {
  const leftBytes = new TextEncoder().encode(left);
  const rightBytes = new TextEncoder().encode(right);
  if (leftBytes.length !== rightBytes.length) return false;
  let difference = 0;
  for (let index = 0; index < leftBytes.length; index += 1) difference |= leftBytes[index] ^ rightBytes[index];
  return difference === 0;
}

async function hashPasswordForStorage(password: string) {
  const iterations = 210_000;
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const derived = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt, iterations }, key, 256);
  return `pbkdf2$${iterations}$${bytesToBase64Url(salt)}$${bytesToBase64Url(new Uint8Array(derived))}`;
}

async function verifyStoredPassword(password: string, storedHash: string) {
  const [method, iterationText, saltText, expected] = storedHash.split("$");
  const iterations = Number(iterationText);
  if (method !== "pbkdf2" || !Number.isInteger(iterations) || iterations < 100_000 || !saltText || !expected) return false;
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const derived = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: base64UrlToBytes(saltText), iterations }, key, 256);
  return safeEqual(bytesToBase64Url(new Uint8Array(derived)), expected);
}

async function sign(payload: string) {
  const secret = value("ADMIN_SESSION_SECRET");
  if (!secret) return "";
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return bytesToBase64Url(new Uint8Array(signature));
}

export function isAllowedAdminEmail(email: string) {
  return allowedEmails().includes(email.trim().toLowerCase());
}

export async function verifyAdminPassword(password: string) {
  const expected = value("ADMIN_PASSWORD_SHA256");
  return Boolean(expected) && safeEqual(await sha256(password), expected);
}

async function ensureAdminTables() {
  const d1 = getD1();
  await d1.batch([
    d1.prepare(`CREATE TABLE IF NOT EXISTS admin_credentials (
      email TEXT PRIMARY KEY NOT NULL,
      password_hash TEXT NOT NULL,
      updated_at INTEGER NOT NULL
    )`),
    d1.prepare(`CREATE TABLE IF NOT EXISTS admin_recovery_codes (
      id TEXT PRIMARY KEY NOT NULL,
      email TEXT NOT NULL,
      code_hash TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      used_at INTEGER
    )`),
    d1.prepare("CREATE INDEX IF NOT EXISTS idx_admin_recovery_email_unused ON admin_recovery_codes(email, used_at)"),
  ]);
}

export async function verifyAdminLogin(email: string, password: string) {
  if (!isAllowedAdminEmail(email)) return false;
  await ensureAdminTables();
  const normalizedEmail = email.trim().toLowerCase();
  const stored = await getD1().prepare("SELECT password_hash AS passwordHash FROM admin_credentials WHERE email = ?").bind(normalizedEmail).first<{ passwordHash: string }>();
  if (stored?.passwordHash) return verifyStoredPassword(password, stored.passwordHash);
  if (!(await verifyAdminPassword(password))) return false;
  await getD1().prepare("INSERT INTO admin_credentials (email, password_hash, updated_at) VALUES (?, ?, ?)").bind(normalizedEmail, await hashPasswordForStorage(password), Date.now()).run();
  return true;
}

function makeRecoveryCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(12));
  return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
}

export async function generateRecoveryCodes(email: string) {
  await ensureAdminTables();
  const normalizedEmail = email.trim().toLowerCase();
  const codes = Array.from({ length: 8 }, makeRecoveryCode);
  const d1 = getD1();
  const now = Date.now();
  const statements = [d1.prepare("DELETE FROM admin_recovery_codes WHERE email = ?").bind(normalizedEmail)];
  for (const code of codes) {
    statements.push(d1.prepare("INSERT INTO admin_recovery_codes (id, email, code_hash, created_at, used_at) VALUES (?, ?, ?, ?, NULL)")
      .bind(crypto.randomUUID(), normalizedEmail, await sha256(`${normalizedEmail}:${code}`), now));
  }
  await d1.batch(statements);
  return codes;
}

export async function resetPasswordWithRecoveryCode(email: string, code: string, newPassword: string) {
  if (!isAllowedAdminEmail(email) || newPassword.length < 12) return false;
  await ensureAdminTables();
  const normalizedEmail = email.trim().toLowerCase();
  const codeHash = await sha256(`${normalizedEmail}:${code.trim().toUpperCase()}`);
  const record = await getD1().prepare("SELECT id, code_hash AS codeHash FROM admin_recovery_codes WHERE email = ? AND used_at IS NULL")
    .bind(normalizedEmail).all<{ id: string; codeHash: string }>();
  const match = (record.results ?? []).find((candidate) => safeEqual(candidate.codeHash, codeHash));
  if (!match) return false;
  const now = Date.now();
  await getD1().batch([
    getD1().prepare("INSERT INTO admin_credentials (email, password_hash, updated_at) VALUES (?, ?, ?) ON CONFLICT(email) DO UPDATE SET password_hash = excluded.password_hash, updated_at = excluded.updated_at")
      .bind(normalizedEmail, await hashPasswordForStorage(newPassword), now),
    getD1().prepare("UPDATE admin_recovery_codes SET used_at = ? WHERE email = ? AND used_at IS NULL").bind(now, normalizedEmail),
  ]);
  return true;
}

export async function createAdminSession(email: string) {
  const issuedAt = Date.now();
  const payload = bytesToBase64Url(new TextEncoder().encode(JSON.stringify({ email: email.toLowerCase(), issuedAt, expires: issuedAt + 1000 * 60 * 60 * 12 })));
  return `${payload}.${await sign(payload)}`;
}

export async function verifyAdminSession(token: string | undefined) {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeEqual(await sign(payload), signature)) return null;
  try {
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    const parsed = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(padded), (char) => char.charCodeAt(0)))) as { email: string; issuedAt: number; expires: number };
    if (!parsed.issuedAt || parsed.expires <= Date.now() || !isAllowedAdminEmail(parsed.email)) return null;
    await ensureAdminTables();
    const credential = await getD1().prepare("SELECT updated_at AS updatedAt FROM admin_credentials WHERE email = ?").bind(parsed.email).first<{ updatedAt: number }>();
    return !credential || parsed.issuedAt >= credential.updatedAt ? parsed.email : null;
  } catch {
    return null;
  }
}

export function getCookieValue(cookieHeader: string | null, name: string) {
  return cookieHeader?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`))?.slice(name.length + 1);
}
