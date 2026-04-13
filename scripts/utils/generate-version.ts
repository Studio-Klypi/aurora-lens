import { execSync } from "node:child_process";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Version } from "../../shared/types/generic/version";

const ROOT = resolve(import.meta.dirname, "../..");
const PKG_PATH = resolve(ROOT, "package.json");
const OUTPUT_DIR = resolve(ROOT, "shared/constants");
const OUTPUT_PATH = resolve(OUTPUT_DIR, "version.ts");

console.log("\x1b[36m╭──────────────────────────────────────────╮\x1b[0m");
console.log("\x1b[36m│\x1b[0m  \x1b[1m\x1b[35m◆ Version Generator\x1b[0m                     \x1b[36m│\x1b[0m");
console.log("\x1b[36m╰──────────────────────────────────────────╯\x1b[0m");
console.log();

// Step 1: Read version from package.json
console.log("\x1b[33m⏳ Reading version from package.json...\x1b[0m");
const pkg = JSON.parse(readFileSync(PKG_PATH, "utf-8"));
const rawVersion: string = pkg.version;
console.log(`\x1b[90m   Found version: \x1b[1m${rawVersion}\x1b[0m`);

// Step 2: Parse version
console.log("\x1b[33m⏳ Parsing version string...\x1b[0m");
const versionRegex = /^(\d+)\.(\d+)\.(\d+)(?:-(alpha|beta|rc))?$/;
const match = rawVersion.match(versionRegex);

if (!match) {
  console.error(`\x1b[31m✖ Invalid version format: "${rawVersion}". Expected: major.minor.patch[-alpha|beta|rc]\x1b[0m`);
  process.exit(1);
}

const version: Version = {
  version: rawVersion,
  major: Number(match[1]),
  minor: Number(match[2]),
  patch: Number(match[3]),
  ...(match[4] ? { prerelease: match[4] as Version["prerelease"] } : {}),
};

console.log(`\x1b[90m   major: ${version.major} | minor: ${version.minor} | patch: ${version.patch}${version.prerelease ? ` | prerelease: ${version.prerelease}` : ""}\x1b[0m`);
console.log("\x1b[32m✔ Version parsed.\x1b[0m");
console.log();

// Step 3: Generate constant file
console.log("\x1b[33m⏳ Generating shared/constants/version.ts...\x1b[0m");
mkdirSync(OUTPUT_DIR, { recursive: true });

const prereleaseValue = version.prerelease ? `"${version.prerelease}"` : "undefined";

const content = `import type { Version } from "@shared/types/generic/version";

export const APP_VERSION: Version = {
  version: "${version.version}",
  major: ${version.major},
  minor: ${version.minor},
  patch: ${version.patch},
  prerelease: ${prereleaseValue},
};
`;

writeFileSync(OUTPUT_PATH, content, "utf-8");
console.log("\x1b[32m✔ Version constant generated.\x1b[0m");
console.log();

// Step 4: Lint
console.log("\x1b[33m⏳ Running linter...\x1b[0m");
execSync("pnpm lint", { cwd: ROOT, stdio: "inherit" });
console.log("\x1b[32m✔ Lint passed.\x1b[0m");
console.log();

console.log("\x1b[36m╭──────────────────────────────────────────╮\x1b[0m");
console.log(`\x1b[36m│\x1b[0m  \x1b[32m✔ Version \x1b[1mv${rawVersion}\x1b[0m\x1b[32m generated!\x1b[0m${" ".repeat(Math.max(0, 17 - rawVersion.length))}\x1b[36m│\x1b[0m`);
console.log("\x1b[36m╰──────────────────────────────────────────╯\x1b[0m");
