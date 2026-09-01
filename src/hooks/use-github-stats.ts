import { useEffect, useState } from "react";

export type GitHubStats = {
  repos: number;
  /** Total contributions over the last year (null when unavailable). */
  contributions: number | null;
  events: string[];
};

type Event = { type: string; repo?: { name: string }; payload?: { commits?: unknown[] } };

const HANDLE = "andyydz";

export function useGitHubStats() {
  const [data, setData] = useState<GitHubStats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const [userRes, eventsRes, contribRes] = await Promise.all([
          fetch(`https://api.github.com/users/${HANDLE}`),
          fetch(`https://api.github.com/users/${HANDLE}/events/public?per_page=30`),
          fetch(`https://github-contributions-api.jogruber.de/v4/${HANDLE}?y=last`).catch(
            () => null,
          ),
        ]);
        if (!userRes.ok) throw new Error("github");
        const user = (await userRes.json()) as { public_repos: number };
        const events = eventsRes.ok ? ((await eventsRes.json()) as Event[]) : [];

        let contributions: number | null = null;
        if (contribRes?.ok) {
          const contrib = (await contribRes.json()) as {
            total?: Record<string, number>;
          };
          const totals = Object.values(contrib.total ?? {});
          if (totals.length) contributions = totals.reduce((a, b) => a + b, 0);
        }

        const lines = events
          .filter((e) => e.type === "PushEvent" || e.type === "CreateEvent")
          .slice(0, 3)
          .map((e) => {
            const repo = e.repo?.name?.split("/")[1] ?? "repo";
            if (e.type === "CreateEvent") return `[LOG] Created repository ${repo}`;
            const n = e.payload?.commits?.length ?? 1;
            return `[LOG] Pushed ${n} commit${n === 1 ? "" : "s"} to ${repo}`;
          });

        if (cancelled) return;
        setData({ repos: user.public_repos, contributions, events: lines });
      } catch {
        if (!cancelled) setError(true);
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  return { data, error, loading: !data && !error };
}
