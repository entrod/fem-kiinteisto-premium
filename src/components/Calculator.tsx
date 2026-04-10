import { useState } from "react";
import FadeIn from "./FadeIn";
import { useLanguage } from "@/context/LanguageContext";

const COMPLEXITY_MULTIPLIER = {
  simple: 0.93,
  normal: 1,
  advanced: 1.12,
} as const;

const PRICING = {
  adminBase: 320,
  adminPerApartment: 11,
  maintenanceBase: 260,
  maintenancePerApartment: 9,
  cleaningBase: 140,
  cleaningPerApartment: 6,
} as const;

type ComplexityLevel = keyof typeof COMPLEXITY_MULTIPLIER;

const getMinimumTotal = (maintenanceIncluded: boolean, cleaningIncluded: boolean) => {
  const optionalServiceCount = Number(maintenanceIncluded) + Number(cleaningIncluded);

  if (optionalServiceCount === 0) return 450;
  if (optionalServiceCount === 2) return 950;
  return 750;
};

const Calculator = () => {
  const { lang, t } = useLanguage();
  const [apartments, setApartments] = useState(20);
  const [maintenance, setMaintenance] = useState(true);
  const [cleaning, setCleaning] = useState(false);
  const [complexity, setComplexity] = useState<ComplexityLevel>("normal");

  // Price each service as its own layer so the estimate reflects how housing
  // company agreements are usually structured and stays easy to tune later.
  const adminCost = PRICING.adminBase + apartments * PRICING.adminPerApartment;
  const maintenanceCost = maintenance
    ? PRICING.maintenanceBase + apartments * PRICING.maintenancePerApartment
    : 0;
  const cleaningCost = cleaning
    ? PRICING.cleaningBase + apartments * PRICING.cleaningPerApartment
    : 0;

  const subtotal = adminCost + maintenanceCost + cleaningCost;
  const adjustedTotal = Math.round(subtotal * COMPLEXITY_MULTIPLIER[complexity]);

  // Minimum fees protect very small housing companies from looking unrealistically cheap.
  const total = Math.max(adjustedTotal, getMinimumTotal(maintenance, cleaning));

  const disclaimer =
    lang === "fi"
      ? "Tämä on alustava arvio. Lopullinen hinnoittelu vahvistetaan taloyhtiön tarpeiden, kohteen laajuuden ja palvelutason tarkemman läpikäynnin jälkeen."
      : "Detta är en preliminär uppskattning. Slutlig prissättning bekräftas efter genomgång av bostadsbolagets behov, fastighetens omfattning och önskad servicenivå.";

  return (
    <section id="kalkylator" className="section-padding">
      <div className="container-narrow">
        <FadeIn>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            {t.calculator.eyebrow}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-16">
            {t.calculator.title}
          </h2>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="card-gradient border border-border rounded-3xl p-8 md:p-12 max-w-2xl">
            <div className="space-y-8">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  {t.calculator.apartments}
                </label>
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
                <label className="text-sm text-muted-foreground mb-3 block">
                  {t.calculator.complexity}
                </label>
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
                  {total}{" "}
                  <span className="text-lg text-muted-foreground font-normal">
                    {t.calculator.perMonth}
                  </span>
                </p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {disclaimer}
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
