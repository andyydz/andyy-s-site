// Registry of viewable documents (certificates, letters).
// Files live in public/documents/ — served statically, so the viewer and the
// download button always reference the exact same PDF.
import resumeAsset from "@/assets/andrew-vinston-dsouza-resume.pdf.asset.json";

export type PortfolioDocument = {
  title: string;
  issuer: string;
  description: string;
  file: string;
  downloadName: string;
  backTo: string;
  backLabel: string;
};

export const documents: Record<string, PortfolioDocument> = {
  resume: {
    title: "Andrew Vinston D'Souza — Resume",
    issuer: "SOC Analyst (L1) · Cybersecurity & Blue Team",
    description:
      "Resume of Andrew Vinston D'Souza, an entry-level SOC Analyst candidate with foundational blue-team and cybersecurity lab practice.",
    file: resumeAsset.url,
    downloadName: "Andrew_Vinston_D_Souza_Resume.pdf",
    backTo: "/",
    backLabel: "back to portfolio",
  },
  "pre-security": {
    title: "Pre Security — Learning Path Certificate",
    issuer: "TryHackMe",
    description: "TryHackMe Pre Security learning path certificate of completion, earned May 2026.",
    file: "/documents/pre-security.pdf",
    downloadName: "tryhackme-pre-security-certificate.pdf",
    backTo: "/#certifications",
    backLabel: "back to certifications",
  },
  "cyber-security-101": {
    title: "Cyber Security 101 — Learning Path Certificate",
    issuer: "TryHackMe",
    description: "TryHackMe Cyber Security 101 learning path certificate of completion, earned July 2026.",
    file: "/documents/cyber-security-101.pdf",
    downloadName: "tryhackme-cyber-security-101-certificate.pdf",
    backTo: "/#certifications",
    backLabel: "back to certifications",
  },
  "network-defense": {
    title: "Network Defense — Certificate of Course Completion",
    issuer: "Cisco Networking Academy",
    description: "Cisco Networking Academy Network Defense course completion certificate, November 2026.",
    file: "/documents/network-defense.pdf",
    downloadName: "cisco-network-defense-certificate.pdf",
    backTo: "/#certifications",
    backLabel: "back to certifications",
  },
  "recommendation-letter": {
    title: "Letter of Recommendation — Andrew Vinston D'Souza",
    issuer: "Jovita Monis · UnifyCX",
    description: "Letter of recommendation for Andrew Vinston D'Souza authored by Jovita Monis, Technical Support Engineer (Tier III), UnifyCX.",
    file: "/documents/recommendation-letter.pdf",
    downloadName: "letter-of-recommendation-andrew-dsouza.pdf",
    backTo: "/#recommendation",
    backLabel: "back to the recommendation",
  },
};
