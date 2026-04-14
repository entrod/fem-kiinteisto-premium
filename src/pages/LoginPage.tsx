import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import Logo from "@/components/Logo";
import LanguagePicker from "@/components/LanguagePicker";
import { Mail, Lock, ArrowLeft, AlertCircle } from "lucide-react";

const VALID_EMAIL = "enlund.t@gmail.com";
const VALID_PASSWORD = "1234TEadmin";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setLoading(true);
    // Simulate a brief network delay for realism
    setTimeout(() => {
      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        sessionStorage.setItem("fem_auth", "1");
        navigate("/dashboard");
      } else {
        setError(true);
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 md:px-12 h-16 border-b border-border/50">
        <Link to="/">
          <Logo className="h-8 w-auto" />
        </Link>
        <LanguagePicker />
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground text-sm hover:text-foreground transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            {c.back}
          </Link>

          {/* Heading */}
          <p className="text-primary text-xs font-medium tracking-widest uppercase mb-3">
            {c.eyebrow}
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight mb-8">
            {c.title}
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
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

            {/* Password */}
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

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                {c.error}
              </div>
            )}

            {/* Submit */}
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
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-6 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} FEM Kiinteistöpalvelut. {c.rights}
        </p>
      </footer>
    </div>
  );
};

export default LoginPage;
