// Per-route document head management. index.html ships the dashboard values
// statically; this helper swaps them when the user navigates to /about and
// back. It is the single source of truth for per-route SEO metadata.

export type View = "dashboard" | "about";

interface RouteMeta {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogUrl: string;
}

const ROUTE_META: Record<View, RouteMeta> = {
  dashboard: {
    title: "bowser — New Zealand fuel prices & the global crude oil story",
    description:
      "Bowser connects global crude oil markets to New Zealand pump prices: Brent and WTI futures, MBIE retail data, and where every fuel dollar goes.",
    canonical: "https://www.bowser.nz/",
    ogTitle: "bowser — the global fuel story, told from New Zealand",
    ogUrl: "https://www.bowser.nz/",
  },
  about: {
    title: "About bowser — built by Dhilip Subramanian",
    description:
      "Why I built Bowser: a public dashboard linking global crude oil to New Zealand pump prices. Built in public by Dhilip Subramanian.",
    canonical: "https://www.bowser.nz/about",
    ogTitle: "About bowser — built by Dhilip Subramanian",
    ogUrl: "https://www.bowser.nz/about",
  },
};

function setAttr(selector: string, attr: string, value: string): void {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export function setRouteMeta(view: View): void {
  const meta = ROUTE_META[view];
  document.title = meta.title;
  setAttr('meta[name="description"]', "content", meta.description);
  setAttr('link[rel="canonical"]', "href", meta.canonical);
  setAttr('meta[property="og:title"]', "content", meta.ogTitle);
  setAttr('meta[property="og:url"]', "content", meta.ogUrl);
  setAttr('meta[name="twitter:title"]', "content", meta.ogTitle);
}
