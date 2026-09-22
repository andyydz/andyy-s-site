# Technology Stack

> The technologies used to build, run and deploy **ANDYY-S-SITE**, grounded in `package.json`, the configuration files, and the source tree traced in the earlier documents.

---

## 1. Overview

The application is a **TypeScript** full-stack project built on **React** and **TanStack Start**, styled with **Tailwind CSS**, backed by **Supabase**, and deployed on **Vercel**. The stack splits into five groups:

| Group | Technologies |
|---|---|
| Language and tooling | TypeScript, Vite, ESLint, Prettier |
| Frontend framework | React 19, TanStack Start, TanStack Router, TanStack Query |
| UI and styling | Tailwind CSS v4, Radix UI, shadcn/ui, Lucide React |
| Backend and data | TanStack Start server functions, Supabase (Postgres, Auth), Zod |
| External services and hosting | GitHub API, a third-party GitHub contributions API, Google Fonts, Vercel |

---

## 2. Language and Core Tooling

| Technology | Role |
|---|---|
| **TypeScript** | Primary language for the entire codebase, in strict mode (`tsconfig.json`) |
| **Vite** | Development server and production bundler (`npm run dev`, `build`, `preview`) |
| **`@lovable.dev/vite-tanstack-config`** | Shared configuration wiring the TanStack Start, React, Tailwind and tsconfig-paths Vite plugins, plus Nitro |
| **Nitro** | Server build integration, included by the shared Vite configuration |
| **ESLint** | Linting (`npm run lint`) |
| **Prettier** | Formatting (`npm run format`), configured by `.prettierrc` and `.prettierignore` |
| **npm / bun** | Package management. Both `package-lock.json` and `bun.lock` are committed; `bunfig.toml` sets a minimum package release age |

---

## 3. Frontend Framework

| Technology | Role |
|---|---|
| **React 19** | UI library for all components |
| **TanStack Start** | Full-stack application framework: SSR, server functions, middleware, custom server entry |
| **TanStack Router** | File-based routing (`src/routes/`), generated route tree (`routeTree.gen.ts`) |
| **TanStack Query** | Provided app-wide through `QueryClientProvider`; used for data fetching on `/admin` |

---

## 4. UI and Styling

| Technology | Role |
|---|---|
| **Tailwind CSS v4** | Utility-first styling throughout the components |
| **Radix UI** | Unstyled, accessible primitives underlying the generated `components/ui/` kit |
| **shadcn/ui** | Generator for the UI primitive components (`new-york` style, configured in `components.json`) |
| **Lucide React** | Icon set used in the hero, navigation and sections |
| **`qrcode`** | Generates the footer QR code, loaded on demand |

Global styling, design tokens, the terminal/CRT visual language, and reduced-motion and print rules live in `src/styles.css`.

---

## 5. Backend and Data

| Technology | Role |
|---|---|
| **TanStack Start server functions** | Backend operations: contact submission, analytics logging, admin claim and overview (`src/lib/*.functions.ts`) |
| **Supabase** | Postgres database and authentication; browser client (`client.ts`) and server-only service-role client (`client.server.ts`) |
| **Zod** | Server-side input validation schemas |
| **Row-level security (Postgres/Supabase)** | Restricts table access; enforced alongside the in-code admin role check |

---

## 6. External Services

| Service | Role | Authenticated? |
|---|---|---|
| **GitHub REST API** | Public repo count and recent activity, fetched client-side | No |
| **GitHub contributions API** (`github-contributions-api.jogruber.de`) | Last-year contribution total, fetched client-side | No |
| **Google Fonts** | JetBrains Mono and Inter typefaces | No |
| **TryHackMe** | Linked only; statistics are manually maintained, not fetched | N/A |

---

## 7. Deployment and Infrastructure

| Technology | Role |
|---|---|
| **Git / GitHub** | Version control and source hosting (`andyydz/andyy-s-site`) |
| **Vercel** | Production hosting, build, and HTTPS; Production and Preview deployments |
| **Lovable** | Original authoring environment; build-time coupling only (`.lovable/`, the shared Vite config package, no-op error-reporting hooks) |

No CI/CD workflow (no `.github/` Actions) and no `vercel.json` exist in the repository; Vercel's build settings are configured outside the repository.

---

## 8. Summary Table

| Layer | Technology |
|---|---|
| Language | TypeScript |
| Build | Vite, Nitro |
| Framework | React 19, TanStack Start |
| Routing | TanStack Router |
| Data fetching (admin) | TanStack Query |
| Styling | Tailwind CSS v4, Radix UI, shadcn/ui, Lucide React |
| Validation | Zod |
| Database / Auth | Supabase (Postgres, Auth) |
| External APIs | GitHub REST API, GitHub contributions API |
| Fonts | Google Fonts |
| Hosting | Vercel |
| Source control | Git, GitHub |
| Original authoring | Lovable (build-time only) |
