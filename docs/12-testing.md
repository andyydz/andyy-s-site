# Testing

> The current state of testing and quality verification for **ANDYY-S-SITE**, stated plainly rather than describing tooling that does not exist in the repository.

---

## 1. Current State

**The repository contains no automated test suite.**

| Item | Present? |
|---|---|
| Unit tests | No |
| Integration tests | No |
| End-to-end tests | No |
| Test runner dependency (Jest, Vitest, Playwright, Cypress, etc.) | No |
| `test` script in `package.json` | No |
| CI pipeline running tests | No (no `.github/` workflows exist) |

This document does not claim otherwise. Quality is currently verified through manual review rather than automated testing.

---

## 2. Manual Verification Practices

The project's own `roadmap.md` records an open checklist of manual verification items, which reflects the actual quality process used during development:

- Reviewing responsive layouts across breakpoints (phone, tablet, laptop, desktop).
- Verifying that navigation, external, and project links resolve correctly.
- Testing the contact form's submission, validation, and error states.
- Spot-checking SEO metadata (title, description, Open Graph preview, structured data) after content changes.

These are performed by hand, typically in the browser, rather than through a scripted test suite.

---

## 3. Static Verification Available

Although there is no test runner, two tools catch a class of errors before deployment:

| Tool | What it catches |
|---|---|
| **TypeScript** (`strict` mode, `tsc` via the build) | Type errors, incorrect prop usage, missing fields |
| **ESLint** (`npm run lint`) | Code-quality and correctness issues per the configured rule set |

Neither tool verifies runtime behavior, visual correctness, or business logic; they only catch what is expressible as a static rule.

---

## 4. Manual QA Aid: Motion Debug Overlay

`src/components/motion-debug.tsx` provides a **developer/QA tool**, not an automated test: a hidden overlay (`Ctrl+Shift+D` or `?debug=motion`) that audits whether interface animations stay within the project's 400ms motion budget. It requires a human to open it and read the results.

---

## 5. Gaps

Because there is no automated suite, the following are **not verified on every change**:

- Server function behavior (contact validation, rate limiting, honeypot handling) has no regression tests. A future change could silently break validation rules or the rate limit.
- Database row-level security policies are not exercised by automated tests; an incorrect policy change could only be caught by manual inspection or by an actual security incident.
- No accessibility testing tool (e.g. axe, Lighthouse CI) runs automatically. Accessibility features (ARIA attributes, focus order, reduced motion) are implemented in code but not continuously checked.
- No visual regression testing exists, so CSS or layout changes are only caught by eye.

---

## 6. Recommended Direction

These are recommendations only, not implemented functionality:

- A lightweight unit-test setup (e.g. Vitest, which integrates naturally with Vite) for the server functions in `src/lib/*.functions.ts`, particularly the validation and rate-limiting logic in `submitContact`.
- A basic end-to-end smoke test (e.g. Playwright) covering the homepage load, navigation, and contact-form submission.
- Adding `npm run lint` (and, if introduced, a test command) as a required check in a CI workflow before merging to `main`.

Concrete future plans, if any, belong in `15-future-improvements.md` rather than here.

---

## 7. Summary

Quality assurance for this project is currently **manual and static-analysis-based**: TypeScript and ESLint catch code-level issues, and the author performs manual checks against the checklist in `roadmap.md`. No automated test suite exists at any level, and no CI gate enforces one.
