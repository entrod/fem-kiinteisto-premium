import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import LanguagePicker from "./LanguagePicker";
import Logo from "./Logo";
import { LogIn, Menu, X } from "lucide-react";
import { useState, useCallback } from "react";

const NAV_OFFSET = 88;

const Navbar = () => {
  const { t, lang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToHash = useCallback(
    (hash: string) => {
      const id = hash.replace("#", "");
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
          window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
        }
      };

      if (location.pathname === "/" || location.pathname === import.meta.env.BASE_URL) {
        tryScroll();
        // retry after a tick in case elements aren't rendered yet
        setTimeout(tryScroll, 100);
      } else {
        navigate("/" + hash);
      }
    },
    [location.pathname, navigate]
  );

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollToHash(hash);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/70">
      <div className="container-narrow flex items-center justify-between h-16 px-6">
        <Link to="/" className="shrink-0">
          <Logo className="h-8 w-auto" />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#tjanster" onClick={(e) => handleHashClick(e, "#tjanster")} className="hover:text-foreground transition-colors">{t.nav.services}</a>
          <a href="#kalkylator" onClick={(e) => handleHashClick(e, "#kalkylator")} className="hover:text-foreground transition-colors">{t.nav.pricing}</a>
          <Link to="/portal" className="hover:text-foreground transition-colors">{t.nav.portal}</Link>
          <Link to="/om-oss" className="hover:text-foreground transition-colors">{t.nav.about}</Link>
          <a href="#kontakt" onClick={(e) => handleHashClick(e, "#kontakt")} className="hover:text-foreground transition-colors">{t.nav.contact}</a>
        </div>
        <div className="flex items-center gap-3">
          <LanguagePicker />
          <Link
            to="/portal"
            className="hidden md:inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-5 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            <LogIn className="w-4 h-4" />
            {lang === "sv" ? "Logga in" : "Kirjaudu"}
          </Link>
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl px-6 py-4 space-y-3">
          <a href="#tjanster" onClick={(e) => handleHashClick(e, "#tjanster")} className="block text-sm text-muted-foreground hover:text-foreground">{t.nav.services}</a>
          <a href="#kalkylator" onClick={(e) => handleHashClick(e, "#kalkylator")} className="block text-sm text-muted-foreground hover:text-foreground">{t.nav.pricing}</a>
          <Link to="/portal" onClick={() => setMobileOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground">{t.nav.portal}</Link>
          <Link to="/om-oss" onClick={() => setMobileOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground">{t.nav.about}</Link>
          <a href="#kontakt" onClick={(e) => handleHashClick(e, "#kontakt")} className="block text-sm text-muted-foreground hover:text-foreground">{t.nav.contact}</a>
          <Link to="/portal" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <LogIn className="w-4 h-4" />
            {lang === "sv" ? "Logga in" : "Kirjaudu"}
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
