import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import LanguagePicker from "./LanguagePicker";
import Logo from "./Logo";
import { LogIn, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { t, lang } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/70">
      <div className="container-narrow flex items-center justify-between h-16 px-6">
        <Link to="/" className="shrink-0">
          <Logo className="h-8 w-auto" />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="/#tjanster" className="hover:text-foreground transition-colors">{t.nav.services}</a>
          <a href="/#kalkylator" className="hover:text-foreground transition-colors">{t.nav.pricing}</a>
          <Link to="/portal" className="hover:text-foreground transition-colors">{t.nav.portal}</Link>
          <a href="/#kontakt" className="hover:text-foreground transition-colors">{t.nav.contact}</a>
        </div>
        <div className="flex items-center gap-3">
          <LanguagePicker />
          <Link
            to="/portal"
            className="hidden md:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogIn className="w-4 h-4" />
            {lang === "sv" ? "Logga in" : "Kirjaudu"}
          </Link>
          <a
            href="/#kontakt"
            className="hidden md:inline-block bg-primary text-primary-foreground text-sm font-medium px-5 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            {t.nav.cta}
          </a>
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl px-6 py-4 space-y-3">
          <a href="/#tjanster" onClick={() => setMobileOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground">{t.nav.services}</a>
          <a href="/#kalkylator" onClick={() => setMobileOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground">{t.nav.pricing}</a>
          <Link to="/portal" onClick={() => setMobileOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground">{t.nav.portal}</Link>
          <a href="/#kontakt" onClick={() => setMobileOpen(false)} className="block text-sm text-muted-foreground hover:text-foreground">{t.nav.contact}</a>
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
