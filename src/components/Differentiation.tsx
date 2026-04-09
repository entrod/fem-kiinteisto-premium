import { X, Check } from "lucide-react";
import FadeIn from "./FadeIn";
import { useLanguage } from "@/context/LanguageContext";

const Differentiation = () => {
  const { t } = useLanguage();

  return (
    <section className="section-padding">
      <div className="container-narrow">
        <FadeIn>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">{t.differentiation.eyebrow}</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-16">
            {t.differentiation.title}
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-2 gap-6">
          <FadeIn delay={100}>
            <div className="border border-border rounded-3xl p-8 bg-secondary/30">
              <h3 className="font-display text-lg font-semibold text-muted-foreground mb-6">{t.differentiation.traditionalTitle}</h3>
              <ul className="space-y-4">
                {t.differentiation.traditional.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-7 h-7 rounded-full bg-destructive/10 flex items-center justify-center shrink-0">
                      <X className="w-3.5 h-3.5 text-destructive" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="border border-primary/30 rounded-3xl p-8 card-gradient">
              <h3 className="font-display text-lg font-semibold mb-6">
                FEM<span className="text-primary">.</span>
              </h3>
              <ul className="space-y-4">
                {t.differentiation.fem.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground">
                    <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Differentiation;
