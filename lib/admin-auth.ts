import { env } from "cloudflare:workers";

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

async function sha256(valueToHash: string) {
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

export async function createAdminSession(email: string) {
  const payload = bytesToBase64Url(new TextEncoder().encode(JSON.stringify({ email: email.toLowerCase(), expires: Date.now() + 1000 * 60 * 60 * 12 })));
  return `${payload}.${await sign(payload)}`;
}

export async function verifyAdminSession(token: string | undefined) {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature || !safeEqual(await sign(payload), signature)) return null;
  try {
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
    const parsed = JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(padded), (char) => char.charCodeAt(0)))) as { email: string; expires: number };
    return parsed.expires > Date.now() && isAllowedAdminEmail(parsed.email) ? parsed.email : null;
  } catch {
    return null;
  }
}

export function getCookieValue(cookieHeader: string | null, name: string) {
  return cookieHeader?.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`))?.slice(name.length + 1);
}
