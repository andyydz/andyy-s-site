import { useEffect, useState } from "react";
import skull from "@/assets/skull.png";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`no-print fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        scrolled ? "border-border bg-background/90 backdrop-blur" : "border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3"
      >
        <a href="#top" className="flex items-center gap-2 font-mono text-sm text-foreground">
          <img
            src={skull}
            alt=""
            width={30}
            height={30}
            className="h-[30px] w-[30px] rounded-full border border-border object-cover"
          />
          <span>
            andyy<span className="text-primary">dz</span>
          </span>
        </a>

        <ul className="hidden items-center gap-6 font-mono text-xs text-muted-foreground md:flex">
          {SECTIONS.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} className="nav-link hover:text-primary">
                {s.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/resume.pdf"
          className="hidden border border-border-strong px-3 py-1.5 font-mono text-xs text-primary transition-colors duration-150 hover:bg-primary hover:text-primary-foreground md:inline-block"
        >
          resume.pdf
        </a>

        <button
          type="button"
          aria-expanded={open}
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="border border-border px-2 py-1 font-mono text-xs text-primary md:hidden"
        >
          {open ? "[ x ]" : "[ ≡ ]"}
        </button>
      </nav>

      {open && (
        <ul className="border-t border-border bg-background px-5 py-3 font-mono text-sm md:hidden">
          {SECTIONS.map((s) => (
            <li key={s.id} className="py-1.5">
              <a
                href={`#${s.id}`}
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-primary"
              >
                &gt; {s.label}
              </a>
            </li>
          ))}
          <li className="py-1.5">
            <a href="/resume.pdf" className="text-primary">
              &gt; resume.pdf
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
