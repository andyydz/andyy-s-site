import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";

/** One-way, non-reversible visitor fingerprint. No IP address is ever stored. */
async function visitorHash(): Promise<string> {
  const request = getRequest();
  const headers = request?.headers;
  const ip =
    headers?.get("cf-connecting-ip") ??
    headers?.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const ua = headers?.get("user-agent") ?? "unknown";
  // Daily rotating salt so hashes are not stable long-term identifiers.
  const day = new Date().toISOString().slice(0, 10);
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${ip}|${ua}|${day}|andyydz-portfolio`),
  );
  return Array.from(new Uint8Array(digest))
    .slice(0, 16)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function referrerHost(referrer: string | undefined): string | null {
  if (!referrer) return null;
  try {
    return new URL(referrer).hostname.slice(0, 120);
  } catch {
    return null;
  }
}

function windowStart(minutes: number) {
  return new Date(Date.now() - minutes * 60_000).toISOString();
}

async function countViewsSince(hash: string, minutes: number) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { count } = await supabaseAdmin
    .from("page_views")
    .select("id", { count: "exact", head: true })
    .eq("visitor_hash", hash)
    .gte("created_at", windowStart(minutes));
  return count ?? 0;
}

async function countSubmissionsSince(hash: string, minutes: number) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { count } = await supabaseAdmin
    .from("contact_submissions")
    .select("id", { count: "exact", head: true })
    .eq("sender_hash", hash)
    .gte("created_at", windowStart(minutes));
  return count ?? 0;
}

export const logPageView = createServerFn({ method: "POST" })
  .inputValidator((data) =>
    z
      .object({
        path: z.string().max(200),
        referrer: z.string().max(500).optional(),
      })
      .parse(data),
  )
  .handler(async ({ data }) => {
    try {
      const hash = await visitorHash();
      // Rate limit: at most 30 logged views per visitor per hour.
      if ((await countViewsSince(hash, 60)) >= 30) {
        return { ok: true, throttled: true };
      }
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      await supabaseAdmin.from("page_views").insert({
        path: data.path.slice(0, 200),
        referrer_host: referrerHost(data.referrer),
        visitor_hash: hash,
      });
      return { ok: true, throttled: false };
    } catch (error) {
      console.error("[analytics] page view logging failed", error);
      return { ok: false, throttled: false };
    }
  });

export const logLinkClick = createServerFn({ method: "POST" })
  .inputValidator((data) => z.object({ label: z.string().min(1).max(60) }).parse(data))
  .handler(async ({ data }) => {
    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      await supabaseAdmin.from("link_clicks").insert({ label: data.label.slice(0, 60) });
      return { ok: true };
    } catch (error) {
      console.error("[analytics] link click logging failed", error);
      return { ok: false };
    }
  });

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(1000),
  company_url: z.string().max(200).optional(),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    // Honeypot: silently accept, never store.
    if (data.company_url) return { ok: true as const };

    const hash = await visitorHash();
    if ((await countSubmissionsSince(hash, 60)) >= 3) {
      throw new Error("Too many messages sent from this connection. Please try again later.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      message: data.message,
      sender_hash: hash,
      emailed: false,
    });
    if (error) {
      console.error("[contact] insert failed");
      throw new Error("Could not deliver your message. Please email directly instead.");
    }
    return { ok: true as const };
  });
