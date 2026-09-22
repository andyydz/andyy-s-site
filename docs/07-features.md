# Features

> A feature-by-feature description of what **ANDYY-S-SITE** actually does, grounded in the implementation traced in the earlier documents (`02-requirements.md`, `03-system-architecture.md`).

---

## 1. Public Portfolio

### 1.1 Hero
Name, alias, professional title, a short positioning line, a profile photo, and primary actions: download resume, contact, GitHub, LinkedIn. A subtle matrix-rain canvas effect runs behind the hero (disabled for reduced motion).

### 1.2 First-visit intro
A terminal-style boot animation plays once per browser, tracked with a `localStorage` flag (`andyydz.intro.played`). It is skippable by keyboard (Escape) or pointer, and does not play at all for visitors who prefer reduced motion.

### 1.3 Activity log (LogStrip)
A terminal-style strip that merges live GitHub activity (recent pushes and repo creations) with static fallback lines. Shows a short set by default, expandable to the full list.

### 1.4 Statistics bar (StatsBar)
Four manually maintained TryHackMe figures (rank, badges, streak, rooms), a GitHub summary line (public repos, last-year contributions), and a list of notable rooms. Numbers animate with a count-up effect on scroll into view (skipped for reduced motion).

### 1.5 About
A short professional biography.

### 1.6 Skills
Skills grouped into Core Security, Tools & Technologies, and Foundations. Each group shows its item count and can be expanded or collapsed individually, with a control to expand or collapse all at once.

### 1.7 Projects
- **Featured projects:** case studies with problem / approach / outcome / next-step structure, linking to their own repositories.
- **Additional projects:** cards with a short description and topic tags, also linking to their repositories.

### 1.8 Certifications
A table of completed certifications (name, issuer, date) plus a line naming certifications in progress.

### 1.9 Experience and Volunteering
Timeline-style entries with role, organization, period, and summary points. Self-directed practice is labelled as such rather than formal employment.

### 1.10 Testimonial
A written recommendation with its author and role.

### 1.11 Contact
- Email (copy-to-clipboard), GitHub, LinkedIn, TryHackMe, Reddit links.
- A contact form (name, email, message) with client- and server-side validation, a hidden honeypot field (`company_url`), and a per-sender rate limit of 3 submissions per hour. Submissions are stored in Supabase; no email is sent.

### 1.12 Footer
Repeats the professional links and shows a QR code linking to the site, loaded on demand.

### 1.13 Resume access
A downloadable PDF (`/resume.pdf`), linked from the header (desktop and mobile) and the hero.

---

## 2. Navigation

- Fixed header with anchor links to About, Skills, Projects, Certifications, Experience and Contact.
- Active-section highlighting via scroll observation, exposed to assistive technology with `aria-current`.
- Collapsible mobile menu on narrow screens.
- External links open in a new tab with `noopener` protection.

---

## 3. Dynamic GitHub Data

Live repository count, recent activity events, and a last-year contribution total, fetched client-side from GitHub's public API and a third-party contributions API. No authentication is used. If a request fails, the UI falls back to static content and shows an "unavailable" message rather than breaking.

---

## 4. Analytics (First-Party)

- **Page views:** logged on homepage load (path, referrer host, a one-way visitor hash), rate limited to 30 per hash per hour. No IP addresses are stored.
- **Link clicks:** logged for selected tracked links, including the contact-form submit action.
- All tracking calls are fire-and-forget and never block or break the page.

---

## 5. Admin Dashboard

A private `/admin` page, excluded from search indexing (`noindex, nofollow`, disallowed in `robots.txt`), client-rendered only. Features:

- Email/password sign-in, plus an owner account-creation flow.
- An admin-role claim restricted to the owner's email and to the first admin only.
- Dashboard data: view totals over 90/30/7 days, visits by day and by week, top referrers, most-clicked links, and the latest 100 contact submissions.
- Access is protected by token verification, an in-code role check, and database row-level security.

---

## 6. Error Handling

- Custom terminal-styled 404 page with a link home.
- A rendering-error screen ("This page didn't load") with Try again / Go home actions.
- A static HTML 500 page for unhandled server errors.
- Non-essential features (GitHub data, analytics, QR code, clipboard) degrade gracefully rather than breaking the page.

---

## 7. SEO

- Page title, meta description, canonical URL, Open Graph and Twitter Card metadata, and an OG image.
- Schema.org `Person` structured data (JSON-LD) built from the profile data.
- `robots.txt` and a dynamically generated sitemap (`/sitemap.xml`).
- Google Search Console verification tag.
- `/admin` explicitly excluded from indexing.

---

## 8. Accessibility

- Semantic HTML landmarks and heading hierarchy.
- Descriptive alt text on meaningful images; decorative effects hidden from assistive technology.
- Labelled form fields, `aria-live` regions for errors and status messages.
- `aria-expanded` on expandable controls, visible keyboard focus outlines.
- Full support for `prefers-reduced-motion`: disables the intro, the matrix-rain effect, count-up animation, and scroll/transition animation.
- A dedicated print stylesheet producing a plain, light, readable layout.

---

## 9. Security Features

- HTTPS and HSTS in production.
- Content Security Policy, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`.
- CSRF protection on server functions.
- Contact-form honeypot and rate limiting.
- Row-level security on all database tables; secrets confined to server-only environment variables.
- Published `security.txt` for vulnerability disclosure.

---

## 10. Developer / QA Feature

**Motion debug overlay:** a hidden panel (`Ctrl+Shift+D` or `?debug=motion`) that audits whether animations stay within the project's motion-duration budget. Not part of the public-facing experience.

---

## 11. What Is Not a Feature

- No email notifications for contact submissions (stored only; read via `/admin`).
- No live TryHackMe API integration (figures are manually maintained).
- No third-party analytics service.
- No CAPTCHA (spam mitigation is honeypot plus rate limiting).
- No multi-page navigation beyond `/`, `/admin`, and `/sitemap.xml`.
- 
