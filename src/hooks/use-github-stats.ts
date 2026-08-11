import { useEffect, useState } from "react";

export type GitHubStats = {
  repos: number;
  followers: number;
  contributions: number | null;
  events: string[];
};

type Repo = { name: string; stargazers_count: number };
type Event = { type: string; repo?: { name: string }; payload?: { commits?: unknown[] } };

const HANDLE = "andyydz";

export function useGitHubStats() {
  const [data, setData] = useState<GitHubStats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const [userRes, reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${HANDLE}`),
          fetch(`https://api.github.com/users/${HANDLE}/repos?per_page=100&sort=pushed`),
          fetch(`https://api.github.com/users/${HANDLE}/events/public?per_page=30`),
        ]);
        if (!userRes.ok) throw new Error("github");
        const user = (await userRes.json()) as { public_repos: number; followers: number };
        const repos = reposRes.ok ? ((await reposRes.json()) as Repo[]) : [];
        const events = eventsRes.ok ? ((await eventsRes.json()) as Event[]) : [];

        const pushes = events.filter((e) => e.type === "PushEvent");
        const commitCount = pushes.reduce((n, e) => n + (e.payload?.commits?.length ?? 0), 0);
        const lines = pushes.slice(0, 3).map((e) => {
          const repo = e.repo?.name?.split("/")[1] ?? "repo";
          const n = e.payload?.commits?.length ?? 1;
          return `[LOG] Pushed ${n} commit${n === 1 ? "" : "s"} to ${repo}`;
        });

        if (cancelled) return;
        setData({
          repos: user.public_repos,
          followers: user.followers,
          contributions: commitCount || null,
          events: lines,
        });
        void repos;
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
