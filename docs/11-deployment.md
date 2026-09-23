# Deployment

> How **ANDYY-S-SITE** goes from source code to a live production site, grounded in `package.json`, `vite.config.ts`, and the repository's deployment records, as traced in `03-system-architecture.md`.

---

## 1. Deployment Flow

```text
Source code (GitHub, andyydz/andyy-s-site)
  → git push to main
  → Vercel build (vite build)
  → Production deployment
  → https://andyy-s-site.vercel.app
```

Vercel is connected directly to the GitHub repository. Pushes to `main` trigger a production build and deploy; pushes to other branches can produce preview deployments. This is configured through Vercel's own Git integration rather than through any workflow file in the repository.

---

## 2. Hosting Platform

| Item | Detail |
|---|---|
| **Host** | Vercel |
| **Production URL** | `https://andyy-s-site.vercel.app` |
| **HTTPS** | Provided by Vercel; reinforced by the app's own `Strict-Transport-Security` header |
| **Deployment records** | The connected repository shows both Production and Preview deployments |

---

## 3. Build Commands

Defined in `package.json` and run by Vercel (or manually for local verification):

| Command | Purpose |
|---|---|
| `npm run build` | Production build (`vite build`) |
| `npm run build:dev` | Development-mode build (`vite build --mode development`) |
| `npm run preview` | Serves a local preview of a build (`vite preview`) |

There is no `start` script; the production server entry is handled by the TanStack Start / Nitro build output that Vercel runs directly.

---

## 4. Build Configuration

- `vite.config.ts` uses the shared `@lovable.dev/vite-tanstack-config`, which includes Nitro for the server build. No Vercel-specific Nitro preset is declared in the repository, so exactly how Vercel consumes the Nitro output is configured on Vercel's side.
- The TanStack Start server entry is redirected to the project's custom `src/server.ts`, so the security-header and error-normalization logic there runs in production.
- `__BUILD_DATE__` is injected at build time and displayed in the site footer.

---

## 5. Environment Variables

Deployment requires the following variables to be configured in Vercel's project settings (values are never committed to the repository):

| Variable | Scope | Purpose |
|---|---|---|
| `SUPABASE_URL` / `VITE_SUPABASE_URL` | Server / browser | Supabase project location |
| `SUPABASE_PUBLISHABLE_KEY` / `VITE_SUPABASE_PUBLISHABLE_KEY` | Server / browser | Public Supabase client key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Privileged Supabase access for server functions |

`.env` is git-ignored, and no environment file is committed.

---

## 6. What Is Not Configured in the Repository

- **No `vercel.json`.** Build command, output directory, and framework preset are set in the Vercel dashboard, not in code.
- **No CI/CD pipeline.** No GitHub Actions or other workflow runs tests, lint, or a build gate before deployment; Vercel's own build is the only gate.
- **No custom domain configuration** is present in the repository; the production URL is Vercel's default subdomain.

---

## 7. Rollback and Previews

Vercel retains previous deployments, so a rollback to an earlier production build can be performed from the Vercel dashboard without a corresponding Git revert, if needed. Preview deployments (from non-`main` branches or pull requests) allow changes to be reviewed on a live URL before merging.

---

## 8. Summary

Deployment is **Git-driven and platform-managed**: pushing to `main` on GitHub is the only action required to ship a change, with Vercel handling the build, hosting, HTTPS, and environment configuration. The repository itself carries no custom deployment scripts, CI workflows, or Vercel configuration file — all deployment-specific settings live in the Vercel project rather than in code.
