import FadeIn from "./FadeIn";
import { useLanguage } from "@/context/LanguageContext";

const LocalTrust = () => {
  const { t } = useLanguage();

  return (
    <section className="section-padding">
      <div className="container-narrow text-center max-w-2xl">
        <FadeIn>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">{t.localTrust.eyebrow}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-6">
            {t.localTrust.title}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t.localTrust.body}
          </p>
        </FadeIn>
      </div>
    </section>
  );
};

export default LocalTrust;
