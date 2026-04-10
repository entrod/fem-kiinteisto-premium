import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import FadeIn from "@/components/FadeIn";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft, AlertCircle, Clock, CheckCircle2, User,
  MessageSquare, Calendar, Car, FileText, Bell, Shield,
  Home, Settings, ChevronRight
} from "lucide-react";

const StatusBadge = ({ label, active = false }: { label: string; active?: boolean }) => (
  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
    active
      ? "bg-primary/20 text-primary border border-primary/30"
      : "bg-muted text-muted-foreground border border-border"
  }`}>
    {label}
  </span>
);

const PortalPage = () => {
  const { lang } = useLanguage();
  const sv = lang === "sv";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="section-padding pt-32 md:pt-40">
        <div className="container-narrow">
          <FadeIn>
            <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              {sv ? "Tillbaka" : "Takaisin"}
            </Link>
            <div className="inline-block px-3 py-1 rounded-full border border-primary/30 text-primary text-xs font-medium mb-6">
              {sv ? "Digital plattform" : "Digitaalinen alusta"}
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
              {sv ? "Allt samlat på ett ställe." : "Kaikki yhdessä paikassa."}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
              {sv
                ? "Ärenden, bokningar, dokument och kommunikation — i en portal byggd för husbolag."
                : "Asiat, varaukset, dokumentit ja viestintä — portaalissa, joka on rakennettu taloyhtiöille."}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Section: Ärendehantering */}
      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
              {sv ? "Ärendehantering" : "Asianhallinta"}
            </p>
            <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-12">
              {sv ? "Följ varje ärende i realtid." : "Seuraa jokaista asiaa reaaliajassa."}
            </h2>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="card-gradient border border-border rounded-3xl p-6 md:p-8">
              {/* Case card mock */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">ÄR-2024-047</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold">
                    {sv ? "Trasig lampa i trapphus B" : "Rikkinäinen lamppu rappukäytävässä B"}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{sv ? "2 timmar sedan" : "2 tuntia sitten"}</span>
                </div>
              </div>

              {/* Status flow */}
              <div className="flex flex-wrap gap-2 mb-6">
                <StatusBadge label={sv ? "Mottaget" : "Vastaanotettu"} />
                <ChevronRight className="w-4 h-4 text-muted-foreground self-center" />
                <StatusBadge label={sv ? "Behöver info" : "Tarvitsee tietoa"} />
                <ChevronRight className="w-4 h-4 text-muted-foreground self-center" />
                <StatusBadge label={sv ? "Pågående" : "Käynnissä"} active />
                <ChevronRight className="w-4 h-4 text-muted-foreground self-center" />
                <StatusBadge label={sv ? "Klart" : "Valmis"} />
              </div>

              {/* Timeline */}
              <div className="border-l-2 border-border pl-4 space-y-4 mb-6">
                <div className="relative">
                  <div className="absolute -left-[1.3rem] top-1 w-2.5 h-2.5 rounded-full bg-primary" />
                  <p className="text-sm font-medium">{sv ? "Tilldelad: Erik N." : "Vastuuhenkilö: Erik N."}</p>
                  <p className="text-xs text-muted-foreground">{sv ? "Idag 14:32" : "Tänään 14:32"}</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[1.3rem] top-1 w-2.5 h-2.5 rounded-full bg-border" />
                  <p className="text-sm font-medium">{sv ? "Material beställt" : "Materiaali tilattu"}</p>
                  <p className="text-xs text-muted-foreground">{sv ? "Idag 13:15" : "Tänään 13:15"}</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[1.3rem] top-1 w-2.5 h-2.5 rounded-full bg-border" />
                  <p className="text-sm font-medium">{sv ? "Ärende mottaget" : "Asia vastaanotettu"}</p>
                  <p className="text-xs text-muted-foreground">{sv ? "Idag 12:04" : "Tänään 12:04"}</p>
                </div>
              </div>

              {/* Message */}
              <div className="card-gradient border border-border rounded-2xl p-4 flex items-start gap-3">
                <MessageSquare className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium mb-1">Erik N.</p>
                  <p className="text-xs text-muted-foreground">
                    {sv
                      ? "Lampan är beställd, byter den imorgon förmiddag."
                      : "Lamppu on tilattu, vaihdan sen huomenna aamupäivällä."}
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Dashboard overview */}
      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
              {sv ? "Översikt" : "Yleiskatsaus"}
            </p>
            <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-12">
              {sv ? "Hela bilden på ett ögonblick." : "Kokonaiskuva yhdellä silmäyksellä."}
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { icon: AlertCircle, label: sv ? "Aktiva ärenden" : "Aktiiviset asiat", value: "4", sub: sv ? "2 nya idag" : "2 uutta tänään" },
              { icon: Settings, label: sv ? "Kommande underhåll" : "Tuleva huolto", value: "2", sub: sv ? "Nästa: VVS-kontroll" : "Seuraava: LVI-tarkastus" },
              { icon: Bell, label: sv ? "Notiser" : "Ilmoitukset", value: "7", sub: sv ? "3 olästa" : "3 lukematonta" },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="card-gradient border border-border rounded-3xl p-6 hover:border-primary/20 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                      <card.icon className="w-4 h-4 text-accent-foreground" />
                    </div>
                    <span className="text-sm text-muted-foreground">{card.label}</span>
                  </div>
                  <p className="font-display text-3xl font-bold mb-1">{card.value}</p>
                  <p className="text-xs text-muted-foreground">{card.sub}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
              {sv ? "Roller & behörigheter" : "Roolit ja oikeudet"}
            </p>
            <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-12">
              {sv ? "Rätt information till rätt person." : "Oikea tieto oikealle henkilölle."}
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: sv ? "Styrelse" : "Hallitus", desc: sv ? "Full översikt, rapporter, beslut och budget." : "Täysi katsaus, raportit, päätökset ja budjetti." },
              { icon: Home, title: sv ? "Boende" : "Asukas", desc: sv ? "Skapa ärenden, boka utrymmen, ta emot notiser." : "Luo asioita, varaa tiloja, vastaanota ilmoituksia." },
              { icon: User, title: sv ? "Förvaltare" : "Isännöitsijä", desc: sv ? "Hantera, prioritera och delegera ärenden." : "Hallinnoi, priorisoi ja delegoi asioita." },
            ].map((role, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="card-gradient border border-border rounded-3xl p-8 hover:border-primary/20 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-6">
                    <role.icon className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">{role.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{role.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Bookings */}
      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
              {sv ? "Bokningssystem" : "Varausjärjestelmä"}
            </p>
            <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-12">
              {sv ? "Boka gemensamma utrymmen smidigt." : "Varaa yhteiset tilat sujuvasti."}
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="card-gradient border border-border rounded-3xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="font-display text-lg font-semibold">{sv ? "Vecka 15" : "Viikko 15"}</h3>
              </div>
              <div className="space-y-3">
                {[
                  { space: sv ? "Tvättstuga" : "Pesutupa", slots: [
                    { time: "08:00–10:00", status: "booked", by: "Lgh 12" },
                    { time: "10:00–12:00", status: "free" },
                    { time: "12:00–14:00", status: "booked", by: "Lgh 4" },
                    { time: "14:00–16:00", status: "free" },
                  ]},
                  { space: sv ? "Bastu" : "Sauna", slots: [
                    { time: "17:00–19:00", status: "free" },
                    { time: "19:00–21:00", status: "booked", by: "Lgh 8" },
                  ]},
                ].map((room, i) => (
                  <div key={i} className="border border-border rounded-2xl p-4">
                    <p className="text-sm font-medium mb-3">{room.space}</p>
                    <div className="flex flex-wrap gap-2">
                      {room.slots.map((slot, j) => (
                        <div key={j} className={`text-xs px-3 py-1.5 rounded-lg border ${
                          slot.status === "booked"
                            ? "border-border bg-muted text-muted-foreground"
                            : "border-primary/30 bg-primary/10 text-primary"
                        }`}>
                          {slot.time} {slot.status === "booked" ? `· ${slot.by}` : (sv ? "· Ledig" : "· Vapaa")}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Queue */}
      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
              {sv ? "Köhantering" : "Jonojen hallinta"}
            </p>
            <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-12">
              {sv ? "Transparenta köer, inga frågetecken." : "Läpinäkyvät jonot, ei kysymysmerkkejä."}
            </h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-6">
            <FadeIn delay={100}>
              <div className="card-gradient border border-border rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Car className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-semibold">{sv ? "Parkeringskö" : "Parkkijono"}</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "Lgh 14 — A. Lindström", pos: 1, wait: sv ? "~2 mån" : "~2 kk" },
                    { name: "Lgh 3 — M. Korhonen", pos: 2, wait: sv ? "~5 mån" : "~5 kk" },
                    { name: "Lgh 9 — J. Björk", pos: 3, wait: sv ? "~8 mån" : "~8 kk" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between border border-border rounded-xl p-3">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center text-xs font-bold text-accent-foreground">{item.pos}</span>
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{item.wait}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="card-gradient border border-border rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-5 h-5 text-primary" />
                  <h3 className="font-display font-semibold">{sv ? "Dokument & kommunikation" : "Dokumentit & viestintä"}</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { title: sv ? "Mötesprotokoll 03/2024" : "Pöytäkirja 03/2024", date: "2024-03-15", type: "PDF" },
                    { title: sv ? "Underhållsplan 2024–2028" : "Huoltosuunnitelma 2024–2028", date: "2024-01-10", type: "PDF" },
                    { title: sv ? "Viktig info: Vattenavstängning 18.4" : "Tärkeä: Vesikatkos 18.4", date: "2024-04-12", type: sv ? "Notis" : "Ilmoitus" },
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between border border-border rounded-xl p-3">
                      <div>
                        <p className="text-sm font-medium">{doc.title}</p>
                        <p className="text-xs text-muted-foreground">{doc.date}</p>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground border border-border">{doc.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-narrow text-center">
          <FadeIn>
            <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-4">
              {sv ? "Vill ni se portalen i praktiken?" : "Haluatteko nähdä portaalin käytännössä?"}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              {sv
                ? "Boka en genomgång så visar vi hur det fungerar för just ert husbolag."
                : "Varatkaa esittely, niin näytämme miten se toimii juuri teidän taloyhtiöllenne."}
            </p>
            <Link
              to="/#kontakt"
              className="inline-block bg-primary text-primary-foreground font-medium px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              {sv ? "Boka demo" : "Varaa esittely"}
            </Link>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PortalPage;
