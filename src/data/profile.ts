// Single source of truth for all portfolio content.
// Update copy here — layout/design code reads from this file.

export const profile = {
  name: "Andrew Vinston D'Souza",
  alias: "Andyy",
  handle: "andyydz",
  title: "SOC Analyst (L1) | Cybersecurity & Blue Team",
  subtitle:
    "Entry-level candidate with foundational lab practice in security monitoring, alert analysis, Linux and networking, Wazuh detection validation, Python alert parsing, and evidence documentation.",
  email: "andyydz57@gmail.com",
  links: {
    github: "https://github.com/andyydz",
    linkedin: "https://www.linkedin.com/in/andrew-vinston-d-souza-41699330a/",
    tryhackme: "https://tryhackme.com/p/andyydz57",
    reddit: "https://www.reddit.com/user/RavenGhost6767/",
    resume: "/documents/resume",
  },
  about: `I'm a final-year BCA student pursuing entry-level SOC Analyst (L1) opportunities. My experience is self-directed and lab-based: I practice security monitoring and alert analysis with Wazuh, validate File Integrity Monitoring and detection rules in controlled tests, and document investigation evidence. I also built a Python tool for processing exported Wazuh alert data. My foundations include Linux and networking, with continued SIEM and blue-team learning through TryHackMe. I have not worked in a production SOC.`,

  // Manual — TryHackMe has no stable public API. Last checked November 2, 2026.
  stats: [
    { label: "GLOBAL RANK", display: "Top 4%" },
    { label: "HIGHEST STREAK", value: 78, suffix: " days" },
  ] as Array<{ label: string; display?: string; value?: number; suffix?: string; note?: string }>,
  statsUpdated: "November 2, 2026",

  // Fallback log lines; live GitHub events are prepended when available.
  // Keep this short — recent, real events only. Skills live in the Skills section.
  logLines: [
    "[LOG] Completed: Greenholt v2 — phishing investigation",
    "[LOG] Pushed 3 commits to SOC-Portfolio",
    "[LOG] Earned: Cyber Security 101 Certificate (TryHackMe)",
    "[LOG] TryHackMe SOC Level 1 path — in progress",
    "[LOG] 78-day highest streak on TryHackMe",
  ],


  notableRooms: [
    "Nmap",
    "Wireshark",
    "TCPDump",
    "Hydra",
    "John the Ripper",
    "Snort (IDS Fundamentals)",
    "Firewall Fundamentals",
    "Hashing Basics",
    "SIEM Introduction",
    "Digital Forensics Fundamentals",
    "OWASP Top 10",
    "Web Application Basics",
    "Greenholt v2 (phishing investigation)",
  ],

  skillGroups: [
    {
      name: "Security & Networking Foundations",
      items: [
        "Threat Detection",
        "Incident Response",
        "Network Security",
        "Networking Fundamentals",
        "Web Application Security",
        "Risk Assessment",
        "Governance & Regulation",
        "Phishing Analysis",
        "MITRE ATT&CK",
        "OWASP Top 10",
        "Digital Forensics Fundamentals",
        "SIEM Concepts",
      ],
    },
    {
      name: "Tools — Labs & Exercises",
      items: [
        "Wireshark",
        "Nmap",
        "TCPDump",
        "Splunk",
        "Elastic Stack",
        "Snort",
        "Wazuh",
        "CyberChef",
        "Kali Linux",
        "Burp Suite",
        "Log Analysis",
      ],
    },
    {
      name: "Programming & Technical Foundations",
      items: ["Linux", "Java", "SQL", "Python (basics)", "Git", "GitHub", "HTML", "CSS", "Bootstrap", "Virtualization"],
    },
    {
      name: "Currently Learning",
      items: [
        "TryHackMe SOC Level 1 path",
        "Google Cybersecurity Certificate — Course 2",
        "Wazuh detection engineering",
        "Python security automation",
      ],
    },
  ],

  featuredProjects: [
    {
      name: "Sentinel SOC Lab",
      repo: "https://github.com/andyydz/sentinel-soc-lab",
      status: "In Progress",
      description:
        "A controlled virtual SOC lab using Wazuh, an Ubuntu endpoint, Kali Linux, and an isolated VirtualBox network to practice and document detection engineering and investigation.",
      problem:
        "A detection rule should be evaluated with controlled tests and evidence, while unresolved findings and project limitations remain explicit.",
      approach:
        "Established Wazuh manager-to-agent communication and configured real-time File Integrity Monitoring for /home on the Ubuntu endpoint. Documented controlled file-lifecycle tests, detection observations, and CASE-001 evidence.",
      outcome:
        "In one controlled lifecycle session on November 2, custom rules 100003 (creation), 100002 (modification), and 100004 (deletion) each appeared at Level 8. Earlier creation/deletion observations differ; the cause is unresolved. CASE-001 remains open, and these results do not establish comprehensive FIM coverage or repeatability.",
      next: "Improve detection coverage, add repeatable validation, develop investigation cases, document response workflows, and measure effectiveness. Broader scenarios and purple-team validation remain future work.",
    },
    {
      name: "Python SOC Automation Engine",
      repo: "https://github.com/andyydz/python-soc-automation",
      status: "In Development",
      description:
        "A Python tool that processes exported Wazuh JSON alert files into structured, investigation-ready records; it has no live Wazuh manager or API integration.",
      problem:
        "Exported Wazuh alerts can contain nested fields, inconsistent or missing data, and timestamps that need validation before downstream use.",
      approach:
        "Implemented JSON ingestion, alert parsing and structural validation, UTC timestamp normalization, and investigation-record generation. Optional processing includes rule metadata, severity context, MITRE lookup, data-quality checks, and SHA-256 input-file integrity metadata.",
      outcome:
        "The repository documents automated tests across parsing, validation, ingestion, normalization, enrichment, investigation generation, pipeline integration, and CLI behavior. The investigation record does not invent evidence, conclusions, or asset details.",
      next: "Improve operational logging and error reporting, and develop case-status and evidence management. Any future SENTINEL integration remains unimplemented.",
    },
    {
      name: "Security Incident & Asset Tracker",
      repo: "https://github.com/andyydz/security-incident-asset-tracker",
      status: "",
      description:
        "A console-based Java, JDBC, and MariaDB application for managing IT assets and recording security incidents.",
      problem:
        "Keeping track of IT assets and associated security incidents requires structured records and reliable relationships between assets and incident reports.",
      approach:
        "Developed a Java console application using JDBC and MariaDB. Implemented asset management and incident-record operations with database relationships and structured data access.",
      outcome:
        "Created an application supporting asset creation, viewing, updating, and deletion, together with incident logging, severity classification, and incident-status tracking.",
      next: "Improve input validation, strengthen reporting and filtering, expand test coverage, and explore a more user-friendly interface.",
    },
    {
      name: "Bank Secure Network",
      repo: "https://github.com/andyydz/bank-secure-network",
      status: "",
      description:
        "A Cisco Packet Tracer networking project demonstrating segmented network design using VLANs, routing, and access-control concepts.",
      problem:
        "A banking-style network requires logical separation of departments and services to reduce unnecessary communication and support controlled network access.",
      approach:
        "Designed four VLANs and router-on-a-stick inter-VLAN routing in Cisco Packet Tracer, with centralized DHCP/DNS configuration and ACL restrictions for selected traffic. Documented tests include an Employee-to-Admin blocked ping and an increasing ACL deny counter.",
      outcome:
        "The topology, routing, services, and selected ACLs are documented. Employee-to-Admin blocking has documented test evidence; ATM ACL restrictions remain untested, and several DHCP, DNS, and service paths have no end-to-end verification.",
      next: "Test the remaining ATM restrictions and unverified connectivity paths, then document evidence for each result.",
    },
    {
      name: "SOC Portfolio",
      repo: "https://github.com/andyydz/SOC-Portfolio",
      status: "Learning Portfolio",
      description:
        "A repository documenting hands-on SOC learning and practical projects, including Wazuh, Splunk, ELK, Windows event analysis, and blue-team investigations.",
      problem:
        "SOC learning benefits from a traceable record of practical exercises, investigations, and project evidence.",
      approach:
        "Organized project work and learning documentation across security monitoring, incident investigations, detection engineering, and security tools.",
      outcome:
        "The repository contains separate write-ups and project areas; it is a learning portfolio rather than evidence of production SOC employment.",
      next: "Continue adding hands-on exercises and investigation write-ups as they are completed and supported by evidence.",
    },
  ],

  projects: [

    {
      name: "Cybersecurity-Writeups",
      repo: "https://github.com/andyydz/Cybersecurity-Writeups",
      description:
        "TryHackMe writeups on Linux, Windows, SOC workflows, and cybersecurity fundamentals.",
      tags: ["TryHackMe", "Writeups", "Linux", "Windows"],
    },
    {
      name: "Cisco-Network-Defence",
      repo: "https://github.com/andyydz/Cisco-Network-Defence",
      description:
        "Notes, labs, and Packet Tracer exercises from the Cisco Networking Academy Network Defense course.",
      tags: ["Cisco", "Packet Tracer", "Network Defense"],
    },
  ],

  certifications: [
    { name: "Pre Security — Learning Path", issuer: "TryHackMe", date: "May 2026", slug: "pre-security" },
    { name: "Cyber Security 101 — Learning Path", issuer: "TryHackMe", date: "Jul 2026", slug: "cyber-security-101" },
    { name: "Network Defense — Course Completion", issuer: "Cisco Networking Academy", date: "Nov 2026", slug: "network-defense" },
  ],
  certsInProgress:
    "Currently working on: Google Cybersecurity Certificate — Course 2, and TryHackMe's SOC Level 1 path",

  credly: {
    url: "https://www.credly.com/users/andyy-dz",
    badges: ["AWS Educate — Getting Started with Networking", "Cisco — Network Defense"],
  },

  recommendationLetter: {
    slug: "recommendation-letter",
    title: "Letter of Recommendation",
    author: "Jovita Monis",
    role: "Technical Support Engineer · Tier III",
    org: "UnifyCX",
  },

  experience: [
    {
      role: "Independent Cybersecurity Learning & Labs",
      org: "Self-directed practice · TryHackMe SOC Level 1 & Blue Team paths",
      period: "Feb 2026 – Present",
      points: [
        "Practicing SOC workflows via SOC Level 1, Pre Security, and Blue Team paths.",
        "Phishing email analysis, network traffic inspection, threat intel correlation.",
        "Building the Sentinel SOC lab: Wazuh monitoring, File Integrity Monitoring, and documented investigation cases.",
      ],
    },
  ],

  volunteering: [
    {
      role: "Gaming Volunteer — Aloysian Fest 2026",
      org: "St. Aloysius (Deemed to be University), Mangaluru",
      period: "Aug 2026",
      points: [
        "Volunteered at Aloysian Fest 2026, supporting gaming-event operations and gaining practical exposure to network infrastructure.",
        "Assisted with the streaming setup and observed network configuration and troubleshooting involving routers and switches.",
        "Shadowed the System Administrator and gained exposure to server racks, patch panels and physical network cabling.",
        "Performed basic Linux connectivity diagnostics, including IP and route checks.",
      ],
    },
    {
      role: "Technical Volunteer",
      org: "CODESPRINT National-Level Hackathon, St. Aloysius",
      period: "Jan 2026",
      points: [
        "Technical coordination and participant support.",
        "Implemented a bridge-based network fix during the event.",
      ],
    },
  ],

  // TODO: fill in the professor's full name.
  testimonial: {
    quote:
      "I've had the pleasure of teaching Andrew during his BCA program at St. Aloysius. He consistently stood out — not just academically, but for his proactive approach to learning and technology, and his strong problem-solving skills in inter-college hackathons. He collaborates effectively under pressure and thinks on his feet. I highly recommend him for any technical roles or projects he pursues.",
    author: "Rishal Noronha",
    role: "Assistant Professor, St. Aloysius (Deemed to be University), Mangaluru",
    placeholder: false,
  },
  peerTestimonial: {
    quote:
      "Andrew is a dedicated and curious cybersecurity enthusiast with a strong passion for learning and developing his skills. As a classmate, I’ve seen his commitment to cybersecurity and continuous improvement. I’m confident he’ll be a great asset to any cybersecurity team.",
    author: "Prajwal V Raghavendra",
    role: "Classmate / Peer",
    title:
      "Computer Science Student | Aspiring DevOps Engineer | Backend Development & AI Enthusiast | Seeking Internship",
  },
};

export type Profile = typeof profile;
