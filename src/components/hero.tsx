import { MatrixRain } from "@/components/matrix-rain";
import { profile } from "@/data/profile";
import { trackClick } from "@/lib/track";
import headshot from "@/assets/headshot.jpg";
import { useReveal } from "@/hooks/use-reveal";

export function Hero() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="top" ref={ref} className="relative overflow-hidden pt-28 pb-12 sm:pt-32">
      <MatrixRain opacity={0.05} rampMs={2600} speed={0.5} />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="caret font-mono text-xs tracking-[0.25em] text-primary sm:text-sm">
            &gt; whoami{" "}
          </p>
          <h1 className="mt-4 font-mono text-3xl leading-tight font-bold sm:text-5xl">
            {profile.name}
            <span className="block text-primary">&quot;{profile.alias}&quot;</span>
          </h1>
          <p className="mt-4 font-mono text-sm text-accent sm:text-base">{profile.title}</p>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
            {profile.subtitle}
          </p>

          <div className="no-print mt-7 flex flex-wrap gap-3 font-mono text-xs sm:text-sm">
            <a
              href={profile.links.resume}
              onClick={() => trackClick("resume")}
              className="min-h-11 border border-primary bg-primary px-4 py-2 text-primary-foreground transition-transform duration-150 hover:-translate-y-0.5"
            >
              Download Resume
            </a>
            <a
              href="#contact"
              onClick={() => trackClick("contact")}
              className="min-h-11 border border-border-strong px-4 py-2 text-primary transition-colors duration-150 hover:bg-primary hover:text-primary-foreground"
            >
              Contact
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer noopener"
              onClick={() => trackClick("github")}
              className="min-h-11 border border-border px-4 py-2 text-muted-foreground transition-colors duration-150 hover:border-border-strong hover:text-primary"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/andrew-vinston-d-souza-41699330a/"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-11 border border-border px-4 py-2 text-muted-foreground transition-colors duration-150 hover:border-border-strong hover:text-primary"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="panel shimmer-border reveal mx-auto w-full max-w-xs p-2">
          <img
            src={headshot}
            alt={`${profile.name}, aspiring SOC analyst`}
            width={768}
            height={960}
            className="w-full object-cover"
          />
          <p className="mt-2 px-1 pb-1 font-mono text-[10px] tracking-widest text-muted-foreground">
            ID: {profile.handle} · STATUS: AVAILABLE
          </p>
        </div>
      </div>
    </section>
  );
}
