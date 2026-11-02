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

  featuredProject: {
    name: "Security Incident & Asset Tracker",
    repo: "https://github.com/andyydz/security-incident-asset-tracker",
    problem:
      "Small IT teams often track assets in spreadsheets and log incidents in chat, so nothing links a compromised host to the incident history behind it.",
    approach:
      "Built a Java + JDBC console application on MariaDB with a relational schema linking Assets↔Incidents, a DAO layer for data access, and PreparedStatement used throughout to prevent SQL injection.",
    outcome:
      "Assets and incidents are queryable together, with severity classification on every incident. Built and tested end to end on Kali Linux.",
    next: "Add analyst-facing reporting queries and export incident timelines mapped to MITRE ATT&CK techniques.",
  },

  featuredProjects: [
    {
      name: "Security Incident & Asset Tracker",
      repo: "https://github.com/andyydz/security-incident-asset-tracker",
      problem:
        "Small IT teams often track assets in spreadsheets and log incidents in chat, so nothing links a compromised host to the incident history behind it.",
      approach:
        "Built a Java + JDBC console application on MariaDB with a relational schema linking Assets↔Incidents, a DAO layer for data access, and PreparedStatement used throughout to prevent SQL injection.",
      outcome:
        "Assets and incidents are queryable together, with severity classification on every incident. Built and tested end to end on Kali Linux.",
      next: "Add analyst-facing reporting queries and export incident timelines mapped to MITRE ATT&CK techniques.",
    },
    {
      name: "SOC-Portfolio",
      repo: "https://github.com/andyydz/SOC-Portfolio",
      problem:
        "Blue Team learning is easy to collect and hard to prove — labs get completed and forgotten, with no evidence of how a detection was reached.",
      approach:
        "Built a repo of end-to-end SOC investigations: Splunk and ELK queries over Windows Event Logs, Wazuh alert triage, and packet captures, each documented as alert → pivot → evidence → verdict and mapped to MITRE ATT&CK techniques.",
      outcome:
        "A reviewable body of investigations covering phishing analysis, brute-force and persistence detection, and log-source coverage gaps — reproducible by anyone reading the writeups.",
      next: "Add detection rules as reusable Sigma signatures and cover cloud/identity log sources alongside endpoint telemetry.",
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
    { name: "Foundations of Cybersecurity", issuer: "Google / Coursera", date: "Jun 2026" },
    { name: "Play It Safe: Manage Security Risks", issuer: "Google / Coursera", date: "Jul 2026" },
    { name: "Pre Security Certificate", issuer: "TryHackMe", date: "May 2026" },
    { name: "Cyber Security 101 Certificate", issuer: "TryHackMe", date: "Jul 2026" },
  ],
  certsInProgress:
    "Currently working on: Google Cybersecurity Certificate — Course 2, and TryHackMe's SOC Level 1 path",

  experience: [
    {
      role: "SOC & Blue Team Trainee",
      org: "Self-Directed Practice, TryHackMe",
      period: "Feb 2026 – Present",
      points: [
        "Practicing SOC workflows via SOC Level 1, Pre Security, and Blue Team paths.",
        "Phishing email analysis, network traffic inspection, threat intel correlation.",
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
