import type { Language } from "../content/siteContent";
import { languageOptions } from "../content/siteContent";

type LanguagePickerProps = {
  currentLanguage: Language;
  label: string;
  onChange: (language: Language) => void;
};

const baseButtonClass =
  "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors";

const LanguagePicker = ({ currentLanguage, label, onChange }: LanguagePickerProps) => {
  return (
    <div className="flex items-center gap-2" aria-label={label} role="group">
      {languageOptions.map((option) => {
        const active = option.code === currentLanguage;

        return (
          <button
            key={option.code}
            type="button"
            onClick={() => onChange(option.code)}
            className={`${baseButtonClass} ${
              active
                ? "border-primary/40 bg-primary/15 text-foreground"
                : "border-border bg-background/40 text-muted-foreground hover:border-primary/30 hover:text-foreground"
            }`}
            aria-pressed={active}
            title={option.label}
          >
            <span aria-hidden="true">{option.flag}</span>
            <span className="hidden sm:inline">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LanguagePicker;
