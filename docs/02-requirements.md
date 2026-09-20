# Requirements

> Functional and non-functional requirements for **ANDYY-S-SITE**, the personal cybersecurity / SOC Analyst portfolio.

---

## 1. Introduction

This document defines the requirements of the ANDYY-S-SITE website **as currently implemented**. It is not a specification for a future version. Each requirement was derived from the repository and checked against the deployed behavior of the site.

It covers:

- the **functional requirements**: what the website must do
- the **non-functional requirements**: the quality attributes it must meet (performance, accessibility, security, and so on)
- the **content requirements**: what portfolio content must be and how it is kept accurate

**Conventions**

- Requirements use "shall" and carry an ID (for example `FR-NAV-2`) so later documents can refer to them.
- Where the repository defines no formal target (such as a performance budget or an accessibility conformance level), this document says so rather than inventing one.
- Implementation detail is deliberately light here. It is covered in the architecture, features, SEO, and security documents in this `docs/` directory.

---

## 2. Project Objectives

The requirements below exist to support these objectives:

- Present a professional cybersecurity portfolio.
- Showcase cybersecurity projects and practical work.
- Present technical skills and tools.
- Display TryHackMe achievements and progress.
- Present certifications, experience, and volunteering.
- Provide access to the resume and professional profiles.
- Provide a responsive and accessible web experience.
- Maintain the project through Git and GitHub.
- Deploy the website publicly.

See [`01-project-overview.md`](./01-project-overview.md) for the wider project context.

---

## 3. Functional Requirements

### 3.1 Portfolio Content

The site is a single page. All portfolio content is supplied from one data file (`src/data/profile.ts`).

| ID | Requirement |
|---|---|
| FR-PC-1 | The site shall present a hero section with the author's name, alias, professional title, a short supporting line, a profile photo, and primary actions (resume, contact, GitHub, LinkedIn). |
| FR-PC-2 | The site shall present an **About** section containing a short professional profile. |
| FR-PC-3 | The site shall present **technical skills** in three groups: Core Security, Tools & Technologies, and Foundations. Security tools and technologies (for example SIEM and network-analysis tools) are listed in the Tools & Technologies group. |
| FR-PC-4 | Each skill group shall show its item count and be expandable and collapsible independently. A control shall expand or collapse all groups at once. |
| FR-PC-5 | The site shall present **TryHackMe** information: four headline figures (rank, badges, streak, rooms), a list of notable rooms, and a link to the TryHackMe profile. |
| FR-PC-6 | The site shall present an activity log strip. It shall show a short set of recent activity lines by default and allow the visitor to expand the rest. |
| FR-PC-7 | The site shall present **certifications** as a table (certification, issuer, date) and state which certifications are currently in progress. |
| FR-PC-8 | The site shall present **experience** and **volunteering** entries, each with a role, organization, period, and summary points. |
| FR-PC-9 | The site shall present a written **recommendation** with its author and role. |
| FR-PC-10 | The order of sections shall be: hero, activity log, statistics, About, Skills, Projects, Certifications, Experience, Volunteering, Recommendation, Contact, footer. |

### 3.2 Navigation

| ID | Requirement |
|---|---|
| FR-NAV-1 | The site shall provide a fixed header with a brand link to the top of the page and anchor links to the About, Skills, Projects, Certifications, Experience, and Contact sections. Volunteering and Recommendation are reached by scrolling and are not in the header. |
| FR-NAV-2 | The header shall indicate the section currently in view, and expose it to assistive technology with `aria-current="location"`. |
| FR-NAV-3 | On narrow screens the header navigation shall collapse into a menu that can be opened and closed with a labelled toggle button, and that closes when a link is chosen. |
| FR-NAV-4 | The header shall provide direct access to the resume on both desktop and mobile layouts. |
| FR-NAV-5 | Section anchors shall scroll clear of the fixed header. |
| FR-NAV-6 | Links to external sites (GitHub, LinkedIn, TryHackMe, Reddit, project repositories) shall open in a new tab with `noopener` protection. |
| FR-NAV-7 | The first-visit intro sequence shall be skippable by keyboard (Escape) or pointer, shall play only once per browser, and shall not play for visitors who prefer reduced motion. |
| FR-NAV-8 | The navigation landmark shall be labelled, and interactive controls shall show a visible keyboard focus indicator. |

### 3.3 Project Presentation

The site presents two kinds of project entry, both sourced from the central data file.

| ID | Requirement |
|---|---|
| FR-PRJ-1 | **Featured projects** shall be shown as case studies with a title linking to the project repository, and four labelled parts: *problem*, *approach*, *outcome*, and *what's next*. |
| FR-PRJ-2 | Technologies and the relevant security context of a featured project (for example parameterized queries, or mapping findings to MITRE ATT&CK) shall be conveyed within the approach and outcome text. Featured projects do not have a separate technologies field. |
| FR-PRJ-3 | **Additional projects** shall be shown as cards with a title linking to the repository, a short description, and a set of topic tags. |
| FR-PRJ-4 | Every project shall link to its own GitHub repository. The portfolio summarizes the work; the repositories hold the full detail and writeups. |
| FR-PRJ-5 | Each project shall be marked up as an independent article with a heading, so it can be navigated and read by assistive technology. |

### 3.4 External Integrations

Each integration below was confirmed in application code, not just in dependencies.

| ID | Integration | Requirement |
|---|---|---|
| FR-INT-1 | **GitHub public REST API** | The site shall fetch the author's public repository count and recent public events from GitHub, without authentication, from the visitor's browser, and turn recent push and repository-creation events into activity log lines. |
| FR-INT-2 | **GitHub contributions service** | The site shall fetch the last-year contribution total from a third-party contributions API (`github-contributions-api.jogruber.de`). If unavailable, the figure shall display as unavailable. |
| FR-INT-3 | **GitHub fallback behavior** | If live GitHub data cannot be retrieved, the site shall remain fully usable, show the static activity lines from the data file, and display a "live stats unavailable" message. |
| FR-INT-4 | **TryHackMe** | TryHackMe figures shall be maintained manually in the central data file, because no public API is used. The site shall link to the TryHackMe profile rather than fetch from it. |
| FR-INT-5 | **Supabase** | The application uses Supabase, and the deployment environment shall provide its configuration: a project URL, a publishable key, and a server-only service-role key. Supabase stores contact submissions, page views, and link clicks, and provides authentication and role checks for the admin area. |
| FR-INT-6 | **Google Fonts** | The site shall load its typefaces (JetBrains Mono and Inter) from Google Fonts, with system font fallbacks. |
| FR-INT-7 | **Profile links** | The site shall link to the author's GitHub, LinkedIn, TryHackMe, and Reddit profiles. |
| FR-INT-8 | **Scope of integrations** | The site does not integrate with an email-delivery service or any other third-party API beyond those listed here. |

### 3.5 Resume

| ID | Requirement |
|---|---|
| FR-RES-1 | The site shall serve the author's resume as a PDF at `/resume.pdf`. |
| FR-RES-2 | The resume shall be reachable from the header (desktop and mobile) and from the hero "Download Resume" action. |

### 3.6 Contact and Professional Links

| ID | Requirement |
|---|---|
| FR-CON-1 | The Contact section shall list the author's email (as a `mailto:` link), GitHub, LinkedIn, TryHackMe, and Reddit. |
| FR-CON-2 | The email address shall have a copy-to-clipboard control. If the clipboard is unavailable, the page shall continue to work. |
| FR-CON-3 | The footer shall repeat the professional profile links and show a QR code that links to the site. If the QR code cannot be generated, the page shall continue to work. |
| FR-CON-4 | The Contact section shall provide a **contact form** with name, email, and message fields. |
| FR-CON-5 | The form shall validate input in the browser before sending, and the server shall repeat the validation. Name shall be 2–80 characters, email shall be a valid address up to 254 characters, and message shall be 10–1000 characters. |
| FR-CON-6 | Validation and delivery errors shall be shown to the visitor next to the form. |
| FR-CON-7 | Submissions shall be stored on the server. The site does not send email notifications; the site owner reads submissions in the admin dashboard (see 3.8). |
| FR-CON-8 | The form shall include a hidden honeypot field. A submission that fills it shall be accepted silently and discarded. |
| FR-CON-9 | The server shall limit each sender to three submissions per hour. |
| FR-CON-10 | The contact form shall not appear in printed output. |

### 3.7 Error Handling

| ID | Requirement |
|---|---|
| FR-ERR-1 | Unknown URLs shall show a custom, terminal-styled **404 page** with a link back to the home page. |
| FR-ERR-2 | An unexpected rendering error shall show a "This page didn't load" screen with **Try again** and **Go home** actions. |
| FR-ERR-3 | An unhandled server error shall return a self-contained HTML error page with a 500 status, rather than a raw error response. |
| FR-ERR-4 | Failure of a non-essential feature shall not break the page. This covers GitHub data, analytics logging, QR code generation, clipboard access, and browser storage. |

### 3.8 Analytics and Administration

The repository also implements a small operational layer that supports the site itself.

| ID | Requirement |
|---|---|
| FR-ADM-1 | The site shall log page views (path and referring host) and selected link clicks without blocking or breaking the page. |
| FR-ADM-2 | Page-view logging shall be rate limited per visitor, and shall not store IP addresses. |
| FR-ADM-3 | The site shall provide an `/admin` page for the site owner. It shall show page-view totals and trends, referrers, link-click totals, and recent contact submissions. |
| FR-ADM-4 | Access to admin data shall require authentication and an administrator role, checked on the server and enforced again by database row-level security. |
| FR-ADM-5 | The `/admin` page shall be excluded from search indexing. |

---

## 4. Non-Functional Requirements

### 4.1 Performance

The repository defines no numeric performance budget or Lighthouse target. The requirements below describe the behavior that is implemented.

| ID | Requirement |
|---|---|
| NFR-PERF-1 | The public page shall be server-rendered, so its content is present before client scripts run. |
| NFR-PERF-2 | Optional or slow data (GitHub activity, contribution counts, QR code) shall load after the main content and shall never block it. |
| NFR-PERF-3 | The above-the-fold profile image shall be loaded eagerly with explicit dimensions. Below-the-fold decorative images shall load lazily. |
| NFR-PERF-4 | The QR code library shall be loaded on demand rather than in the initial bundle. |
| NFR-PERF-5 | Fonts shall be preconnected and shall use `display=swap` so text remains visible while fonts load. |
| NFR-PERF-6 | Interface animations shall stay within a 400 ms budget. Ambient effects (blinking caret, pulses, shimmer) are exempt. A dev-only motion audit (`Ctrl+Shift+D` or `?debug=motion`) checks this budget. |
| NFR-PERF-7 | Analytics calls shall be fire-and-forget so they do not affect interaction. |

### 4.2 Responsiveness

| ID | Requirement |
|---|---|
| NFR-RESP-1 | The layout shall adapt across desktop, tablet, and mobile widths. The design plan in `.lovable/plan/` names 375 px phones, tablet portrait and landscape, laptop, and desktop as the review widths. |
| NFR-RESP-2 | Multi-column layouts (hero, statistics, project cards, contact) shall collapse to fewer columns on narrower screens. |
| NFR-RESP-3 | Wide content, such as the certifications table, shall scroll within its own container rather than forcing the whole page to scroll sideways. |
| NFR-RESP-4 | Interactive controls in the navigation and hero shall have touch targets of at least 44 px. |

### 4.3 Accessibility

The repository does not declare a WCAG conformance level and records no formal accessibility audit. The requirements below reflect what is implemented.

| ID | Requirement |
|---|---|
| NFR-A11Y-1 | The page shall use semantic structure: `header`, labelled `nav`, `main`, `section`, `article`, `footer`, a `table` with column headers, and `blockquote` for the recommendation. |
| NFR-A11Y-2 | Headings shall follow a consistent hierarchy: one H1 for the author's name, H2 for sections, H3 for projects and roles. |
| NFR-A11Y-3 | Meaningful images shall have descriptive alternative text (profile photo, QR code). Decorative images, icons, and effects (scanlines, matrix rain) shall be hidden from assistive technology. |
| NFR-A11Y-4 | Form fields shall have associated labels. Errors, submission status, and the email-copy status shall be announced through `aria-live` regions. |
| NFR-A11Y-5 | Expandable controls shall expose their state with `aria-expanded`, and icon-only controls shall have accessible labels. |
| NFR-A11Y-6 | All interactive elements shall be operable by keyboard and shall show a visible focus outline. |
| NFR-A11Y-7 | When the visitor prefers reduced motion, animation and transitions shall be effectively disabled, scroll shall not animate, and the matrix-rain canvas and intro sequence shall not run. |
| NFR-A11Y-8 | Printing the page shall produce a plain, light, readable layout without decorative or interactive elements. |

### 4.4 Security

Detail is covered in `docs/13-security.md`.

| ID | Requirement |
|---|---|
| NFR-SEC-1 | The production site shall be served over HTTPS. |
| NFR-SEC-2 | The site shall send a `strict-origin-when-cross-origin` referrer policy. |
| NFR-SEC-3 | The contact form shall be protected against basic spam by a honeypot field and per-sender rate limiting, and shall be validated on the server as well as in the browser. |
| NFR-SEC-4 | Server functions shall be protected against cross-site request forgery. |
| NFR-SEC-5 | Secrets, including the Supabase service-role key, shall exist only in server-side environment configuration and shall not be committed to the repository. |
| NFR-SEC-6 | All database tables shall have row-level security enabled. Public visitors shall have no read access. Writes shall happen through server functions only. |
| NFR-SEC-7 | Visitor identifiers used for rate limiting shall be one-way hashes with a daily-rotating salt. IP addresses shall not be stored. |
| NFR-SEC-8 | The public site shall expose only the personal information the author has chosen to publish: name, email, professional profile links, and resume. |
| NFR-SEC-9 | The site shall publish a `security.txt` contact file, and `robots.txt` shall disallow `/admin`. |
| NFR-SEC-10 | Browser storage on the public site shall be limited to a single flag recording that the intro has played. Visitors have no accounts, and a stored sign-in session exists only for a signed-in administrator. |

### 4.5 Maintainability

| ID | Requirement |
|---|---|
| NFR-MNT-1 | Portfolio content (profile, statistics, skills, projects, certifications, experience, volunteering, recommendation, links) shall be held in one data file so it can be updated without changing layout code. |
| NFR-MNT-2 | The UI shall be organized into sectioned components, shared UI primitives, hooks, and server functions, under a conventional `src/` structure. |
| NFR-MNT-3 | The project shall be under Git version control and hosted on GitHub. Code style shall be enforced with ESLint and Prettier. |
| NFR-MNT-4 | Database structure shall be captured as versioned migrations in `supabase/`. |
| NFR-MNT-5 | Published Git history shall not be rewritten, because the repository remains connected to Lovable (see `AGENTS.md`). |
| NFR-MNT-6 | Documentation shall be kept in `docs/` alongside the code. |

### 4.6 Compatibility

The repository defines no browser-support matrix or `browserslist`.

| ID | Requirement |
|---|---|
| NFR-CMP-1 | The site shall support current versions of modern evergreen desktop and mobile browsers. The styling toolchain (Tailwind CSS v4) is designed for modern browsers, and the design uses modern CSS such as `oklch()` colors. |
| NFR-CMP-2 | The site shall degrade gracefully where an optional browser capability is unavailable (clipboard, local storage, reduced-motion preference), as required by FR-ERR-4. |
| NFR-CMP-3 | Layouts shall work across the phone, tablet, laptop, and desktop sizes listed in NFR-RESP-1. |

### 4.7 Search Engine Optimization

High-level requirements only. The implementation is documented in `docs/09-seo.md`.

| ID | Requirement |
|---|---|
| NFR-SEO-1 | The public page shall be indexable by search engines and have a descriptive title and meta description. |
| NFR-SEO-2 | The page shall declare a canonical URL for the production domain. |
| NFR-SEO-3 | The page shall provide social-sharing metadata and a preview image. |
| NFR-SEO-4 | The page shall provide structured data describing the author. |
| NFR-SEO-5 | The site shall publish a `robots.txt` and a sitemap, and shall keep non-public pages out of the index. |
| NFR-SEO-6 | The site shall support search-engine ownership verification. |

---

## 5. Content Requirements

Because this is a professional portfolio, the accuracy of its content is a requirement in its own right.

| ID | Requirement |
|---|---|
| CR-1 | The website shall present accurate and maintainable information about cybersecurity skills, tools, projects, certifications, TryHackMe progress, experience, volunteering, and professional links. |
| CR-2 | Content shall describe the author's actual work and standing. Self-directed learning shall be labelled as such (for example, the SOC & Blue Team Trainee entry is identified as self-directed practice, not formal employment). |
| CR-3 | Skills and tools listed shall be ones the author has used through TryHackMe practice, personal projects, coursework, or self-directed labs. |
| CR-4 | TryHackMe figures are maintained manually, so they shall be reviewed and updated regularly and shall not be presented as live data. |
| CR-5 | Certifications shall be listed with their issuer and completion date, and certifications still in progress shall be labelled as in progress rather than completed. |
| CR-6 | Activity log entries in the data file shall describe recent, real events only. |
| CR-7 | All project, repository, and profile links shall resolve, and the published resume shall match the information on the site. |
| CR-8 | Content that appears in more than one place (this site, the repository README, the resume) shall be kept consistent. |
| CR-9 | Portfolio content shall remain accurate and updated as the author's learning, certifications, and projects progress. |
