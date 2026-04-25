// Scroll to top on route change. For hash URLs, polls for the target element until it's mounted
// (necessary because AnimatePresence mode="wait" delays the new page mount by ~450ms).
import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      let cancelled = false;
      let attempts = 0;
      const maxAttempts = 30; // ~1.5s @ 50ms

      const tryScroll = () => {
        if (cancelled) return;
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (attempts < maxAttempts) {
          attempts += 1;
          setTimeout(tryScroll, 50);
        } else {
          window.scrollTo(0, 0);
        }
      };
      tryScroll();
      return () => {
        cancelled = true;
      };
    }
    // No hash - reset to top before paint
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
