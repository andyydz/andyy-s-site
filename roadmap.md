# Roadmap

## Controlled content, credentials & cleanup update (Nov 2, 2026 brief)

- [x] Inspect brief, affected files, backend dependencies; verify all 6 GitHub repos resolve (all 200)
- [x] Parse uploaded PDFs (Pre Security 14 May 2026; Cyber Security 101 6 Jul 2026; Network Defense Cisco; ROL from Jovita Monis, UnifyCX)
- [ ] Nav logo → green cat artwork (30×30, circular mask); favicon refreshed to match
- [ ] TryHackMe stats → only "Top 4%" rank + "78 days" highest streak + last-updated Nov 2, 2026; purge 116 rooms / 61-day streak from About, log lines
- [ ] Featured projects → reorder: Sentinel SOC Lab (SOC-Portfolio, flagship, In Progress), Python SOC Automation Engine (In Development), Security Incident & Asset Tracker, Bank Secure Network — exact brief copy, verified repo links
- [ ] Skills audit → 4 groups (foundations / tools used in labs / programming foundations / currently learning); remove unsupported claims
- [ ] Certifications → credential cards with View buttons; remove "Foundations of Cybersecurity"; 3 real PDFs; Google Cybersecurity stays In Progress
- [ ] PDF viewer: reusable dynamic route /documents/:slug (iframe embed, back link, Download PDF, fallback link)
- [ ] Credly area (profile link + 2 confirmed badges)
- [ ] Letter of Recommendation section (View Letter → viewer; attribute Jovita Monis, Technical Support Engineer · Tier III, UnifyCX — not employer/manager/professor)
- [ ] Contact → remove message form (fields, validation, honeypot, submit logic, success/error states); keep Secure Channels panel + copy email; rebalance layout
- [ ] Backend audit: remove submitContact + its rate-limit helper (only consumer was the form); KEEP page_views/link_clicks tracking, admin, auth, contact_submissions table (admin still reads it) — no destructive DB changes
- [ ] Footer QR → encode https://www.linkedin.com/in/andrew-vinston-d-souza-41699330a/ ; decode-verify
- [ ] Experience heading → "Independent Cybersecurity Learning & Labs"; keep CODESPRINT volunteering + both testimonials verbatim
- [ ] SEO/content consistency → entry-level framing in meta description; no other SEO changes
- [ ] Verify: build, tsgo, Playwright desktop+mobile, QR decode, PDF viewer + download, all links, reduced motion
- [ ] Report: files changed, audit results, unverified items — no deploy/publish until user reviews
