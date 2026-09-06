# Andyy's Terminal

# SOC Analyst Portfolio — Master Build Prompt for Lovable

Build/update my personal cybersecurity portfolio website for a SOC Analyst
(Blue Team) candidate — Andrew "Andyy" D'Souza — a retro CRT terminal /
hacker aesthetic that stays professional, never gimmicky.

## DESIGN LANGUAGE

- Palette: near-black background (#070907), phosphor green (#33ff66) and
  amber (#ffb000) as accents, red (#ff2b3f) reserved only for the intro
  name reveal.
- Monospace font (JetBrains Mono) for headings/data labels, a clean
  sans-serif for long-form body text.
- Subtle CRT scanline overlay across the site, low opacity, never hurts
  readability.
- Terminal-style bordered panels, "> " prompt-style section intros,
  monospace data tables for skills/certs.
- Scroll-triggered animations under 400ms, respecting
  prefers-reduced-motion.

## INTRO SEQUENCE (plays once per session, fully skippable)

1. Terminal boot lines typing in one at a time: "INITIALIZING SYSTEM",
   "LOADING SECURITY PROFILE", "VERIFYING CREDENTIALS... OK",
   "ACCESS GRANTED" (~2s total).
2. Full-screen Matrix rain — binary/hex/symbol characters only
   (0 1 { } [ ] < > 0x — no foreign script). Columns cascade in
   gradually over ~1.5s rather than filling the screen instantly.
3. Letters decode in with a slight per-letter stagger into "ANDYY DZ"
   (red, glowing), then "FOUND." fades in below.
4. Warning line: "WARNING: UNAUTHORIZED SIGNATURE DETECTED" /
   "SUBJECT IDENTIFIED — LOADING PROFILE..."
5. Auto-transitions to the homepage after ~4-5s total.
6. Persistent "Skip Intro →" button visible from frame one.
7. Store a flag in localStorage once played/skipped — repeat visits
   load straight to homepage.
8. Real page content exists in the DOM immediately (not only inside
   canvas), so it's crawlable and screen-reader accessible.
9. Ease all color/opacity transitions in and out — no hard strobing.

## BRANDING PLACEMENT

- Real headshot photo is the primary identity throughout (hero section)
  — this is what a recruiter matches to the résumé/LinkedIn.
- Skull/glitch mark used only as secondary branding: favicon, a small
  nav-bar icon (~30px next to the name), low-opacity footer watermark.
  Never the same size or prominence as the headshot.

## STRUCTURE & MAINTAINABILITY

- Store all real content (bio, stats, skills, projects, certs,
  experience) in a single data file: src/data/profile.ts. Every future
  content update becomes one targeted prompt against that file without
  touching layout/design code.
- Build a small component that fetches live GitHub stats (public repo
  count, contributions) via GitHub's public REST API on load — no auth
  needed, keeps that section current automatically. TryHackMe stats
  stay manual in profile.ts (no stable public API) — show a brief
  terminal-style "fetching..." skeleton while the GitHub data loads.

## REAL CONTENT

**Hero**

- Name: Andrew Vinston D'Souza ("Andyy")
- Title: Aspiring SOC Analyst | Threat Detection & Incident Response
- Subtitle: Top 4% on TryHackMe · BCA @ St. Aloysius University, Mangaluru
- CTA buttons: Download Resume (PDF — I'll upload
  Andrew_D_Souza_Resume.pdf as a static asset in /public/resume.pdf;
  point the button's href at /resume.pdf), Contact, GitHub, LinkedIn

**System log strip** (near hero, styled like a tailed terminal log)

- 2-3 lines of real recent activity, e.g.:
  "[LOG] Completed: Greenholt v2 — phishing investigation"
  "[LOG] Pushed 3 commits to SOC-Portfolio"
  (pull from GitHub's public events API if feasible, otherwise update
  manually in profile.ts)

**Stats bar** (dashboard-style readout)

- Rank: 95645 (top 4%) · Badges: 23 · Streak: 61 days · Rooms: 116

**About**
"Curious about how systems work since I was a kid — that curiosity
pointed itself at cybersecurity, specifically defense. I care about
understanding why something breaks, not just patching it and moving on.
Most days I'm in TryHackMe's SOC and Blue Team paths — log analysis,
incident response sims, Splunk, Wireshark, Nmap — mapping attack behavior
to MITRE ATT&CK and writing it up on GitHub as I go. Top 4% globally on
TryHackMe, 116 rooms completed, 61-day streak. Looking for an internship
or entry-level SOC Analyst role."

**Skills** (grouped, collapsible/accordion style — "> expand: Tools &
Technologies" — don't dump 51 tags flat)

- Core Security: Threat Detection, Incident Response, Cybersecurity,
  Information Security, Cyber Risk Management, Risk Assessment,
  Vulnerability Assessment, Network Security, Networking Fundamentals,
  Linux Fundamentals, Web Application Security
- Tools: Splunk, Wireshark, Nmap, Snort, Metasploit, CyberChef,
  Kali Linux, Burp Suite, SIEM, Digital Forensics, Log Analysis
- Foundations: Git, GitHub, HTML, CSS, Bootstrap, Java, SQL, Python (basics)

**Notable TryHackMe rooms** (short callout line under the stats bar —
shows hands-on breadth, not just a skills list): Nmap, Wireshark,
TCPDump, Hydra, John the Ripper, Snort (IDS Fundamentals), Firewall
Fundamentals, Hashing Basics, SIEM Introduction, Digital Forensics
Fundamentals, OWASP Top 10, Web Application Basics, Greenholt v2
(phishing investigation)

**Projects** (link each to its GitHub repo; feature the tracker as a
short STAR-style case study — problem/approach/outcome/what's next —
not just a feature list)

1. Security Incident & Asset Tracker —
   github.com/andyydz/security-incident-asset-tracker
   Java + JDBC + MariaDB console app tracking IT assets and logging
   security incidents with severity classification. Relational schema
   linking Assets↔Incidents, DAO pattern, PreparedStatement throughout
   (SQL injection prevention). Built/tested on Kali Linux.
2. SOC-Portfolio — github.com/andyydz/SOC-Portfolio
   Hands-on SOC projects covering Splunk, Wazuh, ELK Stack, Windows
   Event Logs, MITRE ATT&CK, Blue Team investigations.
3. Cybersecurity-Writeups — github.com/andyydz/Cybersecurity-Writeups
   TryHackMe writeups on Linux, Windows, SOC, cybersecurity
   fundamentals. Pull recent writeup titles from the repo folder
   structure into a small "Latest Writeups" list if feasible.
4. Cisco-Network-Defence — github.com/andyydz/Cisco-Network-Defence
   Notes, labs, and Packet Tracer exercises from the Cisco Networking
   Academy Network Defense course.

**Certifications**

- Foundations of Cybersecurity — Google/Coursera (Jun 2026)
- Play It Safe: Manage Security Risks — Google/Coursera (Jul 2026)
- Pre Security Certificate — TryHackMe (May 2026)
- Cyber Security 101 Certificate — TryHackMe (Jul 2026)
- Note underneath: "Currently working on: Google Cybersecurity
  Certificate — Course 2, and TryHackMe's SOC Level 1 path"

**Experience**
SOC & Blue Team Trainee — Self-Directed Practice, TryHackMe
(Feb 2026–Present) — Practicing SOC workflows via SOC Level 1, Pre
Security, and Blue Team paths. Phishing email analysis, network traffic
inspection, threat intel correlation.

**Volunteering**
Technical Volunteer, CODESPRINT National-Level Hackathon, St. Aloysius
(Jan 2026) — Technical coordination, participant support, implemented a
bridge-based network fix.

**Testimonial** (if permission obtained — short real quote from one of
the two LinkedIn recommendations, with name and title)

**Contact / Links**

- GitHub: https://github.com/andyydz
- LinkedIn: https://www.linkedin.com/in/andrew-vinston-d-souza-41699330a/
- TryHackMe: https://tryhackme.com/p/andyydz57
- Email: andyydz57@gmail.com

## COPY CONSISTENCY

Use "Aspiring SOC Analyst" everywhere on the site (hero, meta title,
About) — never "SOC Analyst (L1)" — matching the current LinkedIn
headline exactly.

## SITE STRUCTURE

Hero → System log strip → Stats bar → About → Skills → Projects →
Certifications → Experience → Volunteering → Testimonial → Contact →
Footer

## MOTION & ANIMATION

- Scroll-triggered reveals: each section (About, Skills, Projects, Certs,
  Experience, etc.) fades up and in (translateY 16px → 0, opacity 0 → 1)
  as it enters the viewport, using IntersectionObserver — not a library.
  Trigger once per section, not on every scroll pass.
- Stagger children within a section: e.g. project cards and skill tags
  animate in with a small delay between each (~60-80ms apart) rather
  than all appearing at once — gives a deliberate, terminal-esque
  "loading in" feel rather than a generic fade.
- Card entrance + hover: project cards and stat cards animate in on
  scroll (as above) and get a subtle hover state — border brightens to
  full green, slight upward lift (translateY -2px), fast transition
  (150-200ms). No heavy shadows or bounce easing — keep it crisp,
  matching the terminal aesthetic.
- Keep every animation under 400ms (except count-up/ambient effects noted
  below), use ease-out timing, and respect prefers-reduced-motion
  (disable transform/opacity animation, keep content instantly visible).
- Stat numbers count up from 0 to their real value (~1s, ease-out) the
  first time the stats bar scrolls into view — not a static number.
- A very faint, slow ambient Matrix rain (~5% opacity) persists quietly
  behind the hero after the intro finishes — gives a sense the terminal
  is "still running" without competing with the headshot/text. Pause
  it (or remove) if prefers-reduced-motion is set.
- Hero eyebrow/subtitle line has a blinking terminal cursor at the end,
  reinforcing the identity right where recruiters look first.
- Nav links get a thin green underline that slides in on hover, rather
  than a flat color change.
- Stat cards and project cards get a slow, subtle border-gradient
  shimmer (a light sweep across the border) — restrained, not a glow
  pulse.
- Sequence effects, don't stack them: at any given moment show one
  clear motion, not several overlapping animations at once. Name,
  role, and CTA buttons must be fully legible immediately — never
  gated behind an animation completing.

- Fully responsive (375px mobile through desktop), no horizontal
  scroll, nav collapses to a mobile menu, animations simplify on small
  screens.
- Fast load: lazy-load images, compress/serve WebP for headshot and any
  screenshots, lightweight canvas animation, strong Lighthouse scores.
- Accessible: sufficient contrast on the dark theme, semantic HTML, alt
  text, visible keyboard focus states.
- SEO: page title, meta description, favicon, sitemap.xml, robots.txt,
  JSON-LD Person structured data (name, role, sameAs links to
  GitHub/LinkedIn/TryHackMe).
- OG/social preview image so shared links render properly on
  LinkedIn/WhatsApp.
- A print stylesheet (@media print) that switches to clean black-on-
  white text — no scanlines/dark background when printed or exported
  as PDF.
- A custom 404 page matching the terminal theme.
- Quiet "last updated" timestamp in the footer, auto-generated at
  build time.

## SECURITY

- Enforce HTTPS everywhere; verify no mixed-content warnings.
- Security headers: Content-Security-Policy (restrict script/style
  sources to self + known CDNs), X-Content-Type-Options: nosniff,
  Referrer-Policy: strict-origin-when-cross-origin, Permissions-Policy
  disabling camera/mic/geolocation.
- Contact form: sanitize/validate all input, use a honeypot field
  instead of a CAPTCHA, never echo raw input back unescaped.
- No API keys/secrets in client-side code or committed to the public
  andyy-site repo.
- SRI hashes on any third-party CDN script tags where supported.
- Add /security.txt (RFC 9116) with a contact email for responsible
  disclosure.
- No unnecessary personal details exposed (no phone number, no home
  address) — email and social links are enough.

Use placeholder content only where a section above has none, and ask me
section by section for anything still missing.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/853fbb6c-7294-43ae-9a44-a4d110e8ed01).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
