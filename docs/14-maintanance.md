# Maintenance

> How to keep **ANDYY-S-SITE** running and up to date, covering code, content, Supabase, analytics, security, SEO and deployment maintenance, plus troubleshooting.

---

## 1. Code Maintenance

| Task | How |
|---|---|
| Update a component | Edit the relevant file in `src/components/` |
| Update portfolio content | Edit `src/data/profile.ts` only (see Section 2) |
| Update dependencies | `npm update` / review `package.json`; verify with `npm run build` afterward |
| Type-check | The build performs TypeScript checking (`strict` mode in `tsconfig.json`) |
| Lint | `npm run lint` |
| Format | `npm run format` |

Because `.lovable/` remains connected to the Lovable editor, avoid rewriting published Git history (see `AGENTS.md`, `10-githun-workflow.md`).

---

## 2. Content Maintenance (`src/data/profile.ts`)

All portfolio content is centralized in one file. To update:

| Content | Field(s) in `profile.ts` |
|---|---|
| Biography | `about` |
| Skills | `skillGroups` |
| Featured projects | `featuredProjects` (also update the duplicate `featuredProject` if changing the first entry) |
| Other projects | `projects` |
| Certifications | `certifications`, `certsInProgress` |
| Experience | `experience` |
| Volunteering | `volunteering` |
| Social links | `links` |
| TryHackMe statistics | `stats`, `notableRooms` (manual — no live API) |
| Activity log fallback | `logLines` |

No code changes are required to update content; only this data file. After editing, run `npm run build` to confirm the change type-checks (the file's type is inferred from its own shape via `typeof profile`).

---

## 3. GitHub Integration Maintenance

- The GitHub username used for API calls is hard-coded as `HANDLE` in `src/hooks/use-github-stats.ts` and separately in `profile.handle`; keep both in sync if the username changes.
- The integration depends on two unauthenticated public endpoints: `api.github.com` and the third-party `github-contributions-api.jogruber.de`. Either could change its response shape or rate-limit behavior without notice.
- **Fallback behavior is already built in**: on failure, `StatsBar` shows "live stats unavailable" and `LogStrip` falls back to `profile.logLines`. No maintenance action is required for a transient outage.
- If GitHub or the contributions API changes its response format, `use-github-stats.ts` will need updating to match.

---

## 4. Supabase Maintenance

| Task | Notes |
|---|---|
| **Schema changes** | Add a new file to `supabase/migrations/`; do not edit past migrations |
| **Authentication** | Managed in the Supabase dashboard; the only application-level rule is that `claimAdmin` grants the role once, to the email in `profile.ts` |
| **Roles** | The `user_roles` table currently supports only the `admin` role |
| **RLS policies** | Any policy change should be re-verified against the intended access model (see `13-security.md`) since the browser has no insert access on any table |
| **Contact submissions** | Reviewed by the owner in `/admin`; no automated cleanup process exists, so old rows accumulate unless manually pruned |
| **Analytics data** | Same as above — no retention or pruning policy is implemented |

---

## 5. Analytics Maintenance

- Page views and link clicks are logged automatically; no manual intervention is needed in normal operation.
- Rate limits (30 page views/hour, 3 contact submissions/hour, both keyed by a rotating SHA-256 visitor hash) are hard-coded in `src/lib/tracking.functions.ts`. Adjusting them requires a code change.
- `getAdminOverview` caps its reads at 5,000 rows per table over 90 days; if traffic grows significantly, this limit may need revisiting.

---

## 6. Security Maintenance

| Task | Where |
|---|---|
| Update security headers / CSP | `src/server.ts` |
| Update CSRF middleware | `src/start.ts` |
| Rotate Supabase keys | Supabase dashboard, then update the corresponding environment variables in Vercel |
| Review RLS policies | `supabase/migrations/` (add new migrations; do not edit history) |
| Dependency security updates | `npm audit` / `npm update`, followed by `npm run build` and manual verification |

Never commit `.env` or any secret value; see `13-security.md` for what must remain server-only.

---

## 7. SEO Maintenance

| Task | Where |
|---|---|
| Update title/description/canonical | `src/routes/index.tsx` head metadata |
| Update the OG/social preview image | Replace `public/og-image.jpg` and confirm the metadata still points to it |
| Update the sitemap URL | `SITE_URL` / `BASE_URL` constants in `src/routes/index.tsx` and `src/routes/sitemap[.]xml.ts` (kept in sync manually — they are not shared from one source) |
| Update `robots.txt` | `public/robots.txt` |
| Update structured data | The JSON-LD block in `src/routes/index.tsx`, generated from `profile` |

---

## 8. Deployment Maintenance

- Vercel builds automatically from `main`; no manual deployment step is required for ordinary changes.
- Environment variables (`SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and their `VITE_` counterparts) must be kept up to date in the Vercel project settings.
- After any deployment, verify the production site, `/admin`, `/resume.pdf`, `/sitemap.xml`, `/robots.txt` and `/security.txt` all resolve correctly.

---

## 9. Troubleshooting

### Build failures

| Symptom | Likely cause | Action |
|---|---|---|
| Type errors on build | A change to `profile.ts` or a component broke a type | Fix per the TypeScript error; re-run `npm run build` |
| Lint failures | Code style violation | `npm run lint`, then `npm run format` |

### GitHub stats unavailable

| Symptom | Likely cause | Action |
|---|---|---|
| "live stats unavailable" shown | GitHub API rate limit or outage | No action needed; it is a designed fallback. Confirm `HANDLE` in `use-github-stats.ts` is still correct. |
| Contributions show "—" | The third-party contributions API failed | Same as above; this is a designed fallback |

### Supabase errors

| Symptom | Likely cause | Action |
|---|---|---|
| Server functions fail with a Supabase error | Missing or incorrect environment variables | Verify `SUPABASE_URL` / keys in Vercel settings |
| Admin dashboard shows no data despite being signed in | RLS policy misconfiguration or role not granted | Check `user_roles` for an `admin` row for the owner's user, and review the relevant migration |

### Contact form failures

| Symptom | Likely cause | Action |
|---|---|---|
| "Too many messages sent from this connection" | The 3-per-hour rate limit was hit | Expected behavior; wait or adjust the limit in code |
| Submission silently "succeeds" with nothing stored | The honeypot field was filled (likely a bot) | Expected behavior, not a bug |
| Generic "could not deliver your message" | A server-side insert failure (e.g. Supabase misconfiguration) | Check server logs and Supabase connectivity |

### Admin login problems

| Symptom | Likely cause | Action |
|---|---|---|
| Cannot sign in | Wrong credentials, or account not yet created | Use "create owner account" once, with the email matching `profile.ts` |
| Signed in but not granted admin | Email does not match `profile.ts`, or an admin already exists | Only the first matching account is ever granted the role (`claimAdmin`) |

### Analytics problems

| Symptom | Likely cause | Action |
|---|---|---|
| Views not increasing | Rate limit reached, or logging failing silently by design | Tracking calls are fire-and-forget; check the browser network tab for the request outcome |

### SEO problems

| Symptom | Likely cause | Action |
|---|---|---|
| Site not indexed | Search engines take time; verify Search Console verification and `robots.txt` | Confirm `/admin` is not accidentally exposed to indexing |
| Social preview looks wrong | Cached preview or wrong OG image | Re-check `og-image.jpg` and clear the platform's cache where possible |

### Deployment problems

| Symptom | Likely cause | Action |
|---|---|---|
| Build fails on Vercel | Same causes as local build failures | Check the Vercel build log |
| Environment-dependent feature broken in production only | Missing/incorrect environment variable in Vercel | Verify variable names and values in the Vercel dashboard |

---

## 10. Maintenance Checklist

**Before changes**
- Pull the latest `main`.
- Confirm which file(s) the change belongs in (content → `profile.ts`; behavior → components/hooks/lib; schema → a new migration).

**During changes**
- Keep content changes isolated to `profile.ts` where possible.
- Run `npm run lint` and `npm run format` before committing.

**Before deployment**
- Run `npm run build` locally to catch type and build errors early.
- Review any new environment variable requirements.

**After deployment**
- Verify the production homepage, `/admin`, `/resume.pdf`, `/sitemap.xml`, `/robots.txt`, `/security.txt`.
- Spot-check the contact form and GitHub stats fallback behavior.

**Periodic maintenance**
- Review and prune old `contact_submissions` / analytics rows if volume grows (no automated retention exists).
- Review dependency updates and re-run `npm run build` after upgrading.
- Re-verify RLS policies after any schema change.
