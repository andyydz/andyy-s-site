# Roadmap

## Controlled content, credentials & cleanup update (Nov 2, 2026 brief)

- [x] Inspect brief, affected files, backend dependencies; verify all 6 GitHub repos resolve (all 200)
- [x] Parse uploaded PDFs (Pre Security 14 May 2026; Cyber Security 101 6 Jul 2026; Network Defense Cisco; ROL from Jovita Monis, UnifyCX)
- [x] Nav logo → green cat artwork (30×30, circular mask); favicon refreshed to match
- [x] TryHackMe stats → only "Top 4%" rank + "78 days" highest streak + last-updated Nov 2, 2026; purged 116 rooms / 61-day streak from About, log lines, stat cards
- [x] Featured projects → Sentinel SOC Lab (flagship, In Progress), Python SOC Automation Engine (In Development), Security Incident & Asset Tracker, Bank Secure Network — exact brief copy, verified repo links
- [x] Skills audit → 4 groups (foundations / tools used in labs / programming foundations / currently learning); removed unsupported claims (Metasploit, Remnux, "Phishing Analytics Tools", "SIEM" generic, generic "Cybersecurity"/"Information Security")
- [x] Certifications → credential cards with View buttons; removed "Foundations of Cybersecurity"; 3 real PDFs in public/documents/; Google Cybersecurity stays In Progress
- [x] PDF viewer: reusable dynamic route /documents/:slug (iframe embed, back link, Download PDF with same file, open-in-new-tab fallback); unknown slug → 404
- [x] Credly area (profile link + 2 confirmed badges)
- [x] Letter of Recommendation section (View Letter → viewer; attributed Jovita Monis, Technical Support Engineer · Tier III, UnifyCX)
- [x] Contact → message form removed (fields, validation, honeypot, submit logic, success/error states); Secure Channels panel kept, centered max-w-3xl; copy email + mailto now tracked for the north-star metric
- [x] Backend audit: removed submitContact + contactSchema + countSubmissionsSince (only consumer was the form). KEPT: page_views/link_clicks tracking, logPageView/logLinkClick, admin auth + getAdminOverview, contact_submissions table (admin still reads it), all RLS/migrations, environment config. No database changes.
- [x] Footer QR → encodes https://www.linkedin.com/in/andrew-vinston-d-souza-41699330a/ ; decoded with zxing and verified exactly
- [x] Experience heading → "Independent Cybersecurity Learning & Labs"; volunteering and both testimonials untouched
- [x] SEO/content consistency → meta/JSON-LD description now entry-level framing; everything else preserved
- [x] Verified: build OK, Playwright desktop+mobile (no overflow, no console errors), PDF viewer + 404, QR decode, all repo/Credly links present
- [x] Report delivered — no deploy/publish until user reviews

## Phase 2 — final refinement (Nov 4, 2026 brief)

- [x] About section → restored terminal-style panel frame (command header bar + bordered body), content unchanged
- [x] Project case files → mobile tap-to-expand/collapse of the four-part details ("open/close case file"); desktop always expanded; repo button stays in header
- [x] Testimonials → mobile tap-to-expand/collapse (quotes clamped to 5 lines until expanded); desktop unchanged
- [x] PDF viewer → prominent "Open PDF" header button, fallback copy replaced with the approved "Having trouble viewing this document?" block; Download PDF preserved
- [x] Micro-interactions → press feedback (active:translate-y-px) on cert/Credly/letter/copy/read-more/skill buttons; case-file hover 150→200ms; fixed `animate-fade-in` (was referenced by skill tags but never defined — now a real 260ms fade); document page content gets subtle fade-in
- [x] Volunteering → added Gaming Volunteer — Aloysian Fest 2026 entry (assistance/observation wording preserved; CODESPRINT entry untouched)
- [x] Content consistency → verified no outdated TryHackMe stats (Top 4% / 78-day streak / Nov 2, 2026 only); hero tagline unchanged (report-first rule)
- [x] Resume → current /resume.pdf links preserved untouched; plan for dedicated view/download page noted in report for when the final PDF arrives
- [ ] Publish/deploy — waiting on user approval

## Final controlled refinement (Nov 6, 2026 brief)

- [ ] Confirmed repository authorization with user; inspect all source files, public README destinations, and uploaded resume/logo
- [ ] Update entry-level SOC L1 positioning and factual About summary
- [ ] Fix skill group text contrast in hover/focus/active states; unify comparable card and touch feedback
- [ ] Promote five main projects, link Sentinel to its real documentation, and place two supporting projects behind a toggle
- [ ] Add the uploaded resume to the existing document viewer; route all resume links there
- [ ] Use the uploaded cat logo in navigation and refresh favicon
- [ ] Make mobile document view a clear PDF fallback instead of a blank embedded frame
- [ ] Verify project links, document routes, UI interactions, responsive widths, typecheck/build/lint; report only checks run
- [ ] Publish/deploy — waiting on explicit user approval
