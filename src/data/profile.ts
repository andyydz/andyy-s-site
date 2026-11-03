// Single source of truth for all portfolio content.
// Update copy here — layout/design code reads from this file.

export const profile = {
  name: "Andrew Vinston D'Souza",
  alias: "Andyy",
  handle: "andyydz",
  title: "Aspiring SOC Analyst | Threat Detection & Incident Response",
  subtitle: "Top 4% on TryHackMe · BCA @ St. Aloysius University, Mangaluru",
  email: "andyydz57@gmail.com",
  links: {
    github: "https://github.com/andyydz",
    linkedin: "https://www.linkedin.com/in/andrew-vinston-d-souza-41699330a/",
    tryhackme: "https://tryhackme.com/p/andyydz57",
    reddit: "https://www.reddit.com/user/RavenGhost6767/",
    resume: "/resume.pdf",
  },
  about: `Curious about how systems work since I was a kid — that curiosity pointed itself at cybersecurity, specifically defense. I care about understanding why something breaks, not just patching it and moving on. Most days I'm in TryHackMe's SOC and Blue Team paths — log analysis, incident response sims, Splunk, Wireshark, Nmap — mapping attack behavior to MITRE ATT&CK and writing it up on GitHub as I go. Top 4% globally on TryHackMe with a 78-day highest streak (last updated November 2, 2026). Looking for an internship or entry-level SOC Analyst role.`,

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
      repo: "https://github.com/andyydz/SOC-Portfolio",
      status: "In Progress",
      description:
        "An evidence-driven Security Operations Center lab built around Wazuh, Linux endpoints, File Integrity Monitoring, detection engineering, and security-event investigation.",
      problem:
        "Building practical SOC investigation skills requires more than collecting alerts. Detection behavior must be tested, supporting evidence reviewed, and limitations documented.",
      approach:
        "Built an isolated Wazuh-based lab with a Linux endpoint. Configured File Integrity Monitoring and conducted controlled file-activity tests. Reviewed manager alerts, endpoint activity, and supporting logs while documenting investigation evidence in CASE-001.",
      outcome:
        "Established Wazuh manager-to-agent communication and validated file-integrity monitoring. Documented modification, creation, and deletion observations. During CASE-001 validation, built-in Wazuh rules detected file creation and deletion, while custom rule 100002 did not trigger for those events. The findings identified detection coverage requiring further engineering and retesting.",
      next: "Improve custom detection coverage, add repeatable regression tests, develop additional investigation cases, document response workflows, and measure detection effectiveness. Later phases will explore broader attack scenarios and purple-team validation.",
    },
    {
      name: "Python SOC Automation Engine",
      repo: "https://github.com/andyydz/python-soc-automation",
      status: "In Development",
      description:
        "A Python-based security automation project that parses and validates Wazuh alerts, extracts key detection metadata, and establishes a foundation for explainable SOC triage and structured reporting.",
      problem:
        "Wazuh alerts contain structured and sometimes nested JSON data. Analysts and automation scripts need a consistent way to validate and extract the information required for further investigation.",
      approach:
        "Developed an initial Python alert parser that validates incoming alert structures and extracts rule IDs, severity levels, agent information, and rule descriptions. Added handling for missing fields and an automated pytest test suite.",
      outcome:
        "Implemented the initial Wazuh alert parser, input-structure validation, default handling for missing data, and six parser test cases documented in the repository.",
      next: "Expand parser coverage with additional edge cases, improve data normalization, introduce explainable alert-prioritization logic, and develop structured investigation reporting. Explore integration with exported Wazuh alerts as the project matures.",
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
        "Designed a Cisco Packet Tracer topology with separate VLANs for ADMIN, EMPLOYEE, ATM, and SERVER segments. Configured routing and planned access-control restrictions between network segments.",
      outcome:
        "Created a segmented network topology with separate logical network areas and supporting server infrastructure in Packet Tracer.",
      next: "Complete and verify access-control policies, perform inter-VLAN connectivity and isolation tests, document the results, and improve network-security validation.",
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
