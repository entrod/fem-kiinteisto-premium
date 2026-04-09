import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  BarChart3,
  Building2,
  CalendarDays,
  Check,
  FileText,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import LanguagePicker from "../components/LanguagePicker";
import { siteContent, type Language } from "../content/siteContent";

const complexityMultiplier = { simple: 0.8, normal: 1, advanced: 1.3 } as const;

const detectLanguage = (): Language => {
  if (typeof window === "undefined") return "sv";

  const storedLanguage = window.localStorage.getItem("fem-language");
  if (storedLanguage === "sv" || storedLanguage === "fi" || storedLanguage === "en") {
    return storedLanguage;
  }

  const browserLanguage = window.navigator.language.toLowerCase();
  if (browserLanguage.startsWith("fi")) return "fi";
  if (browserLanguage.startsWith("en")) return "en";
  return "sv";
};

const serviceIcons = [Building2, Wrench, Sparkles] as const;
const portalIcons = [AlertCircle, BarChart3, FileText, CalendarDays] as const;

const Index = () => {
  const [language, setLanguage] = useState<Language>(detectLanguage);
  const [apartments, setApartments] = useState(20);
  const [maintenance, setMaintenance] = useState(true);
  const [cleaning, setCleaning] = useState(false);
  const [complexity, setComplexity] = useState<"simple" | "normal" | "advanced">("normal");
  const [submitted, setSubmitted] = useState(false);

  const content = useMemo(() => siteContent[language], [language]);
  const total = Math.round(
    (apartments * 18 + (maintenance ? apartments * 8 : 0) + (cleaning ? apartments * 5 : 0)) *
      complexityMultiplier[complexity]
  );

  useEffect(() => {
    window.localStorage.setItem("fem-language", language);
    document.documentElement.lang = language;
  }, [language]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed left-0 right-0 top-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl">
        <div className="container-narrow flex min-h-16 items-center justify-between gap-4 px-6 py-3">
          <a href="#top" className="font-display text-lg font-bold tracking-tight text-foreground">
            FEM<span className="text-primary">.</span>
          </a>
          <div className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#tjanster" className="hover:text-foreground transition-colors">{content.nav.services}</a>
            <a href="#kalkylator" className="hover:text-foreground transition-colors">{content.nav.pricing}</a>
            <a href="#portal" className="hover:text-foreground transition-colors">{content.nav.portal}</a>
            <a href="#kontakt" className="hover:text-foreground transition-colors">{content.nav.contact}</a>
          </div>
          <div className="flex items-center gap-3">
            <LanguagePicker currentLanguage={language} label={content.languageLabel} onChange={setLanguage} />
            <a
              href="#kontakt"
              className="hidden rounded-lg bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex"
            >
              {content.nav.cta}
            </a>
          </div>
        </div>
      </nav>

      <section id="top" className="hero-gradient flex min-h-screen items-center section-padding pt-32">
        <div className="container-narrow">
          <FadeIn>
            <p className="mb-6 text-sm font-medium uppercase tracking-widest text-primary">{content.hero.eyebrow}</p>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="mb-8 max-w-4xl font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
              {content.hero.title}
              <br />
              <span className="text-gradient">{content.hero.highlight}</span> {content.hero.titleSuffix}
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mb-12 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">{content.hero.body}</p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="flex flex-wrap gap-4">
              <a
                href="#kontakt"
                className="rounded-2xl bg-primary px-8 py-3.5 text-base font-medium text-primary-foreground transition-opacity hover:opacity-90"
              >
                {content.hero.primaryCta}
              </a>
              <a
                href="#kalkylator"
                className="rounded-2xl border border-border px-8 py-3.5 text-base font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {content.hero.secondaryCta}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">{content.problem.eyebrow}</p>
          </FadeIn>
          <FadeIn delay={100}>
            <h2 className="mb-8 max-w-3xl font-display text-3xl font-bold tracking-tight md:text-5xl">{content.problem.title}</h2>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">{content.problem.body}</p>
          </FadeIn>
        </div>
      </section>

      <section id="tjanster" className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">{content.services.eyebrow}</p>
            <h2 className="mb-16 font-display text-3xl font-bold tracking-tight md:text-5xl">{content.services.title}</h2>
          </FadeIn>
          <div className="grid gap-6 md:grid-cols-3">
            {content.services.items.map((service, index) => {
              const Icon = serviceIcons[index];

              return (
                <FadeIn key={service.title} delay={index * 120}>
                  <div className="group rounded-3xl border border-border p-8 card-gradient transition-colors hover:border-primary/30">
                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent transition-colors group-hover:bg-primary/20">
                      <Icon className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <h3 className="mb-3 font-display text-xl font-semibold">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">{content.differentiation.eyebrow}</p>
            <h2 className="mb-16 font-display text-3xl font-bold tracking-tight md:text-5xl">{content.differentiation.title}</h2>
          </FadeIn>
          <div className="grid gap-6 md:grid-cols-2">
            <FadeIn delay={100}>
              <div className="rounded-3xl border border-border bg-secondary/30 p-8">
                <h3 className="mb-6 font-display text-lg font-semibold text-muted-foreground">{content.differentiation.traditionalTitle}</h3>
                <ul className="space-y-4">
                  {content.differentiation.traditional.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-muted-foreground">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                        <X className="h-3.5 w-3.5 text-destructive" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="rounded-3xl border border-primary/30 p-8 card-gradient">
                <h3 className="mb-6 font-display text-lg font-semibold">
                  {content.differentiation.femTitle}<span className="text-primary">.</span>
                </h3>
                <ul className="space-y-4">
                  {content.differentiation.fem.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-foreground">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15">
                        <Check className="h-3.5 w-3.5 text-primary" />
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

      <section id="kalkylator" className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">{content.calculator.eyebrow}</p>
            <h2 className="mb-16 font-display text-3xl font-bold tracking-tight md:text-5xl">{content.calculator.title}</h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="max-w-2xl rounded-3xl border border-border p-8 md:p-12 card-gradient">
              <div className="space-y-8">
                <div>
                  <label className="mb-2 block text-sm text-muted-foreground">{content.calculator.apartments}</label>
                  <input
                    type="range"
                    min={5}
                    max={200}
                    value={apartments}
                    onChange={(event) => setApartments(Number(event.target.value))}
                    className="w-full accent-primary"
                  />
                  <span className="mt-2 block font-display text-2xl font-bold">{apartments}</span>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => setMaintenance((value) => !value)}
                    className={`rounded-2xl border px-5 py-2.5 text-sm font-medium transition-colors ${
                      maintenance
                        ? "border-primary/30 bg-primary/15 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/20"
                    }`}
                  >
                    {content.calculator.maintenance}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCleaning((value) => !value)}
                    className={`rounded-2xl border px-5 py-2.5 text-sm font-medium transition-colors ${
                      cleaning
                        ? "border-primary/30 bg-primary/15 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/20"
                    }`}
                  >
                    {content.calculator.cleaning}
                  </button>
                </div>

                <div>
                  <label className="mb-3 block text-sm text-muted-foreground">{content.calculator.complexity}</label>
                  <div className="flex flex-wrap gap-3">
                    {(["simple", "normal", "advanced"] as const).map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setComplexity(level)}
                        className={`rounded-xl border px-4 py-2 text-sm font-medium transition-colors ${
                          complexity === level
                            ? "border-primary/30 bg-primary/15 text-primary"
                            : "border-border text-muted-foreground hover:border-primary/20"
                        }`}
                      >
                        {content.calculator.levels[level]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t border-border pt-8">
                  <p className="mb-1 text-sm text-muted-foreground">{content.calculator.estimate}</p>
                  <p className="font-display text-4xl font-bold">
                    {new Intl.NumberFormat(content.locale).format(total)} <span className="text-lg font-normal text-muted-foreground">{content.calculator.perMonth}</span>
                  </p>
                  <a
                    href="#kontakt"
                    className="mt-6 inline-block rounded-2xl bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    {content.calculator.quoteCta}
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">{content.howItWorks.eyebrow}</p>
            <h2 className="mb-16 font-display text-3xl font-bold tracking-tight md:text-5xl">{content.howItWorks.title}</h2>
          </FadeIn>
          <div className="grid gap-12 md:grid-cols-3">
            {content.howItWorks.steps.map((step, index) => (
              <FadeIn key={step.number} delay={index * 150}>
                <div>
                  <span className="font-display text-5xl font-bold text-primary/20">{step.number}</span>
                  <h3 className="mt-4 mb-2 font-display text-xl font-semibold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="portal" className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <div className="mb-6 inline-block rounded-full border border-primary/30 px-3 py-1 text-xs font-medium text-primary">{content.portal.badge}</div>
            <h2 className="mb-4 font-display text-3xl font-bold tracking-tight md:text-5xl">{content.portal.title}</h2>
            <p className="mb-16 max-w-xl text-lg leading-relaxed text-muted-foreground">{content.portal.body}</p>
          </FadeIn>
          <div className="grid gap-6 sm:grid-cols-2">
            {content.portal.features.map((feature, index) => {
              const Icon = portalIcons[index];

              return (
                <FadeIn key={feature.title} delay={index * 100}>
                  <div className="flex items-start gap-5 rounded-3xl border border-border p-6 card-gradient transition-colors hover:border-primary/20">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent">
                      <Icon className="h-4 w-4 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-display font-semibold">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-narrow max-w-2xl text-center">
          <FadeIn>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">{content.localTrust.eyebrow}</p>
            <h2 className="mb-6 font-display text-3xl font-bold tracking-tight md:text-4xl">{content.localTrust.title}</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">{content.localTrust.body}</p>
          </FadeIn>
        </div>
      </section>

      <section id="kontakt" className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">{content.contact.eyebrow}</p>
            <h2 className="mb-16 font-display text-3xl font-bold tracking-tight md:text-5xl">{content.contact.title}</h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="max-w-2xl rounded-3xl border border-border p-8 md:p-12 card-gradient">
              {submitted ? (
                <div className="py-12 text-center">
                  <p className="mb-2 font-display text-2xl font-bold">{content.contact.successTitle}</p>
                  <p className="text-muted-foreground">{content.contact.successBody}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="mb-2 block text-sm text-muted-foreground">{content.contact.fields.name}</label>
                    <input required type="text" className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-muted-foreground">{content.contact.fields.company}</label>
                    <input type="text" className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm text-muted-foreground">{content.contact.fields.apartments}</label>
                      <input type="number" className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm text-muted-foreground">{content.contact.fields.contact}</label>
                      <input required type="text" className="w-full rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-muted-foreground">{content.contact.fields.message}</label>
                    <textarea rows={4} className="w-full resize-none rounded-xl border border-border bg-secondary px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <button type="submit" className="rounded-2xl bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
                    {content.contact.submit}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-12">
        <div className="container-narrow flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <span className="font-display font-bold text-foreground">
            FEM<span className="text-primary">.</span>
          </span>
          <p>© {new Date().getFullYear()} FEM Kiinteistöpalvelut. {content.footer.rights}</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
