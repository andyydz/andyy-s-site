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
    resume: "/resume.pdf",
  },
  about: `Curious about how systems work since I was a kid — that curiosity pointed itself at cybersecurity, specifically defense. I care about understanding why something breaks, not just patching it and moving on. Most days I'm in TryHackMe's SOC and Blue Team paths — log analysis, incident response sims, Splunk, Wireshark, Nmap — mapping attack behavior to MITRE ATT&CK and writing it up on GitHub as I go. Top 4% globally on TryHackMe, 116 rooms completed, 61-day streak. Looking for an internship or entry-level SOC Analyst role.`,

  // Manual — TryHackMe has no stable public API.
  stats: [
    { label: "RANK", value: 95645, suffix: "", note: "top 4%" },
    { label: "BADGES", value: 23, suffix: "" },
    { label: "STREAK", value: 61, suffix: " days" },
    { label: "ROOMS", value: 116, suffix: "" },
  ],

  // Fallback log lines; live GitHub events are prepended when available.
  logLines: [
    "[LOG] Completed: Greenholt v2 — phishing investigation",
    "[LOG] Pushed 3 commits to SOC-Portfolio",
    "[LOG] TryHackMe SOC Level 1 path — in progress",
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
      name: "Core Security",
      items: [
        "Threat Detection",
        "Incident Response",
        "Cybersecurity",
        "Information Security",
        "Cyber Risk Management",
        "Risk Assessment",
        "Vulnerability Assessment",
        "Network Security",
        "Networking Fundamentals",
        "Linux Fundamentals",
        "Web Application Security",
      ],
    },
    {
      name: "Tools & Technologies",
      items: [
        "Splunk",
        "Wireshark",
        "Nmap",
        "Snort",
        "Metasploit",
        "CyberChef",
        "Kali Linux",
        "Burp Suite",
        "SIEM",
        "Digital Forensics",
        "Log Analysis",
      ],
    },
    {
      name: "Foundations",
      items: ["Git", "GitHub", "HTML", "CSS", "Bootstrap", "Java", "SQL", "Python (basics)"],
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

  projects: [
    {
      name: "SOC-Portfolio",
      repo: "https://github.com/andyydz/SOC-Portfolio",
      description:
        "Hands-on SOC projects covering Splunk, Wazuh, ELK Stack, Windows Event Logs, MITRE ATT&CK, and Blue Team investigations.",
      tags: ["Splunk", "Wazuh", "ELK", "MITRE ATT&CK"],
    },
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
};

export type Profile = typeof profile;
