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
