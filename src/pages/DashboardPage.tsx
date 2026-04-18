import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3, AlertCircle, Calendar, FileText, MessageSquare,
  Users, Settings, Bell, Search, Plus, Filter, X,
  Send, Paperclip, ChevronRight, Clock, CheckCircle2, Car,
  Zap, Home, User, LogOut, Edit, Menu, Shield, Eye, ChevronDown, Building2, Check,
} from "lucide-react";
import { getSession, logout, can, type Role } from "@/portal/auth";
import {
  useStore, actions, formatRelative, formatTime,
  getSpaces, getSlotTimesFor,
  useActiveCompany, setActiveCompany,
  type Case, type CaseStatus, type Priority, type Company,
} from "@/portal/store";

/* ─── helpers ─── */
const statusClass: Record<CaseStatus, string> = {
  active: "bg-primary/20 text-primary",
  pending: "bg-yellow-500/20 text-yellow-400",
  done: "bg-green-500/20 text-green-400",
  new: "bg-muted text-muted-foreground",
};
const statusLabel: Record<CaseStatus, string> = {
  new: "Mottaget",
  pending: "Behöver info",
  active: "Pågående",
  done: "Klart",
};
const STATUS_FLOW: CaseStatus[] = ["new", "pending", "active", "done"];

type View = "overview" | "cases" | "bookings" | "documents" | "messages" | "residents" | "settings";

const TODAY_LABEL = new Date().toLocaleDateString("sv-FI", {
  weekday: "long", day: "numeric", month: "long", year: "numeric",
});

const DOCS = [
  { title: "Mötesprotokoll 03/2026", date: "2026-03-15", type: "PDF", size: "245 KB" },
  { title: "Underhållsplan 2024–2028", date: "2024-01-10", type: "PDF", size: "1.2 MB" },
  { title: "Budget 2026", date: "2026-01-05", type: "XLSX", size: "89 KB" },
  { title: "Ordningsregler", date: "2023-09-01", type: "PDF", size: "120 KB" },
  { title: "Stadgar Brf Sjöstaden 4", date: "2020-05-12", type: "PDF", size: "340 KB" },
];

/* ─── main ─── */
export default function DashboardPage() {
  const navigate = useNavigate();
  const [session, setSession] = useState(() => getSession());
  const [view, setView] = useState<View>("overview");
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [newCaseOpen, setNewCaseOpen] = useState(false);

  const allCases = useStore((s) => s.cases);
  const allComments = useStore((s) => s.comments);
  const allMessages = useStore((s) => s.messages);
  const companies = useStore((s) => s.companies);
  const activeCompany = useActiveCompany();

  useEffect(() => {
    if (!session) navigate("/logga-in");
  }, [session, navigate]);

  // FEM kan byta bolag fritt; övriga roller låses till sitt eget bolag
  // (i denna demo är alla icke-FEM kopplade till "sjostaden")
  useEffect(() => {
    if (session && session.role !== "fem") {
      setActiveCompany("sjostaden");
    }
  }, [session]);

  const role: Role = session?.role ?? "tenant";
  const isManager = session ? can.manageCases(role) : false;
  const canSwitchCompany = role === "fem";

  // Filtrera all data per aktivt bolag
  const cases = useMemo(
    () => allCases.filter((c) => c.companyId === activeCompany.id),
    [allCases, activeCompany.id],
  );
  const messages = useMemo(
    () => allMessages.filter((m) => m.companyId === activeCompany.id),
    [allMessages, activeCompany.id],
  );

  const visibleCases = useMemo(
    () => (isManager ? cases : cases.filter((c) => c.createdByEmail === session?.email)),
    [cases, isManager, session?.email],
  );

  const recentActivity = useMemo(() => {
    const items: { text: string; ts: number }[] = [];
    cases.slice(0, 8).forEach((c) =>
      items.push({ text: `${c.id} – ${c.title} (${statusLabel[c.status]})`, ts: c.updatedAt }),
    );
    allComments.slice(-5).forEach((c) => {
      const cs = cases.find((x) => x.id === c.caseId);
      if (cs) items.push({ text: `${c.authorName} kommenterade ${cs.id}`, ts: c.createdAt });
    });
    messages.slice(-5).forEach((m) =>
      items.push({ text: `${m.authorName}: ${m.text.slice(0, 40)}${m.text.length > 40 ? "…" : ""}`, ts: m.createdAt }),
    );
    return items.sort((a, b) => b.ts - a.ts).slice(0, 6);
  }, [cases, allComments, messages]);

  if (!session) return null;

  const myActiveCount = visibleCases.filter((c) => c.status !== "done").length;
  const unreadMessages = messages.filter((m) => m.isAnnouncement).length;

  const navItems: { icon: React.ElementType; label: string; view: View; badge?: string }[] = [
    { icon: BarChart3, label: "Översikt", view: "overview" },
    { icon: AlertCircle, label: "Ärenden", view: "cases", badge: myActiveCount > 0 ? String(myActiveCount) : undefined },
    { icon: Calendar, label: "Bokningar", view: "bookings" },
    { icon: FileText, label: "Dokument", view: "documents" },
    { icon: MessageSquare, label: "Meddelanden", view: "messages", badge: unreadMessages > 0 ? String(unreadMessages) : undefined },
    ...(can.manageResidents(role) ? [{ icon: Users, label: "Boende", view: "residents" as View }] : []),
    { icon: Settings, label: "Inställningar", view: "settings" },
  ];

  const handleLogout = () => {
    logout();
    setSession(null);
    navigate("/logga-in");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top bar */}
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
          {canSwitchCompany ? (
            <CompanySwitcher
              companies={companies}
              active={activeCompany}
              onSelect={(c) => { setActiveCompany(c.id); setSelectedCaseId(null); }}
            />
          ) : (
            <span className="hidden sm:block text-xs text-muted-foreground">— {activeCompany.name}</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 border border-border rounded-lg px-3 py-1.5 text-xs text-muted-foreground w-48">
            <Search className="w-3 h-3" />
            <span>Sök...</span>
          </div>

          <div className="relative">
            <button
              className="relative p-1.5 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setNotifOpen(!notifOpen)}
            >
              <Bell className="w-4 h-4" />
              {recentActivity.length > 0 && (
                <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-red-500 border border-card" />
              )}
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-9 w-72 bg-card border border-border rounded-2xl shadow-xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-border flex items-center justify-between">
                  <span className="text-sm font-semibold">Notifieringar</span>
                  <button onClick={() => setNotifOpen(false)}><X className="w-3.5 h-3.5 text-muted-foreground" /></button>
                </div>
                {recentActivity.slice(0, 5).map((a, i) => (
                  <div key={i} className="px-4 py-3 border-b border-border/50 last:border-0">
                    <p className="text-xs">{a.text}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{formatRelative(a.ts)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-[11px] font-bold text-primary">
              {session.initials}
            </div>
            <div className="hidden md:block leading-tight">
              <p className="text-xs font-medium">{session.name}</p>
              <p className="text-[10px] text-muted-foreground">{session.roleLabel}</p>
            </div>
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
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setSidebarOpen(false)} />
        )}
        <aside className={`fixed md:sticky top-14 z-40 h-[calc(100vh-3.5rem)] w-56 border-r border-border bg-card/50 flex flex-col transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
          <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => { setView(item.view); setSidebarOpen(false); setSelectedCaseId(null); }}
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
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30">
              <Shield className="w-3.5 h-3.5 text-primary shrink-0" />
              <div className="min-w-0 leading-tight">
                <p className="text-[10px] text-muted-foreground">Inloggad som</p>
                <p className="text-xs font-medium truncate">{session.roleLabel}</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 p-4 md:p-6 overflow-auto">
          {view === "overview" && (
            <OverviewView
              session={session}
              role={role}
              cases={visibleCases}
              recentActivity={recentActivity}
              onCaseClick={(c) => { setSelectedCaseId(c.id); setView("cases"); }}
              onNewCase={() => setNewCaseOpen(true)}
              goTo={setView}
            />
          )}
          {view === "cases" && (
            <CasesView
              session={session}
              role={role}
              cases={visibleCases}
              selectedCaseId={selectedCaseId}
              onSelect={setSelectedCaseId}
              onNewCase={() => setNewCaseOpen(true)}
            />
          )}
          {view === "bookings" && <BookingsView session={session} />}
          {view === "documents" && <DocumentsView role={role} />}
          {view === "messages" && <MessagesView session={session} role={role} />}
          {view === "residents" && can.manageResidents(role) && <ResidentsView />}
          {view === "settings" && <SettingsView session={session} />}
        </main>
      </div>

      {newCaseOpen && (
        <NewCaseModal
          onClose={() => setNewCaseOpen(false)}
          onCreate={(c) => {
            setNewCaseOpen(false);
            setSelectedCaseId(c.id);
            setView("cases");
          }}
          session={session}
        />
      )}
    </div>
  );
}

/* ─── Overview ─── */
function OverviewView({
  session, role, cases, recentActivity, onCaseClick, onNewCase, goTo,
}: {
  session: ReturnType<typeof getSession>;
  role: Role;
  cases: Case[];
  recentActivity: { text: string; ts: number }[];
  onCaseClick: (c: Case) => void;
  onNewCase: () => void;
  goTo: (v: View) => void;
}) {
  const stats = [
    { label: "Aktiva ärenden", value: cases.filter((c) => c.status === "active" || c.status === "new" || c.status === "pending").length, icon: AlertCircle },
    { label: "Pågående", value: cases.filter((c) => c.status === "active").length, icon: Clock },
    { label: "Lösta", value: cases.filter((c) => c.status === "done").length, icon: CheckCircle2 },
    { label: "Behöver info", value: cases.filter((c) => c.status === "pending").length, icon: Settings },
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-xl font-semibold">Hej {session?.name.split(" ")[0]} 👋</h1>
          <p className="text-xs text-muted-foreground capitalize">{TODAY_LABEL}</p>
        </div>
        <button onClick={onNewCase} className="flex items-center gap-1.5 bg-primary text-primary-foreground rounded-lg px-3 py-2 text-xs font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-3.5 h-3.5" /> Nytt ärende
        </button>
      </div>

      {!can.manageCases(role) && (
        <div className="border border-primary/20 bg-primary/5 rounded-xl p-3 flex items-start gap-2.5">
          <Eye className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground">
            Du ser dina egna ärenden. Förvaltningen ser och hanterar alla ärenden i husbolaget.
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((s, i) => (
          <div key={i} className="card-gradient border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <s.icon className="w-3.5 h-3.5 text-muted-foreground" />
            </div>
            <p className="font-display text-2xl font-bold">{s.value}</p>
            <p className="text-[11px] text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">Senaste ärenden</h2>
            <button onClick={() => goTo("cases")} className="text-[11px] text-primary hover:underline">Visa alla →</button>
          </div>
          {cases.slice(0, 5).map((c) => (
            <div key={c.id} onClick={() => onCaseClick(c)} className="flex items-center justify-between border border-border rounded-xl p-3 hover:border-primary/20 transition-colors cursor-pointer">
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-[10px] text-muted-foreground font-mono w-14 shrink-0">{c.id}</span>
                <span className="text-sm truncate">{c.title}</span>
              </div>
              <div className="hidden sm:flex items-center gap-3 shrink-0">
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${statusClass[c.status]}`}>{statusLabel[c.status]}</span>
                <span className="text-[11px] text-muted-foreground w-16 truncate">{c.assignee}</span>
                <span className="text-[11px] text-muted-foreground">{formatRelative(c.updatedAt)}</span>
              </div>
            </div>
          ))}
          {cases.length === 0 && (
            <p className="text-xs text-muted-foreground italic py-6 text-center border border-dashed border-border rounded-xl">
              Inga ärenden ännu.
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="card-gradient border border-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-primary" /> Senaste aktivitet
            </h3>
            <div className="space-y-2">
              {recentActivity.slice(0, 6).map((a, i) => (
                <div key={i} className="flex items-start justify-between gap-2 py-1.5 border-b border-border/50 last:border-0">
                  <span className="text-xs">{a.text}</span>
                  <span className="text-[11px] text-muted-foreground shrink-0">{formatRelative(a.ts)}</span>
                </div>
              ))}
              {recentActivity.length === 0 && (
                <p className="text-xs text-muted-foreground italic">Inget att visa.</p>
              )}
            </div>
          </div>

          <div className="card-gradient border border-border rounded-2xl p-5">
            <h3 className="text-sm font-semibold mb-3">Snabbåtgärder</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { icon: Plus, label: "Nytt ärende", action: onNewCase },
                { icon: Calendar, label: "Boka", action: () => goTo("bookings") },
                { icon: FileText, label: "Dokument", action: () => goTo("documents") },
                { icon: MessageSquare, label: "Meddelande", action: () => goTo("messages") },
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
function CasesView({
  session, role, cases, selectedCaseId, onSelect, onNewCase,
}: {
  session: NonNullable<ReturnType<typeof getSession>>;
  role: Role;
  cases: Case[];
  selectedCaseId: string | null;
  onSelect: (id: string | null) => void;
  onNewCase: () => void;
}) {
  const [filter, setFilter] = useState<"all" | CaseStatus>("all");
  const filtered = filter === "all" ? cases : cases.filter((c) => c.status === filter);
  const selected = cases.find((c) => c.id === selectedCaseId) || null;

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="font-display text-xl font-semibold">Ärenden</h1>
          <p className="text-xs text-muted-foreground">
            {can.manageCases(role) ? "Alla ärenden i husbolaget" : "Dina rapporterade ärenden"}
          </p>
        </div>
        <button onClick={onNewCase} className="flex items-center gap-1.5 bg-primary text-primary-foreground rounded-lg px-3 py-2 text-xs font-medium hover:opacity-90">
          <Plus className="w-3.5 h-3.5" /> Nytt ärende
        </button>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {(["all", "new", "pending", "active", "done"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 text-[11px] px-3 py-1.5 rounded-full font-medium border transition-colors ${
              filter === f
                ? "border-primary/30 bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {f === "all" ? "Alla" : statusLabel[f]} {f !== "all" && `(${cases.filter((c) => c.status === f).length})`}
          </button>
        ))}
      </div>

      <div className={`grid gap-5 ${selected ? "lg:grid-cols-2" : ""}`}>
        <div className="space-y-2">
          {filtered.map((c) => (
            <div
              key={c.id}
              onClick={() => onSelect(selectedCaseId === c.id ? null : c.id)}
              className={`border rounded-xl p-4 cursor-pointer transition-colors ${selectedCaseId === c.id ? "border-primary/40 bg-primary/5" : "border-border hover:border-primary/20"}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[10px] text-muted-foreground font-mono">{c.id}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${statusClass[c.status]}`}>{statusLabel[c.status]}</span>
                    <span className="text-[10px] text-muted-foreground">· {c.priority}</span>
                  </div>
                  <p className="text-sm font-medium">{c.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 truncate">
                    {c.assignee} · {formatRelative(c.updatedAt)} · av {c.createdByName}
                  </p>
                </div>
                <ChevronRight className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${selectedCaseId === c.id ? "rotate-90" : ""}`} />
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-xs text-muted-foreground italic py-8 text-center border border-dashed border-border rounded-xl">
              Inga ärenden matchar filtret.
            </p>
          )}
        </div>

        {selected && <CaseDetail caseItem={selected} session={session} role={role} onClose={() => onSelect(null)} />}
      </div>
    </div>
  );
}

function CaseDetail({
  caseItem, session, role, onClose,
}: {
  caseItem: Case;
  session: NonNullable<ReturnType<typeof getSession>>;
  role: Role;
  onClose: () => void;
}) {
  const allComments = useStore((s) => s.comments);
  const comments = allComments.filter((c) => c.caseId === caseItem.id);
  const [reply, setReply] = useState("");
  const [assigneeDraft, setAssigneeDraft] = useState(caseItem.assignee);
  const isManager = can.manageCases(role);

  useEffect(() => { setAssigneeDraft(caseItem.assignee); }, [caseItem.assignee]);

  const send = () => {
    if (!reply.trim()) return;
    actions.addComment({
      caseId: caseItem.id,
      text: reply,
      authorEmail: session.email,
      authorName: session.name,
      authorInitials: session.initials,
    });
    setReply("");
  };

  return (
    <div className="card-gradient border border-border rounded-2xl p-6 h-fit lg:sticky lg:top-20">
      <div className="flex items-start justify-between mb-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground font-mono">{caseItem.id}</span>
          </div>
          <h2 className="font-display text-base font-semibold">{caseItem.title}</h2>
          <p className="text-[11px] text-muted-foreground mt-1">
            Skapad av {caseItem.createdByName} · {formatRelative(caseItem.createdAt)}
          </p>
        </div>
        <button onClick={onClose}><X className="w-4 h-4 text-muted-foreground" /></button>
      </div>

      {/* Status flow + buttons */}
      <div className="flex items-center flex-wrap gap-1 mb-3">
        {STATUS_FLOW.map((s, i, arr) => {
          const currentIdx = STATUS_FLOW.indexOf(caseItem.status);
          const reached = i <= currentIdx;
          return (
            <div key={s} className="flex items-center gap-1">
              <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium border ${
                reached ? "border-primary/30 bg-primary/10 text-primary" : "border-border text-muted-foreground"
              }`}>{statusLabel[s]}</span>
              {i < arr.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />}
            </div>
          );
        })}
      </div>

      {isManager && (
        <div className="flex flex-wrap gap-2 mb-5 pb-5 border-b border-border">
          {STATUS_FLOW.filter((s) => s !== caseItem.status).map((s) => (
            <button
              key={s}
              onClick={() => actions.updateCaseStatus(caseItem.id, s)}
              className="text-[11px] px-2.5 py-1 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
            >
              → {statusLabel[s]}
            </button>
          ))}
        </div>
      )}

      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{caseItem.desc || <em>Ingen beskrivning.</em>}</p>

      {/* Assignment */}
      <div className="border border-border rounded-xl p-3 mb-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs">
          <User className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-muted-foreground">Tilldelad:</span>
          {isManager ? (
            <input
              value={assigneeDraft}
              onChange={(e) => setAssigneeDraft(e.target.value)}
              onBlur={() => assigneeDraft !== caseItem.assignee && actions.assignCase(caseItem.id, assigneeDraft)}
              className="bg-transparent border-b border-border focus:border-primary/50 focus:outline-none px-1 py-0.5 text-foreground"
              placeholder="—"
            />
          ) : (
            <span className="font-medium text-foreground">{caseItem.assignee}</span>
          )}
        </div>
        <span className="text-[11px] text-muted-foreground">{caseItem.priority}</span>
      </div>

      {/* Comments */}
      <div className="space-y-3 mb-3">
        <p className="text-xs font-semibold text-muted-foreground">Kommentarer ({comments.length})</p>
        {comments.length === 0 && (
          <p className="text-xs text-muted-foreground italic">Inga kommentarer ännu.</p>
        )}
        {comments.map((c) => (
          <div key={c.id} className="card-gradient border border-border rounded-xl p-3 flex items-start gap-2.5">
            <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0 text-[10px] font-bold text-accent-foreground">
              {c.authorInitials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-xs font-medium">{c.authorName}</p>
                <span className="text-[10px] text-muted-foreground">{formatTime(c.createdAt)} · {formatRelative(c.createdAt)}</span>
              </div>
              <p className="text-xs text-muted-foreground whitespace-pre-wrap">{c.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2 focus-within:border-primary/40 transition-colors">
        <Paperclip className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <input
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Skriv en kommentar..."
          className="flex-1 bg-transparent text-xs focus:outline-none placeholder:text-muted-foreground"
        />
        <button onClick={send} disabled={!reply.trim()} className="text-primary disabled:opacity-30">
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ─── New case modal ─── */
function NewCaseModal({
  onClose, onCreate, session,
}: {
  onClose: () => void;
  onCreate: (c: Case) => void;
  session: NonNullable<ReturnType<typeof getSession>>;
}) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState<Priority>("Normal");

  const submit = () => {
    if (!title.trim()) return;
    const c = actions.createCase({
      title, desc, priority,
      createdByEmail: session.email,
      createdByName: session.name,
    });
    onCreate(c);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card border border-border rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display font-semibold">Nytt ärende</h3>
          <button onClick={onClose}><X className="w-4 h-4 text-muted-foreground" /></button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium block mb-1.5">Rubrik *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              className="w-full bg-secondary border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/50"
              placeholder="Beskriv ärendet kort..."
            />
          </div>
          <div>
            <label className="text-xs font-medium block mb-1.5">Prioritet</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="w-full bg-secondary border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/50"
            >
              <option>Låg</option>
              <option>Normal</option>
              <option>Hög</option>
              <option>Kritisk</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium block mb-1.5">Beskrivning</label>
            <textarea
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className="w-full bg-secondary border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary/50 resize-none"
              placeholder="Mer information..."
            />
          </div>
        </div>
        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 border border-border rounded-xl py-2 text-sm hover:border-primary/30 transition-colors">Avbryt</button>
          <button onClick={submit} disabled={!title.trim()} className="flex-1 bg-primary text-primary-foreground rounded-xl py-2 text-sm font-medium disabled:opacity-40">
            Skicka in
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Bookings ─── */
function BookingsView({ session }: { session: NonNullable<ReturnType<typeof getSession>> }) {
  const bookings = useStore((s) => s.bookings);
  const [dayOffset, setDayOffset] = useState(0);
  const days = Array.from({ length: 5 }, (_, i) => i);

  const dateFor = (offset: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return d.toISOString().slice(0, 10);
  };
  const labelFor = (offset: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return d.toLocaleDateString("sv-FI", { weekday: "short", day: "numeric", month: "short" });
  };

  const selectedDate = dateFor(dayOffset);
  const myBookings = bookings.filter((b) => b.bookedByEmail === session.email);

  const userLabel = session.apt || session.name.split(" ")[0];

  const handleBook = (space: string, time: string) => {
    actions.bookSlot({
      space,
      date: selectedDate,
      time,
      email: session.email,
      label: userLabel,
    });
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="font-display text-xl font-semibold">Bokningar</h1>
          <p className="text-xs text-muted-foreground">Välj en ledig tid för att boka</p>
        </div>
      </div>

      {myBookings.length > 0 && (
        <div className="card-gradient border border-primary/20 rounded-2xl p-5 mb-5">
          <p className="text-sm font-semibold mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" /> Mina bokningar
          </p>
          <div className="space-y-2">
            {myBookings.map((b) => (
              <div key={b.id} className="flex items-center justify-between border border-border rounded-xl p-3">
                <div>
                  <p className="text-sm font-medium">{b.space}</p>
                  <p className="text-[11px] text-muted-foreground">{b.date} · {b.time}</p>
                </div>
                <button
                  onClick={() => actions.cancelBooking(b.id)}
                  className="text-[11px] px-2.5 py-1 rounded-lg border border-border hover:border-red-500/50 hover:text-red-400 transition-colors"
                >
                  Avboka
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {days.map((offset) => (
          <button
            key={offset}
            onClick={() => setDayOffset(offset)}
            className={`shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-colors capitalize ${
              dayOffset === offset
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {labelFor(offset)}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {getSpaces().map((space) => (
          <div key={space} className="card-gradient border border-border rounded-2xl p-5">
            <p className="text-sm font-semibold mb-3">{space}</p>
            <div className="flex flex-wrap gap-2">
              {getSlotTimesFor(space).map((time) => {
                const booking = bookings.find(
                  (b) => b.space === space && b.date === selectedDate && b.time === time,
                );
                const mine = booking?.bookedByEmail === session.email;
                if (booking) {
                  return (
                    <button
                      key={time}
                      onClick={() => mine && actions.cancelBooking(booking.id)}
                      disabled={!mine}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                        mine
                          ? "border-primary bg-primary/20 text-primary font-medium hover:bg-primary/30 cursor-pointer"
                          : "border-border bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                    >
                      {time} · {mine ? "Min bokning" : booking.bookedByLabel}
                    </button>
                  );
                }
                return (
                  <button
                    key={time}
                    onClick={() => handleBook(space, time)}
                    className="text-xs px-3 py-1.5 rounded-lg border border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer"
                  >
                    {time} · Ledig
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Documents ─── */
function DocumentsView({ role }: { role: Role }) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-display text-xl font-semibold">Dokument</h1>
        {can.manageDocuments(role) && (
          <button className="flex items-center gap-1.5 bg-primary text-primary-foreground rounded-lg px-3 py-2 text-xs font-medium">
            <Plus className="w-3.5 h-3.5" /> Ladda upp
          </button>
        )}
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
            <button className="text-[11px] text-primary hover:underline">Öppna</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Messages ─── */
function MessagesView({
  session, role,
}: {
  session: NonNullable<ReturnType<typeof getSession>>;
  role: Role;
}) {
  const messages = useStore((s) => s.messages.filter((m) => m.threadId === "general"));
  const announcements = messages.filter((m) => m.isAnnouncement);
  const conversation = messages.filter((m) => !m.isAnnouncement);
  const [reply, setReply] = useState("");
  const [isAnn, setIsAnn] = useState(false);

  const send = () => {
    if (!reply.trim()) return;
    actions.postMessage({
      text: reply,
      threadId: "general",
      authorEmail: session.email,
      authorName: session.name,
      authorInitials: session.initials,
      isAnnouncement: isAnn && can.postAnnouncement(role),
    });
    setReply("");
    setIsAnn(false);
  };

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-xl font-semibold mb-5">Meddelanden</h1>

      {announcements.map((a) => (
        <div key={a.id} className="card-gradient border border-primary/20 rounded-2xl p-5 mb-3">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-primary">VIKTIGT MEDDELANDE</span>
          </div>
          <p className="text-sm whitespace-pre-wrap">{a.text}</p>
          <p className="text-[11px] text-muted-foreground mt-2">
            {a.authorName} · {formatRelative(a.createdAt)}
          </p>
        </div>
      ))}

      <div className="card-gradient border border-border rounded-2xl overflow-hidden">
        <div className="p-5 space-y-4 max-h-[400px] overflow-y-auto">
          {conversation.length === 0 && (
            <p className="text-xs text-muted-foreground italic text-center py-4">Inga meddelanden ännu.</p>
          )}
          {conversation.map((m) => {
            const isMine = m.authorEmail === session.email;
            return (
              <div key={m.id} className={`flex items-start gap-3 ${isMine ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold ${isMine ? "bg-primary/20 text-primary" : "bg-accent text-accent-foreground"}`}>
                  {m.authorInitials}
                </div>
                <div className={`flex-1 ${isMine ? "text-right" : ""}`}>
                  <div className={`flex items-center gap-2 mb-1 ${isMine ? "justify-end" : ""}`}>
                    <span className="text-sm font-medium">{m.authorName}</span>
                    <span className="text-[10px] text-muted-foreground">{formatRelative(m.createdAt)}</span>
                  </div>
                  <div className={`inline-block card-gradient border border-border rounded-xl p-3 text-left ${isMine ? "bg-primary/5 border-primary/20" : ""}`}>
                    <p className="text-xs text-muted-foreground whitespace-pre-wrap">{m.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-border p-4">
          {can.postAnnouncement(role) && (
            <label className="flex items-center gap-2 mb-2 text-[11px] text-muted-foreground cursor-pointer">
              <input type="checkbox" checked={isAnn} onChange={(e) => setIsAnn(e.target.checked)} className="accent-primary" />
              Skicka som viktigt meddelande (anslag)
            </label>
          )}
          <div className="flex items-center gap-2 border border-border rounded-xl px-3 py-2 focus-within:border-primary/40 transition-colors">
            <Paperclip className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <input
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Skriv ett meddelande..."
              className="flex-1 bg-transparent text-xs focus:outline-none placeholder:text-muted-foreground"
            />
            <button onClick={send} disabled={!reply.trim()} className="text-primary disabled:opacity-30">
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Residents ─── */
function ResidentsView() {
  const residents = useStore((s) => s.residents);
  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-display text-xl font-semibold">Boende</h1>
        <span className="text-xs text-muted-foreground">{residents.length} personer</span>
      </div>

      <div className="card-gradient border border-border rounded-2xl p-5 mb-5">
        <div className="flex items-center gap-2 mb-4">
          <Car className="w-4 h-4 text-primary" />
          <h2 className="font-display text-sm font-semibold">Köhantering — Parkering (varmgarage)</h2>
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

      <div className="card-gradient border border-border rounded-2xl overflow-hidden">
        {residents.map((r) => (
          <div key={r.id} className="flex items-center justify-between p-4 border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-[10px] font-bold text-accent-foreground">
                {r.name.split(" ").map((w) => w[0]).join("")}
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
function SettingsView({ session }: { session: NonNullable<ReturnType<typeof getSession>> }) {
  return (
    <div className="max-w-lg">
      <h1 className="font-display text-xl font-semibold mb-5">Inställningar</h1>

      <div className="space-y-4">
        <div className="card-gradient border border-border rounded-2xl p-5">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2"><User className="w-4 h-4 text-primary" /> Profil</h2>
          <div className="space-y-3">
            {[
              { label: "Namn", value: session.name },
              { label: "E-post", value: session.email },
              { label: "Roll", value: session.roleLabel },
              ...(session.apt ? [{ label: "Lägenhet", value: session.apt }] : []),
              { label: "Husbolag", value: session.company },
            ].map((f, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <span className="text-xs text-muted-foreground">{f.label}</span>
                <span className="text-sm">{f.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card-gradient border border-border rounded-2xl p-5">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2"><Shield className="w-4 h-4 text-primary" /> Demo-data</h2>
          <p className="text-xs text-muted-foreground mb-3">
            All data i portalen är demo och sparas lokalt i din webbläsare. Du kan återställa till utgångsläget när som helst.
          </p>
          <button
            onClick={() => {
              if (confirm("Återställ all portal-data till utgångsläget?")) {
                actions.resetAll();
              }
            }}
            className="text-xs px-3 py-2 rounded-lg border border-border hover:border-red-500/40 hover:text-red-400 transition-colors"
          >
            Återställ demo-data
          </button>
        </div>
      </div>
    </div>
  );
}
