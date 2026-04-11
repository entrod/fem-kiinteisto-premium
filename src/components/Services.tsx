import { Building2, Wrench, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import FadeIn from "./FadeIn";
import { useLanguage } from "@/context/LanguageContext";

const icons = [Building2, Wrench, Sparkles];
const routes = ["/tjanster/forvaltning", "/tjanster/fastighetsskotsel", "/tjanster/stadning"];

const Services = () => {
  const { t, lang } = useLanguage();
  const readMore = lang === "sv" ? "Läs mer →" : "Lue lisää →";
  // Only first 3 items (no Digital plattform)
  const serviceItems = t.services.items.slice(0, 3);

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
          {serviceItems.map((service, i) => {
            const Icon = icons[i];
            return (
              <FadeIn key={i} delay={i * 120}>
                <Link
                  to={routes[i]}
                  className="block card-gradient border border-border rounded-3xl p-8 hover:border-primary/30 hover:-translate-y-1 hover:shadow-elevated transition-all duration-300 group h-full"
                >
                  <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm mb-4">{service.description}</p>
                  <span className="text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {readMore}
                  </span>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
