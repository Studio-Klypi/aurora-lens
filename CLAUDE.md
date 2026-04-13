# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Aurora Lens is a SaaS application by Studio Klypi, built with Nuxt 4 and Vue 3. The project uses pnpm as its package manager.

## Commands

- `pnpm dev` — start dev server (http://localhost:3000)
- `pnpm build` — production build
- `pnpm preview` — preview production build
- `pnpm lint` — lint and auto-fix with ESLint (stylistic: 2-space indent, semicolons, double quotes)
- `pnpm db:migrate <name>` — run Prisma migration
- `pnpm db:create-migration <name>` — create migration without applying
- `pnpm db:generate` — regenerate Prisma client
- `pnpm db:seed` — seed the database
- `pnpm db:studio` — open Prisma Studio
- `pnpm nuxt:add <modules>` - install and add nuxt modules
- `pnpm shadcn:init` - init shadcn project
- `pnpm shadcn:add <components>` - clone shadcn components in project

## Tech Stack

- **Framework:** Nuxt 4 (Vue 3, TypeScript)
- **Styling:** Tailwind CSS 4 with shadcn-nuxt components
- **State:** Pinia
- **Database:** Prisma ORM
- **i18n:** @nuxtjs/i18n (default locale: `fr`, strategy: `no_prefix`)
- **Fonts:** DM Sans, Staatliches (via @nuxtjs/google-fonts)

## Architecture

Nuxt 4 app directory structure — pages, components, composables, and server routes live under `app/`. The project follows Nuxt's file-based routing and auto-import conventions.

## Code Style

ESLint is configured via `@nuxt/eslint` with stylistic rules:
- 2-space indentation
- Semicolons required
- Double quotes
