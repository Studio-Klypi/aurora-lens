import { execSync } from "node:child_process";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "../..");

const modules = process.argv.slice(2);

if (modules.length === 0) {
  console.error("\x1b[31m✖ No modules provided. Usage: pnpm tsx scripts/nuxt/add-modules.ts <module1> <module2> ...\x1b[0m");
  process.exit(1);
}

console.log("\x1b[36m╭──────────────────────────────────────────╮\x1b[0m");
console.log("\x1b[36m│\x1b[0m  \x1b[1m\x1b[35m◆ Nuxt Module Installer\x1b[0m                 \x1b[36m│\x1b[0m");
console.log("\x1b[36m╰──────────────────────────────────────────╯\x1b[0m");
console.log();

// Step 1: Add modules via nuxi
console.log(`\x1b[33m⏳ Adding ${modules.length} module(s)...\x1b[0m`);
const cmd = `npx nuxi module add ${modules.join(" ")}`;
console.log(`\x1b[90m   $ ${cmd}\x1b[0m`);
execSync(cmd, { cwd: ROOT, stdio: "inherit" });
console.log("\x1b[32m✔ Modules added.\x1b[0m");
console.log();

// Step 2: Lint
console.log("\x1b[33m⏳ Running linter...\x1b[0m");
execSync("pnpm lint", { cwd: ROOT, stdio: "inherit" });
console.log("\x1b[32m✔ Lint passed.\x1b[0m");
console.log();

console.log("\x1b[36m╭──────────────────────────────────────────╮\x1b[0m");
console.log(`\x1b[36m│\x1b[0m  \x1b[32m✔ ${modules.length} module(s) added!\x1b[0m${" ".repeat(Math.max(0, 23 - String(modules.length).length))}\x1b[36m│\x1b[0m`);
console.log("\x1b[36m╰──────────────────────────────────────────╯\x1b[0m");
