import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import Logo from "@/components/Logo";
import LanguagePicker from "@/components/LanguagePicker";
import { Mail, Lock, ArrowLeft, AlertCircle, ChevronDown, User } from "lucide-react";
import { DEMO_USERS, login } from "@/portal/auth";

const COPY = {
  sv: {
    back: "Tillbaka",
    eyebrow: "Välkommen tillbaka",
    title: "Logga in",
    emailLabel: "E-postadress",
    emailPlaceholder: "din@email.com",
    passwordLabel: "Lösenord",
    passwordPlaceholder: "••••••••",
    submit: "Logga in",
    error: "Felaktiga inloggningsuppgifter.",
    rights: "Alla rättigheter förbehållna.",
    demoTitle: "Demo-konton",
    demoHint: "Klicka för att fylla i automatiskt. Lösenord: demo",
  },
  fi: {
    back: "Takaisin",
    eyebrow: "Tervetuloa takaisin",
    title: "Kirjaudu sisään",
    emailLabel: "Sähköpostiosoite",
    emailPlaceholder: "sinun@email.com",
    passwordLabel: "Salasana",
    passwordPlaceholder: "••••••••",
    submit: "Kirjaudu",
    error: "Virheelliset kirjautumistiedot.",
    rights: "Kaikki oikeudet pidätetään.",
    demoTitle: "Demotilit",
    demoHint: "Klikkaa täyttääksesi automaattisesti. Salasana: demo",
  },
} as const;

const LoginPage = () => {
  const { lang } = useLanguage();
  const c = COPY[lang];
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [demoOpen, setDemoOpen] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    setTimeout(() => {
      const user = login(email, password);
      if (user) {
        navigate("/dashboard");
      } else {
        setError(true);
        setLoading(false);
      }
    }, 400);
  };

  const fillDemo = (u: (typeof DEMO_USERS)[number]) => {
    setEmail(u.email);
    setPassword(u.password);
    setError(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="flex items-center justify-between px-6 md:px-12 h-16 border-b border-border/50">
        <Link to="/">
          <Logo className="h-8 w-auto" />
        </Link>
        <LanguagePicker />
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            {c.back}
          </Link>

          <p className="text-primary text-xs font-medium tracking-widest uppercase mb-3">
            {c.eyebrow}
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight mb-8">
            {c.title}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {c.emailLabel}
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(false); }}
                  placeholder={c.emailPlaceholder}
                  className={`w-full bg-secondary border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 transition-colors ${error ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : "border-border focus:border-primary/50 focus:ring-primary/30"}`}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {c.passwordLabel}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false); }}
                  placeholder={c.passwordPlaceholder}
                  className={`w-full bg-secondary border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 transition-colors ${error ? "border-red-500/50 focus:border-red-500/50 focus:ring-red-500/20" : "border-border focus:border-primary/50 focus:ring-primary/30"}`}
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {c.error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full bg-primary text-primary-foreground font-medium py-3 rounded-xl text-sm transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed mt-2 flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                </svg>
              )}
              {c.submit}
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-8 border border-border rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setDemoOpen(!demoOpen)}
              className="w-full flex items-center justify-between px-4 py-3 bg-card/50 hover:bg-card transition-colors"
            >
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-semibold">{c.demoTitle}</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${demoOpen ? "rotate-180" : ""}`} />
            </button>
            {demoOpen && (
              <div className="p-3 space-y-1.5 border-t border-border bg-card/30">
                <p className="text-[11px] text-muted-foreground px-1 mb-2">{c.demoHint}</p>
                {DEMO_USERS.filter((u) => u.password === "demo").map((u) => (
                  <button
                    key={u.email}
                    type="button"
                    onClick={() => fillDemo(u)}
                    className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-left hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-[10px] font-bold text-primary shrink-0">
                        {u.initials}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium truncate">{u.name}</p>
                        <p className="text-[10px] text-muted-foreground truncate">{u.email}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-primary font-medium shrink-0 px-1.5 py-0.5 rounded-full bg-primary/10">
                      {u.roleLabel}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-border py-6 px-6 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} FEM Kiinteistöpalvelut. {c.rights}
        </p>
      </footer>
    </div>
  );
};

export default LoginPage;
