import { createContext, useContext, useState, type ReactNode } from "react";
import { siteContent, type Language, type SiteContent } from "@/content/siteContent";

type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: SiteContent;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("sv");
  const t = siteContent[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
