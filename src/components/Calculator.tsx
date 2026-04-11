import { useState } from "react";
import FadeIn from "./FadeIn";
import { useLanguage } from "@/context/LanguageContext";

const COMPLEXITY_MULTIPLIER = {
  simple: 0.93,
  normal: 1,
  advanced: 1.12,
} as const;

const CLEANING_TYPES = ["stairwell", "office", "common_areas", "sauna_laundry"] as const;
type CleaningType = typeof CLEANING_TYPES[number];

const CLEANING_TYPE_PRICING: Record<CleaningType, { base: number; perUnit: number }> = {
  stairwell: { base: 90, perUnit: 4 },
  office: { base: 120, perUnit: 5 },
  common_areas: { base: 80, perUnit: 3 },
  sauna_laundry: { base: 60, perUnit: 2 },
};

const PRICING = {
  adminBase: 320,
  adminPerApartment: 11,
  maintenanceBase: 260,
  maintenancePerApartment: 9,
} as const;

const CALCULATOR_COPY = {
  sv: {
    servicesTitle: "Tjänster i uppskattningen",
    adminTitle: "Förvaltning / isännöinti",
    adminDescription: "Ingår alltid i den preliminära månadsuppskattningen.",
    maintenanceDescription: "Löpande fastighetsskötsel, felanmälningar och praktisk vardagsservice.",
    cleaningDescription: "Välj vilka utrymmen som ska städas.",
    cleaningTypes: {
      stairwell: { title: "Trapphus", description: "Trappor, entréer och gemensamma korridorer." },
      office: { title: "Kontorslokal", description: "Kontor, mötesrum och personalutrymmen." },
      common_areas: { title: "Gemensamma utrymmen", description: "Lobby, gym, klubbrum och liknande." },
      sauna_laundry: { title: "Bastu & tvättstuga", description: "Bastuavdelning och tvättstugor." },
    },
    cleaningTypeLabel: "Vad ska städas?",
    includedTag: "Ingår alltid",
    optionalTag: "Valbar",
    selectedTag: "Vald",
    complexityOptions: {
      simple: {
        title: "Lätt fastighet",
        description: "Nyare eller enklare helhet med mindre servicebehov.",
      },
      normal: {
        title: "Normal omfattning",
        description: "Typisk nivå för ett vanligt bostadsbolag.",
      },
      advanced: {
        title: "Mer krävande",
        description: "Större omfattning, fler gemensamma ytor eller högre servicebehov.",
      },
    },
    complexityHelper:
      "Fastighetens omfattning, gemensamma utrymmen och servicebehov påverkar slutpriset.",
    breakdownTitle: "Så här byggs uppskattningen upp",
    complexityAdjustmentLabel: "Justering för omfattning",
    minimumAdjustmentLabel: "Miniminivå för mindre bolag",
    totalLabel: "Preliminär månadsuppskattning",
    approxPrefix: "ca",
    disclaimer:
      "Detta är en preliminär uppskattning. Slutlig prissättning bekräftas efter genomgång av bostadsbolagets behov, fastighetens omfattning och önskad servicenivå.",
    largePropertyNote:
      "Större fastigheter behöver vanligtvis en mer skräddarsydd genomgång innan slutligt pris kan bekräftas.",
    largePropertyCta: "Kontakta oss för offert",
  },
  fi: {
    servicesTitle: "Arvioon sisältyvät palvelut",
    adminTitle: "Isännöinti / förvaltning",
    adminDescription: "Sisältyy aina alustavaan kuukausiarvioon.",
    maintenanceDescription: "Jatkuva huolto, vikailmoitukset ja arjen käytännön palvelut.",
    cleaningDescription: "Valitse siivottavat tilat.",
    cleaningTypes: {
      stairwell: { title: "Porrashuone", description: "Portaikot, sisäänkäynnit ja yhteiset käytävät." },
      office: { title: "Toimistotila", description: "Toimistot, kokoushuoneet ja henkilöstötilat." },
      common_areas: { title: "Yhteiset tilat", description: "Aula, kuntosali, kerhohuone yms." },
      sauna_laundry: { title: "Sauna & pesutupa", description: "Saunaosasto ja pesutuvat." },
    },
    cleaningTypeLabel: "Mitä siivotaan?",
    includedTag: "Sisältyy aina",
    optionalTag: "Valinnainen",
    selectedTag: "Valittu",
    complexityOptions: {
      simple: {
        title: "Kevyempi kohde",
        description: "Uudempi tai yksinkertaisempi kokonaisuus, jossa palvelutarve on pienempi.",
      },
      normal: {
        title: "Tavanomainen",
        description: "Tyypillinen taso tavalliselle taloyhtiölle.",
      },
      advanced: {
        title: "Laajempi tarve",
        description: "Suurempi kokonaisuus, enemmän yhteisiä tiloja tai vaativampi palvelutaso.",
      },
    },
    complexityHelper:
      "Kohteen laajuus, yhteiset tilat ja palvelutarpeet vaikuttavat lopulliseen hintaan.",
    breakdownTitle: "Näin arvio muodostuu",
    complexityAdjustmentLabel: "Laajuuden vaikutus",
    minimumAdjustmentLabel: "Pienten yhtiöiden vähimmäistaso",
    totalLabel: "Alustava kuukausiarvio",
    approxPrefix: "n.",
    disclaimer:
      "Tämä on alustava arvio. Lopullinen hinnoittelu vahvistetaan taloyhtiön tarpeiden, kohteen laajuuden ja palvelutason tarkemman läpikäynnin jälkeen.",
    largePropertyNote:
      "Suuremmat kohteet vaativat yleensä tarkemman läpikäynnin ennen lopullisen hinnan vahvistamista.",
    largePropertyCta: "Ota yhteyttä tarjousta varten",
  },
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
  const copy = CALCULATOR_COPY[lang];
  const [apartments, setApartments] = useState(20);
  const [maintenance, setMaintenance] = useState(true);
  const [cleaning, setCleaning] = useState(false);
  const [selectedCleaningTypes, setSelectedCleaningTypes] = useState<CleaningType[]>(["stairwell"]);
  const [complexity, setComplexity] = useState<ComplexityLevel>("normal");

  const toggleCleaningType = (type: CleaningType) => {
    setSelectedCleaningTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const formatter = new Intl.NumberFormat(lang === "fi" ? "fi-FI" : "sv-SE");

  const formatEuro = (value: number) => `${formatter.format(value)} €`;
  const formatSignedEuro = (value: number) =>
    `${value >= 0 ? "+" : "-"}${formatter.format(Math.abs(value))} €`;

  const adminCost = PRICING.adminBase + apartments * PRICING.adminPerApartment;
  const maintenanceCost = maintenance
    ? PRICING.maintenanceBase + apartments * PRICING.maintenancePerApartment
    : 0;
  const cleaningCost = cleaning
    ? selectedCleaningTypes.reduce((sum, type) => {
        const p = CLEANING_TYPE_PRICING[type];
        return sum + p.base + apartments * p.perUnit;
      }, 0)
    : 0;

  const subtotal = adminCost + maintenanceCost + cleaningCost;
  const adjustedTotal = Math.round(subtotal * COMPLEXITY_MULTIPLIER[complexity]);
  const minimumTotal = getMinimumTotal(maintenance, cleaning);

  // Minimum protection avoids unrealistically low prices for very small housing companies.
  const total = Math.max(adjustedTotal, minimumTotal);
  const complexityAdjustment = adjustedTotal - subtotal;
  const minimumAdjustment = total - adjustedTotal;
  const isLargeProperty = apartments > 80;
  const ctaText = isLargeProperty ? copy.largePropertyCta : t.calculator.quoteCta;

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
          <div className="card-gradient border border-border rounded-3xl p-8 md:p-12 max-w-3xl">
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

              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{copy.servicesTitle}</p>

                <div className="rounded-2xl border border-primary/25 bg-primary/10 p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-medium text-foreground">{copy.adminTitle}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{copy.adminDescription}</p>
                    </div>
                    <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {copy.includedTag}
                    </span>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setMaintenance(!maintenance)}
                    className={`rounded-2xl border p-5 text-left transition-colors ${
                      maintenance
                        ? "bg-primary/15 border-primary/30 text-foreground"
                        : "border-border text-foreground hover:border-primary/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium">{t.calculator.maintenance}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {copy.maintenanceDescription}
                        </p>
                      </div>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          maintenance
                            ? "border border-primary/30 bg-primary/10 text-primary"
                            : "border border-border text-muted-foreground"
                        }`}
                      >
                        {maintenance ? copy.selectedTag : copy.optionalTag}
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCleaning(!cleaning)}
                    className={`rounded-2xl border p-5 text-left transition-colors ${
                      cleaning
                        ? "bg-primary/15 border-primary/30 text-foreground"
                        : "border-border text-foreground hover:border-primary/20"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium">{t.calculator.cleaning}</p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {copy.cleaningDescription}
                        </p>
                      </div>
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                          cleaning
                            ? "border border-primary/30 bg-primary/10 text-primary"
                            : "border border-border text-muted-foreground"
                        }`}
                      >
                        {cleaning ? copy.selectedTag : copy.optionalTag}
                      </span>
                    </div>
                  </button>
                </div>

                {cleaning && (
                  <div className="mt-4 space-y-3">
                    <p className="text-sm text-muted-foreground">{copy.cleaningTypeLabel}</p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {CLEANING_TYPES.map((type) => {
                        const info = copy.cleaningTypes[type];
                        const isSelected = selectedCleaningTypes.includes(type);
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => toggleCleaningType(type)}
                            className={`rounded-xl border p-4 text-left transition-colors ${
                              isSelected
                                ? "bg-primary/10 border-primary/30 text-foreground"
                                : "border-border text-foreground hover:border-primary/20"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="text-sm font-medium">{info.title}</p>
                                <p className="mt-0.5 text-xs text-muted-foreground">
                                  {info.description}
                                </p>
                              </div>
                              <div
                                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                                  isSelected
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-border"
                                }`}
                              >
                                {isSelected && (
                                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                    <path d="M2.5 6L5 8.5L9.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-3 block">
                  {t.calculator.complexity}
                </label>

                <div className="grid gap-3 sm:grid-cols-3">
                  {(["simple", "normal", "advanced"] as const).map((level) => {
                    const option = copy.complexityOptions[level];

                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setComplexity(level)}
                        className={`rounded-2xl border p-4 text-left transition-colors ${
                          complexity === level
                            ? "bg-primary/15 border-primary/30 text-foreground"
                            : "border-border text-foreground hover:border-primary/20"
                        }`}
                      >
                        <span className="block font-medium">{option.title}</span>
                        <span className="mt-1 block text-sm text-muted-foreground">
                          {option.description}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p className="mt-3 text-sm text-muted-foreground">{copy.complexityHelper}</p>
              </div>

              <div className="border-t border-border pt-8">
                <div className="rounded-2xl border border-border bg-secondary/30 p-5">
                  <p className="text-sm text-muted-foreground mb-4">{copy.breakdownTitle}</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4 text-sm">
                      <span className="text-foreground">{copy.adminTitle}</span>
                      <span className="font-medium text-foreground">{formatEuro(adminCost)}</span>
                    </div>

                    {maintenance && (
                      <div className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-foreground">{t.calculator.maintenance}</span>
                        <span className="font-medium text-foreground">
                          {formatEuro(maintenanceCost)}
                        </span>
                      </div>
                    )}

                    {cleaning && (
                      <div className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-foreground">{t.calculator.cleaning}</span>
                        <span className="font-medium text-foreground">
                          {formatEuro(cleaningCost)}
                        </span>
                      </div>
                    )}

                    {complexityAdjustment !== 0 && (
                      <div className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-muted-foreground">
                          {copy.complexityAdjustmentLabel}
                        </span>
                        <span className="font-medium text-foreground">
                          {formatSignedEuro(complexityAdjustment)}
                        </span>
                      </div>
                    )}

                    {minimumAdjustment > 0 && (
                      <div className="flex items-center justify-between gap-4 text-sm">
                        <span className="text-muted-foreground">{copy.minimumAdjustmentLabel}</span>
                        <span className="font-medium text-foreground">
                          {formatSignedEuro(minimumAdjustment)}
                        </span>
                      </div>
                    )}

                    <div className="border-t border-border pt-4">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">{copy.totalLabel}</p>
                          <p className="font-display text-4xl font-bold text-foreground">
                            {copy.approxPrefix} {formatter.format(total)}{" "}
                            <span className="text-lg font-normal text-muted-foreground">
                              {t.calculator.perMonth}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {copy.disclaimer}
                </p>

                {isLargeProperty && (
                  <div className="mt-4 rounded-2xl border border-primary/20 bg-primary/10 p-4">
                    <p className="text-sm leading-relaxed text-foreground">
                      {copy.largePropertyNote}
                    </p>
                  </div>
                )}

                <a
                  href="#kontakt"
                  className="inline-block mt-6 bg-primary text-primary-foreground font-medium px-8 py-3 rounded-2xl text-sm hover:opacity-90 transition-opacity"
                >
                  {ctaText}
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
