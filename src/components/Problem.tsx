import FadeIn from "./FadeIn";
import { useLanguage } from "@/context/LanguageContext";

const Problem = () => {
  const { t } = useLanguage();

  return (
    <section className="section-padding">
      <div className="container-narrow">
        <FadeIn>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">{t.problem.eyebrow}</p>
        </FadeIn>
        <FadeIn delay={100}>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight max-w-3xl mb-8">
            {t.problem.title}
          </h2>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            {t.problem.body}
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

export default Problem;
