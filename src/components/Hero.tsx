import FadeIn from "./FadeIn";
import { useLanguage } from "@/context/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="hero-gradient min-h-screen flex items-center section-padding pt-32">
      <div className="container-narrow">
        <FadeIn>
          <p className="text-primary font-medium text-sm tracking-widest uppercase mb-6">
            {t.hero.eyebrow}
          </p>
        </FadeIn>
        <FadeIn delay={100}>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight max-w-4xl mb-8">
            {t.hero.title}
            <br />
            <span className="text-gradient">{t.hero.highlight}</span> {t.hero.titleSuffix}
          </h1>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
            {t.hero.body}
          </p>
        </FadeIn>
        <FadeIn delay={300}>
          <div className="flex flex-wrap gap-4">
            <a
              href="#kontakt"
              className="bg-primary text-primary-foreground font-medium px-8 py-3.5 rounded-2xl text-base hover:opacity-90 transition-opacity"
            >
              {t.hero.primaryCta}
            </a>
            <a
              href="#kalkylator"
              className="border border-border text-foreground font-medium px-8 py-3.5 rounded-2xl text-base hover:bg-secondary transition-colors"
            >
              {t.hero.secondaryCta}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Hero;
