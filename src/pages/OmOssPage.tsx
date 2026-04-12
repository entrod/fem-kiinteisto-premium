import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/context/LanguageContext";
import { User } from "lucide-react";

const COPY = {
  sv: {
    eyebrow: "Om oss",
    heroTitle: "Vi bygger nästa generations fastighetsservice",
    heroBody: "Mer om oss och teamet bakom FEM kommer snart.",
    teamTitle: "Personerna bakom FEM",
    teamBody: "Möt teamet som arbetar för att göra fastighetsservice enklare, tydligare och modernare.",
    person1: { name: "Namn 1", email: "namn1@femkiinteisto.fi", role: "Roll" },
    person2: { name: "Namn 2", email: "namn2@femkiinteisto.fi", role: "Roll" },
  },
  fi: {
    eyebrow: "Meistä",
    heroTitle: "Rakennamme seuraavan sukupolven kiinteistöpalvelua",
    heroBody: "Lisätietoja meistä ja FEMin tiimistä tulossa pian.",
    teamTitle: "Ihmiset FEMin takana",
    teamBody: "Tutustuu tiimiin, joka tekee kiinteistöpalvelusta helpompaa, selkeämpää ja modernimpaa.",
    person1: { name: "Nimi 1", email: "nimi1@femkiinteisto.fi", role: "Rooli" },
    person2: { name: "Nimi 2", email: "nimi2@femkiinteisto.fi", role: "Rooli" },
  },
} as const;

const OmOssPage = () => {
  const { lang } = useLanguage();
  const c = COPY[lang];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="hero-gradient min-h-[60vh] flex items-center section-padding pt-40 pb-24">
        <div className="container-narrow">
          <FadeIn>
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-6">
              {c.eyebrow}
            </p>
          </FadeIn>
          <FadeIn delay={100}>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight max-w-3xl mb-8">
              {c.heroTitle}
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="text-muted-foreground text-lg md:text-xl max-w-xl leading-relaxed">
              {c.heroBody}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-3">
              {c.teamTitle}
            </h2>
            <p className="text-muted-foreground max-w-lg mb-16">
              {c.teamBody}
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="grid gap-8 sm:grid-cols-2 max-w-2xl">
              {[c.person1, c.person2].map((person, i) => (
                <div
                  key={i}
                  className="card-gradient border border-border rounded-2xl p-8 flex flex-col items-center text-center"
                >
                  {/* Image placeholder */}
                  <div className="w-32 h-32 rounded-full bg-secondary border border-border flex items-center justify-center mb-6">
                    <User className="w-12 h-12 text-muted-foreground/40" />
                  </div>
                  <p className="font-display text-lg font-semibold text-foreground">
                    {person.name}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">
                    {person.role}
                  </p>
                  <a
                    href={`mailto:${person.email}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {person.email}
                  </a>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OmOssPage;
