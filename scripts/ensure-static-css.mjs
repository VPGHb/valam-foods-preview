import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const clientDir = join(process.cwd(), "dist", "client");
const indexHtml = await readFile(join(clientDir, "index.html"), "utf8");
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
