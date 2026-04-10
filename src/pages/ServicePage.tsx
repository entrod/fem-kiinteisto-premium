import { useParams, Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { servicePages } from "@/content/servicePages";
import FadeIn from "@/components/FadeIn";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang } = useLanguage();

  const page = slug ? servicePages[slug]?.[lang] : null;

  if (!page) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Sidan hittades inte</h1>
          <Link to="/" className="text-primary hover:underline">← Tillbaka</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="section-padding pt-32 md:pt-40">
        <div className="container-narrow">
          <FadeIn>
            <Link to="/#tjanster" className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              {lang === "sv" ? "Alla tjänster" : "Kaikki palvelut"}
            </Link>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
              {page.hero.title}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
              {page.hero.subtitle}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-12">
              {page.features.title}
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-4">
            {page.features.items.map((item, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="flex items-start gap-4 card-gradient border border-border rounded-2xl p-5 hover:border-primary/20 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-12">
              {page.steps.title}
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {page.steps.items.map((step, i) => (
              <FadeIn key={i} delay={i * 120}>
                <div className="card-gradient border border-border rounded-3xl p-8">
                  <span className="text-primary font-display text-3xl font-bold">{step.number}</span>
                  <h3 className="font-display text-xl font-semibold mt-4 mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiation */}
      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-12">
              {page.diff.title}
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {page.diff.items.map((item, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="card-gradient border border-border rounded-3xl p-8 hover:border-primary/20 transition-colors">
                  <h3 className="font-display text-lg font-semibold mb-2 text-primary">{item.label}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-narrow text-center">
          <FadeIn>
            <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-8">
              {page.cta.title}
            </h2>
            <Link
              to="/#kontakt"
              className="inline-block bg-primary text-primary-foreground font-medium px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              {page.cta.button}
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicePage;
