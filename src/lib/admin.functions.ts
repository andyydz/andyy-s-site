import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AdminOverview = {
  totals: { views: number; views7d: number; views30d: number; submissions: number };
  byDay: { day: string; views: number }[];
  byWeek: { week: string; views: number }[];
  referrers: { host: string; views: number }[];
  clicks: { label: string; count: number }[];
  submissions: { id: string; name: string; email: string; message: string; created_at: string }[];
};

function dayKey(iso: string) {
  return iso.slice(0, 10);
}

function weekKey(iso: string) {
  const d = new Date(iso);
  const day = (d.getUTCDay() + 6) % 7; // Monday-based
  d.setUTCDate(d.getUTCDate() - day);
  return d.toISOString().slice(0, 10);
}

function tally<T extends string>(keys: T[]) {
  const map = new Map<string, number>();
  for (const k of keys) map.set(k, (map.get(k) ?? 0) + 1);
  return [...map.entries()].map(([key, count]) => ({ key, count }));
}

/** Any signed-in user with no admin present yet becomes the admin (first-run bootstrap). */
export const claimAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if ((count ?? 0) > 0) return { granted: false };
    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (error) {
      console.error("[admin] role bootstrap failed");
      return { granted: false };
    }
    return { granted: true };
  });

export const isAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("user_roles")
      .select("id")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    return { admin: Boolean(data) };
  });

export const getAdminOverview = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminOverview> => {
    const { data: allowed } = await context.supabase
      .from("user_roles")
      .select("id")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!allowed) {
      console.warn("[admin] access denied for a signed-in account");
      throw new Error("Forbidden");
    }

    const since = new Date(Date.now() - 90 * 86_400_000).toISOString();

    const [views, clicks, submissions] = await Promise.all([
      context.supabase
        .from("page_views")
        .select("created_at, referrer_host")
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(5000),
      context.supabase
        .from("link_clicks")
        .select("label, created_at")
        .gte("created_at", since)
        .limit(5000),
      context.supabase
        .from("contact_submissions")
        .select("id, name, email, message, created_at")
        .order("created_at", { ascending: false })
        .limit(100),
    ]);

    const viewRows = views.data ?? [];
    const now = Date.now();
    const within = (iso: string, days: number) =>
      now - new Date(iso).getTime() <= days * 86_400_000;

    const byDay = tally(viewRows.map((v) => dayKey(v.created_at)))
      .sort((a, b) => (a.key < b.key ? 1 : -1))
      .slice(0, 30)
      .map((r) => ({ day: r.key, views: r.count }));

    const byWeek = tally(viewRows.map((v) => weekKey(v.created_at)))
      .sort((a, b) => (a.key < b.key ? 1 : -1))
      .slice(0, 12)
      .map((r) => ({ week: r.key, views: r.count }));

    const referrers = tally(viewRows.map((v) => v.referrer_host ?? "direct"))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
      .map((r) => ({ host: r.key, views: r.count }));

    const clickTotals = tally((clicks.data ?? []).map((c) => c.label))
      .sort((a, b) => b.count - a.count)
      .map((r) => ({ label: r.key, count: r.count }));

    return {
      totals: {
        views: viewRows.length,
        views7d: viewRows.filter((v) => within(v.created_at, 7)).length,
        views30d: viewRows.filter((v) => within(v.created_at, 30)).length,
        submissions: submissions.data?.length ?? 0,
      },
      byDay,
      byWeek,
      referrers,
      clicks: clickTotals,
      submissions: submissions.data ?? [],
    };
  });
