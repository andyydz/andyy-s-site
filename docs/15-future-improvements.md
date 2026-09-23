# Future Improvements

> Potential enhancements for **ANDYY-S-SITE**. **Everything in this document is a proposal, not an existing feature.** Current functionality is documented in `07-features.md`; nothing here should be read as already implemented.

---

## 1. Portfolio / Content

| Improvement | Reason | Current Limitation | Potential Approach | Timeframe |
|---|---|---|---|---|
| Easier content management | Editing `profile.ts` requires a code change and redeploy | Content is a static TypeScript object with no editing UI | A lightweight admin content editor, or a headless CMS backing the same data shape | Medium-term |
| More dynamic portfolio data | Some content (TryHackMe stats) is manually re-typed | No live TryHackMe API is used | Revisit if TryHackMe publishes a stable public API | Long-term |

---

## 2. GitHub Integration

| Improvement | Reason | Current Limitation | Potential Approach | Timeframe |
|---|---|---|---|---|
| Better API resilience | Two unauthenticated public endpoints can rate-limit or fail | No retry logic; a single failed request shows the fallback state for that load | Add retry/backoff, or move the fetch to a server function that can use an authenticated GitHub token | Short-term |
| Caching | Every page load re-fetches from GitHub and the contributions API | No caching layer exists | Cache responses briefly (e.g. via a server function with a short TTL) to reduce external calls | Medium-term |
| Improved fallback | Current fallback is static text | Adequate but minimal | Show a cached "last known" value instead of only static content | Medium-term |
| More GitHub metrics | Only repo count, contributions, and recent activity are shown | Limited to what the two current endpoints provide | Add stars, languages, or pinned repositories if useful | Long-term |

---

## 3. Analytics

| Improvement | Reason | Current Limitation | Potential Approach | Timeframe |
|---|---|---|---|---|
| More advanced reporting | The dashboard shows fixed totals and simple groupings | No filtering, date-range selection, or drill-down | Add configurable date ranges and per-page breakdowns | Medium-term |
| Better aggregation | Aggregation happens in-memory in a single server function call, capped at 5,000 rows | Will not scale indefinitely | Move aggregation to database queries or a scheduled summarization job | Long-term |
| Export functionality | No way to export analytics or contact data | Data is only viewable in the dashboard UI | Add a CSV/JSON export for admins | Short-term |
| Visualization improvements | Current dashboard is table/number based | No charts | Add simple charts (e.g. a small charting library) for trends | Medium-term |

---

## 4. Contact

| Improvement | Reason | Current Limitation | Potential Approach | Timeframe |
|---|---|---|---|---|
| Email notification | The owner must check `/admin` to see new messages | No notification is sent when a message arrives (the `emailed` column exists but is never set) | Integrate a transactional email service to notify on new submissions | Short-term |
| Better notification workflow | Related to the above | No workflow beyond storage | Add read/unread status and reply tracking in the dashboard | Medium-term |
| Spam protection improvements | Current protection is a honeypot plus per-hash rate limiting | No CAPTCHA or more advanced bot detection | Add a lightweight challenge only if spam volume becomes a problem | Long-term |

---

## 5. Admin

| Improvement | Reason | Current Limitation | Potential Approach | Timeframe |
|---|---|---|---|---|
| Improved dashboard | Current dashboard covers totals, referrers, top links, and submissions | Limited depth (see Analytics above) | Combine with the analytics improvements above | Medium-term |
| Role management | Only one role (`admin`) exists, grantable once | No multi-user or multi-role support | Extend `user_roles` if multiple maintainers are ever needed | Long-term |
| More administrative controls | The dashboard is currently read-only | No ability to act on submissions (mark read, delete, reply) from the UI | Add basic submission-management actions | Medium-term |

---

## 6. Security

| Improvement | Reason | Current Limitation | Potential Approach | Timeframe |
|---|---|---|---|---|
| Additional security testing | No dependency scanning or static analysis for vulnerabilities runs today | Manual review only | Add `npm audit` (or similar) as a routine or CI step | Short-term |
| Stronger abuse prevention | Rate limiting is hash-based and application-level only | No network/CDN-level throttling | Consider a WAF or edge-level rate limiting if abuse becomes an issue | Long-term |
| More comprehensive monitoring | No alerting exists for anomalies (e.g. spikes in submissions) | Owner must check the dashboard manually | Add basic alerting on unusual activity | Medium-term |
| Security audit | No formal audit or penetration test has been performed | Self-assessed only (see `13-security.md`) | Commission or perform a structured review before handling more sensitive data | Long-term |

---

## 7. Testing

| Improvement | Reason | Current Limitation | Potential Approach | Timeframe |
|---|---|---|---|---|
| Automated unit tests | No unit tests exist today (`12-testing.md`) | Regressions in validation/rate-limiting logic would go undetected | Add Vitest coverage for `src/lib/*.functions.ts` | Short-term |
| Integration tests | No integration-level checks exist | Server function + database interactions are unverified by automation | Add tests against a local Supabase instance | Medium-term |
| End-to-end tests | No E2E suite exists | UI regressions (broken form, broken navigation) are only caught manually | Add a small Playwright suite for the core user flows | Medium-term |
| CI testing | No CI pipeline runs any check today | Nothing blocks a broken change from reaching `main` | Add a GitHub Actions workflow running lint, build, and (once added) tests | Short-term |

---

## 8. Performance

| Improvement | Reason | Current Limitation | Potential Approach | Timeframe |
|---|---|---|---|---|
| API caching | Every visit fetches fresh GitHub data | No caching (see Section 2) | Server-side or edge caching with a short TTL | Medium-term |
| Asset optimization | Images are imported directly with no explicit optimization pipeline confirmed | Unverified compression/format strategy | Audit image sizes and formats (e.g. WebP) | Short-term |
| Code splitting | The QR code library is already loaded on demand | Other bundle-size opportunities have not been audited | Analyze the production bundle and split further where beneficial | Long-term |
| Performance monitoring | No real-user or synthetic performance monitoring exists | No visibility into real-world load times | Add a lightweight monitoring tool (e.g. Vercel's own analytics, if adopted) | Medium-term |

---

## 9. Note on Timeframes

"Short-term", "medium-term" and "long-term" are **planning categories reflecting relative effort and dependency**, not objective priority rankings or a commitment to a schedule. An improvement's timeframe reflects how much groundwork it needs (for example, testing infrastructure before CI) rather than how important it is.

---

## 10. Summary

The current implementation is a complete, working personal cybersecurity portfolio with a public site, a private admin dashboard, first-party analytics, and a validated contact flow. The improvements above are opportunities to make GitHub data more resilient, analytics more capable, security posture independently verified, and the codebase covered by automated tests — none of which exist today, and none of which are required for the site to function as documented in `07-features.md`.
