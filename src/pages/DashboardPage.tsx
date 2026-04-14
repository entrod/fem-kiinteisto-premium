import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3, AlertCircle, Calendar, FileText, MessageSquare,
  Users, Settings, Bell, Search, Plus, Filter, MoreHorizontal,
  Send, Paperclip, ChevronRight, Clock, CheckCircle2, Car,
  ArrowUpRight, Zap, Home, Shield, User, LogOut, X, ChevronDown,
  Download, Edit, Trash2, Menu,
} from "lucide-react";

/* ─── fake data ─── */
const ME = { name: "Tobias Enlund", initials: "TE", email: "enlund.t@gmail.com", role: "Förvaltare", apt: "Lgh 5" };
const COMPANY = "Brf Sjöstaden 4";
const TODAY = "Tisdag 15 april 2026";

const CASES = [
  { id: "ÄR-047", title: "Trasig lampa i trapphus B", status: "Pågående", statusType: "active" as const, assignee: "Erik N.", time: "2 tim sedan", desc: "Lampan i trapphus B plan 3 är trasig och behöver bytas. Boende har rapporterat bristande belysning sedan måndag.", priority: "Hög" },
  { id: "ÄR-046", title: "Vattenläcka källare", status: "Behöver info", statusType: "pending" as const, assignee: "Maria S.", time: "Igår", desc: "Mindre vattenläcka observerad vid källartrapp. Behöver mer information om exakt plats och om det fortfarande läcker.", priority: "Kritisk" },
  { id: "ÄR-045", title: "Dörrkod ur funktion port 2", status: "Klart", statusType: "done" as const, assignee: "Erik N.", time: "2 dagar sedan", desc: "Dörrkoden till port 2 fungerade inte. Åtgärdat genom att återställa kodpanelen.", priority: "Normal" },
  { id: "ÄR-044", title: "Graffiti fasad", status: "Mottaget", statusType: "new" as const, assignee: "—", time: "3 dagar sedan", desc: "Klotter på fasaden mot Strandvägen. Behöver rengöras med specialmedel.", priority: "Låg" },
  { id: "ÄR-043", title: "Hiss ur drift hus 2", status: "Klart", statusType: "done" as const, assignee: "Maria S.", time: "5 dagar sedan", desc: "Hissen i hus 2 stod stilla. Tekniker kallades och åtgärdade säkerhetsbrytare.", priority: "Kritisk" },
  { id: "ÄR-042", title: "Cykelstativ skadat", status: "Pågående", statusType: "active" as const, assignee: "Erik N.", time: "1 vecka sedan", desc: "Cykelstativet vid entré A är skadat och sticker ut farligt. Behöver repareras eller bytas.", priority: "Normal" },
];

const ACTIVITY = [
  { text: "Erik N. uppdaterade ÄR-047", time: "14:35" },
  { text: "Nytt ärende: Graffiti fasad", time: "13:20" },
  { text: "ÄR-045 markerat som klart", time: "11:45" },
  { text: "Maria S. kommenterade ÄR-046", time: "10:12" },
  { text: "Ny bokning: Bastu tors 17–19", time: "09:30" },
  { text: "Tobias E. loggade in", time: "09:02" },
];

const DOCS = [
  { title: "Mötesprotokoll 03/2026", date: "2026-03-15", type: "PDF", size: "245 KB" },
  { title: "Underhållsplan 2024–2028", date: "2024-01-10", type: "PDF", size: "1.2 MB" },
  { title: "Budget 2026", date: "2026-01-05", type: "XLSX", size: "89 KB" },
  { title: "Ordningsregler", date: "2023-09-01", type: "PDF", size: "120 KB" },
  { title: "Stadgar Brf Sjöstaden 4", date: "2020-05-12", type: "PDF", size: "340 KB" },
  { title: "Årsredovisning 2025", date: "2026-02-28", type: "PDF", size: "2.1 MB" },
];

const RESIDENTS = [
  { name: "Anna Lindström", apt: "Lgh 14", email: "a.lindstrom@mail.com", role: "Boende", since: "2019" },
  { name: "Mikael Korhonen", apt: "Lgh 3", email: "m.korhonen@mail.com", role: "Styrelse", since: "2015" },
  { name: "Johan Björk", apt: "Lgh 9", email: "j.bjork@mail.com", role: "Boende", since: "2021" },
  { name: "Sara Mäkinen", apt: "Lgh 7", email: "s.makinen@mail.com", role: "Boende", since: "2022" },
  { name: "Lars Eriksson", apt: "Lgh 12", email: "l.eriksson@mail.com", role: "Styrelse (ordf.)", since: "2013" },
  { name: "Petra Nyström", apt: "Lgh 2", email: "p.nystrom@mail.com", role: "Boende", since: "2020" },
  { name: "Tobias Enlund", apt: "Lgh 5", email: "enlund.t@gmail.com", role: "Förvaltare (FEM)", since: "2024" },
];

const BOOKINGS = [
  { space: "Tvättstuga A", slots: [
    { time: "08:00–10:00", status: "booked" as const, by: "Lgh 12" },
    { time: "10:00–12:00", status: "free" as const },
    { time: "12:00–14:00", status: "booked" as const, by: "Lgh 4" },
    { time: "14:00–16:00", status: "free" as const },
    { time: "16:00–18:00", status: "mine" as const, by: "Min bokning" },
  ]},
  { space: "Tvättstuga B", slots: [
    { time: "08:00–10:00", status: "free" as const },
    { time: "10:00–12:00", status: "free" as const },
    { time: "12:00–14:00", status: "booked" as const, by: "Lgh 7" },
    { time: "14:00–16:00", status: "free" as const },
  ]},
  { space: "Bastu", slots: [
    { time: "17:00–19:00", status: "free" as const },
    { time: "19:00–21:00", status: "booked" as const, by: "Lgh 8" },
    { time: "21:00–23:00", status: "free" as const },
  ]},
];

const MESSAGES = [
  {
    from: "Styrelsen", initials: "SB", time: "Igår 16:45",
    text: "Påminnelse: Årsstämma 28 april kl 18:00. Dagordning finns under Dokument.",
  },
  {
    from: "FEM", initials: "FEM", time: "Idag 09:15", isPrimary: true,
    text: "Gårdagens ronderingsrapport: inga anmärkningar. Nästa rondering fredag.",
  },
  {
    from: "Erik N.", initials: "EN", time: "Idag 14:35",
    text: "Lampan är beställd, byter den imorgon förmiddag. Aviserar berörda boende.",
  },
];

/* ─── helpers ─── */
type StatusType = "active" | "pending" | "done" | "new";
const statusClass: Record<StatusType, string> = {
  active: "bg-primary/20 text-primary",
  pending: "bg-yellow-500/20 text-yellow-400",
  done: "bg-green-500/20 text-green-400",
  new: "bg-muted text-muted-foreground",
};

type View = "overview" | "cases" | "bookings" | "documents" | "messages" | "residents" | "settings";

/* ─── main component ─── */
export default function DashboardPage() {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("overview");
  const [selectedCase, setSelectedCase] = useState<typeof CASES[0] | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [newCaseOpen, setNewCaseOpen] = useState(false);

  const navItems: { icon: React.ElementType; label: string; view: View; badge?: string }[] = [
    { icon: BarChart3, label: "Översikt", view: "overview" },
    { icon: AlertCircle, label: "Ärenden", view: "cases", badge: "4" },
    { icon: Calendar, label: "Bokningar", view: "bookings" },
    { icon: FileText, label: "Dokument", view: "documents" },
    { icon: MessageSquare, label: "Meddelanden", view: "messages", badge: "2" },
    { icon: Users, label: "Boende", view: "residents" },
    { icon: Settings, label: "Inställningar", view: "settings" },
  ];

  const handleLogout = () => {
    sessionStorage.removeItem("fem_auth");
    navigate("/logga-in");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* ── Top bar ── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b border-border bg-card/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <button className="md:hidden text-muted-foreground" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
              <Home className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="font-display font-semibold text-sm">FEM Portal</span>
          </div>
          <span className="hidden sm:block text-xs text-muted-foreground">— {COMPANY}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 border border-border rounded-lg px-3 py-1.5 text-xs text-muted-foreground w-48">
            <Search className="w-3 h-3" />
            <span>Sök...</span>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              className="relative p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setNotifOpen(!notifOpen)}
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-red-500 border border-card" />
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-8 w-72 bg-card border border-border rounded-2xl shadow-elevated z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                  <span className="text-sm font-semibold">Notifieringar</span>
                  <button onClick={() => setNotifOpen(false)}><X className="w-3.5 h-3.5 text-muted-foreground" /></button>
                </div>
                {ACTIVITY.slice(0, 4).map((a, i) => (
                  <div key={i} className="px-4 py-3 border-b border-border/50 last:border-0 hover:bg-muted/30 cursor-pointer">
                    <p className="text-xs">{a.text}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{a.time}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Avatar + name */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-[11px] font-bold text-primary">
              {ME.initials}
            </div>
            <span className="hidden md:block text-xs font-medium">{ME.name}</span>
          </div>

          <button
            onClick={handleLogout}
            className="text-muted-foreground hover:text-foreground transition-colors p-1.5"
            title="Logga ut"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex pt-14 min-h-screen">
        {/* ── Sidebar ── */}
        <>
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
          )}
          <aside className={`fixed md:sticky top-14 z-40 h-[calc(100vh-3.5rem)] w-56 border-r border-border bg-card/50 flex flex-col transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
            <nav className="flex-1 p-3 space-y-0.5">
              {navItems.map((item) => (
                <button
                  key={item.view}
                  onClick={() => { setView(item.view); setSidebarOpen(false); setSelectedCase(null); }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                    view === item.view
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
                </button>
              ))}
            </nav>

            <div className="p-3 border-t border-border">
              <div className="flex items-center gap-2 px-3 py-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                  {ME.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{ME.name}</p>
                  <p className="text-[10px] text-muted-foreground truncate">{ME.role}</p>
                </div>
              </div>
            </div>
          </aside>
        </>

        {/* ── Main content ── */}
        <main className="flex-1 min-w-0 p-4 md:p-6 overflow-auto">
          {view === "overview" && <OverviewView onCaseClick={(c) => { setSelectedCase(c); setView("cases"); }} onNewCase={() => setNewCaseOpen(true)} />}
          {view === "cases" && <CasesView selectedCase={selectedCase} onSelect={setSelectedCase} onNewCase={() => setNewCaseOpen(true)} />}
          {view === "bookings" && <BookingsView />}
          {view === "documents" && <DocumentsView />}
          {view === "messages" && <MessagesView />}
          {view === "residents" && <ResidentsView />}
          {view === "settings" && <SettingsView />}
        </main>
      </div>

      {/* ── New case modal ── */}
      {newCaseOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display font-semibold">Nytt ärende</h3>
              <button onClick={() => setNewCaseOpen(false)}><X className="w-4 h-4 text-muted-foreground" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium block mb-1.5">Rubrik</label>
                <input className="w-full bg-secondary border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/50" placeholder="Beskriv ärendet kort..." />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1.5">Prioritet</label>
                <select className="w-full bg-secondary border border-border rounded-xl px-3 py-2 text-sm focus:outline-none">
                  <option>Normal</option><option>Hög</option><option>Kritisk</option><option>Låg</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium block mb-1.5">Beskrivning</label>
                <textarea rows={3} className="w-full bg-secondary border border-border rounded-xl px-3 py-2 text-sm focus:outline-none resize-none" placeholder="Mer information..." />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setNewCaseOpen(false)} className="flex-1 border border-border rounded-xl py-2 text-sm hover:border-primary/30 transition-colors">Avbryt</button>
              <button onClick={() => setNewCaseOpen(false)} className="flex-1 bg-primary text-primary-foreground rounded-xl py-2 text-sm font-medium">Skicka in</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Overview ─── */
function OverviewView({ onCaseClick, onNewCase }: { onCaseClick: (c: typeof CASES[0]) => void; onNewCase: () => void }) {
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-semibold">Översikt</h1>
          <p className="text-xs text-muted-foreground">{TODAY}</p>
        </div>
        <button onClick={onNewCase} className="flex items-center gap-1.5 bg-primary text-primary-foreground rounded-lg px-3 py-2 text-xs font-medium">
          <Plus className="w-3.5 h-3.5" /> Nytt ärende
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Aktiva ärenden", value: "4", change: "+1", icon: AlertCircle },
          { label: "Pågående", value: "2", change: "", icon: Clock },
          { label: "Lösta denna vecka", value: "7", change: "+3", icon: CheckCircle2 },
          { label: "Kommande underhåll", value: "2", change: "", icon: Settings },
        ].map((s, i) => (
          <div key={i} className="card-gradient border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <s.icon className="w-3.5 h-3.5 text-muted-foreground" />
              {s.change && <span className="text-[10px] text-primary font-medium">{s.change}</span>}
            </div>
            <p className="font-display text-2xl font-bold">{s.value}</p>
            <p className="text-[11px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent cases */}
        <div className="lg:col-span-2 space-y-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">Senaste ärenden</h2>
            <button className="flex items-center gap-1 text-[11px] text-muted-foreground border border-border rounded-md px-2 py-1">
              <Filter className="w-3 h-3" /> Filter
            </button>
          </div>
          {CASES.slice(0, 4).map((c, i) => (
            <div key={i} onClick={() => onCaseClick(c)} className="flex items-center justify-between border border-border rounded-xl p-3 hover:border-primary/20 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-muted-foreground font-mono w-14">{c.id}</span>
                <span className="text-sm">{c.title}</span>
              </div>
              <div className="hidden sm:flex items-center gap-3">
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${statusClass[c.statusType]}`}>{c.status}</span>
                <span className="text-[11px] text-muted-foreground w-16">{c.assignee}</span>
                <span className="text-[11px] text-muted-foreground">{c.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Activity + quick actions */}
        <div className="space-y-4">
          <div className="card-gradient border border-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-primary" /> Senaste aktivitet
            </h3>
            <div className="space-y-2">
              {ACTIVITY.map((a, i) => (
                <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0">
                  <span className="text-xs">{a.text}</span>
                  <span className="text-[11px] text-muted-foreground ml-2 shrink-0">{a.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-gradient border border-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold mb-3">Snabbåtgärder</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Plus, label: "Nytt ärende", action: onNewCase },
                { icon: Calendar, label: "Boka utrymme", action: () => {} },
                { icon: FileText, label: "Dokument", action: () => {} },
                { icon: MessageSquare, label: "Meddelande", action: () => {} },
              ].map((a, i) => (
                <button key={i} onClick={a.action} className="flex items-center gap-2 border border-border rounded-xl p-3 text-xs hover:border-primary/20 transition-colors">
                  <a.icon className="w-3.5 h-3.5 text-muted-foreground" /> {a.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Cases ─── */
function CasesView({ selectedCase, onSelect, onNewCase }: { selectedCase: typeof CASES[0] | null; onSelect: (c: typeof CASES[0] | null) => void; onNewCase: () => void }) {
  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-display text-xl font-semibold">Ärenden</h1>
        <button onClick={onNewCase} className="flex items-center gap-1.5 bg-primary text-primary-foreground rounded-lg px-3 py-2 text-xs font-medium">
          <Plus className="w-3.5 h-3.5" /> Nytt ärende
        </button>
      </div>

      <div className={`grid gap-5 ${selectedCase ? "lg:grid-cols-2" : ""}`}>
        {/* List */}
        <div className="space-y-2">
          {CASES.map((c, i) => (
            <div key={i} onClick={() => onSelect(selectedCase?.id === c.id ? null : c)}
              className={`border rounded-xl p-4 cursor-pointer transition-colors ${selectedCase?.id === c.id ? "border-primary/40 bg-primary/5" : "border-border hover:border-primary/20"}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] text-muted-foreground font-mono">{c.id}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${statusClass[c.statusType]}`}>{c.status}</span>
                    <span className="text-[10px] text-muted-foreground">{c.priority}</span>
                  </div>
                  <p className="text-sm font-medium">{c.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{c.assignee} · {c.time}</p>
                </div>
                <ChevronRight className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${selectedCase?.id === c.id ? "rotate-90" : ""}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Detail */}
        {selectedCase && (
          <div className="card-gradient border border-border rounded-2xl p-6">
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground font-mono">{selectedCase.id}</span>
                </div>
                <h2 className="font-display text-base font-semibold">{selectedCase.title}</h2>
              </div>
              <button onClick={() => onSelect(null)}><X className="w-4 h-4 text-muted-foreground" /></button>
            </div>

            {/* Status flow */}
            <div className="flex items-center flex-wrap gap-1 mb-5">
              {["Mottaget", "Bedömt", "Pågående", "Klart"].map((s, i, arr) => (
                <div key={i} className="flex items-center gap-1">
                  <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium border ${
                    (selectedCase.statusType === "done") ||
                    (selectedCase.statusType === "active" && i <= 2) ||
                    (selectedCase.statusType === "pending" && i <= 1) ||
                    (selectedCase.statusType === "new" && i === 0)
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-border text-muted-foreground"
                  }`}>{s}</span>
                  {i < arr.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
                </div>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{selectedCase.desc}</p>

            {/* Timeline */}
            <div className="border-l-2 border-border pl-4 space-y-4 mb-5">
              {[
                { label: `Tilldelad: ${selectedCase.assignee}`, time: "Idag 14:32", dot: true },
                { label: "Material beställt", time: "Idag 13:15", dot: false },
                { label: "Ärende mottaget", time: "Idag 12:04", dot: false },
              ].map((t, i) => (
                <div key={i} className="relative">
                  <div className={`absolute -left-[1.3rem] top-1 w-2.5 h-2.5 rounded-full ${t.dot ? "bg-primary" : "bg-border"}`} />
                  <p className="text-sm font-medium">{t.label}</p>
                  <p className="text-xs text-muted-foreground">{t.time}</p>
                </div>
              ))}
            </div>

            {/* Chat */}
            <div className="space-y-3">
              <div className="card-gradient border border-border rounded-xl p-3 flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0 text-[10px] font-bold text-accent-foreground">
                  {selectedCase.assignee.split(" ").map(w => w[0]).join("")}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-xs font-medium">{selectedCase.assignee}</p>
                    <span className="text-[10px] text-muted-foreground">14:35</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Lampan är beställd, byter den imorgon förmiddag. Aviserar berörda boende.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2">
                <Paperclip className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="flex-1 text-xs text-muted-foreground">Skriv ett meddelande...</span>
                <Send className="w-3.5 h-3.5 text-primary" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Bookings ─── */
function BookingsView() {
  const [selectedDate, setSelectedDate] = useState("Tisdag 15 april");
  const dates = ["Mån 14 apr", "Tis 15 apr", "Ons 16 apr", "Tor 17 apr", "Fre 18 apr"];

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-display text-xl font-semibold">Bokningar</h1>
        <button className="flex items-center gap-1.5 bg-primary text-primary-foreground rounded-lg px-3 py-2 text-xs font-medium">
          <Plus className="w-3.5 h-3.5" /> Ny bokning
        </button>
      </div>

      {/* Date selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {dates.map((d) => (
          <button key={d} onClick={() => setSelectedDate(d)}
            className={`shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${selectedDate === d ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground"}`}>
            {d}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {BOOKINGS.map((room, i) => (
          <div key={i} className="card-gradient border border-border rounded-2xl p-5">
            <p className="text-sm font-semibold mb-3">{room.space}</p>
            <div className="flex flex-wrap gap-2">
              {room.slots.map((slot, j) => (
                <button key={j} className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                  slot.status === "booked" ? "border-border bg-muted text-muted-foreground cursor-not-allowed" :
                  slot.status === "mine" ? "border-primary bg-primary/20 text-primary font-medium" :
                  "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
                }`}>
                  {slot.time} {slot.status === "booked" ? `· ${slot.by}` : slot.status === "mine" ? `· ${slot.by}` : "· Ledig"}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Documents ─── */
function DocumentsView() {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-display text-xl font-semibold">Dokument</h1>
        <button className="flex items-center gap-1.5 bg-primary text-primary-foreground rounded-lg px-3 py-2 text-xs font-medium">
          <Plus className="w-3.5 h-3.5" /> Ladda upp
        </button>
      </div>

      <div className="card-gradient border border-border rounded-2xl overflow-hidden">
        {DOCS.map((doc, i) => (
          <div key={i} className="flex items-center justify-between p-4 border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center text-[10px] font-bold text-accent-foreground">
                {doc.type}
              </div>
              <div>
                <p className="text-sm font-medium">{doc.title}</p>
                <p className="text-[11px] text-muted-foreground">{doc.date} · {doc.size}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                <Download className="w-3.5 h-3.5" />
              </button>
              <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Messages ─── */
function MessagesView() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-xl font-semibold mb-5">Meddelanden</h1>

      {/* Announcement */}
      <div className="card-gradient border border-border rounded-2xl overflow-hidden mb-5">
        <div className="border-b border-border p-5">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary">VIKTIGT MEDDELANDE</span>
          </div>
          <h3 className="font-display font-semibold mb-1">Vattenavstängning tisdag 22/4, kl 09–12</h3>
          <p className="text-sm text-muted-foreground">På grund av planerat underhåll stängs vattnet av i trapphus A och B. Vi ber om överseende.</p>
          <p className="text-[11px] text-muted-foreground mt-2">Publicerat av FEM · 15 april · 12 läst</p>
        </div>

        {/* Thread */}
        <div className="p-5 space-y-4">
          {MESSAGES.map((m, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold ${m.isPrimary ? "bg-primary/20 text-primary" : "bg-accent text-accent-foreground"}`}>
                {m.initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">{m.from}</span>
                  <span className="text-[10px] text-muted-foreground">{m.time}</span>
                </div>
                <div className="card-gradient border border-border rounded-xl p-3">
                  <p className="text-xs text-muted-foreground">{m.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="px-5 pb-5">
          <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2.5">
            <Paperclip className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="flex-1 text-xs text-muted-foreground">Skriv ett meddelande...</span>
            <Send className="w-3.5 h-3.5 text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Residents ─── */
function ResidentsView() {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-display text-xl font-semibold">Boende</h1>
        <span className="text-xs text-muted-foreground">{RESIDENTS.length} personer</span>
      </div>

      {/* Queue */}
      <div className="card-gradient border border-border rounded-2xl p-5 mb-5">
        <div className="flex items-center gap-2 mb-4">
          <Car className="w-4 h-4 text-primary" />
          <h2 className="font-display text-sm font-semibold">Köhantering — Parkeringsplats (varmgarage)</h2>
        </div>
        <div className="space-y-2">
          {[
            { name: "A. Lindström", apt: "Lgh 14", pos: 1, wait: "~2 mån" },
            { name: "M. Korhonen", apt: "Lgh 3", pos: 2, wait: "~5 mån" },
            { name: "J. Björk", apt: "Lgh 9", pos: 3, wait: "~8 mån" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between border border-border rounded-xl p-3">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center text-xs font-bold text-accent-foreground">{item.pos}</span>
                <span className="text-sm">{item.name}</span>
                <span className="text-xs text-muted-foreground">{item.apt}</span>
              </div>
              <span className="text-xs text-muted-foreground">{item.wait}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Resident list */}
      <div className="card-gradient border border-border rounded-2xl overflow-hidden">
        {RESIDENTS.map((r, i) => (
          <div key={i} className="flex items-center justify-between p-4 border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-[10px] font-bold text-accent-foreground">
                {r.name.split(" ").map(w => w[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-medium">{r.name}</p>
                <p className="text-[11px] text-muted-foreground">{r.apt} · {r.role}</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <a href={`mailto:${r.email}`} className="text-[11px] text-primary hover:underline">{r.email}</a>
              <span className="text-[11px] text-muted-foreground">Sedan {r.since}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Settings ─── */
function SettingsView() {
  return (
    <div className="max-w-lg">
      <h1 className="font-display text-xl font-semibold mb-5">Inställningar</h1>

      <div className="space-y-4">
        {/* Profile */}
        <div className="card-gradient border border-border rounded-2xl p-5">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2"><User className="w-4 h-4 text-primary" /> Profil</h2>
          <div className="space-y-3">
            {[
              { label: "Namn", value: ME.name },
              { label: "E-post", value: ME.email },
              { label: "Roll", value: ME.role },
              { label: "Husbolag", value: COMPANY },
            ].map((f, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <span className="text-xs text-muted-foreground">{f.label}</span>
                <span className="text-sm">{f.value}</span>
              </div>
            ))}
          </div>
          <button className="mt-4 flex items-center gap-1.5 text-xs text-primary hover:underline">
            <Edit className="w-3 h-3" /> Redigera profil
          </button>
        </div>

        {/* Notifications */}
        <div className="card-gradient border border-border rounded-2xl p-5">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2"><Bell className="w-4 h-4 text-primary" /> Notifieringar</h2>
          <div className="space-y-3">
            {["Nya ärenden", "Ärendeuppdateringar", "Meddelanden", "Bokningsbekräftelser"].map((n, i) => (
              <div key={i} className="flex items-center justify-between py-1.5">
                <span className="text-sm">{n}</span>
                <div className={`w-8 h-4 rounded-full ${i < 3 ? "bg-primary" : "bg-muted"} relative cursor-pointer`}>
                  <div className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-all ${i < 3 ? "left-4" : "left-0.5"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="card-gradient border border-border rounded-2xl p-5">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /> Säkerhet</h2>
          <button className="text-xs text-primary hover:underline flex items-center gap-1.5">
            <Edit className="w-3 h-3" /> Ändra lösenord
          </button>
        </div>
      </div>
    </div>
  );
}
