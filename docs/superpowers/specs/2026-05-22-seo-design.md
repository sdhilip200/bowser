# Bowser SEO — Design Spec

**Date:** 2026-05-22
**Author:** Dhilip Subramanian (with Claude Code)
**Status:** Approved for planning

---

## 1. Goal

Make `bowser.nz` discoverable and shareable so the project gets noticed as a
portfolio piece across New Zealand, Australia, and the wider world.

The work splits into three concrete jobs:

1. **Discoverability** — rank in Google Search for relevant queries (NZ fuel
   prices, global crude oil).
2. **Shareability** — produce a clean preview card when the link is posted on
   LinkedIn, X, Slack, iMessage.
3. **Attribution** — connect the *site* to the *author* (Dhilip Subramanian) so
   recruiters and AI assistants can link `bowser.nz` ↔ the person who built it.

### Honest scope boundary

SEO makes the site discoverable; it cannot manufacture geography. Bowser's
content is NZ-fuel-specific, so it will rank naturally for NZ fuel queries and
compete for global crude/oil queries — it will **not** rank for "Australia
petrol prices" because it does not cover that. Cross-border reach for a
portfolio comes from shareability (Part 2) and attribution (Part 3), plus the
author actively sharing the link. This spec optimises those levers honestly and
does not promise rankings the content cannot support.

---

## 2. Approach

**Chosen: static-first SEO, done thoroughly.** All SEO signals live in static
files (`index.html`, `robots.txt`, `sitemap.xml`) or in a tiny route-meta
helper. No prerendering, no framework migration.

**Rejected alternatives:**

- *Build-time prerender step* — real but modest benefit; adds build complexity
  to an architecture CLAUDE.md deliberately keeps simple (static frontend,
  single JSON snapshot). Revisit only if Search Console later shows crawl/render
  problems. Documented as a possible Phase 2, out of scope here.
- *Next.js SSR migration* — a full rewrite for marginal gain over static-first.
  Rejected.

**Why static-first is sufficient:** Googlebot renders JavaScript, so it sees the
dashboard. The bots that do *not* run JS — link-preview bots and some AI
crawlers — are served by static meta tags, JSON-LD, and a `<noscript>` fallback.
That captures ~95% of the value at zero architectural risk.

Per Google's AI optimization guide: there is no separate "AI SEO." AI Overviews
and AI Mode use the same index as Search. The guide explicitly says to skip
`llms.txt`, special markup, and artificial content chunking. This spec follows
that — solid traditional SEO is the whole strategy.

---

## 3. Design — six parts

### Part 1 — `index.html` head overhaul

Replace the minimal head with a complete static meta block.

- `<html lang="en-NZ">` (currently `en`).
- Keep `charset`, `viewport`, favicon.
- **Title:** `bowser — New Zealand fuel prices & the global crude oil story`
- **Meta description:** `Bowser connects global crude oil markets to New Zealand pump prices: Brent and WTI futures, MBIE retail data, and where every fuel dollar goes.`
- `<link rel="canonical" href="https://www.bowser.nz/">`
- `<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">`
- `<meta name="author" content="Dhilip Subramanian">`
- `<meta name="theme-color" content="#faf6f1">` (cream `--surface-0`)

These are static, so every bot — JS-capable or not — receives them.

### Part 2 — Open Graph + Twitter Card

Static tags in `index.html` head, producing the preview card on social shares.

- Open Graph: `og:type=website`, `og:site_name=Bowser`, `og:title`,
  `og:description`, `og:url=https://www.bowser.nz/`,
  `og:image=https://www.bowser.nz/og-image.png`,
  `og:image:width=1200`, `og:image:height=630`, `og:locale=en_NZ`.
- Twitter: `twitter:card=summary_large_image`, `twitter:title`,
  `twitter:description`, `twitter:image`, `twitter:creator=@sdhilip`.
- OG title may use the punchier tagline form:
  `bowser — the global fuel story, told from New Zealand`.

**OG share image** — new `frontend/public/og-image.png`, 1200×630.

- A designed branded card matching CLAUDE.md §6: cream `#faf6f1` background, a
  thin coffee `#8b5e3c` border, the lowercase `bowser` wordmark large in
  Fraunces, the tagline in Inter Tight, a minimal coffee-toned line-chart motif
  along the lower edge, and `bowser.nz` set small.
- Produced once from a standalone HTML template (`frontend/og-template.html`)
  rendered to PNG via a Playwright screenshot at 1200×630. The PNG is committed;
  this is a one-time asset, **not** wired into the Vite build.

### Part 3 — JSON-LD structured data

Three `<script type="application/ld+json">` blocks in `index.html` head. This is
the primary attribution lever.

1. **`WebSite`** — `name: "Bowser"`, `alternateName: "bowser.nz"`,
   `url`, `description`, `inLanguage: "en-NZ"`, `publisher` → the Person below.
2. **`Dataset`** — describes Bowser's aggregated fuel-price data:
   `name`, `description`, `keywords`, `spatialCoverage: "New Zealand"`,
   `temporalCoverage: "2016/.."`, `isAccessibleForFree: true`,
   `creator` → the Person, `url`. Google supports Dataset rich results; this is
   an unusual, skill-signalling choice for a data dashboard.
3. **`Person`** — Dhilip Subramanian:
   `name`, `jobTitle: "Data & AI practitioner"`,
   `homeLocation: "Wellington, New Zealand"`,
   `url: "https://www.bowser.nz/about"`,
   `knowsAbout: ["Data engineering", "Data visualisation", "D3.js", "AI products", "Python", "React"]`,
   `sameAs: ["https://x.com/sdhilip", "https://www.linkedin.com/in/dhilip-subramanian-36021918b/"]`.

All three describe the whole site/entity, so they remain static in the global
head and apply on every route. (`jobTitle` is editable — the value above is
drawn from the About page's "I work in the data and AI space.")

### Part 4 — `robots.txt` + `sitemap.xml`

Two new static files in `frontend/public/`.

**`robots.txt`** — allow all crawling, explicitly allow the major AI crawlers
(decision: AI assistants should be able to cite bowser.nz), point to the
sitemap:

```
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: https://www.bowser.nz/sitemap.xml
```

No `llms.txt` — Google's guide confirms it is a dead end.

**`sitemap.xml`** — static, two URLs: `https://www.bowser.nz/` and
`https://www.bowser.nz/about`, each with a `lastmod` set at creation. Two URLs
only, so a static file is acceptable; `lastmod` is refreshed manually on major
content changes.

### Part 5 — About page gets a real URL (`#/about` → `/about`)

Hash fragments are not indexed as separate pages, so the About page — which
holds the author bio — is currently invisible to search engines. Switch it to a
real path.

- **`vercel.json`** — add a precise SPA rewrite so a direct hit on `/about`
  serves the app shell:
  `rewrites: [{ "source": "/about", "destination": "/index.html" }]`.
  Scoped to `/about` only, so `/data/snapshot.json` and other static assets are
  untouched.
- **`App.tsx`** — route off `window.location.pathname` (`/about` → about view,
  else dashboard) instead of `window.location.hash`. Replace the `hashchange`
  listener with a `popstate` listener. Navigation between views uses
  `history.pushState`.
- **`Nav.tsx`** — the About link becomes `href="/about"`; its click handler
  calls `preventDefault`, `history.pushState`, and notifies App to switch view
  (via a callback prop or a custom event). The in-page section links
  (`#crude`, `#pump`, …) are unchanged — they are scroll anchors, not routes.
- The "back to dashboard" controls (`AboutPage.tsx` buttons, wordmark) push
  state back to `/`.

This modifies shipped behavior; it was explicitly approved.

### Part 6 — `<noscript>` fallback + per-route meta + Search Console

**`<noscript>` content fallback** — a block in `index.html` `<body>` containing
the real editorial narrative: what Bowser is, the six dashboard sections
described in prose, who built it, the data sources, and a link to `/about`. It
contains **no fabricated numbers** — only durable descriptive text — honouring
CLAUDE.md §12 (data honesty). It is visible only when JavaScript is disabled, so
there is no flash for normal visitors.

**Per-route meta** — a small helper (`frontend/src/lib/head.ts`,
`setRouteMeta(view)`) called from `App.tsx` on route change. On `/about` it
updates `document.title`, the meta description, the canonical `href`, and
`og:url`/`og:title`; on the dashboard it restores the homepage values.

- About title: `About bowser — built by Dhilip Subramanian`
- About description: `Why I built Bowser: a public dashboard linking global crude oil to New Zealand pump prices. Built in public by Dhilip Subramanian.`
- About canonical: `https://www.bowser.nz/about`

**Google Search Console (user action, not code)** — after deployment the user:

1. Verifies ownership via the **DNS TXT record** method (cleaner than a meta
   tag; no placeholder token in source — works through Cloudflare-proxied DNS).
2. Submits `https://www.bowser.nz/sitemap.xml`.
3. Confirms the apex `bowser.nz` 301-redirects to `www.bowser.nz` in Vercel
   domain settings, so the canonical host is unambiguous.

Bing Webmaster Tools can import the verified property from Search Console later;
optional, out of scope here.

---

## 4. Files touched

| File | Change |
|---|---|
| `frontend/index.html` | New head: meta, OG/Twitter, JSON-LD ×3; `<noscript>` body block; `lang="en-NZ"` |
| `frontend/public/robots.txt` | New |
| `frontend/public/sitemap.xml` | New |
| `frontend/public/og-image.png` | New (1200×630 branded card) |
| `frontend/og-template.html` | New (one-time source for the OG image) |
| `frontend/src/lib/head.ts` | New (`setRouteMeta` helper) |
| `frontend/src/App.tsx` | Path routing; `popstate`; call `setRouteMeta` |
| `frontend/src/components/Nav.tsx` | About link → `/about` + pushState |
| `frontend/src/components/AboutPage.tsx` | Back controls → pushState to `/` |
| `vercel.json` | Add `/about` → `/index.html` rewrite |

---

## 5. Out of scope

- Build-time prerendering (possible Phase 2).
- Next.js / SSR migration.
- `llms.txt` or other AEO gimmicks (Google guide confirms these are ineffective).
- Bing Webmaster Tools setup (optional follow-up).
- New marketing content or blog. Bowser stays a single dashboard + About page.
- hreflang — the site has one English version; no alternate-language pages exist.

---

## 6. Verification

After implementation:

- `npm run build` and `npm run typecheck` pass with zero errors.
- Frontend renders with zero console errors; About page reachable at `/about`
  by direct URL, by nav click, and by browser back/forward.
- Section scroll anchors (`#crude` etc.) still work.
- `view-source` on `/` shows the full meta block, three JSON-LD blocks, and the
  `<noscript>` content.
- JSON-LD validates in Google's Rich Results Test.
- OG card renders correctly in a link-preview validator.
- `robots.txt` and `sitemap.xml` are reachable at their root URLs after deploy.
- Lighthouse SEO score 100; performance score recorded (CLAUDE.md notes
  Lighthouse was never measured — this establishes the baseline).
