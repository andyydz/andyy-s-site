import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { IntroSequence } from "@/components/intro-sequence";
import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import {
  About,
  Certifications,
  Contact,
  Experience,
  LogStrip,
  Projects,
  Skills,
  SiteFooter,
  StatsBar,
  Testimonial,
  Volunteering,
} from "@/components/sections";
import { profile } from "@/data/profile";

const TITLE = "Andrew D'Souza — Aspiring SOC Analyst | Threat Detection & IR";
const DESCRIPTION =
  "Portfolio of Andrew Vinston D'Souza (Andyy), aspiring SOC Analyst focused on threat detection and incident response. Top 4% on TryHackMe — Splunk, Wireshark, MITRE ATT&CK.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "/og-image.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          alternateName: profile.alias,
          jobTitle: "Aspiring SOC Analyst",
          email: `mailto:${profile.email}`,
          description: DESCRIPTION,
          alumniOf: "St. Aloysius University, Mangaluru",
          sameAs: [profile.links.github, profile.links.linkedin, profile.links.tryhackme],
        }),
      },
    ],
  }),
});

const STORAGE_KEY = "andyydz.intro.played";

function Index() {
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    try {
      if (!window.localStorage.getItem(STORAGE_KEY)) setShowIntro(true);
    } catch {
      /* storage unavailable — skip intro */
    }
  }, []);

  const finishIntro = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setShowIntro(false);
  };

  return (
    <>
      <div className="scanlines no-print" aria-hidden="true" />
      {showIntro && <IntroSequence onDone={finishIntro} />}
      <SiteNav />
      <main>
        <Hero />
        <LogStrip />
        <StatsBar />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Experience />
        <Volunteering />
        <Testimonial />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
