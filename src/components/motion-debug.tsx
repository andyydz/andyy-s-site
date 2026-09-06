import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Motion debug overlay — dev/QA aid.
 * Toggle with Ctrl+Shift+D (or ?debug=motion). Never rendered for normal visitors
 * unless they deliberately open it.
 */

const MAX_MS = 400;

/** Ambient/looping effects intentionally exempt from the 400ms budget. */
const AMBIENT = new Set(["shimmer-sweep", "caret-blink", "pulse", "spin", "ping"]);

type AnimEntry = {
  key: string;
  label: string;
  target: string;
  duration: number;
  state: string;
  ambient: boolean;
  over: boolean;
};

type Check = { name: string; pass: boolean; detail: string };

function describe(el: Element | null | undefined) {
  if (!el || !(el instanceof Element)) return "—";
  const cls = (el.getAttribute("class") ?? "").split(/\s+/).filter(Boolean).slice(0, 2).join(".");
  return `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""}${cls ? `.${cls}` : ""}`;
}

function readAnimations(): AnimEntry[] {
  if (typeof document.getAnimations !== "function") return [];
  return document.getAnimations().map((a, i) => {
    const timing = a.effect?.getTiming();
    const duration = typeof timing?.duration === "number" ? timing.duration : 0;
    const target = (a.effect as KeyframeEffect | undefined)?.target as Element | undefined;
    const name =
      (a as CSSAnimation).animationName ??
      (a as CSSTransition).transitionProperty ??
      a.constructor.name;
    const ambient = AMBIENT.has(name) || (timing?.iterations ?? 1) === Infinity;
    return {
      key: `${i}-${name}`,
      label: name,
      target: describe(target),
      duration: Math.round(duration),
      state: a.playState,
      ambient,
      over: !ambient && duration > MAX_MS,
    };
  });
}

/** Parse the longest duration+delay (ms) out of a computed shorthand list. */
function longest(value: string) {
  return value
    .split(",")
    .map((v) => {
      const t = v.trim();
      if (t.endsWith("ms")) return parseFloat(t);
      if (t.endsWith("s")) return parseFloat(t) * 1000;
      return 0;
    })
    .reduce((m, n) => Math.max(m, n), 0);
}

function auditDurations(): Check[] {
  const offenders: string[] = [];
  const els = Array.from(document.querySelectorAll<HTMLElement>("body *")).slice(0, 3000);
  for (const el of els) {
    const cs = getComputedStyle(el);
    const t = longest(cs.transitionDuration);
    if (t > MAX_MS) offenders.push(`${describe(el)} transition ${Math.round(t)}ms`);
    const names = cs.animationName.split(",").map((n) => n.trim());
    const durs = cs.animationDuration.split(",").map((d) => longest(d));
    names.forEach((n, i) => {
      if (n === "none" || AMBIENT.has(n)) return;
      const iter = cs.animationIterationCount.split(",")[i]?.trim();
      if (iter === "infinite") return;
      const d = durs[i] ?? 0;
      if (d > MAX_MS) offenders.push(`${describe(el)} @${n} ${Math.round(d)}ms`);
    });
  }
  const unique = Array.from(new Set(offenders));
  return [
    {
      name: `all animations <= ${MAX_MS}ms`,
      pass: unique.length === 0,
      detail: unique.length === 0 ? "no offenders in DOM" : unique.slice(0, 6).join(" | "),
    },
  ];
}

function auditReducedMotion(simulated: boolean): Check[] {
  const active = window.matchMedia("(prefers-reduced-motion: reduce)").matches || simulated;
  const checks: Check[] = [
    {
      name: "prefers-reduced-motion",
      pass: true,
      detail: active
        ? simulated
          ? "simulated (class forced)"
          : "reduce — enforcement checked below"
        : "no-preference — enable OS setting or press [simulate]",
    },
  ];
  if (!active) return checks;

  const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
  const bad = reveals.filter((el) => {
    const cs = getComputedStyle(el);
    return (
      longest(cs.transitionDuration) > 1 || cs.transform !== "none" || parseFloat(cs.opacity) < 1
    );
  });
  checks.push({
    name: `.reveal transforms/opacity disabled (${reveals.length} nodes)`,
    pass: bad.length === 0,
    detail: bad.length === 0 ? "all instantly visible, no transitions" : describe(bad[0]),
  });

  const animated = readAnimations().filter((a) => a.duration > 1 && a.state === "running");
  checks.push({
    name: "no running keyframe animations",
    pass: animated.length === 0,
    detail:
      animated.length === 0 ? "canvas + keyframes idle" : animated.map((a) => a.label).join(", "),
  });

  const canvases = document.querySelectorAll("canvas");
  checks.push({
    name: "matrix rain canvas removed",
    // JS reads the real media query at mount, so the CSS-only simulation
    // cannot unmount the canvas — informational in that mode.
    pass: canvases.length === 0 || simulated,
    detail:
      canvases.length === 0
        ? "0 canvases mounted"
        : simulated
          ? `${canvases.length} canvas node(s) — n/a under CSS simulation, use the OS setting`
          : `${canvases.length} canvas node(s)`,
  });
  return checks;
}

export function MotionDebug() {
  const [open, setOpen] = useState(false);
  const [anims, setAnims] = useState<AnimEntry[]>([]);
  const [checks, setChecks] = useState<Check[]>([]);
  const [simulated, setSimulated] = useState(false);
  const raf = useRef(0);
  const last = useRef(0);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("debug") === "motion") setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const runAudit = useCallback(() => {
    setChecks([...auditDurations(), ...auditReducedMotion(simulated)]);
  }, [simulated]);

  useEffect(() => {
    if (!open) return;
    const loop = (t: number) => {
      if (t - last.current > 250) {
        last.current = t;
        setAnims(readAnimations());
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    runAudit();
    return () => cancelAnimationFrame(raf.current);
  }, [open, runAudit]);

  useEffect(() => {
    document.documentElement.classList.toggle("force-reduced-motion", simulated);
    return () => document.documentElement.classList.remove("force-reduced-motion");
  }, [simulated]);

  if (!open) return null;

  const running = anims.filter((a) => a.state === "running");
  const failing = checks.filter((c) => !c.pass);

  return (
    <aside
      aria-label="Motion debug overlay"
      className="no-print panel fixed bottom-3 left-3 z-[70] max-h-[70vh] w-[min(92vw,26rem)] overflow-auto bg-background/95 p-3 font-mono text-[11px] text-muted-foreground backdrop-blur"
    >
      <header className="flex items-center justify-between gap-2 border-b border-border pb-2">
        <p className="text-primary">$ motion --debug</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSimulated((v) => !v)}
            className="border border-border px-2 py-0.5 transition-colors duration-150 hover:border-border-strong hover:text-primary"
          >
            {simulated ? "unsimulate" : "simulate"} reduced-motion
          </button>
          <button
            type="button"
            onClick={runAudit}
            className="border border-border px-2 py-0.5 transition-colors duration-150 hover:border-border-strong hover:text-primary"
          >
            re-run
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close motion debug overlay"
            className="border border-border px-2 py-0.5 hover:text-primary"
          >
            ×
          </button>
        </div>
      </header>

      <p className="mt-2">
        <span className={failing.length === 0 ? "text-primary" : "text-destructive"}>
          {failing.length === 0 ? "PASS" : `FAIL (${failing.length})`}
        </span>{" "}
        · budget {MAX_MS}ms · running {running.length}/{anims.length}
      </p>

      <ul className="mt-2 space-y-1">
        {checks.map((c) => (
          <li key={c.name}>
            <span className={c.pass ? "text-primary" : "text-destructive"}>
              [{c.pass ? "ok" : "!!"}]
            </span>{" "}
            {c.name}
            <span className="block pl-6 text-[10px] opacity-70">{c.detail}</span>
          </li>
        ))}
      </ul>

      <p className="mt-3 border-t border-border pt-2 text-accent">live animation states</p>
      {anims.length === 0 && <p className="opacity-70">idle — nothing animating</p>}
      <ul className="mt-1 space-y-0.5">
        {anims.map((a) => (
          <li key={a.key} className="flex justify-between gap-2">
            <span className="truncate">
              <span className={a.over ? "text-destructive" : "text-primary"}>{a.label}</span>{" "}
              <span className="opacity-60">{a.target}</span>
            </span>
            <span className="shrink-0">
              {a.duration}ms {a.ambient ? "∞" : ""} · {a.state}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[10px] opacity-60">Ctrl+Shift+D toggles this panel.</p>
    </aside>
  );
}
