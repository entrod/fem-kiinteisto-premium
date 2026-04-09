import { AlertCircle, BarChart3, FileText, CalendarDays } from "lucide-react";
import FadeIn from "./FadeIn";
import { useLanguage } from "@/context/LanguageContext";

const icons = [AlertCircle, BarChart3, FileText, CalendarDays];

const DigitalPortal = () => {
  const { t } = useLanguage();

  return (
    <section id="portal" className="section-padding">
      <div className="container-narrow">
        <FadeIn>
          <div className="inline-block px-3 py-1 rounded-full border border-primary/30 text-primary text-xs font-medium mb-6">
            {t.portal.badge}
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
            {t.portal.title}
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mb-16 leading-relaxed">
            {t.portal.body}
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-6">
          {t.portal.features.map((feature, i) => {
            const Icon = icons[i];
            return (
              <FadeIn key={i} delay={i * 100}>
                <div className="card-gradient border border-border rounded-3xl p-6 flex items-start gap-5 hover:border-primary/20 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DigitalPortal;
