import { useEffect, useRef, useState } from "react";

type Phase = { key: string; label: string; tone: "primary" | "accent" | "info" | "alert" };

const PHASES: Phase[] = [
  { key: "normal", label: "NORMAL", tone: "primary" },
  { key: "anomaly", label: "ANOMALY", tone: "accent" },
  { key: "alert", label: "ALERT", tone: "alert" },
  { key: "investigating", label: "INVESTIGATING", tone: "accent" },
  { key: "contained", label: "CONTAINED", tone: "primary" },
];

const EVENTS = [
  { level: "INFO", text: "auth event received", tone: "info" },
  { level: "INFO", text: "endpoint telemetry normalized", tone: "info" },
  { level: "WARN", text: "unusual login pattern", tone: "accent" },
  { level: "ALERT", text: "suspicious process detected", tone: "alert" },
  { level: "INFO", text: "investigation started", tone: "info" },
  { level: "OK", text: "containment action simulated", tone: "primary" },
] as const;

// Source nodes around SOC core (viewBox 0 0 320 240, core at 160,120)
const SOURCES = [
  { id: "LOGS", x: 40, y: 40, mobile: true },
  { id: "EDR", x: 40, y: 120, mobile: true },
  { id: "IDS", x: 40, y: 200, mobile: false },
  { id: "NETWORK", x: 280, y: 40, mobile: false },
  { id: "CLOUD", x: 280, y: 200, mobile: true },
];

const toneVar: Record<string, string> = {
  primary: "var(--color-primary)",
  accent: "var(--color-accent)",
  info: "var(--color-info)",
  alert: "var(--color-alert)",
};

export function CyberOperationsCore() {
  const [phase, setPhase] = useState(0);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPhase(PHASES.length - 1);
      return;
    }
    const id = window.setInterval(() => {
      setPhase((p) => (p + 1) % PHASES.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--tilt-x", `${(-y * 6).toFixed(2)}deg`);
    el.style.setProperty("--tilt-y", `${(x * 6).toFixed(2)}deg`);
  };
  const onLeave = () => {
    tiltRef.current?.style.setProperty("--tilt-x", "0deg");
    tiltRef.current?.style.setProperty("--tilt-y", "0deg");
  };

  const current = PHASES[phase] ?? PHASES[0]!;
  const shown = EVENTS.slice(0, Math.min(EVENTS.length, phase + 2)).slice(-4);

  return (
    <div className="soc-stage" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div
        ref={tiltRef}
        className="soc-tilt panel shadow-terminal"
        data-phase={current.key}
        data-alert={current.key === "alert" || undefined}
      >
        <div className="flex items-center justify-between border-b border-border px-3 py-2 font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
          <span>SOC.CORE // SECURITY SIMULATION</span>
          <span
            className="inline-flex items-center gap-1.5"
            style={{ color: toneVar[current.tone] }}
            aria-live="polite"
          >
            <span className="soc-dot" style={{ background: toneVar[current.tone] }} />
            {current.label}
          </span>
        </div>

        <div className="soc-plane relative px-2 pt-2">
          <svg
            viewBox="0 0 320 240"
            className="w-full"
            role="img"
            aria-label="Simulated security flow: log, endpoint, intrusion, network and cloud telemetry flows into a SOC core, then detection, investigation and response"
          >
            <defs>
              <pattern id="soc-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M20 0H0V20" fill="none" stroke="var(--color-border)" strokeWidth="0.5" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="320" height="240" fill="url(#soc-grid)" />

            {SOURCES.map((s, i) => {
              const d = `M${s.x} ${s.y} L160 120`;
              return (
                <g key={s.id} className={s.mobile ? "" : "soc-desktop-only"}>
                  <path d={d} className="soc-link" />
                  <circle r="2.4" className="soc-pulse" style={{ fill: "var(--color-info)" }}>
                    <animateMotion dur={`${2.2 + i * 0.35}s`} repeatCount="indefinite" path={d} begin={`${i * 0.4}s`} />
                  </circle>
                  <rect x={s.x - 26} y={s.y - 9} width="52" height="18" className="soc-node" />
                  <text x={s.x} y={s.y + 3} textAnchor="middle" className="soc-label">
                    {s.id}
                  </text>
                  {phase === 2 && s.id === "EDR" && (
                    <circle cx={s.x} cy={s.y} r="3.2" className="soc-alert-particle">
                      <animateMotion begin="0s" dur="1.2s" repeatCount="1" path={d} />
                    </circle>
                  )}
                </g>
              );
            })}

            <circle cx="160" cy="120" r="34" className="soc-ring" style={{ stroke: toneVar[current.tone] }} />
            {phase === 2 && <circle cx="160" cy="120" r="25" className="soc-alert-ring" />}
            <circle cx="160" cy="120" r="24" className="soc-core" />
            <text x="160" y="117" textAnchor="middle" className="soc-label soc-label-strong">SOC</text>
            <text x="160" y="129" textAnchor="middle" className="soc-label">CORE</text>
          </svg>

          <ol className="grid grid-cols-3 gap-1.5 px-1 pb-2 font-mono text-[9px] tracking-[0.12em] sm:text-[10px]">
            {["DETECTION", "INVESTIGATION", "RESPONSE"].map((step, i) => (
              <li
                key={step}
                className="soc-step"
                data-active={phase >= i + 1 || undefined}
              >
                <span className="text-muted-foreground">0{i + 1}</span> {step}
              </li>
            ))}
          </ol>
        </div>

        <div className="soc-telemetry border-t border-border px-3 py-2 font-mono text-[10px] leading-relaxed sm:text-[11px]" data-phase={current.key}>
          <p className="mb-1 tracking-[0.18em] text-muted-foreground">SIMULATED TELEMETRY · NOT LIVE DATA</p>
          <ul className="min-h-[4.6rem] space-y-0.5" aria-hidden="true">
            {shown.map((e) => (
              <li key={e.text} className="soc-line truncate" data-level={e.level.toLowerCase()}>
                <span style={{ color: toneVar[e.tone] }}>[{e.level}]</span>{" "}
                <span className="soc-event-text text-muted-foreground">{e.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
