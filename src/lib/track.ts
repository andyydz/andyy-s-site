import { logLinkClick, logPageView } from "./tracking.functions";

/** Fire-and-forget click tracking. Never blocks or breaks the UI. */
export function trackClick(label: string) {
  void logLinkClick({ data: { label } }).catch(() => undefined);
}

/** Fire-and-forget page-view logging (server-side rate limited, no IPs stored). */
export function trackPageView(path: string) {
  void logPageView({
    data: { path, referrer: typeof document === "undefined" ? undefined : document.referrer },
  }).catch(() => undefined);
}
