import { Building2, Wrench, Sparkles } from "lucide-react";
import FadeIn from "./FadeIn";
import { useLanguage } from "@/context/LanguageContext";

const icons = [Building2, Wrench, Sparkles];

const Services = () => {
  const { t } = useLanguage();

  return (
    <section id="tjanster" className="section-padding">
      <div className="container-narrow">
        <FadeIn>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">{t.services.eyebrow}</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-16">
            {t.services.title}
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {t.services.items.map((service, i) => {
            const Icon = icons[i];
            return (
              <FadeIn key={i} delay={i * 120}>
                <div className="card-gradient border border-border rounded-3xl p-8 hover:border-primary/30 transition-colors group">
                  <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
