# Project Overview

> **ANDYY-S-SITE** — a personal cybersecurity / SOC Analyst portfolio.
> This is the first document in the project's `docs/` set. It introduces the project; the technical detail lives in the documents listed in [Section 10](#10-repository-documentation).

---

## 1. Project Identity

| Field | Details |
|---|---|
| **Project name** | ANDYY-S-SITE |
| **Repository** | [`andyydz/andyy-s-site`](https://github.com/andyydz/andyy-s-site) |
| **Project type** | Personal Cybersecurity / SOC Analyst Portfolio |
| **Production website** | [andyy-s-site.vercel.app](https://andyy-s-site.vercel.app) |
| **Author** | Andrew Vinston D'Souza ("Andyy") |
| **License** | MIT |

The project is the author's public professional presence for an entry-level SOC Analyst path. It brings together hands-on Blue Team learning, security projects, and professional details on a single site, backed by a public, version-controlled repository.

---

## 2. Project Description

ANDYY-S-SITE is a personal cybersecurity portfolio website. It showcases:

- hands-on SOC and Blue Team learning
- security projects
- TryHackMe experience and progress
- security writeups
- technical skills
- certifications
- experience and volunteering
- professional contact information and a downloadable resume

The site is a single-page portfolio. The projects and writeups it presents are hosted in their own GitHub repositories (for example, `SOC-Portfolio` and `Cybersecurity-Writeups`); the portfolio summarizes them and links out to the full work.

---

## 3. Purpose

The project exists to:

- present the author's cybersecurity knowledge and practical work
- demonstrate hands-on learning through concrete projects and platform progress rather than claims alone
- organize projects and security work in one place
- give recruiters and cybersecurity professionals a clear, quickly scannable overview
- maintain a professional online presence
- connect the portfolio with GitHub, LinkedIn, TryHackMe, and other professional platforms

---

## 4. Project Objectives

- Build a professional cybersecurity-focused portfolio.
- Showcase practical SOC and Blue Team learning.
- Present cybersecurity projects and technical work.
- Document TryHackMe progress and security writeups.
- Present technical skills, certifications, experience, and volunteering.
- Provide access to the author's resume and professional profiles.
- Give visitors a way to get in touch.
- Keep portfolio content maintainable by holding it in a single data source rather than scattered through layout code.
- Maintain the website through version control and continuous improvements.
- Deploy the website as a publicly accessible production application.

---

## 5. Target Audience

| Audience | What they typically look for |
|---|---|
| Cybersecurity recruiters | A fast summary of skills, certifications, and direction |
| Hiring managers | Evidence of practical, hands-on work |
| Internship recruiters | Learning trajectory, projects, and availability |
| Cybersecurity professionals | Technical depth and the quality of project documentation |
| Potential collaborators | Areas of interest and ways to reach the author |
| Anyone evaluating the author's technical portfolio | A consolidated view of work, links, and resume |

---

## 6. Project Scope

### 6.1 What the project covers

The portfolio is a single page made up of the following sections, each verified against the implementation.

| Area | Description |
|---|---|
| **Hero** | Name, role, short positioning line, and primary actions (resume, contact, GitHub, LinkedIn) |
| **Activity and TryHackMe statistics** | A log-style activity strip and a statistics bar for TryHackMe figures, alongside selected GitHub data |
| **About** | Short professional profile |
| **Technical Skills** | Grouped skills: core security, tools and technologies, and foundations |
| **Projects** | Featured case studies plus additional repositories |
| **Certifications** | Completed certificates and current in-progress work |
| **Experience** | Self-directed SOC and Blue Team practice |
| **Volunteering** | Technical volunteering at a hackathon |
| **Recommendation** | A written recommendation from a professor |
| **Contact** | Email, professional profile links, and a contact form |
| **Resume** | Downloadable PDF, linked from the navigation and hero |

All portfolio content is held in a central data file (`src/data/profile.ts`).

### 6.2 Supporting capabilities

Beyond static content, the repository also contains a small backend layer that supports the site itself:

- **Contact form:** submissions are validated and stored server-side, with a honeypot field and per-visitor rate limiting.
- **Basic analytics:** page-view and link-click logging, rate limited and without storing IP addresses.
- **Private admin route:** a `/admin` page for the site owner, excluded from indexing, that requires authentication.

These exist to operate the portfolio. They are described in detail in the architecture and security documents rather than here.

### 6.3 What the project is not

ANDYY-S-SITE is a **personal portfolio**. It is not:

- a cybersecurity platform or product
- a SIEM, log-analysis tool, or security monitoring system
- a demonstration of live detection or incident-response capability

Security tooling and investigations are showcased through the linked project and writeup repositories, not implemented inside this site.

---

## 7. Design Philosophy

The site uses a **retro CRT / terminal-inspired cybersecurity aesthetic**, chosen to convey technical identity while staying easy to read for a non-technical recruiter.

**Visual language**

- **Dark, terminal-inspired presentation:** a near-black background with phosphor-green primary and amber accent colors.
- **Monospace, terminal-style typography:** headings and interface labels use a monospace face; body text uses a sans-serif face for readability.
- **Cybersecurity-themed interface:** section headings are written as shell commands (for example `cat about.md`, `ls projects/`), content sits in bordered terminal-style panels, and CRT touches include scanlines and a subtle matrix-rain effect in the hero.
- **Boot-style intro:** a short intro sequence that plays on a visitor's first visit.

**Usability**

- **Professional content presentation:** projects are laid out as problem / approach / outcome / next-step case studies so they can be scanned quickly.
- **Responsive layout:** the layout adapts across screen sizes, with a mobile navigation menu.
- **Accessibility and comfort considerations:** semantic HTML, reduced-motion handling, and a print stylesheet that switches to a plain, light layout.
- **Balance:** the terminal styling supports the author's identity; it should never come at the cost of clarity, legibility, or fast access to the resume and contact details.

---

## 8. Development Context

- The project was **initially developed using [Lovable](https://lovable.dev)**. The repository history begins with a Lovable project template, and the repository still contains a `.lovable/` directory and Lovable-authored commits.
- It is now **maintained as a source-controlled project through Git and GitHub**, with the `main` branch as the deployed line.
- The site is **deployed on Vercel** and does not run on Lovable's hosting.
- Lovable is **not a runtime dependency**. The only project-level coupling is build-time: the Vite configuration uses the `@lovable.dev/vite-tanstack-config` developer package, and a few error-reporting hooks are written to do nothing outside the Lovable editor.
- The repository's `AGENTS.md` asks contributors not to rewrite published Git history, because the repository remains connected to Lovable.

The technology stack is covered in `docs/06-technology-stack.md`.

---

## 9. Current Project State

| Area | State |
|---|---|
| Core portfolio website | Implemented |
| Production deployment | Live on Vercel |
| Documentation | In progress — `docs/` is being organized; this overview is the first document written |
| SEO | Baseline implemented (page metadata, canonical URL, Open Graph and Twitter Card tags, structured data, `robots.txt`, sitemap); refinements may continue |
| Content and design | Ongoing refinement — the repository's `roadmap.md` tracks navigation, hero, content sections, and validation of responsive layouts, links, forms, and SEO as open items |

Portfolio content, in particular TryHackMe statistics and certification progress, is updated manually and will change over time.

---

## 10. Repository Documentation

Detailed technical documentation is maintained under [`docs/`](./). Files are numbered in reading order. The set is intended to cover:

1. Project overview *(this document)*
2. Requirements
3. System architecture
4. Project structure
5. Terminology
6. Technology stack
7. Features
8. UI design
9. SEO
10. GitHub workflow
11. Deployment
12. Testing
13. Security
14. Maintenance
15. Future improvements

Documents other than this overview are still being written.

---

## 11. Project Links

| Resource | Link |
|---|---|
| Production Website | https://andyy-s-site.vercel.app |
| GitHub Repository | https://github.com/andyydz/andyy-s-site |
| GitHub Profile | https://github.com/andyydz |
| TryHackMe | https://tryhackme.com/p/andyydz57 |
| LinkedIn | https://www.linkedin.com/in/andrew-vinston-d-souza-41699330a/ |

## Documentation Scope

This document provides the high-level context for ANDYY-S-SITE. Detailed
technical information is maintained in the other numbered documents under
`docs/`, covering the project's architecture, structure, configuration,
security considerations, deployment, and related implementation details.
