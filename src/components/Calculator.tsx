import { useState } from "react";
import FadeIn from "./FadeIn";

const Calculator = () => {
  const [apartments, setApartments] = useState(20);
  const [huolto, setHuolto] = useState(true);
  const [siivous, setSiivous] = useState(false);
  const [complexity, setComplexity] = useState<"simple" | "normal" | "advanced">("normal");

  const complexityMultiplier = { simple: 0.8, normal: 1, advanced: 1.3 };
  const base = apartments * 18;
  const huoltoCost = huolto ? apartments * 8 : 0;
  const siivousCost = siivous ? apartments * 5 : 0;
  const total = Math.round((base + huoltoCost + siivousCost) * complexityMultiplier[complexity]);

  return (
    <section id="kalkylator" className="section-padding">
      <div className="container-narrow">
        <FadeIn>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">Priskalkylator</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-16">
            Beräkna ditt pris.
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="card-gradient border border-border rounded-3xl p-8 md:p-12 max-w-2xl">
            <div className="space-y-8">
              {/* Apartments */}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Antal lägenheter</label>
                <input
                  type="range"
                  min={5}
                  max={200}
                  value={apartments}
                  onChange={(e) => setApartments(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <span className="font-display text-2xl font-bold mt-2 block">{apartments}</span>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setHuolto(!huolto)}
                  className={`px-5 py-2.5 rounded-2xl text-sm font-medium border transition-colors ${
                    huolto
                      ? "bg-primary/15 border-primary/30 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/20"
                  }`}
                >
                  Huolto
                </button>
                <button
                  onClick={() => setSiivous(!siivous)}
                  className={`px-5 py-2.5 rounded-2xl text-sm font-medium border transition-colors ${
                    siivous
                      ? "bg-primary/15 border-primary/30 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/20"
                  }`}
                >
                  Siivous
                </button>
              </div>

              {/* Complexity */}
              <div>
                <label className="text-sm text-muted-foreground mb-3 block">Komplexitet</label>
                <div className="flex gap-3">
                  {(["simple", "normal", "advanced"] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setComplexity(level)}
                      className={`px-4 py-2 rounded-xl text-sm font-medium border transition-colors capitalize ${
                        complexity === level
                          ? "bg-primary/15 border-primary/30 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/20"
                      }`}
                    >
                      {level === "simple" ? "Enkel" : level === "normal" ? "Normal" : "Avancerad"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Result */}
              <div className="border-t border-border pt-8">
                <p className="text-sm text-muted-foreground mb-1">Preliminär uppskattning</p>
                <p className="font-display text-4xl font-bold">
                  {total} <span className="text-lg text-muted-foreground font-normal">€/mån</span>
                </p>
                <a
                  href="#kontakt"
                  className="inline-block mt-6 bg-primary text-primary-foreground font-medium px-8 py-3 rounded-2xl text-sm hover:opacity-90 transition-opacity"
                >
                  Få exakt offert
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Calculator;
