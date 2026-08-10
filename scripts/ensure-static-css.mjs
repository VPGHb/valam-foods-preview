import { copyFile, mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import { dirname, extname, join } from "node:path";

const clientDir = join(process.cwd(), "dist", "client");
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
let indexHtml = await readFile(join(clientDir, "index.html"), "utf8");
const stylesheetPaths = [
  ...indexHtml.matchAll(/href=["'](?:\/[^"']*)?\/_next\/static\/css\/([^"']+\.css)["']/g),
].map((match) => join(clientDir, "_next", "static", "css", match[1]));

if (stylesheetPaths.length === 0) {
  throw new Error("The exported homepage does not reference a stylesheet.");
}

for (const stylesheetPath of new Set(stylesheetPaths)) {
  await mkdir(dirname(stylesheetPath), { recursive: true });
  await copyFile(join(process.cwd(), "app", "globals.css"), stylesheetPath);
}

// Prevent GitHub Pages from treating the exported `_next` directory as Jekyll content.
await writeFile(join(clientDir, ".nojekyll"), "");

const files = [];
const collectFiles = async (directory) => {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await collectFiles(path);
    else files.push(path);
  }
};
await collectFiles(clientDir);

// Apply the repository subpath only after vinext has emitted the complete
// client bundle. This avoids its assetPrefix export bug while keeping every
// HTML, RSC, CSS, and client-JS reference correct on GitHub Pages.
if (basePath) {
  const textExtensions = new Set([".css", ".html", ".js", ".rsc", ".txt", ".xml"]);
  for (const file of files.filter((path) => textExtensions.has(extname(path)))) {
    const source = await readFile(file, "utf8");
    const prefixed = source
      .replaceAll("/_next/", `${basePath}/_next/`)
      .replaceAll(`${basePath}${basePath}/_next/`, `${basePath}/_next/`);
    if (prefixed !== source) await writeFile(file, prefixed);
  }
  indexHtml = await readFile(join(clientDir, "index.html"), "utf8");
}

const referencedAssets = new Set();
for (const htmlFile of files.filter((path) => extname(path) === ".html")) {
  const html = await readFile(htmlFile, "utf8");
  for (const match of html.matchAll(/(?:src|href)=["']([^"']*\/_next\/[^"']+)["']/g)) {
    referencedAssets.add(match[1].split(/[?#]/, 1)[0]);
  }
}

for (const reference of referencedAssets) {
  const relativePath = reference.slice(reference.indexOf("/_next/") + 1);
  const assetPath = join(clientDir, ...relativePath.split("/"));
  if (!(await stat(assetPath).then(() => true, () => false))) {
    throw new Error(`Exported page references a missing asset: ${reference}`);
  }
}

for (const stylesheetPath of new Set(stylesheetPaths)) {
  const stylesheet = await readFile(stylesheetPath, "utf8");
  if (/@import\s+["'](?!https?:|data:)/.test(stylesheet)) {
    throw new Error(`Exported stylesheet contains an unresolved local import: ${stylesheetPath}`);
  }
}
