// Google Analytics 4 page-view tracking for the single-page app. The gtag.js
// loader and config live in index.html with send_page_view disabled; this
// module is the single source of truth for page views, firing one on the
// initial load and one on every client-side route change (pushState
// navigation never triggers gtag's automatic page view).

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackPageView(): void {
  if (typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_location: window.location.href,
    page_title: document.title,
  });
}
