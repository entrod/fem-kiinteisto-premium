import { useState } from "react";
import FadeIn from "./FadeIn";
import { useLanguage } from "@/context/LanguageContext";

const Calculator = () => {
  const { t } = useLanguage();
  const [apartments, setApartments] = useState(20);
  const [maintenance, setMaintenance] = useState(true);
  const [cleaning, setCleaning] = useState(false);
  const [complexity, setComplexity] = useState<"simple" | "normal" | "advanced">("normal");

  const complexityMultiplier = { simple: 0.8, normal: 1, advanced: 1.3 };
  const base = apartments * 18;
  const maintenanceCost = maintenance ? apartments * 8 : 0;
  const cleaningCost = cleaning ? apartments * 5 : 0;
  const total = Math.round((base + maintenanceCost + cleaningCost) * complexityMultiplier[complexity]);

  return (
    <section id="kalkylator" className="section-padding">
      <div className="container-narrow">
        <FadeIn>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">{t.calculator.eyebrow}</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-16">
            {t.calculator.title}
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="card-gradient border border-border rounded-3xl p-8 md:p-12 max-w-2xl">
            <div className="space-y-8">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">{t.calculator.apartments}</label>
                <input
                  type="range"
                  min={5}
                  max={200}
                  value={apartments}
                  onChange={(e) => setApartments(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <span className="font-display text-2xl font-bold mt-2 block">{apartments}</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setMaintenance(!maintenance)}
                  className={`px-5 py-2.5 rounded-2xl text-sm font-medium border transition-colors ${
                    maintenance
                      ? "bg-primary/15 border-primary/30 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/20"
                  }`}
                >
                  {t.calculator.maintenance}
                </button>
                <button
                  onClick={() => setCleaning(!cleaning)}
                  className={`px-5 py-2.5 rounded-2xl text-sm font-medium border transition-colors ${
                    cleaning
                      ? "bg-primary/15 border-primary/30 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/20"
                  }`}
                >
                  {t.calculator.cleaning}
                </button>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-3 block">{t.calculator.complexity}</label>
                <div className="flex gap-3">
                  {(["simple", "normal", "advanced"] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setComplexity(level)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                        complexity === level
                          ? "bg-primary/15 border-primary/30 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/20"
                      }`}
                    >
                      {t.calculator.levels[level]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-8">
                <p className="text-sm text-muted-foreground mb-1">{t.calculator.estimate}</p>
                <p className="font-display text-4xl font-bold">
                  {total} <span className="text-lg text-muted-foreground font-normal">{t.calculator.perMonth}</span>
                </p>
                <a
                  href="#kontakt"
                  className="inline-block mt-6 bg-primary text-primary-foreground font-medium px-8 py-3 rounded-2xl text-sm hover:opacity-90 transition-opacity"
                >
                  {t.calculator.quoteCta}
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Calculator;
