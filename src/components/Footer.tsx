import { useLanguage } from "@/context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="container-narrow flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <span className="font-display font-bold text-foreground">
          FEM<span className="text-primary">.</span>
        </span>
        <p>© {new Date().getFullYear()} FEM Kiinteistöpalvelut. {t.footer.rights}</p>
      </div>
    </footer>
  );
};

export default Footer;
