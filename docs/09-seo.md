# SEO

> Search-engine optimization implementation for **ANDYY-S-SITE**, grounded in `src/routes/index.tsx`, `src/routes/__root.tsx`, `src/routes/sitemap[.]xml.ts`, and `public/`, as traced in `02-requirements.md` and `03-system-architecture.md`.

---

## 1. Where SEO Is Implemented

SEO metadata is defined **at the route level**, not only in static files.

| Resource | Location |
|---|---|
| Default title, description, author, `og:site_name`, `twitter:card`, referrer meta | `src/routes/__root.tsx` (global defaults) |
| Page title, meta description, robots directive, Open Graph and Twitter tags, canonical link | `src/routes/index.tsx` (overrides the root defaults for `/`) |
| Schema.org JSON-LD `Person` | `src/routes/index.tsx`, generated from `profile` data |
| Search Console verification tag | `src/routes/index.tsx` |
| `robots.txt` | `public/robots.txt` |
| Sitemap | `src/routes/sitemap[.]xml.ts` (a dynamic server route, not a static file) |
| Social preview image | `public/og-image.jpg` |

---

## 2. Page Metadata

| Element | Present? | Detail |
|---|---|---|
| **Title** | Yes | Set per-page; `/` overrides the root default |
| **Meta description** | Yes | Descriptive summary of the portfolio |
| **Robots directive** | Yes | `index, follow` on `/`; `noindex, nofollow` on `/admin` |
| **Canonical URL** | Yes | Points to the production domain |
| **Author meta** | Yes | Set at the root level |

---

## 3. Social Sharing Metadata

| Standard | Implementation |
|---|---|
| **Open Graph** | `og:title`, `og:description`, `og:type`, `og:site_name`, `og:image` (pointing to `public/og-image.jpg`) |
| **Twitter / X Card** | `twitter:card` set to a large-image summary type, with matching title/description/image |

---

## 4. Structured Data

A **Schema.org `Person`** object is emitted as JSON-LD in the page head of `/`, built directly from the `profile` data object (name, alias, job title, email, image, description, and social links). This lets search engines associate the page with a specific person rather than treating it as generic content.

---

## 5. Crawler Files

| File | Role |
|---|---|
| **`public/robots.txt`** | Allows crawling of the public site, explicitly disallows `/admin`, and points to the sitemap |
| **`/sitemap.xml`** | Generated dynamically by a server route rather than served as a static file; returns a URL list with a one-hour cache header |

---

## 6. Verification

A Google Search Console ownership-verification meta tag is present on the homepage, allowing the property to be verified and monitored in Search Console.

---

## 7. Admin Route Exclusion

The `/admin` dashboard is deliberately kept out of search results through **two independent mechanisms**:

1. **`noindex, nofollow`** meta tag in the route's own metadata — tells a crawler that does reach the page not to index it or follow its links.
2. **`Disallow: /admin`** in `robots.txt` — asks well-behaved crawlers not to request the page at all.

These serve different purposes: `robots.txt` is a request not to *crawl*; `noindex` is an instruction not to *list* a page a crawler has already seen. Using both provides redundancy.

---

## 8. What Is Not Implemented

- No `hreflang` / internationalization metadata (the site is single-language, English).
- No AMP version.
- No blog or article-type structured data (only `Person`).
- No dynamic per-project SEO pages; individual projects live in their own linked repositories rather than dedicated portfolio pages.

---

## 9. Summary

The public homepage is fully equipped for discovery and sharing: indexable, canonical, described with Open Graph/Twitter metadata, backed by `Person` structured data, and covered by both a sitemap and `robots.txt`. The admin dashboard is deliberately and redundantly excluded from that same discovery surface.

