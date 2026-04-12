import FadeIn from "./FadeIn";
import { useLanguage } from "@/context/LanguageContext";
import { User } from "lucide-react";

const COPY = {
  sv: {
    eyebrow: "Om oss",
    title: "Personerna bakom FEM.",
    body: "Mer information kommer snart. Vi ser fram emot att presentera oss ordentligt.",
    person1: { name: "Namn 1", email: "namn1@femkiinteisto.fi" },
    person2: { name: "Namn 2", email: "namn2@femkiinteisto.fi" },
  },
  fi: {
    eyebrow: "Meistä",
    title: "Ihmiset FEMin takana.",
    body: "Lisätietoja tulossa pian. Odotamme innolla, että pääsemme esittäytymään kunnolla.",
    person1: { name: "Nimi 1", email: "nimi1@femkiinteisto.fi" },
    person2: { name: "Nimi 2", email: "nimi2@femkiinteisto.fi" },
  },
} as const;

const AboutUs = () => {
  const { lang } = useLanguage();
  const c = COPY[lang];

  return (
    <section id="om-oss" className="section-padding">
      <div className="container-narrow">
        <FadeIn>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            {c.eyebrow}
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-6">
            {c.title}
          </h2>
          <p className="text-muted-foreground max-w-xl mb-16">{c.body}</p>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="grid gap-8 sm:grid-cols-2 max-w-2xl">
            {[c.person1, c.person2].map((person, i) => (
              <div
                key={i}
                className="card-gradient border border-border rounded-2xl p-6 flex flex-col items-center text-center"
              >
                {/* Placeholder image area */}
                <div className="w-28 h-28 rounded-full bg-secondary border border-border flex items-center justify-center mb-5">
                  <User className="w-10 h-10 text-muted-foreground/50" />
                </div>
                <p className="font-display text-lg font-semibold text-foreground">
                  {person.name}
                </p>
                <a
                  href={`mailto:${person.email}`}
                  className="mt-1 text-sm text-primary hover:underline"
                >
                  {person.email}
                </a>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default AboutUs;
