import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import Logo from "@/components/Logo";
import LanguagePicker from "@/components/LanguagePicker";
import { Mail, Lock, ArrowLeft } from "lucide-react";

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
    rights: "Kaikki oikeudet pidätetään.",
  },
} as const;

const LoginPage = () => {
  const { lang } = useLanguage();
  const c = COPY[lang];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-5"
          >
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
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={c.emailPlaceholder}
                  className="w-full bg-secondary border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
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
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={c.passwordPlaceholder}
                  className="w-full bg-secondary border border-border rounded-xl pl-10 pr-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-colors"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled
              className="w-full bg-primary text-primary-foreground font-medium py-3 rounded-xl text-sm opacity-40 cursor-not-allowed mt-2"
            >
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
