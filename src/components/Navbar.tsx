import { useLanguage } from "@/context/LanguageContext";
import LanguagePicker from "./LanguagePicker";

const Navbar = () => {
  const { t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/70">
      <div className="container-narrow flex items-center justify-between h-16 px-6">
        <a href="#" className="font-display text-lg font-bold tracking-tight text-foreground">
          FEM<span className="text-primary">.</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#tjanster" className="hover:text-foreground transition-colors">{t.nav.services}</a>
          <a href="#kalkylator" className="hover:text-foreground transition-colors">{t.nav.pricing}</a>
          <a href="#portal" className="hover:text-foreground transition-colors">{t.nav.portal}</a>
          <a href="#kontakt" className="hover:text-foreground transition-colors">{t.nav.contact}</a>
        </div>
        <div className="flex items-center gap-3">
          <LanguagePicker />
          <a
            href="#kontakt"
            className="bg-primary text-primary-foreground text-sm font-medium px-5 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            {t.nav.cta}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
