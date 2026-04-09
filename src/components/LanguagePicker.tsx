import { useLanguage } from "@/context/LanguageContext";
import type { Language } from "@/content/siteContent";

const options: Array<{ code: Language; flag: string; label: string }> = [
  { code: "sv", flag: "🇸🇪", label: "SV" },
  { code: "fi", flag: "🇫🇮", label: "FI" },
];

const LanguagePicker = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1">
      {options.map((o) => (
        <button
          key={o.code}
          onClick={() => setLang(o.code)}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
            lang === o.code
              ? "bg-primary/15 text-primary"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {o.flag} {o.label}
        </button>
      ))}
    </div>
  );
};

export default LanguagePicker;
