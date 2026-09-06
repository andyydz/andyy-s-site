import { useEffect, useMemo, useRef, useState } from "react";
import { MatrixRain } from "@/components/matrix-rain";
import { usePrefersReducedMotion } from "@/hooks/use-reveal";

const BOOT = [
  "INITIALIZING SYSTEM",
  "LOADING SECURITY PROFILE",
  "VERIFYING CREDENTIALS... OK",
  "ACCESS GRANTED",
];

const NAME = "ANDYY DZ";
const SCRAMBLE = "01<>{}[]#%$&*x";

export function IntroSequence({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);
  const [bootIndex, setBootIndex] = useState(0);
  const [decoded, setDecoded] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setLeaving(true);
    window.setTimeout(onDone, reduced ? 0 : 420);
  };

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }
    const timers: number[] = [];
    BOOT.forEach((_, i) =>
      timers.push(window.setTimeout(() => setBootIndex(i + 1), 400 + i * 420)),
    );
    timers.push(window.setTimeout(() => setPhase(1), 2100));
    timers.push(window.setTimeout(() => setPhase(2), 2700));
    timers.push(window.setTimeout(() => setPhase(3), 3900));
    timers.push(window.setTimeout(finish, 4900));
    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  useEffect(() => {
    if (phase < 2) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setDecoded(i);
      if (i >= NAME.length) window.clearInterval(id);
    }, 70);
    return () => window.clearInterval(id);
  }, [phase]);

  const nameChars = useMemo(
    () =>
      NAME.split("").map((ch, i) => {
        if (ch === " ") return " ";
        if (i < decoded) return ch;
        return SCRAMBLE[(i * 7 + decoded) % SCRAMBLE.length];
      }),
    [decoded],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (reduced) return null;

  return (
    <div
      role="dialog"
      aria-label="Intro animation"
      className={`fixed inset-0 z-[70] bg-background transition-opacity duration-300 ease-out ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
    >
      {phase >= 1 && <MatrixRain opacity={0.45} rampMs={1500} speed={1.6} />}

      <div className="relative flex h-full w-full flex-col items-center justify-center px-6 text-center">
        {phase === 0 && (
          <ul className="font-mono text-sm text-primary sm:text-base">
            {BOOT.slice(0, bootIndex).map((line, i) => (
              <li key={line} className={`animate-fade-in ${i === bootIndex - 1 ? "caret" : ""}`}>
                <span className="text-primary/60">&gt; </span>
                {line}
              </li>
            ))}
          </ul>
        )}

        {phase >= 2 && (
          <div className="transition-opacity duration-300 ease-out">
            <p
              className="font-mono text-4xl font-bold tracking-[0.15em] sm:text-6xl md:text-7xl"
              style={{
                color: "var(--alert)",
                textShadow: "0 0 18px color-mix(in oklab, var(--alert) 60%, transparent)",
              }}
            >
              {nameChars.map((c, i) => (
                <span key={i}>{c === " " ? "\u00A0" : c}</span>
              ))}
            </p>
            <p
              className={`mt-3 font-mono text-lg tracking-[0.35em] text-muted-foreground transition-opacity duration-500 ease-out sm:text-xl ${
                decoded >= NAME.length ? "opacity-100" : "opacity-0"
              }`}
            >
              FOUND.
            </p>
          </div>
        )}

        {phase >= 3 && (
          <div className="mt-8 font-mono text-xs leading-relaxed transition-opacity duration-300 ease-out sm:text-sm">
            <p className="text-accent">WARNING: UNAUTHORIZED SIGNATURE DETECTED</p>
            <p className="text-primary/80">SUBJECT IDENTIFIED — LOADING PROFILE...</p>
          </div>
        )}
      </div>

      <button
        onClick={finish}
        className="absolute right-4 top-4 border border-border-strong px-3 py-1.5 font-mono text-xs text-primary transition-colors duration-150 hover:bg-primary hover:text-primary-foreground sm:right-6 sm:top-6"
      >
        Skip Intro →
      </button>
    </div>
  );
}
