import FadeIn from "./FadeIn";
import { useLanguage } from "@/context/LanguageContext";

const HowItWorks = () => {
  const { t } = useLanguage();

  return (
    <section className="section-padding">
      <div className="container-narrow">
        <FadeIn>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">{t.howItWorks.eyebrow}</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-16">
            {t.howItWorks.title}
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-12">
          {t.howItWorks.steps.map((step, i) => (
            <FadeIn key={step.number} delay={i * 150}>
              <div>
                <span className="font-display text-5xl font-bold text-primary/20">{step.number}</span>
                <h3 className="font-display text-xl font-semibold mt-4 mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
