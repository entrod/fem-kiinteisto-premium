import { AlertCircle, BarChart3, FileText, CalendarDays } from "lucide-react";
import FadeIn from "./FadeIn";

const features = [
  { icon: AlertCircle, title: "Felanmälan", description: "Rapportera fel direkt via portalen." },
  { icon: BarChart3, title: "Ärendestatus", description: "Följ upp pågående ärenden i realtid." },
  { icon: FileText, title: "Dokument & kontakt", description: "Alla avtal och dokument samlade." },
  { icon: CalendarDays, title: "Bokningar", description: "Boka bastu, tvättstuga och mer." },
];

const DigitalPortal = () => {
  return (
    <section id="portal" className="section-padding">
      <div className="container-narrow">
        <FadeIn>
          <div className="inline-block px-3 py-1 rounded-full border border-primary/30 text-primary text-xs font-medium mb-6">
            Kommer snart
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Digital portal.
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mb-16 leading-relaxed">
            En modern plattform för husbolag — allt på ett ställe.
          </p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <FadeIn key={feature.title} delay={i * 100}>
              <div className="card-gradient border border-border rounded-3xl p-6 flex items-start gap-5 hover:border-primary/20 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0">
                  <feature.icon className="w-4 h-4 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DigitalPortal;
