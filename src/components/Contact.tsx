import { useState } from "react";
import FadeIn from "./FadeIn";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="kontakt" className="section-padding">
      <div className="container-narrow">
        <FadeIn>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">Kontakt</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-16">
            Låt oss prata.
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="card-gradient border border-border rounded-3xl p-8 md:p-12 max-w-2xl">
            {submitted ? (
              <div className="text-center py-12">
                <p className="font-display text-2xl font-bold mb-2">Tack!</p>
                <p className="text-muted-foreground">Vi återkommer så snart som möjligt.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Namn</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Företag / Taloyhtiö</label>
                  <input
                    type="text"
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Antal lägenheter</label>
                    <input
                      type="number"
                      className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">E-post / telefon</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Meddelande</label>
                  <textarea
                    rows={4}
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground font-medium px-8 py-3 rounded-2xl text-sm hover:opacity-90 transition-opacity"
                >
                  Kontakta oss
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Contact;
