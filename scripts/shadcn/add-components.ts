import { execSync } from "node:child_process";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "../..");

const components = process.argv.slice(2);

if (components.length === 0) {
  console.error("\x1b[31m✖ No components provided. Usage: pnpm tsx scripts/shadcn/add-components.ts <component1> <component2> ...\x1b[0m");
  process.exit(1);
}

console.log("\x1b[36m╭──────────────────────────────────────────╮\x1b[0m");
console.log("\x1b[36m│\x1b[0m  \x1b[1m\x1b[35m◆ shadcn Component Installer\x1b[0m            \x1b[36m│\x1b[0m");
console.log("\x1b[36m╰──────────────────────────────────────────╯\x1b[0m");
console.log();

// Step 1: Add components
console.log(`\x1b[33m⏳ Adding ${components.length} component(s)...\x1b[0m`);
const cmd = `npx shadcn-vue@latest add ${components.join(" ")} --no`;
console.log(`\x1b[90m   $ ${cmd}\x1b[0m`);
execSync(cmd, { cwd: ROOT, stdio: "inherit" });
console.log("\x1b[32m✔ Components added.\x1b[0m");
console.log();

// Step 2: Lint
console.log("\x1b[33m⏳ Running linter...\x1b[0m");
execSync("pnpm lint", { cwd: ROOT, stdio: "inherit" });
console.log("\x1b[32m✔ Lint passed.\x1b[0m");
console.log();

console.log("\x1b[36m╭──────────────────────────────────────────╮\x1b[0m");
console.log(`\x1b[36m│\x1b[0m  \x1b[32m✔ ${components.length} component(s) added!\x1b[0m${" ".repeat(Math.max(0, 21 - String(components.length).length))}\x1b[36m│\x1b[0m`);
console.log("\x1b[36m╰──────────────────────────────────────────╯\x1b[0m");
