# SOC Analyst Portfolio || Andrew "Andyy" D'Souz

### Aspiring SOC Analyst | Threat Detection & Incident Response

This is the source code repository for my personal cybersecurity portfolio website. The site showcases my hands-on SOC and Blue Team learning, security projects, and TryHackMe writeups — each of which lives in its own linked repository below — as I build toward an entry-level SOC Analyst role.

[View Live Portfolio](https://andyy-s-site.vercel.app)

[![GitHub](https://img.shields.io/badge/GitHub-andyydz-181717?style=flat&logo=github&logoColor=white)](https://github.com/andyydz)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/andrew-vinston-d-souza-41699330a/)
[![TryHackMe](https://img.shields.io/badge/TryHackMe-Profile-212C42?style=flat&logo=tryhackme&logoColor=white)](https://tryhackme.com/p/andyydz57)

---

## About

Curious about how systems work since I was a kid — that curiosity pointed itself at cybersecurity, specifically defense. I care about understanding why something breaks, not just patching it and moving on. Most days I'm in TryHackMe's SOC and Blue Team paths — log analysis, incident response sims, Splunk, Wireshark, Nmap — mapping attack behavior to MITRE ATT&CK and writing it up on GitHub as I go.

Top 4% globally on TryHackMe, 116 rooms completed, 61-day streak. Currently looking for an internship or entry-level SOC Analyst opportunity.

---

## Technical Skills

Technologies below were used through TryHackMe practice, personal projects, coursework, and self-directed labs.

**Core Security**

| | |
|---|---|
| Threat Detection | Incident Response |
| Cybersecurity | Information Security |
| Cyber Risk Management | Risk Assessment |
| Vulnerability Assessment | Network Security |
| Networking Fundamentals | Linux Fundamentals |
| Web Application Security | |

**Security Tools and Technologies**

![Splunk](https://img.shields.io/badge/-Splunk-000000?style=flat&logo=splunk&logoColor=white)
![Wireshark](https://img.shields.io/badge/-Wireshark-1679A7?style=flat&logo=wireshark&logoColor=white)
![Nmap](https://img.shields.io/badge/-Nmap-black?style=flat)
![Kali Linux](https://img.shields.io/badge/-Kali%20Linux-557C94?style=flat&logo=kalilinux&logoColor=white)

Splunk, Wireshark, Nmap, Snort, Metasploit, CyberChef, Kali Linux, Burp Suite, SIEM fundamentals, digital forensics, log analysis, Wazuh, ELK Stack.

**Programming and Development Foundations**

![Java](https://img.shields.io/badge/-Java-007396?style=flat&logo=openjdk&logoColor=white)
![Python](https://img.shields.io/badge/-Python-3776AB?style=flat&logo=python&logoColor=white)
![Git](https://img.shields.io/badge/-Git-F05032?style=flat&logo=git&logoColor=white)

Git, GitHub, HTML, CSS, Bootstrap, Java, SQL, Python (basics).

---

## TryHackMe

Used for hands-on SOC, Blue Team, networking, and defensive-security practice.

| Metric | Value |
|---|---|
| Global Rank | 95,645 |
| Global Percentile | Top 4% |
| Badges Earned | 23 |
| Rooms Completed | 116 |
| Current Streak | 61 days |

<details>
<summary>Notable rooms and topics</summary>

- Nmap, Wireshark, TCPDump
- Hydra, John the Ripper
- Snort — IDS Fundamentals
- Firewall Fundamentals
- Hashing Basics
- SIEM Introduction
- Digital Forensics Fundamentals
- OWASP Top 10, Web Application Basics
- Greenholt v2 — phishing investigation

</details>

Full writeups: [Cybersecurity-Writeups](https://github.com/andyydz/Cybersecurity-Writeups)

Profile: [tryhackme.com/p/andyydz57](https://tryhackme.com/p/andyydz57)

---

## Projects

### Security Incident & Asset Tracker

**[github.com/andyydz/security-incident-asset-tracker](https://github.com/andyydz/security-incident-asset-tracker)**

A Java + JDBC + MariaDB console application for tracking IT assets and logging security incidents with severity classification.

**Problem**
Small teams often track assets and security incidents in disconnected spreadsheets, making it hard to correlate which asset was affected by which incident or to see severity trends over time.

**Approach**
A relational schema links Assets and Incidents tables, implemented with the DAO pattern over JDBC. The console interface supports asset management, incident logging, and severity classification. Built and tested on Kali Linux.

**Security Considerations**
All database queries use `PreparedStatement` with parameterized queries to prevent SQL injection. The DAO pattern keeps persistence logic separate from application logic.

**Outcome**
A working console application that ties incidents to specific assets and enforces parameterized queries throughout the data access layer.

**What I Learned / What's Next**
Reinforced how the DAO pattern separates business logic from persistence, and why parameterized queries matter beyond "best practice" advice. Next steps include adding reporting views and expanding severity-based alerting logic.

### SOC-Portfolio

**[github.com/andyydz/SOC-Portfolio](https://github.com/andyydz/SOC-Portfolio)**

Hands-on SOC investigation work covering Splunk, Wazuh, and the ELK Stack, working with Windows Event Logs and mapping findings to MITRE ATT&CK. Focused on Blue Team investigation workflows.

### Cybersecurity-Writeups

**[github.com/andyydz/Cybersecurity-Writeups](https://github.com/andyydz/Cybersecurity-Writeups)**

A documentation and knowledge-sharing repository containing TryHackMe writeups across Linux, Windows, SOC, and cybersecurity fundamentals rooms.

### Cisco-Network-Defence

**[github.com/andyydz/Cisco-Network-Defence](https://github.com/andyydz/Cisco-Network-Defence)**

Notes, labs, and Cisco Packet Tracer exercises from the Cisco Networking Academy Network Defense course.

---

## Certifications

| Certification | Issuer | Completed |
|---|---|---|
| Foundations of Cybersecurity | Google / Coursera | June 2026 |
| Play It Safe: Manage Security Risks | Google / Coursera | July 2026 |
| Pre Security Certificate | TryHackMe | May 2026 |
| Cyber Security 101 Certificate | TryHackMe | July 2026 |

**Currently in progress:** Google Cybersecurity Certificate (Course 2), TryHackMe SOC Level 1 path

---

## Experience

**SOC & Blue Team Trainee — Self-Directed Practice, TryHackMe**
*February 2026 – Present*

Self-directed practice, not formal employment:

- SOC Level 1, Pre Security, and Blue Team learning paths
- Phishing email analysis
- Network traffic inspection
- Threat intelligence correlation
- Security investigation exercises and log analysis
- Defensive security concepts

---

## Volunteering

**Technical Volunteer — CODESPRINT National-Level Hackathon**
St. Aloysius | January 2026

- Technical coordination and participant support
- Implemented a bridge-based network fix during the event

---

## Portfolio Website

The site follows a retro CRT terminal aesthetic — near-black background, phosphor green and amber accents, monospace typography, subtle CRT-inspired elements, and terminal-style panels — presented alongside a professional headshot and a responsive layout.

**Features:** hero section, About, Technical Skills, Projects, Certifications, Experience, Volunteering, TryHackMe statistics, GitHub integration, contact links, a custom 404 page, print stylesheet, resume access, accessibility support, and SEO implementation.

**Live Data:** Selected GitHub statistics for `andyydz` are fetched client-side from GitHub's public REST API without authentication. TryHackMe statistics are maintained manually in the portfolio's central data source, since no stable public API is available for that data.

**Technical Implementation:** built with Node.js and npm tooling, version-controlled through Git and GitHub. The portfolio was initially developed with Lovable and is maintained as a source-controlled project.

**SEO:** descriptive page title and meta description, a canonical URL, a `robots` meta tag, Open Graph and Twitter Card metadata (including a social preview image), and Google Search Console site verification. Production URL: [andyy-s-site.vercel.app](https://andyy-s-site.vercel.app)

**Security:** served over HTTPS, a `referrer` policy of `strict-origin-when-cross-origin`, and a honeypot field on the contact form for basic anti-spam protection. No unnecessary personal information is exposed on the site.

**Accessibility:** semantic HTML and a responsive layout across devices.

**Performance:** responsive layout across breakpoints, with animated stat counters on the homepage.

---

## Project Structure

Representative structure — component-level filenames may evolve. Portfolio content (bio, statistics, skills, projects, certifications, experience) is centralized in `src/data/profile.ts`, so future content updates can be made there without touching layout or design components.

```
src/
├── data/
│   └── profile.ts
├── components/
├── pages/
└── ...

public/
├── resume.pdf
├── favicon
└── og-image.jpg
```

---

## Local Development

Requires Node.js and npm.

```bash
git clone <repository-url>
cd <repository-name>
npm install
npm run dev
```

To build for production:

```bash
npm run build
```

---

## Deployment

The site is deployed on Vercel and live at [andyy-s-site.vercel.app](https://andyy-s-site.vercel.app).

---

## Resume

[View Resume](/resume.pdf)

---

## Future Improvements

- Expand SOC investigation case studies
- Add more incident-response documentation
- Expand threat detection projects
- Continue cybersecurity writeups
- Continue improving accessibility and performance
- Keep portfolio and GitHub data current

---

## Contact

- **Portfolio:** [andyy-s-site.vercel.app](https://andyy-s-site.vercel.app)
- **GitHub:** [github.com/andyydz](https://github.com/andyydz)
- **LinkedIn:** [linkedin.com/in/andrew-vinston-d-souza-41699330a](https://www.linkedin.com/in/andrew-vinston-d-souza-41699330a/)
- **TryHackMe:** [tryhackme.com/p/andyydz57](https://tryhackme.com/p/andyydz57)
- **Email:** andyydz57@gmail.com

---

## Disclaimer

Projects, labs, and writeups are intended for educational, defensive-security, and authorized testing purposes only.

---

## License

MIT Licensing .
