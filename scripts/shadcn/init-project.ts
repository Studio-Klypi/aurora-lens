import { execSync } from "node:child_process";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "../..");

console.log("\x1b[36m╭──────────────────────────────────────────╮\x1b[0m");
console.log("\x1b[36m│\x1b[0m  \x1b[1m\x1b[35m◆ shadcn-nuxt Project Init\x1b[0m              \x1b[36m│\x1b[0m");
console.log("\x1b[36m╰──────────────────────────────────────────╯\x1b[0m");
console.log();

// Step 1: Initialize shadcn
console.log("\x1b[33m⏳ Initializing shadcn-nuxt...\x1b[0m");
execSync("npx shadcn-vue@latest init", { cwd: ROOT, stdio: "inherit" });
console.log("\x1b[32m✔ shadcn-nuxt initialized.\x1b[0m");
console.log();

// Step 2: Lint
console.log("\x1b[33m⏳ Running linter...\x1b[0m");
execSync("pnpm lint", { cwd: ROOT, stdio: "inherit" });
console.log("\x1b[32m✔ Lint passed.\x1b[0m");
console.log();

console.log("\x1b[36m╭──────────────────────────────────────────╮\x1b[0m");
console.log("\x1b[36m│\x1b[0m  \x1b[32m✔ All done!\x1b[0m                             \x1b[36m│\x1b[0m");
console.log("\x1b[36m╰──────────────────────────────────────────╯\x1b[0m");
