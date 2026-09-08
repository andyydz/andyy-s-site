import { useEffect, useState } from "react";
import { FileDown, Menu, X } from "lucide-react";
import skull from "@/assets/skull.png";
import { Button } from "@/components/ui/button";

const SECTIONS = [
  { id: "about", label: "about" },
  { id: "skills", label: "skills" },
  { id: "projects", label: "projects" },
  { id: "certifications", label: "certs" },
  { id: "experience", label: "experience" },
  { id: "contact", label: "contact" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = ["top", ...SECTIONS.map((section) => section.id)]
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.2, 0.6] },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        scrolled ? "border-border bg-background/90 backdrop-blur" : "border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3 md:grid-cols-[auto_minmax(0,1fr)_auto]"
      >
        <a href="#top" className="flex min-w-0 items-center gap-2 font-mono text-sm text-foreground">
          <img
            src={skull}
            alt=""
            width={30}
            height={30}
            className="h-[30px] w-[30px] rounded-full border border-border object-cover"
          />
          <span className="truncate">
            andyy<span className="text-primary">dz</span>
          </span>
        </a>

        <ul className="hidden items-center justify-center gap-5 font-mono text-xs text-muted-foreground md:flex">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={active === s.id ? "location" : undefined}
                className="nav-link inline-flex min-h-11 items-center transition-colors hover:text-primary aria-[current=location]:text-primary"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <Button asChild variant="outline" className="hidden h-11 rounded-sm border-border-strong bg-transparent font-mono text-xs text-primary hover:bg-primary hover:text-primary-foreground md:inline-flex">
          <a href="/resume.pdf"><FileDown aria-hidden="true" />resume.pdf</a>
        </Button>

        <Button
          type="button"
          variant="outline"
          size="icon"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="h-11 w-11 rounded-sm border-border bg-transparent text-primary md:hidden"
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </nav>

      {open && (
        <ul className="border-t border-border bg-background/95 px-5 py-3 font-mono text-sm backdrop-blur md:hidden">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === s.id ? "location" : undefined}
                className="flex min-h-11 items-center border-b border-border/40 text-muted-foreground hover:text-primary aria-[current=location]:text-primary"
              >
                &gt; {s.label}
              </a>
            </li>
          ))}
          <li>
            <a href="/resume.pdf" className="flex min-h-11 items-center text-primary">
              &gt; resume.pdf
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
