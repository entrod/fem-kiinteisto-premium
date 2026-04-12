import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import FadeIn from "@/components/FadeIn";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowLeft, AlertCircle, Clock, CheckCircle2, User,
  MessageSquare, Calendar, Car, FileText, Bell, Shield,
  Home, Settings, ChevronRight, LogIn, BarChart3,
  Search, Plus, Filter, MoreHorizontal, Send, Paperclip,
  ChevronDown, ArrowUpRight, Zap, Lock, Users
} from "lucide-react";

const StatusBadge = ({ label, active = false, done = false }: { label: string; active?: boolean; done?: boolean }) => (
  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
    done
      ? "bg-green-500/20 text-green-400 border border-green-500/30"
      : active
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
            <div className="flex flex-col items-start gap-4 mb-8">
              <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" />
                {sv ? "Tillbaka" : "Takaisin"}
              </Link>
              <div className="inline-block px-3 py-1 rounded-full border border-primary/30 text-primary text-xs font-medium">
                {sv ? "Digital plattform" : "Digitaalinen alusta"}
              </div>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6">
              {sv ? "Er portal för hela husbolaget." : "Taloyhtiönne oma portaali."}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed mb-8">
              {sv
                ? "Ärenden, bokningar, dokument och kommunikation — i en portal byggd för husbolag. Logga in för att hantera ert husbolag smidigt."
                : "Asiat, varaukset, dokumentit ja viestintä — portaalissa, joka on rakennettu taloyhtiöille. Kirjaudu sisään hallitaksesi taloyhtiötänne sujuvasti."}
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#demo"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-6 py-3 rounded-xl hover:opacity-90 transition-opacity"
              >
                <LogIn className="w-4 h-4" />
                {sv ? "Logga in på portalen" : "Kirjaudu portaaliin"}
              </a>
              <Link
                to="/#kontakt"
                className="inline-flex items-center gap-2 border border-border text-foreground font-medium px-6 py-3 rounded-xl hover:border-primary/30 transition-colors"
              >
                {sv ? "Boka demo" : "Varaa esittely"}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Platform preview - fake app shell */}
      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
              {sv ? "Så ser det ut" : "Näin se näyttää"}
            </p>
            <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-12">
              {sv ? "En riktig plattform, inte bara en hemsida." : "Oikea alusta, ei pelkkä verkkosivusto."}
            </h2>
          </FadeIn>

          {/* App shell mockup */}
          <FadeIn delay={100}>
            <div className="border border-border rounded-3xl overflow-hidden">
              {/* App top bar */}
              <div className="bg-card border-b border-border px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Home className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-display font-semibold text-sm">FEM Portal</span>
                  <span className="text-xs text-muted-foreground">— Brf Sjöstaden 4</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Bell className="w-4 h-4 text-muted-foreground" />
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-card" />
                  </div>
                  <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-xs font-medium text-accent-foreground">
                    AL
                  </div>
                </div>
              </div>

              <div className="flex">
                {/* Sidebar */}
                <div className="hidden md:block w-52 border-r border-border bg-card/50 p-4 space-y-1">
                  {[
                    { icon: BarChart3, label: sv ? "Översikt" : "Yleiskatsaus", active: true },
                    { icon: AlertCircle, label: sv ? "Ärenden" : "Asiat", badge: "4" },
                    { icon: Calendar, label: sv ? "Bokningar" : "Varaukset" },
                    { icon: FileText, label: sv ? "Dokument" : "Dokumentit" },
                    { icon: MessageSquare, label: sv ? "Meddelanden" : "Viestit", badge: "2" },
                    { icon: Users, label: sv ? "Boende" : "Asukkaat" },
                    { icon: Settings, label: sv ? "Inställningar" : "Asetukset" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs ${
                        item.active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <item.icon className="w-3.5 h-3.5" />
                        {item.label}
                      </div>
                      {item.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Main content */}
                <div className="flex-1 p-6 space-y-6 min-h-[500px]">
                  {/* Dashboard header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-lg font-semibold">{sv ? "Översikt" : "Yleiskatsaus"}</h3>
                      <p className="text-xs text-muted-foreground">{sv ? "Tisdag 15 april, 2025" : "Tiistai 15. huhtikuuta 2025"}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 border border-border rounded-lg px-3 py-1.5 text-xs text-muted-foreground">
                        <Search className="w-3 h-3" />
                        {sv ? "Sök..." : "Hae..."}
                      </div>
                      <button className="flex items-center gap-1.5 bg-primary text-primary-foreground rounded-lg px-3 py-1.5 text-xs font-medium">
                        <Plus className="w-3 h-3" />
                        {sv ? "Nytt ärende" : "Uusi asia"}
                      </button>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: sv ? "Aktiva ärenden" : "Aktiiviset", value: "4", change: "+1", icon: AlertCircle },
                      { label: sv ? "Pågående" : "Käynnissä", value: "2", change: "", icon: Clock },
                      { label: sv ? "Lösta denna vecka" : "Ratkaistut", value: "7", change: "+3", icon: CheckCircle2 },
                      { label: sv ? "Kommande underhåll" : "Tuleva huolto", value: "2", change: "", icon: Settings },
                    ].map((stat, i) => (
                      <div key={i} className="card-gradient border border-border rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <stat.icon className="w-3.5 h-3.5 text-muted-foreground" />
                          {stat.change && (
                            <span className="text-[10px] text-primary font-medium">{stat.change}</span>
                          )}
                        </div>
                        <p className="font-display text-2xl font-bold">{stat.value}</p>
                        <p className="text-[11px] text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Recent cases */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold">{sv ? "Senaste ärenden" : "Viimeisimmät asiat"}</h4>
                      <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1 text-[11px] text-muted-foreground border border-border rounded-md px-2 py-1">
                          <Filter className="w-3 h-3" />
                          {sv ? "Filter" : "Suodata"}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[
                        {
                          id: "ÄR-047",
                          title: sv ? "Trasig lampa i trapphus B" : "Rikkinäinen lamppu B-rappukäytävässä",
                          status: sv ? "Pågående" : "Käynnissä",
                          statusType: "active" as const,
                          assignee: "Erik N.",
                          time: sv ? "2 tim sedan" : "2 t sitten",
                        },
                        {
                          id: "ÄR-046",
                          title: sv ? "Vattenläcka källare" : "Vesivuoto kellarissa",
                          status: sv ? "Behöver info" : "Tarvitsee tietoa",
                          statusType: "pending" as const,
                          assignee: "Maria S.",
                          time: sv ? "Igår" : "Eilen",
                        },
                        {
                          id: "ÄR-045",
                          title: sv ? "Dörrkod ur funktion port 2" : "Ovikoodi ei toimi portti 2",
                          status: sv ? "Klart" : "Valmis",
                          statusType: "done" as const,
                          assignee: "Erik N.",
                          time: sv ? "2 dagar sedan" : "2 pv sitten",
                        },
                        {
                          id: "ÄR-044",
                          title: sv ? "Graffiti fasad" : "Graffiti julkisivussa",
                          status: sv ? "Mottaget" : "Vastaanotettu",
                          statusType: "new" as const,
                          assignee: "—",
                          time: sv ? "3 dagar sedan" : "3 pv sitten",
                        },
                      ].map((c, i) => (
                        <div key={i} className="flex items-center justify-between border border-border rounded-xl p-3 hover:border-primary/20 transition-colors cursor-pointer">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] text-muted-foreground font-mono w-14">{c.id}</span>
                            <span className="text-sm">{c.title}</span>
                          </div>
                          <div className="hidden sm:flex items-center gap-3">
                            <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                              c.statusType === "active" ? "bg-primary/20 text-primary" :
                              c.statusType === "done" ? "bg-green-500/20 text-green-400" :
                              c.statusType === "pending" ? "bg-yellow-500/20 text-yellow-400" :
                              "bg-muted text-muted-foreground"
                            }`}>{c.status}</span>
                            <span className="text-[11px] text-muted-foreground w-16">{c.assignee}</span>
                            <span className="text-[11px] text-muted-foreground">{c.time}</span>
                            <MoreHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Ärendehantering deep dive */}
      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
              {sv ? "Ärendehantering" : "Asianhallinta"}
            </p>
            <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-12">
              {sv ? "Följ varje ärende från start till slut." : "Seuraa jokaista asiaa alusta loppuun."}
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Case detail card */}
            <FadeIn delay={100}>
              <div className="card-gradient border border-border rounded-3xl p-6 md:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground font-mono">ÄR-2024-047</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold">
                      {sv ? "Trasig lampa i trapphus B" : "Rikkinäinen lamppu rappukäytävässä B"}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{sv ? "2 tim sedan" : "2 t sitten"}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <StatusBadge label={sv ? "Mottaget" : "Vastaanotettu"} done />
                  <ChevronRight className="w-4 h-4 text-muted-foreground self-center" />
                  <StatusBadge label={sv ? "Bedömt" : "Arvioitu"} done />
                  <ChevronRight className="w-4 h-4 text-muted-foreground self-center" />
                  <StatusBadge label={sv ? "Pågående" : "Käynnissä"} active />
                  <ChevronRight className="w-4 h-4 text-muted-foreground self-center" />
                  <StatusBadge label={sv ? "Klart" : "Valmis"} />
                </div>

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

                {/* Chat thread */}
                <div className="space-y-3">
                  <div className="card-gradient border border-border rounded-2xl p-4 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0 text-[10px] font-medium text-accent-foreground">EN</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium">Erik N.</p>
                        <span className="text-[10px] text-muted-foreground">14:35</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {sv
                          ? "Lampan är beställd, byter den imorgon förmiddag. Aviserar berörda boende."
                          : "Lamppu on tilattu, vaihdan sen huomenna aamupäivällä. Ilmoitan asukkaille."}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2">
                    <Paperclip className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="flex-1 text-xs text-muted-foreground">{sv ? "Skriv ett meddelande..." : "Kirjoita viesti..."}</span>
                    <Send className="w-3.5 h-3.5 text-primary" />
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Notifications / activity feed */}
            <FadeIn delay={200}>
              <div className="space-y-6">
                <div className="card-gradient border border-border rounded-3xl p-6">
                  <h4 className="font-display font-semibold mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    {sv ? "Senaste aktivitet" : "Viimeaikainen toiminta"}
                  </h4>
                  <div className="space-y-3">
                    {[
                      { text: sv ? "Erik N. uppdaterade ÄR-047" : "Erik N. päivitti ÄR-047", time: "14:35" },
                      { text: sv ? "Nytt ärende: Graffiti fasad" : "Uusi asia: Graffiti julkisivussa", time: "13:20" },
                      { text: sv ? "ÄR-045 markerat som klart" : "ÄR-045 merkitty valmiiksi", time: "11:45" },
                      { text: sv ? "Maria S. kommenterade ÄR-046" : "Maria S. kommentoi ÄR-046", time: "10:12" },
                      { text: sv ? "Ny bokning: Bastu tors 17–19" : "Uusi varaus: Sauna to 17–19", time: "09:30" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                        <span className="text-sm">{item.text}</span>
                        <span className="text-[11px] text-muted-foreground shrink-0 ml-3">{item.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-gradient border border-border rounded-3xl p-6">
                  <h4 className="font-display font-semibold mb-4">{sv ? "Snabbåtgärder" : "Pikatoiminnot"}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: Plus, label: sv ? "Nytt ärende" : "Uusi asia" },
                      { icon: Calendar, label: sv ? "Boka utrymme" : "Varaa tila" },
                      { icon: FileText, label: sv ? "Dokument" : "Dokumentit" },
                      { icon: MessageSquare, label: sv ? "Meddelande" : "Viesti" },
                    ].map((action, i) => (
                      <div key={i} className="flex items-center gap-2 border border-border rounded-xl p-3 text-sm hover:border-primary/20 transition-colors cursor-pointer">
                        <action.icon className="w-4 h-4 text-muted-foreground" />
                        {action.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
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
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h3 className="font-display text-lg font-semibold">{sv ? "Tisdag 15 april" : "Tiistai 15. huhtikuuta"}</h3>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ChevronDown className="w-3.5 h-3.5" />
                  {sv ? "Vecka 16" : "Viikko 16"}
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { space: sv ? "Tvättstuga A" : "Pesutupa A", slots: [
                    { time: "08:00–10:00", status: "booked", by: "Lgh 12" },
                    { time: "10:00–12:00", status: "free" },
                    { time: "12:00–14:00", status: "booked", by: "Lgh 4" },
                    { time: "14:00–16:00", status: "free" },
                    { time: "16:00–18:00", status: "mine", by: sv ? "Min bokning" : "Oma varaus" },
                  ]},
                  { space: sv ? "Tvättstuga B" : "Pesutupa B", slots: [
                    { time: "08:00–10:00", status: "free" },
                    { time: "10:00–12:00", status: "free" },
                    { time: "12:00–14:00", status: "booked", by: "Lgh 7" },
                    { time: "14:00–16:00", status: "free" },
                  ]},
                  { space: sv ? "Bastu" : "Sauna", slots: [
                    { time: "17:00–19:00", status: "free" },
                    { time: "19:00–21:00", status: "booked", by: "Lgh 8" },
                    { time: "21:00–23:00", status: "free" },
                  ]},
                ].map((room, i) => (
                  <div key={i} className="border border-border rounded-2xl p-4">
                    <p className="text-sm font-medium mb-3">{room.space}</p>
                    <div className="flex flex-wrap gap-2">
                      {room.slots.map((slot, j) => (
                        <div key={j} className={`text-xs px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
                          slot.status === "booked"
                            ? "border-border bg-muted text-muted-foreground"
                            : slot.status === "mine"
                              ? "border-primary bg-primary/20 text-primary font-medium"
                              : "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
                        }`}>
                          {slot.time} {slot.status === "booked" ? `· ${slot.by}` : slot.status === "mine" ? `· ${slot.by}` : (sv ? "· Ledig" : "· Vapaa")}
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

      {/* Queue + Documents side by side */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Queue */}
            <FadeIn delay={100}>
              <div className="card-gradient border border-border rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-1">
                  <Car className="w-5 h-5 text-primary" />
                  <h3 className="font-display text-lg font-semibold">{sv ? "Köhantering" : "Jonot"}</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-4">{sv ? "Parkeringsplats — varmgarage" : "Parkkipaikka — lämmin halli"}</p>
                <div className="space-y-2">
                  {[
                    { name: "A. Lindström", apt: "Lgh 14", pos: 1, wait: sv ? "~2 mån" : "~2 kk" },
                    { name: "M. Korhonen", apt: "Lgh 3", pos: 2, wait: sv ? "~5 mån" : "~5 kk" },
                    { name: "J. Björk", apt: "Lgh 9", pos: 3, wait: sv ? "~8 mån" : "~8 kk" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between border border-border rounded-xl p-3">
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center text-xs font-bold text-accent-foreground">{item.pos}</span>
                        <div>
                          <span className="text-sm">{item.name}</span>
                          <span className="text-xs text-muted-foreground ml-2">{item.apt}</span>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{item.wait}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-border/50 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{sv ? "Er plats: 2" : "Teidän sija: 2"}</span>
                  <span className="text-xs text-primary font-medium">{sv ? "Estimerat: ~5 mån" : "Arvio: ~5 kk"}</span>
                </div>
              </div>
            </FadeIn>

            {/* Documents */}
            <FadeIn delay={200}>
              <div className="card-gradient border border-border rounded-3xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    <h3 className="font-display text-lg font-semibold">{sv ? "Dokument" : "Dokumentit"}</h3>
                  </div>
                  <button className="text-xs text-primary">{sv ? "Visa alla" : "Näytä kaikki"}</button>
                </div>
                <div className="space-y-2">
                  {[
                    { title: sv ? "Mötesprotokoll 03/2024" : "Pöytäkirja 03/2024", date: "2024-03-15", type: "PDF", size: "245 KB" },
                    { title: sv ? "Underhållsplan 2024–2028" : "Huoltosuunnitelma 2024–2028", date: "2024-01-10", type: "PDF", size: "1.2 MB" },
                    { title: sv ? "Budget 2024" : "Budjetti 2024", date: "2024-01-05", type: "XLSX", size: "89 KB" },
                    { title: sv ? "Ordningsregler" : "Järjestyssäännöt", date: "2023-09-01", type: "PDF", size: "120 KB" },
                  ].map((doc, i) => (
                    <div key={i} className="flex items-center justify-between border border-border rounded-xl p-3 hover:border-primary/20 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-[10px] font-bold text-accent-foreground">
                          {doc.type}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{doc.title}</p>
                          <p className="text-[11px] text-muted-foreground">{doc.date} · {doc.size}</p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
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
              {
                icon: Shield,
                title: sv ? "Styrelse" : "Hallitus",
                desc: sv ? "Full översikt, rapporter, beslut och budget." : "Täysi katsaus, raportit, päätökset ja budjetti.",
                perms: sv
                  ? ["Alla ärenden & rapporter", "Budget & ekonomi", "Godkänna underhåll", "Hantera boende"]
                  : ["Kaikki asiat & raportit", "Budjetti & talous", "Hyväksyä huolto", "Hallita asukkaita"],
              },
              {
                icon: Home,
                title: sv ? "Boende" : "Asukas",
                desc: sv ? "Skapa ärenden, boka utrymmen, ta emot notiser." : "Luo asioita, varaa tiloja, vastaanota ilmoituksia.",
                perms: sv
                  ? ["Egna ärenden", "Boka tvättstuga & bastu", "Dokument & info", "Köhantering"]
                  : ["Omat asiat", "Varaa pesutupa & sauna", "Dokumentit & info", "Jonojen hallinta"],
              },
              {
                icon: User,
                title: sv ? "Förvaltare" : "Isännöitsijä",
                desc: sv ? "Hantera, prioritera och delegera ärenden." : "Hallinnoi, priorisoi ja delegoi asioita.",
                perms: sv
                  ? ["Alla ärenden", "Tilldela uppgifter", "Underhållsplanering", "Kommunikation"]
                  : ["Kaikki asiat", "Tehtävien jako", "Huoltosuunnittelu", "Viestintä"],
              },
            ].map((role, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="card-gradient border border-border rounded-3xl p-8 hover:border-primary/20 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center mb-6">
                    <role.icon className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{role.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">{role.desc}</p>
                  <div className="space-y-2">
                    {role.perms.map((perm, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                        {perm}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Communication mockup */}
      <section className="section-padding">
        <div className="container-narrow">
          <FadeIn>
            <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
              {sv ? "Kommunikation" : "Viestintä"}
            </p>
            <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-12">
              {sv ? "Alla når varandra — på ett ställe." : "Kaikki tavoittavat toisensa — yhdessä paikassa."}
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="card-gradient border border-border rounded-3xl overflow-hidden">
              {/* Announcement banner */}
              <div className="border-b border-border p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Bell className="w-4 h-4 text-primary" />
                  <span className="text-xs font-medium text-primary">{sv ? "VIKTIGT MEDDELANDE" : "TÄRKEÄ ILMOITUS"}</span>
                </div>
                <h4 className="font-display font-semibold mb-1">
                  {sv ? "Vattenavstängning tisdag 22/4, kl 09–12" : "Vesikatkos tiistaina 22.4. klo 9–12"}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {sv
                    ? "På grund av planerat underhåll stängs vattnet av i trapphus A och B. Vi ber om överseende."
                    : "Suunnitellun huollon vuoksi vesi katkaistaan rappukäytävissä A ja B. Pahoittelemme häiriötä."}
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <span className="text-[11px] text-muted-foreground">{sv ? "Publicerat av FEM · 15 april" : "Julkaisija FEM · 15. huhtikuuta"}</span>
                  <span className="text-[11px] text-muted-foreground">·</span>
                  <span className="text-[11px] text-primary">{sv ? "12 läst" : "12 lukenut"}</span>
                </div>
              </div>
              {/* Message thread preview */}
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0 text-[11px] font-medium text-accent-foreground">SB</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">{sv ? "Styrelsen" : "Hallitus"}</span>
                      <span className="text-[10px] text-muted-foreground">{sv ? "Igår 16:45" : "Eilen 16:45"}</span>
                    </div>
                    <div className="card-gradient border border-border rounded-2xl p-3">
                      <p className="text-xs text-muted-foreground">
                        {sv
                          ? "Påminnelse: Årsstämma 28 april kl 18:00. Dagordning finns under Dokument."
                          : "Muistutus: Yhtiökokous 28. huhtikuuta klo 18:00. Esityslista löytyy Dokumenteista."}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-[11px] font-medium text-primary">FEM</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium">FEM</span>
                      <span className="text-[10px] text-muted-foreground">{sv ? "Idag 09:15" : "Tänään 09:15"}</span>
                    </div>
                    <div className="card-gradient border border-border rounded-2xl p-3">
                      <p className="text-xs text-muted-foreground">
                        {sv
                          ? "Gårdagens ronderingsrapport: inga anmärkningar. Nästa rondering fredag."
                          : "Eilisen kierrosraportti: ei huomautettavaa. Seuraava kierros perjantaina."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section id="demo" className="section-padding">
        <div className="container-narrow text-center">
          <FadeIn>
            <div className="card-gradient border border-border rounded-3xl p-12 md:p-16">
              <Lock className="w-8 h-8 text-primary mx-auto mb-6" />
              <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-4">
                {sv ? "Redo att testa portalen?" : "Valmis kokeilemaan portaalia?"}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                {sv
                  ? "Boka en demo så visar vi hur portalen fungerar för just ert husbolag. Eller logga in om ni redan har tillgång."
                  : "Varatkaa esittely, niin näytämme miten portaali toimii juuri teidän taloyhtiöllenne. Tai kirjautukaa sisään, jos teillä on jo pääsy."}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/#kontakt"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-medium px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
                >
                  {sv ? "Boka demo" : "Varaa esittely"}
                </Link>
                <button
                  className="inline-flex items-center gap-2 border border-border text-foreground font-medium px-8 py-3 rounded-xl hover:border-primary/30 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  {sv ? "Logga in" : "Kirjaudu sisään"}
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PortalPage;
