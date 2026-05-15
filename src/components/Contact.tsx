import { useEffect, useState } from "react";
import FadeIn from "./FadeIn";
import { useLanguage } from "@/context/LanguageContext";
import {
  formatQuoteSelectionAsText,
  getQuoteSelection,
  subscribeQuoteSelection,
  type QuoteSelection,
} from "@/lib/quoteSelection";

const Contact = () => {
  const { t, lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [selection, setSelection] = useState<QuoteSelection | null>(() => getQuoteSelection());
  const [message, setMessage] = useState("");

  useEffect(() => subscribeQuoteSelection(setSelection), []);

  const isFi = lang === "fi";
  const fmt = new Intl.NumberFormat(isFi ? "fi-FI" : "sv-SE");

  const labels = isFi
    ? {
        attachedTitle: "Kalkulaattorin valinnat liitetään mukaan",
        attachedHelp: "Lähettäessäsi liitämme automaattisesti alla olevat valinnat tarjouspyyntöön.",
        services: "Palvelut",
        cleaning: "Siivous",
        complexity: "Laajuus",
        apartments: "Asuntoja portaaliin",
        estimate: "Alustava arvio",
        perMonth: "/kk",
        emptyTitle: "Ei valintoja kalkulaattorista",
        emptyHelp: "Voit silti lähettää viestin – täydennämme tiedot kanssasi.",
        sending: "Liitetään pyyntöön ↓",
        edit: "Muokkaa valintoja",
      }
    : {
        attachedTitle: "Dina val från kalkylatorn skickas med",
        attachedHelp: "När du skickar bifogar vi automatiskt valen nedan i offertförfrågan.",
        services: "Tjänster",
        cleaning: "Städning",
        complexity: "Omfattning",
        apartments: "Lägenheter i portalen",
        estimate: "Preliminär uppskattning",
        perMonth: "/mån",
        emptyTitle: "Inga val från kalkylatorn",
        emptyHelp: "Du kan ändå skicka meddelandet – vi fyller i tillsammans.",
        sending: "Bifogas i förfrågan ↓",
        edit: "Redigera val",
      };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // The hidden field below carries the selection summary so it is included
    // when the form is later wired up to a backend / email service.
    setSubmitted(true);
  };

  const selectionText = selection ? formatQuoteSelectionAsText(selection, lang) : "";

  return (
    <section id="kontakt" className="section-padding">
      <div className="container-narrow">
        <FadeIn>
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">{t.contact.eyebrow}</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-16">
            {t.contact.title}
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="card-gradient border border-border rounded-3xl p-8 md:p-12 max-w-2xl">
            {submitted ? (
              <div className="text-center py-12">
                <p className="font-display text-2xl font-bold mb-2">{t.contact.successTitle}</p>
                <p className="text-muted-foreground">{t.contact.successBody}</p>
                {selection && (
                  <pre className="mt-6 text-left whitespace-pre-wrap text-xs bg-secondary/40 border border-border rounded-xl p-4 text-muted-foreground">
                    {selectionText}
                  </pre>
                )}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Attached selection panel */}
                <div
                  className={`rounded-2xl border p-4 sm:p-5 ${
                    selection ? "border-primary/30 bg-primary/10" : "border-border bg-secondary/30"
                  }`}
                  aria-live="polite"
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                        selection
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground border border-border"
                      }`}
                      aria-hidden
                    >
                      {selection ? "✓" : "i"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground">
                        {selection ? labels.attachedTitle : labels.emptyTitle}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {selection ? labels.attachedHelp : labels.emptyHelp}
                      </p>

                      {selection && (
                        <div className="mt-4 space-y-2 text-xs">
                          {selection.services.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {selection.services.map((s) => (
                                <span
                                  key={s}
                                  className="inline-flex items-center rounded-full border border-primary/30 bg-background/40 px-2.5 py-0.5 text-foreground"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          )}
                          <dl className="grid gap-1 sm:grid-cols-2 text-muted-foreground">
                            {selection.cleaningTypes.length > 0 && (
                              <div>
                                <dt className="inline font-medium text-foreground">{labels.cleaning}: </dt>
                                <dd className="inline">{selection.cleaningTypes.join(", ")}</dd>
                              </div>
                            )}
                            {selection.complexity && (
                              <div>
                                <dt className="inline font-medium text-foreground">{labels.complexity}: </dt>
                                <dd className="inline">{selection.complexity}</dd>
                              </div>
                            )}
                            {selection.apartments != null && (
                              <div>
                                <dt className="inline font-medium text-foreground">{labels.apartments}: </dt>
                                <dd className="inline">{selection.apartments}</dd>
                              </div>
                            )}
                            <div>
                              <dt className="inline font-medium text-foreground">{labels.estimate}: </dt>
                              <dd className="inline">
                                {fmt.format(selection.total)} €{labels.perMonth}
                              </dd>
                            </div>
                          </dl>
                          <p className="pt-1 text-[11px] uppercase tracking-wider text-primary/80 font-medium">
                            {labels.sending}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">{t.contact.fields.name}</label>
                  <input
                    required
                    type="text"
                    name="name"
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">{t.contact.fields.company}</label>
                  <input
                    type="text"
                    name="company"
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">{t.contact.fields.apartments}</label>
                    <input
                      type="number"
                      name="apartments"
                      className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">{t.contact.fields.contact}</label>
                    <input
                      required
                      type="text"
                      name="contact"
                      className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">{t.contact.fields.message}</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-foreground text-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  />
                </div>

                {/* Hidden field that carries the calculator selection in the
                    actual form payload when wired to a backend. */}
                <input type="hidden" name="quote_selection" value={selectionText} />

                <button
                  type="submit"
                  className="bg-primary text-primary-foreground font-medium px-8 py-3 rounded-2xl text-sm hover:opacity-90 transition-opacity"
                >
                  {t.contact.submit}
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
