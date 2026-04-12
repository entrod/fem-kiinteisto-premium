import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NAV_OFFSET = 88;

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (hash) {
        const element = document.getElementById(hash.replace("#", ""));

        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
          window.scrollTo({ top: Math.max(top, 0), left: 0 });
          return;
        }
      }

      window.scrollTo({ top: 0, left: 0 });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;