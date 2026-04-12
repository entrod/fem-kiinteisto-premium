import { useState } from "react";
import FadeIn from "./FadeIn";
import { useLanguage } from "@/context/LanguageContext";

const CLEANING_TYPES = ["stairwell", "office", "common_areas", "sauna_laundry"] as const;
type CleaningType = (typeof CLEANING_TYPES)[number];

const CLEANING_TYPE_ADDON: Record<CleaningType, number> = {
  stairwell: 0,
  office: 80,
  common_areas: 50,
  sauna_laundry: 40,
};

const SERVICE_PRICING = {
  admin: { simple: 450, normal: 550, advanced: 800 },
  maintenance: { simple: 400, normal: 500, advanced: 600 },
  cleaningBase: { simple: 200, normal: 200, advanced: 200 },
  portal: { base: 50, perUser: 4 },
} as const;

type ComplexityLevel = "simple" | "normal" | "advanced";

const CALCULATOR_COPY = {
  sv: {
    servicesTitle: "Välj tjänster",
    adminTitle: "Förvaltning",
    adminDescription: "Ekonomi, administration och styrelsearbete för husbolaget.",
    maintenanceDescription: "Löpande fastighetsskötsel, felanmälningar och praktisk vardagsservice.",
    cleaningDescription: "Välj vilka utrymmen som ska städas.",
    portalTitle: "Digital portal",
    portalDescription: "Felanmälan, bokningar och kommunikation – allt samlat digitalt.",
    portalPerUser: "per användare",
    cleaningTypes: {
      stairwell: { title: "Trapphus", description: "Trappor, entréer och gemensamma korridorer." },
      office: { title: "Kontorslokal", description: "Kontor, mötesrum och personalutrymmen." },
      common_areas: { title: "Gemensamma utrymmen", description: "Lobby, gym, klubbrum och liknande." },
      sauna_laundry: { title: "Bastu & tvättstuga", description: "Bastuavdelning och tvättstugor." },
    },
    cleaningTypeLabel: "Vad ska städas?",
    optionalTag: "Valbar",
    selectedTag: "Vald",
    complexityOptions: {
      simple: { title: "Bas", description: "Enklare helhet med mindre servicebehov." },
      normal: { title: "Normal", description: "Typisk nivå för ett vanligt bostadsbolag." },
      advanced: { title: "Krävande", description: "Större omfattning och högre servicebehov." },
    },
    complexityHelper: "Fastighetens omfattning och servicebehov påverkar slutpriset.",
    breakdownTitle: "Så här byggs uppskattningen upp",
    totalLabel: "Preliminär månadsuppskattning",
    approxPrefix: "ca",
    disclaimer:
      "Detta är en preliminär uppskattning. Slutlig prissättning bekräftas efter genomgång av bostadsbolagets behov och önskad servicenivå.",
    noServicesSelected: "Välj minst en tjänst för att se en uppskattning.",
  },
  fi: {
    servicesTitle: "Valitse palvelut",
    adminTitle: "Isännöinti",
    adminDescription: "Talous, hallinto ja hallitustyöskentely taloyhtiölle.",
    maintenanceDescription: "Jatkuva huolto, vikailmoitukset ja arjen käytännön palvelut.",
    cleaningDescription: "Valitse siivottavat tilat.",
    portalTitle: "Digitaalinen portaali",
    portalDescription: "Vikailmoitukset, varaukset ja viestintä – kaikki yhdessä paikassa.",
    portalPerUser: "per käyttäjä",
    cleaningTypes: {
      stairwell: { title: "Porrashuone", description: "Portaikot, sisäänkäynnit ja yhteiset käytävät." },
      office: { title: "Toimistotila", description: "Toimistot, kokoushuoneet ja henkilöstötilat." },
      common_areas: { title: "Yhteiset tilat", description: "Aula, kuntosali, kerhohuone yms." },
      sauna_laundry: { title: "Sauna & pesutupa", description: "Saunaosasto ja pesutuvat." },
    },
    cleaningTypeLabel: "Mitä siivotaan?",
    optionalTag: "Valinnainen",
    selectedTag: "Valittu",
    complexityOptions: {
      simple: { title: "Perus", description: "Yksinkertaisempi kokonaisuus." },
      normal: { title: "Tavanomainen", description: "Tyypillinen taso tavalliselle taloyhtiölle." },
      advanced: { title: "Vaativa", description: "Suurempi kokonaisuus ja vaativampi palvelutaso." },
    },
    complexityHelper: "Kohteen laajuus ja palvelutarpeet vaikuttavat lopulliseen hintaan.",
    breakdownTitle: "Näin arvio muodostuu",
    totalLabel: "Alustava kuukausiarvio",
    approxPrefix: "n.",
    disclaimer:
      "Tämä on alustava arvio. Lopullinen hinnoittelu vahvistetaan taloyhtiön tarpeiden ja palvelutason tarkemman läpikäynnin jälkeen.",
    noServicesSelected: "Valitse vähintään yksi palvelu nähdäksesi arvion.",
  },
} as const;

const Calculator = () => {
  const { lang, t } = useLanguage();
  const copy = CALCULATOR_COPY[lang];

  const [admin, setAdmin] = useState(true);
  const [maintenance, setMaintenance] = useState(true);
  const [cleaning, setCleaning] = useState(false);
  const [portal, setPortal] = useState(false);
  const [selectedCleaningTypes, setSelectedCleaningTypes] = useState<CleaningType[]>(["stairwell"]);
  const [complexity, setComplexity] = useState<ComplexityLevel>("normal");
  const [apartments, setApartments] = useState(20);

  const toggleCleaningType = (type: CleaningType) => {
    setSelectedCleaningTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const formatter = new Intl.NumberFormat(lang === "fi" ? "fi-FI" : "sv-SE");
  const formatEuro = (value: number) => `${formatter.format(value)} €`;

  const adminCost = admin ? SERVICE_PRICING.admin[complexity] : 0;
  const maintenanceCost = maintenance ? SERVICE_PRICING.maintenance[complexity] : 0;

  const cleaningBase = cleaning ? SERVICE_PRICING.cleaningBase[complexity] : 0;
  const cleaningAddons = cleaning
    ? selectedCleaningTypes.reduce((sum, type) => sum + CLEANING_TYPE_ADDON[type], 0)
    : 0;
  const cleaningCost = cleaningBase + cleaningAddons;

  const portalCost = portal ? SERVICE_PRICING.portal.base + apartments * SERVICE_PRICING.portal.perUser : 0;

  const total = adminCost + maintenanceCost + cleaningCost + portalCost;
  const hasAnyService = admin || maintenance || cleaning || portal;

  const ServiceToggle = ({
    active,
    onToggle,
    title,
    description,
    extra,
  }: {
    active: boolean;
    onToggle: () => void;
    title: string;
    description: string;
    extra?: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onToggle}
      className={`rounded-2xl border p-5 text-left transition-colors w-full ${
        active
          ? "bg-primary/15 border-primary/30 text-foreground"
          : "border-border text-foreground hover:border-primary/20"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-medium">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          {extra}
        </div>
        <span
          className={`inline-flex shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
            active
              ? "border border-primary/30 bg-primary/10 text-primary"
              : "border border-border text-muted-foreground"
          }`}
        >
          {active ? copy.selectedTag : copy.optionalTag}
        </span>
      </div>
    </button>
  );

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
              {/* Services */}
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">{copy.servicesTitle}</p>

                <div className="grid gap-4 sm:grid-cols-2">
                  <ServiceToggle
                    active={admin}
                    onToggle={() => setAdmin(!admin)}
                    title={copy.adminTitle}
                    description={copy.adminDescription}
                  />
                  <ServiceToggle
                    active={maintenance}
                    onToggle={() => setMaintenance(!maintenance)}
                    title={t.calculator.maintenance}
                    description={copy.maintenanceDescription}
                  />
                  <ServiceToggle
                    active={cleaning}
                    onToggle={() => setCleaning(!cleaning)}
                    title={t.calculator.cleaning}
                    description={copy.cleaningDescription}
                  />
                  <ServiceToggle
                    active={portal}
                    onToggle={() => setPortal(!portal)}
                    title={copy.portalTitle}
                    description={copy.portalDescription}
                  />
                </div>

                {/* Cleaning sub-types */}
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
                                <p className="mt-0.5 text-xs text-muted-foreground">{info.description}</p>
                              </div>
                              <div
                                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                                  isSelected ? "border-primary bg-primary text-primary-foreground" : "border-border"
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

                {/* Portal apartments/users slider */}
                {portal && (
                  <div className="mt-4">
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
                )}
              </div>

              {/* Complexity */}
              {(admin || maintenance) && (
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
                          <span className="mt-1 block text-sm text-muted-foreground">{option.description}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{copy.complexityHelper}</p>
                </div>
              )}

              {/* Breakdown */}
              <div className="border-t border-border pt-8">
                {!hasAnyService ? (
                  <p className="text-sm text-muted-foreground text-center py-4">{copy.noServicesSelected}</p>
                ) : (
                  <div className="rounded-2xl border border-border bg-secondary/30 p-5">
                    <p className="text-sm text-muted-foreground mb-4">{copy.breakdownTitle}</p>
                    <div className="space-y-3">
                      {admin && (
                        <div className="flex items-center justify-between gap-4 text-sm">
                          <span className="text-foreground">{copy.adminTitle}</span>
                          <span className="font-medium text-foreground">{formatEuro(adminCost)}</span>
                        </div>
                      )}
                      {maintenance && (
                        <div className="flex items-center justify-between gap-4 text-sm">
                          <span className="text-foreground">{t.calculator.maintenance}</span>
                          <span className="font-medium text-foreground">{formatEuro(maintenanceCost)}</span>
                        </div>
                      )}
                      {cleaning && (
                        <>
                          <div className="flex items-center justify-between gap-4 text-sm">
                            <span className="text-foreground">{t.calculator.cleaning}</span>
                            <span className="font-medium text-foreground">{formatEuro(cleaningBase)}</span>
                          </div>
                          {selectedCleaningTypes
                            .filter((type) => CLEANING_TYPE_ADDON[type] > 0)
                            .map((type) => (
                              <div key={type} className="flex items-center justify-between gap-4 text-sm pl-4">
                                <span className="text-muted-foreground">+ {copy.cleaningTypes[type].title}</span>
                                <span className="font-medium text-foreground">{formatEuro(CLEANING_TYPE_ADDON[type])}</span>
                              </div>
                            ))}
                        </>
                      )}
                      {portal && (
                        <div className="flex items-center justify-between gap-4 text-sm">
                          <span className="text-foreground">
                            {copy.portalTitle}{" "}
                            <span className="text-muted-foreground text-xs">
                              ({SERVICE_PRICING.portal.base} € + {SERVICE_PRICING.portal.perUser} € × {apartments})
                            </span>
                          </span>
                          <span className="font-medium text-foreground">{formatEuro(portalCost)}</span>
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
                )}

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{copy.disclaimer}</p>

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
