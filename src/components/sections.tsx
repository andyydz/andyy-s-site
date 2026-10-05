import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { profile } from "@/data/profile";
import { submitContact } from "@/lib/tracking.functions";
import { trackClick } from "@/lib/track";
import { SiteQrCode } from "@/components/qr-code";
import { useGitHubStats } from "@/hooks/use-github-stats";
import { usePrefersReducedMotion, useReveal } from "@/hooks/use-reveal";
import skull from "@/assets/skull.png";
import { Check, ChevronDown, Copy, ExternalLink, Github, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

/* ---------- shared bits ---------- */

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="reveal flex items-center gap-3 font-mono text-xl text-foreground sm:text-2xl">
      <span className="text-primary">&gt; </span>
      {children}
      <span className="h-px min-w-6 flex-1 bg-border" aria-hidden="true" />
    </h2>
  );
}

function Section({
  id,
  heading,
  children,
}: {
  id: string;
  heading: string;
  children: React.ReactNode;
}) {
  const ref = useReveal<HTMLElement>();
  return (
    <section id={id} ref={ref} className="scroll-mt-20 border-t border-border/40">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        <SectionHeading>{heading}</SectionHeading>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function delay(i: number) {
  return { "--reveal-delay": `${i * 70}ms` } as React.CSSProperties;
}

/* ---------- system log strip ---------- */

export function LogStrip() {
  const { data, loading } = useGitHubStats();
  const [expanded, setExpanded] = useState(false);

  const live = data?.events?.length
    ? Array.from(new Set([...data.events, ...profile.logLines]))
    : profile.logLines;
  const lines = expanded ? live : live.slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-5">
      <div className="panel px-4 py-3 font-mono text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
        <p className="mb-1 text-primary/70">$ tail -f /var/log/andyydz.log</p>
        {loading && <p className="text-muted-foreground">fetching activity…</p>}
        {lines.map((l, i) => (
          <p key={`${i}-${l}`}>
            <span className="text-accent">{l.slice(0, 5)}</span>
            {l.slice(5)}
          </p>
        ))}
      </div>
      {live.length > 3 && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="mt-3 inline-flex items-center gap-2 border border-border px-4 py-2 font-mono text-xs text-primary transition-colors duration-150 hover:border-border-strong hover:text-foreground"
        >
          <span>{expanded ? "> collapse" : "> read more"}</span>
          <span className="text-muted-foreground">{expanded ? "−" : "+"}</span>
        </button>
      )}
    </div>
  );
}

/* ---------- stats ---------- */

function useCountUp(target: number, run: boolean) {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(reduced ? target : 0);
  useEffect(() => {
    if (!run) return;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 380);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, reduced]);
  return value;
}

function StatCard({ stat, run, index }: { stat: (typeof profile.stats)[number]; run: boolean; index: number }) {
  const value = useCountUp(stat.value, run);
  return (
    <div
      className="panel stat-card reveal px-4 py-5 transition-[transform,border-color] duration-150 ease-out hover:-translate-y-0.5 hover:border-border-strong"
      style={delay(index)}
    >
      <p className="flex items-center justify-between font-mono text-[10px] tracking-[0.18em] text-muted-foreground"><span>TRYHACKME / {stat.label}</span><span className="status-dot" aria-hidden="true" /></p>
      <p className="mt-2 font-mono text-2xl text-primary sm:text-3xl">
        {value.toLocaleString()}
        {stat.suffix}
      </p>
      {stat.note && <p className="mt-1 font-mono text-[10px] text-accent">{stat.note}</p>}
    </div>
  );
}

export function StatsBar() {
  const ref = useReveal<HTMLElement>();
  const seen = useRef(false);
  const [run, setRun] = useState(false);
  const { data, loading, error } = useGitHubStats();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !seen.current) {
          seen.current = true;
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  return (
    <section ref={ref} aria-label="Verified learning statistics" className="mx-auto max-w-6xl px-5 py-12">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {profile.stats.map((s, i) => (
          <StatCard key={s.label} stat={s} run={run} index={i} />
        ))}
      </div>

      <div className="panel reveal mt-3 px-4 py-3 font-mono text-[11px] text-muted-foreground sm:text-xs">
        <span className="text-primary">github/{profile.handle}</span>{" "}
        {loading && <span>fetching live stats…</span>}
        {error && <span>live stats unavailable</span>}
        {data && (
          <span>
            · public repos: <span className="text-accent">{data.repos}</span> · contributions (last
            year): <span className="text-accent">{data.contributions?.toLocaleString() ?? "—"}</span>
          </span>
        )}
      </div>

      <p className="reveal mt-4 font-mono text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
        <span className="text-primary">rooms:</span> {profile.notableRooms.join(" · ")}
      </p>
    </section>
  );
}

/* ---------- about ---------- */

export function About() {
  return (
    <Section id="about" heading="cat about.md">
      <div className="reveal grid gap-4 lg:grid-cols-[auto_minmax(0,1fr)]">
        <p className="font-mono text-xs text-primary">01 / PROFILE</p>
        <p className="max-w-4xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">{profile.about}</p>
      </div>
    </Section>
  );
}

/* ---------- skills ---------- */

export function Skills() {
  const [expanded, setExpanded] = useState<Set<number>>(new Set());
  const allExpanded = expanded.size === profile.skillGroups.length;
  const toggle = (index: number) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };
  return (
    <Section id="skills" heading="ls skills/">
      <div className="space-y-3">
        {profile.skillGroups.map((group, gi) => (
          <div key={group.name} className="panel reveal overflow-hidden" style={delay(gi)}>
            <Button
              type="button"
              variant="ghost"
              aria-expanded={expanded.has(gi)}
              onClick={() => toggle(gi)}
              className="h-auto min-h-12 w-full justify-between rounded-none px-4 py-3 font-mono text-xs text-primary hover:bg-secondary sm:text-sm"
            >
              <span>
                {String(gi + 1).padStart(2, "0")} / {group.name}{" "}
                <span className="text-muted-foreground">[{group.items.length}]</span>
              </span>
              <ChevronDown aria-hidden="true" className={`text-muted-foreground transition-transform duration-200 ${expanded.has(gi) ? "rotate-180" : ""}`} />
            </Button>
            {expanded.has(gi) && (
              <ul className="flex flex-wrap gap-2 border-t border-border bg-background/40 px-4 py-4">
                {group.items.map((item, i) => (
                  <li
                    key={item}
                    className="animate-fade-in border border-border bg-card px-3 py-1.5 font-mono text-[11px] text-foreground transition-colors duration-150 hover:border-border-strong hover:text-primary"
                    style={{
                      animationDelay: `${i * 60}ms`,
                      animationFillMode: "backwards",
                      animationDuration: "260ms",
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
       <Button
        type="button"
         variant="outline"
         onClick={() => setExpanded(allExpanded ? new Set() : new Set(profile.skillGroups.map((_, index) => index)))}
         aria-expanded={allExpanded}
         className="reveal mt-5 h-11 rounded-sm border-border bg-transparent font-mono text-xs text-primary hover:border-border-strong hover:bg-secondary hover:text-foreground"
      >
         <span>{allExpanded ? "> collapse all" : "> expand all"}</span>
         <ChevronDown aria-hidden="true" className={allExpanded ? "rotate-180" : ""} />
       </Button>
    </Section>
  );
}

/* ---------- projects ---------- */

export function Projects() {
  return (
    <Section id="projects" heading="ls projects/">
      <div className="grid gap-5">
        {profile.featuredProjects.map((f, projectIndex) => (
          <article
            key={f.name}
            className="panel case-file reveal overflow-hidden transition-[transform,border-color] duration-150 ease-out hover:-translate-y-0.5 hover:border-border-strong"
          >
            <header className="grid items-start gap-4 border-b border-border bg-secondary/40 px-5 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:px-6">
              <div className="min-w-0">
                <p className="font-mono text-[10px] text-accent">CASE FILE {String(projectIndex + 1).padStart(2, "0")} · FEATURED</p>
                <h3 className="mt-2 font-mono text-base leading-snug text-primary sm:text-lg">{f.name}</h3>
              </div>
              <Button asChild variant="outline" size="sm" className="h-10 shrink-0 justify-self-start rounded-sm border-border bg-background font-mono text-[10px] text-muted-foreground hover:text-primary sm:justify-self-auto">
                <a href={f.repo} target="_blank" rel="noreferrer noopener">Repository<ExternalLink aria-hidden="true" /></a>
              </Button>
            </header>
            <dl className="grid gap-px bg-border sm:grid-cols-2">
              {[
                ["problem", f.problem],
                ["approach", f.approach],
                ["outcome", f.outcome],
                ["what's next", f.next],
              ].map(([k, v], i) => (
                <div key={k} className="bg-card px-5 py-5 sm:px-6">
                  <dt className="font-mono text-[11px] uppercase text-accent">0{i + 1} / {k}</dt>
                  <dd className="mt-2 text-sm leading-6 text-muted-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </article>
        ))}
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">

        {profile.projects.map((p, i) => (
          <article
            key={p.name}
            className="panel reveal flex flex-col p-5 transition-[transform,border-color] duration-150 ease-out hover:-translate-y-0.5 hover:border-border-strong sm:p-6"
            style={delay(i)}
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <h3 className="min-w-0 font-mono text-sm text-primary">{p.name}</h3>
              <a href={p.repo} target="_blank" rel="noreferrer noopener" aria-label={`Open ${p.name} repository`} className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-border text-muted-foreground transition-colors duration-150 hover:border-border-strong hover:text-primary"><ExternalLink className="h-4 w-4" aria-hidden="true" /></a>
            </div>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {p.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <li key={t} className="border border-border bg-secondary/40 px-2.5 py-1 font-mono text-[10px] text-muted-foreground">
                  {t}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

/* ---------- certifications ---------- */

export function Certifications() {
  return (
    <Section id="certifications" heading="cat certifications.tsv">
      <div className="panel reveal overflow-hidden">
        <div className="overflow-x-auto">
        <table className="w-full min-w-[520px] font-mono text-xs">
          <thead>
            <tr className="border-b border-border text-left text-muted-foreground">
              <th scope="col" className="px-4 py-2 font-normal">
                CERTIFICATION
              </th>
              <th scope="col" className="px-4 py-2 font-normal">
                ISSUER
              </th>
              <th scope="col" className="px-4 py-2 font-normal">
                DATE
              </th>
            </tr>
          </thead>
          <tbody>
            {profile.certifications.map((c) => (
              <tr key={c.name} className="border-b border-border/60 transition-colors last:border-0 hover:bg-secondary/40">
                <td className="px-4 py-4 text-foreground"><span className="mr-2 text-primary">✓</span>{c.name}</td>
                <td className="px-4 py-4 text-muted-foreground">{c.issuer}</td>
                <td className="px-4 py-4 text-accent">{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      <p className="reveal mt-4 border-l-2 border-accent bg-secondary/30 px-4 py-3 font-mono text-[11px] leading-relaxed text-muted-foreground">
        <span className="text-accent">IN PROGRESS /</span> {profile.certsInProgress}
      </p>
    </Section>
  );
}

/* ---------- experience + volunteering ---------- */

function TimelineList({ items }: { items: typeof profile.experience }) {
  return (
    <div className="space-y-4">
      {items.map((e, i) => (
        <article key={e.role} className="timeline-entry panel reveal p-5 pl-10 shadow-terminal sm:p-6 sm:pl-11" style={delay(i)}>
          <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
            <div className="min-w-0"><h3 className="font-mono text-base text-primary">{e.role}</h3><p className="mt-1 font-mono text-[11px] text-muted-foreground">{e.org}</p></div>
            <p className="font-mono text-[11px] text-accent sm:text-right">{e.period}</p>
          </div>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-muted-foreground">
            {e.points.map((p) => (
              <li key={p}>
                <span className="text-primary">–</span> {p}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function Experience() {
  return (
    <Section id="experience" heading="cat experience.log">
      <TimelineList items={profile.experience} />
    </Section>
  );
}

export function Volunteering() {
  return (
    <Section id="volunteering" heading="cat volunteering.log">
      <TimelineList items={profile.volunteering} />
    </Section>
  );
}

/* ---------- testimonial ---------- */

export function Testimonial() {
  const testimonials = [profile.testimonial, profile.peerTestimonial];
  return (
    <Section id="testimonial" heading="cat testimonial.txt">
      <div className="grid max-w-4xl gap-4">
        {testimonials.map((t) => (
          <blockquote key={t.author} className="panel reveal p-5 shadow-terminal sm:p-6">
            <p className="font-mono text-xs text-primary">RECOMMENDATION / VERIFIED ATTRIBUTION</p>
            <p className="mt-5 text-base leading-8 text-foreground italic sm:text-lg">“{t.quote}”</p>
            <footer className="mt-5 border-t border-border pt-4 font-mono text-[11px] leading-relaxed text-muted-foreground">
              <span className="text-primary">{t.author}</span><br />{t.role}
              {"title" in t && <p className="mt-2">{t.title}</p>}
            </footer>
          </blockquote>
        ))}
      </div>
    </Section>
  );
}

/* ---------- contact ---------- */

export function Contact() {
  const [errors, setErrors] = useState<string[]>([]);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);
  const send = useServerFn(submitContact);

  useEffect(() => {
    if (!sent) return;
    const timeout = window.setTimeout(() => setSent(false), 5000);
    return () => window.clearTimeout(timeout);
  }, [sent]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const honey = String(fd.get("company_url") ?? "");
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    const errs: string[] = [];
    if (name.length < 2 || name.length > 80) errs.push("name must be 2–80 characters");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
      errs.push("valid email required");
    if (message.length < 10 || message.length > 1000) errs.push("message must be 10–1000 characters");
    setErrors(errs);
    setSent(false);
    if (errs.length) return;

    setSending(true);
    try {
      const result = await send({ data: { name, email, message, company_url: honey } });
      if (!result.ok) throw new Error("Could not confirm receipt. Please email directly instead.");
      if (!honey) setSent(true);
      form.reset();
      void trackClick("contact-form-submit");
    } catch (err) {
      setErrors([err instanceof Error ? err.message : "could not send message"]);
    } finally {
      setSending(false);
    }
  };

  return (
    <Section id="contact" heading="./contact.sh">
      <div className="grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
        <div className="panel reveal p-5 sm:p-6">
          <p className="mb-5 font-mono text-xs text-accent">SECURE CHANNELS</p>
          <ul className="space-y-1 font-mono text-xs sm:text-sm">
          {[
            { label: "email", href: `mailto:${profile.email}`, text: profile.email },
            { label: "github", href: profile.links.github, text: "github.com/andyydz" },
            {
              label: "linkedin",
              href: profile.links.linkedin,
              text: "linkedin.com/in/andrew-vinston-d-souza",
            },
            { label: "tryhackme", href: profile.links.tryhackme, text: "tryhackme.com/p/andyydz57" },
            { label: "reddit", href: profile.links.reddit, text: "reddit.com/user/RavenGhost6767" },
          ].map(({ label, href, text }, i) => (
            <li key={label} className="reveal grid grid-cols-[76px_minmax(0,1fr)_auto] items-center gap-2 border-b border-border/50 py-2.5 last:border-0" style={delay(i)}>
              <span className="text-muted-foreground">{label}</span>
              <a
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="min-w-0 break-all text-primary hover:underline"
              >
                {text}
              </a>
              {label === "email" && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  title="Copy email address"
                  className="no-print h-11 w-11 rounded-sm border-border bg-transparent text-muted-foreground hover:border-border-strong hover:bg-secondary hover:text-primary"
                >
                  {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
                </Button>
              )}
            </li>

          ))}
          </ul>
        </div>

        <form onSubmit={onSubmit} className="panel reveal no-print space-y-4 p-5 sm:p-6" noValidate>
          <div><p className="font-mono text-xs text-accent">MESSAGE REQUEST</p><p className="mt-1 text-xs text-muted-foreground">Fields are validated before submission.</p></div>
          <div className="hidden" aria-hidden="true">
            <label htmlFor="company_url">Company URL</label>
            <input id="company_url" name="company_url" tabIndex={-1} autoComplete="off" />
          </div>
          {[
            { id: "name", label: "name", type: "text", max: 80 },
            { id: "email", label: "email", type: "email", max: 254 },
          ].map((f) => (
            <div key={f.id}>
              <label htmlFor={f.id} className="font-mono text-[11px] uppercase text-foreground">
                {f.label}
              </label>
              <input
                id={f.id}
                name={f.id}
                type={f.type}
                maxLength={f.max}
                required
                className="mt-2 min-h-11 w-full border border-border bg-background px-3 py-2 font-mono text-xs text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          ))}
          <div>
            <label htmlFor="message" className="font-mono text-[11px] uppercase text-foreground">
              message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              maxLength={1000}
              required
              className="mt-2 w-full resize-y border border-border bg-background px-3 py-2 font-mono text-xs text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
            />
          </div>
          {errors.length > 0 && (
            <ul aria-live="polite" className="font-mono text-[11px] text-destructive">
              {errors.map((e) => (
                <li key={e}>! {e}</li>
              ))}
            </ul>
          )}
          {sent && (
            <div role="status" aria-live="polite" className="flex items-center gap-2 border border-primary/40 bg-primary/5 px-3 py-2.5 font-mono text-[11px] text-primary">
              <Check aria-hidden="true" className="h-4 w-4 shrink-0" />
              <span>[OK] MESSAGE RECEIVED SUCCESSFULLY</span>
            </div>
          )}
          <Button
            type="submit"
            disabled={sending}
            className="h-11 rounded-sm font-mono text-xs active:translate-y-px"
          >
            <Send aria-hidden="true" />{sending ? "sending…" : "send message"}
          </Button>
        </form>
      </div>
    </Section>
  );
}

/* ---------- footer ---------- */

export function SiteFooter() {
  const updated = new Date(__BUILD_DATE__);
  return (
    <footer className="relative mt-10 overflow-hidden border-t border-border">
      <img
        src={skull}
        alt=""
        loading="lazy"
        width={512}
        height={512}
        className="pointer-events-none absolute -right-6 -bottom-10 h-44 w-44 opacity-[0.05]"
      />
      <div className="relative mx-auto grid max-w-6xl gap-8 px-5 py-10 font-mono text-[11px] text-muted-foreground sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <div className="space-y-3">
          <p>
            © {updated.getFullYear()} {profile.name} · Aspiring SOC Analyst
          </p>
          <p className="text-[10px] text-primary">SESSION COMPLETE · SAFE TO DISCONNECT</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {[
              { label: "github", href: profile.links.github },
              { label: "linkedin", href: profile.links.linkedin },
              { label: "tryhackme", href: profile.links.tryhackme },
              { label: "reddit", href: profile.links.reddit },
            ].map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={l.label === "linkedin" ? undefined : () => trackClick(`footer-${l.label}`)}
                  className="nav-link inline-flex min-h-11 items-center gap-1.5 text-muted-foreground hover:text-primary"
                >
                  {l.label}{l.label === "github" ? <Github aria-hidden="true" className="h-3.5 w-3.5" /> : l.label === "linkedin" ? <Linkedin aria-hidden="true" className="h-3.5 w-3.5" /> : null}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <SiteQrCode fallbackUrl="https://andyydz.lovable.app/" />
      </div>
    </footer>
  );
}
