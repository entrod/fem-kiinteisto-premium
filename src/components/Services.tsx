import { Building2, Wrench, Sparkles } from "lucide-react";
import FadeIn from "./FadeIn";

const services = [
  {
    icon: Building2,
    title: "Isännöinti",
    description: "Professionell förvaltning med tydlig kommunikation och modern digital rapportering.",
  },
  {
    icon: Wrench,
    title: "Huolto",
    description: "Snabb och pålitlig fastighetsskötsel — felanmälan, underhåll och jouruppdrag.",
  },
  {
    icon: Sparkles,
    title: "Siivous",
    description: "Regelbunden och noggrant utförd städning av trappuppgångar och gemensamma utrymmen.",
  },
];

const Services = () => {
  return (
    <section id="tjanster" className="section-padding">
      <div className="container-narrow">
        <FadeIn>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">Tjänster</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-16">
            Allt ditt husbolag behöver.
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <FadeIn key={service.title} delay={i * 120}>
              <div className="card-gradient border border-border rounded-3xl p-8 hover:border-primary/30 transition-colors group">
                <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-5 h-5 text-accent-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{service.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
