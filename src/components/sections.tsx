import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { useGitHubStats } from "@/hooks/use-github-stats";
import { usePrefersReducedMotion, useReveal } from "@/hooks/use-reveal";
import skull from "@/assets/skull.png";

/* ---------- shared bits ---------- */

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="reveal font-mono text-lg text-foreground sm:text-xl">
      <span className="text-primary">&gt; </span>
      {children}
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
    <section id={id} ref={ref} className="mx-auto max-w-6xl scroll-mt-24 px-5 py-14">
      <SectionHeading>{heading}</SectionHeading>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function delay(i: number) {
  return { "--reveal-delay": `${i * 70}ms` } as React.CSSProperties;
}

/* ---------- system log strip ---------- */

export function LogStrip() {
  const { data, loading } = useGitHubStats();
  const lines = data?.events?.length ? [...data.events, profile.logLines[0]!] : profile.logLines;

  return (
    <div className="mx-auto max-w-6xl px-5">
      <div className="panel px-4 py-3 font-mono text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
        <p className="mb-1 text-primary/70">$ tail -f /var/log/andyydz.log</p>
        {loading && <p className="text-muted-foreground">fetching activity…</p>}
        {lines.slice(0, 3).map((l) => (
          <p key={l}>
            <span className="text-accent">{l.slice(0, 5)}</span>
            {l.slice(5)}
          </p>
        ))}
      </div>
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
      const p = Math.min(1, (t - start) / 1000);
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
      className="panel shimmer-border reveal px-4 py-5 transition-[transform,border-color] duration-150 ease-out hover:-translate-y-0.5 hover:border-border-strong"
      style={delay(index)}
    >
      <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">{stat.label}</p>
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
    <section ref={ref} className="mx-auto max-w-6xl px-5 py-10">
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
            · public repos: <span className="text-accent">{data.repos}</span> · recent commits:{" "}
            <span className="text-accent">{data.contributions ?? "—"}</span> · followers:{" "}
            <span className="text-accent">{data.followers}</span>
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
      <p className="reveal panel max-w-3xl p-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
        {profile.about}
      </p>
    </Section>
  );
}

/* ---------- skills ---------- */

export function Skills() {
  const [open, setOpen] = useState<string | null>(profile.skillGroups[0]?.name ?? null);
  return (
    <Section id="skills" heading="ls skills/">
      <div className="space-y-3">
        {profile.skillGroups.map((group, gi) => {
          const isOpen = open === group.name;
          return (
            <div key={group.name} className="panel reveal" style={delay(gi)}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : group.name)}
                className="flex w-full items-center justify-between px-4 py-3 font-mono text-xs text-primary sm:text-sm"
              >
                <span>
                  &gt; expand: {group.name}{" "}
                  <span className="text-muted-foreground">[{group.items.length}]</span>
                </span>
                <span className="text-muted-foreground">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <ul className="flex flex-wrap gap-2 border-t border-border px-4 py-4">
                  {group.items.map((item, i) => (
                    <li
                      key={item}
                      className="reveal is-visible border border-border px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors duration-150 hover:border-border-strong hover:text-primary"
                      style={delay(i)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/* ---------- projects ---------- */

export function Projects() {
  const f = profile.featuredProject;
  return (
    <Section id="projects" heading="ls projects/">
      <article className="panel shimmer-border reveal p-5 transition-[transform,border-color] duration-150 ease-out hover:-translate-y-0.5 hover:border-border-strong">
        <p className="font-mono text-[10px] tracking-[0.2em] text-accent">FEATURED CASE STUDY</p>
        <h3 className="mt-2 font-mono text-base text-primary sm:text-lg">
          <a href={f.repo} target="_blank" rel="noreferrer noopener" className="nav-link">
            {f.name}
          </a>
        </h3>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          {[
            ["problem", f.problem],
            ["approach", f.approach],
            ["outcome", f.outcome],
            ["what's next", f.next],
          ].map(([k, v], i) => (
            <div key={k} className="reveal" style={delay(i)}>
              <dt className="font-mono text-[11px] text-accent">&gt; {k}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      </article>

      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {profile.projects.map((p, i) => (
          <article
            key={p.name}
            className="panel shimmer-border reveal flex flex-col p-5 transition-[transform,border-color] duration-150 ease-out hover:-translate-y-0.5 hover:border-border-strong"
            style={delay(i)}
          >
            <h3 className="font-mono text-sm text-primary">
              <a href={p.repo} target="_blank" rel="noreferrer noopener" className="nav-link">
                {p.name}
              </a>
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {p.description}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <li key={t} className="border border-border px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
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
      <div className="panel reveal overflow-x-auto">
        <table className="w-full min-w-[420px] font-mono text-xs">
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
              <tr key={c.name} className="border-b border-border/60 last:border-0">
                <td className="px-4 py-2.5 text-foreground">{c.name}</td>
                <td className="px-4 py-2.5 text-muted-foreground">{c.issuer}</td>
                <td className="px-4 py-2.5 text-accent">{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="reveal mt-3 font-mono text-[11px] text-muted-foreground">
        <span className="text-primary">#</span> {profile.certsInProgress}
      </p>
    </Section>
  );
}

/* ---------- experience + volunteering ---------- */

function TimelineList({ items }: { items: typeof profile.experience }) {
  return (
    <div className="space-y-4">
      {items.map((e, i) => (
        <article key={e.role} className="panel reveal p-5" style={delay(i)}>
          <h3 className="font-mono text-sm text-primary">{e.role}</h3>
          <p className="mt-1 font-mono text-[11px] text-muted-foreground">
            {e.org} · <span className="text-accent">{e.period}</span>
          </p>
          <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
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
  const t = profile.testimonial;
  return (
    <Section id="testimonial" heading="cat testimonial.txt">
      <blockquote className="panel reveal max-w-3xl p-5">
        <p className="text-sm leading-relaxed text-foreground italic sm:text-base">“{t.quote}”</p>
        <footer className="mt-3 font-mono text-[11px] text-muted-foreground">
          — {t.author}, {t.role}
        </footer>
      </blockquote>
    </Section>
  );
}

/* ---------- contact ---------- */

export function Contact() {
  const [errors, setErrors] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const honey = String(fd.get("company_url") ?? "");
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    const errs: string[] = [];
    if (honey) errs.push("submission rejected");
    if (name.length < 2 || name.length > 80) errs.push("name must be 2–80 characters");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
      errs.push("valid email required");
    if (message.length < 10 || message.length > 1000) errs.push("message must be 10–1000 characters");
    setErrors(errs);
    if (errs.length) return;

    const subject = encodeURIComponent(`Portfolio contact — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <Section id="contact" heading="./contact.sh">
      <div className="grid gap-4 md:grid-cols-2">
        <ul className="panel reveal space-y-3 p-5 font-mono text-xs sm:text-sm">
          {[
            ["email", `mailto:${profile.email}`, profile.email],
            ["github", profile.links.github, "github.com/andyydz"],
            ["linkedin", profile.links.linkedin, "linkedin.com/in/andrew-vinston-d-souza"],
            ["tryhackme", profile.links.tryhackme, "tryhackme.com/p/andyydz57"],
          ].map(([label, href, text], i) => (
            <li key={label} className="reveal" style={delay(i)}>
              <span className="text-muted-foreground">{label}:</span>{" "}
              <a
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noreferrer noopener"
                className="nav-link text-primary break-all"
              >
                {text}
              </a>
            </li>
          ))}
        </ul>

        <form onSubmit={onSubmit} className="panel reveal no-print space-y-3 p-5" noValidate>
          <div className="hidden" aria-hidden="true">
            <label htmlFor="company_url">Company URL</label>
            <input id="company_url" name="company_url" tabIndex={-1} autoComplete="off" />
          </div>
          {[
            { id: "name", label: "name", type: "text", max: 80 },
            { id: "email", label: "email", type: "email", max: 254 },
          ].map((f) => (
            <div key={f.id}>
              <label htmlFor={f.id} className="font-mono text-[11px] text-muted-foreground">
                {f.label}
              </label>
              <input
                id={f.id}
                name={f.id}
                type={f.type}
                maxLength={f.max}
                required
                className="mt-1 w-full border border-border bg-background px-3 py-2 font-mono text-xs text-foreground outline-none focus:border-border-strong"
              />
            </div>
          ))}
          <div>
            <label htmlFor="message" className="font-mono text-[11px] text-muted-foreground">
              message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              maxLength={1000}
              required
              className="mt-1 w-full border border-border bg-background px-3 py-2 font-mono text-xs text-foreground outline-none focus:border-border-strong"
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
            <p aria-live="polite" className="font-mono text-[11px] text-primary">
              &gt; opening your mail client…
            </p>
          )}
          <button
            type="submit"
            className="border border-primary bg-primary px-4 py-2 font-mono text-xs text-primary-foreground transition-transform duration-150 hover:-translate-y-0.5"
          >
            send message
          </button>
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
      <div className="relative mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 font-mono text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {updated.getFullYear()} {profile.name} · Aspiring SOC Analyst
        </p>
        <p>
          last updated:{" "}
          <span className="text-primary">
            {updated.toISOString().slice(0, 10)}
          </span>
        </p>
      </div>
    </footer>
  );
}
