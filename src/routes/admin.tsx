import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { claimAdmin, getAdminOverview } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Admin — andyy dz" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Private dashboard." },
    ],
  }),
  component: AdminPage,
});

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="panel p-4">
      <h2 className="font-mono text-xs text-primary">&gt; {title}</h2>
      <div className="mt-3 font-mono text-[11px] text-muted-foreground">{children}</div>
    </section>
  );
}

function LoginCard({ onSignedIn }: { onSignedIn: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [mode, setMode] = useState<"in" | "up">("in");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const fn =
      mode === "in"
        ? supabase.auth.signInWithPassword({ email, password })
        : supabase.auth.signUp({
            email,
            password,
            options: { emailRedirectTo: `${window.location.origin}/admin` },
          });
    const { error: err } = await fn;
    setBusy(false);
    if (err) {
      setError(err.message);
      return;
    }
    onSignedIn();
  };

  return (
    <form onSubmit={submit} className="panel mx-auto mt-24 max-w-sm space-y-3 p-5">
      <p className="font-mono text-xs text-primary">$ sudo login</p>
      <div>
        <label htmlFor="admin-email" className="font-mono text-[11px] text-muted-foreground">
          email
        </label>
        <input
          id="admin-email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full border border-border bg-background px-3 py-2 font-mono text-xs text-foreground outline-none focus-visible:border-border-strong"
        />
      </div>
      <div>
        <label htmlFor="admin-pass" className="font-mono text-[11px] text-muted-foreground">
          password
        </label>
        <input
          id="admin-pass"
          type="password"
          autoComplete="current-password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full border border-border bg-background px-3 py-2 font-mono text-xs text-foreground outline-none focus-visible:border-border-strong"
        />
      </div>
      {error && <p className="font-mono text-[11px] text-destructive">! {error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="min-h-11 w-full border border-primary bg-primary px-4 py-2 font-mono text-xs text-primary-foreground disabled:opacity-60"
      >
        {busy ? "authenticating…" : mode === "in" ? "authenticate" : "create owner account"}
      </button>
      <button
        type="button"
        onClick={() => setMode(mode === "in" ? "up" : "in")}
        className="min-h-11 w-full font-mono text-[11px] text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
      >
        {mode === "in" ? "first time? create the owner account" : "back to sign in"}
      </button>
    </form>
  );
}

function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const claim = useServerFn(claimAdmin);
  const overview = useServerFn(getAdminOverview);

  useEffect(() => {
    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        setSession(s ?? null);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const query = useQuery({
    queryKey: ["admin-overview", session?.user.id],
    queryFn: async () => {
      const access = await claim({});
      if (!access.granted) throw new Error("Forbidden");
      return overview({});
    },
    enabled: Boolean(session),
    retry: false,
  });

  if (!ready) {
    return (
      <main className="mx-auto max-w-5xl px-5 py-20 font-mono text-xs text-muted-foreground">
        checking session…
      </main>
    );
  }

  if (!session) {
    return (
      <main className="mx-auto max-w-5xl px-5 pb-20">
        <LoginCard onSignedIn={() => undefined} />
      </main>
    );
  }

  const data = query.data;

  return (
    <main className="mx-auto max-w-5xl space-y-4 px-5 py-12">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-mono text-lg text-foreground">
          <span className="text-primary">&gt; </span>admin.sh
        </h1>
        <button
          type="button"
          onClick={() => void supabase.auth.signOut()}
          className="min-h-11 border border-border px-4 py-2 font-mono text-xs text-muted-foreground hover:border-border-strong hover:text-primary"
        >
          sign out
        </button>
      </header>

      {query.isLoading && <p className="font-mono text-xs text-muted-foreground">loading data…</p>}
      {query.isError && (
        <p className="font-mono text-xs text-destructive">
          ! access denied — this account is not the site owner.
        </p>
      )}

      {data && (
        <div className="grid gap-4 md:grid-cols-2">
          <Panel title="totals">
            <ul className="space-y-1">
              <li>views (90d): <span className="text-accent">{data.totals.views}</span></li>
              <li>views (30d): <span className="text-accent">{data.totals.views30d}</span></li>
              <li>views (7d): <span className="text-accent">{data.totals.views7d}</span></li>
              <li>messages: <span className="text-accent">{data.totals.submissions}</span></li>
            </ul>
          </Panel>

          <Panel title="most-clicked links">
            {data.clicks.length === 0 ? (
              <p>no clicks recorded yet</p>
            ) : (
              <ul className="space-y-1">
                {data.clicks.map((c) => (
                  <li key={c.label}>
                    {c.label}: <span className="text-accent">{c.count}</span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel title="visits by day">
            {data.byDay.length === 0 ? (
              <p>no views yet</p>
            ) : (
              <ul className="space-y-1">
                {data.byDay.map((d) => (
                  <li key={d.day}>
                    {d.day} <span className="text-accent">{d.views}</span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel title="visits by week">
            {data.byWeek.length === 0 ? (
              <p>no views yet</p>
            ) : (
              <ul className="space-y-1">
                {data.byWeek.map((w) => (
                  <li key={w.week}>
                    week of {w.week} <span className="text-accent">{w.views}</span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel title="referrers">
            {data.referrers.length === 0 ? (
              <p>none</p>
            ) : (
              <ul className="space-y-1">
                {data.referrers.map((r) => (
                  <li key={r.host}>
                    {r.host} <span className="text-accent">{r.views}</span>
                  </li>
                ))}
              </ul>
            )}
          </Panel>

          <Panel title="contact submissions">
            {data.submissions.length === 0 ? (
              <p>inbox empty</p>
            ) : (
              <ul className="space-y-3">
                {data.submissions.map((s) => (
                  <li key={s.id} className="border-l border-border pl-3">
                    <p className="text-foreground">
                      {s.name} &lt;{s.email}&gt;
                    </p>
                    <p className="text-[10px]">{new Date(s.created_at).toLocaleString()}</p>
                    <p className="mt-1 whitespace-pre-wrap">{s.message}</p>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      )}
    </main>
  );
}
