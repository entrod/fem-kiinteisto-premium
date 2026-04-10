import { Phone, Rocket, RefreshCw } from "lucide-react";
import FadeIn from "./FadeIn";
import { useLanguage } from "@/context/LanguageContext";

const icons = [Phone, Rocket, RefreshCw];

const content = {
  sv: {
    eyebrow: "Så fungerar det i praktiken",
    title: "Från första kontakt till löpande arbete.",
    steps: [
      { title: "Kontakt", description: "Ni berättar om ert husbolag och vad ni behöver. Vi lyssnar och ställer rätt frågor." },
      { title: "Uppstart", description: "Vi tar fram ett tydligt upplägg, sätter igång portalen och sköter hela övergången." },
      { title: "Löpande arbete", description: "Ni får snabb återkoppling, tydlig struktur och full insyn via portalen." },
    ],
  },
  fi: {
    eyebrow: "Näin se toimii käytännössä",
    title: "Ensimmäisestä yhteydenotosta jatkuvaan yhteistyöhön.",
    steps: [
      { title: "Yhteydenotto", description: "Kerro taloyhtiöstänne ja tarpeistanne. Me kuuntelemme ja kysymme oikeat kysymykset." },
      { title: "Käynnistys", description: "Laadimme selkeän kokonaisuuden, käynnistämme portaalin ja hoidamme siirtymän." },
      { title: "Jatkuva työ", description: "Saatte nopean vastauksen, selkeän rakenteen ja täyden näkyvyyden portaalin kautta." },
    ],
  },
};

const InPractice = () => {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <section className="section-padding">
      <div className="container-narrow">
        <FadeIn>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">{t.eyebrow}</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-16">
            {t.title}
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-6">
          {t.steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <FadeIn key={i} delay={i * 120}>
                <div className="card-gradient border border-border rounded-3xl p-8 hover:border-primary/20 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{step.description}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InPractice;
