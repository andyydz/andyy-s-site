import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { IntroSequence } from "@/components/intro-sequence";
import { trackPageView } from "@/lib/track";
import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { MotionDebug } from "@/components/motion-debug";
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

const SITE_URL = "https://andyy-s-site.vercel.app";
const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
const TITLE = "Andrew D'Souza — SOC Analyst Portfolio | Threat Detection";
const DESCRIPTION =
  "Cybersecurity portfolio of Andrew Vinston D'Souza (Andyy): SOC analysis, threat detection and incident response projects using Splunk, Wireshark and MITRE ATT&CK.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index, follow" },
      {
        name: "google-site-verification",
        content: "ZthIxWNOX6F3tuIr8KRO3n8nJXBZEW8ln3ndT8jMWG8",
      },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:alt", content: "Andrew D'Souza — SOC analyst portfolio" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
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
          url: `${SITE_URL}/`,
          image: OG_IMAGE,
          knowsAbout: [
            "Security Operations Center (SOC)",
            "Threat detection",
            "Incident response",
            "Splunk",
            "Wireshark",
            "MITRE ATT&CK",
          ],
          alumniOf: "St. Aloysius University, Mangaluru",
          sameAs: [
            profile.links.github,
            profile.links.linkedin,
            profile.links.tryhackme,
            profile.links.reddit,
          ],
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

  useEffect(() => {
    trackPageView(window.location.pathname);
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
      <MotionDebug />
    </>
  );
}
