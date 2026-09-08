import { MatrixRain } from "@/components/matrix-rain";
import { profile } from "@/data/profile";
import { trackClick } from "@/lib/track";
import headshot from "@/assets/headshot.jpg";
import { useReveal } from "@/hooks/use-reveal";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const ref = useReveal<HTMLElement>();

  return (
    <section id="top" ref={ref} className="relative overflow-hidden border-b border-border/50 pt-28 pb-16 sm:pt-36 sm:pb-20">
      <MatrixRain opacity={0.05} rampMs={2600} speed={0.5} />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-[minmax(0,1.35fr)_minmax(260px,0.65fr)] md:gap-14">
        <div className="min-w-0">
          <p className="caret font-mono text-xs tracking-[0.25em] text-primary sm:text-sm">
            &gt; whoami{" "}
          </p>
          <h1 className="mt-5 font-mono text-4xl leading-[1.08] font-bold sm:text-5xl lg:text-6xl">
            {profile.name}
            <span className="mt-1 block text-primary">&quot;{profile.alias}&quot;</span>
          </h1>
          <p className="mt-6 max-w-2xl border-l-2 border-accent pl-4 font-mono text-sm leading-relaxed text-accent sm:text-base">
            {profile.title}
          </p>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {profile.subtitle}
          </p>

          <div className="no-print mt-8 grid grid-cols-2 gap-3 font-mono text-xs sm:flex sm:flex-wrap sm:text-sm">
            <Button asChild className="h-11 rounded-sm font-mono text-xs active:translate-y-px sm:text-sm">
              <a href={profile.links.resume} onClick={() => trackClick("resume")}><Download aria-hidden="true" />Download Resume</a>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-sm border-border-strong bg-transparent font-mono text-xs text-primary hover:bg-primary hover:text-primary-foreground active:translate-y-px sm:text-sm">
              <a href="#contact" onClick={() => trackClick("contact")}><Mail aria-hidden="true" />Contact</a>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-sm border-border bg-transparent font-mono text-xs text-muted-foreground hover:border-border-strong hover:bg-secondary hover:text-primary active:translate-y-px sm:text-sm">
              <a href={profile.links.github} target="_blank" rel="noreferrer noopener" onClick={() => trackClick("github")}><Github aria-hidden="true" />GitHub</a>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-sm border-border bg-transparent font-mono text-xs text-muted-foreground hover:border-border-strong hover:bg-secondary hover:text-primary active:translate-y-px sm:text-sm">
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin aria-hidden="true" />LinkedIn</a>
            </Button>
          </div>
        </div>

        <figure className="panel shimmer-border reveal mx-auto w-full max-w-xs p-2 shadow-terminal">
          <div className="mb-2 flex items-center justify-between border-b border-border px-1 pb-2 font-mono text-[9px] text-muted-foreground">
            <span>identity.capture</span><span className="inline-flex items-center gap-1.5 text-primary"><span className="status-dot" />VERIFIED</span>
          </div>
          <img
            src={headshot}
            alt={`${profile.name}, aspiring SOC analyst`}
            width={768}
            height={960}
            loading="eager"
            decoding="async"
            className="aspect-[4/5] w-full object-cover object-top"
          />
          <figcaption className="mt-2 px-1 pb-1 font-mono text-[10px] text-muted-foreground">
            ID: {profile.handle} · STATUS: AVAILABLE
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
