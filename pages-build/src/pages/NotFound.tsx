import { useEffect, useMemo, useState } from "react";
import { siteContent, type Language } from "../content/siteContent";

const detectLanguage = (): Language => {
  if (typeof window === "undefined") return "sv";

  const storedLanguage = window.localStorage.getItem("fem-language");
  if (storedLanguage === "sv" || storedLanguage === "fi" || storedLanguage === "en") {
    return storedLanguage;
  }

  const browserLanguage = window.navigator.language.toLowerCase();
  if (browserLanguage.startsWith("fi")) return "fi";
  if (browserLanguage.startsWith("en")) return "en";
  return "sv";
};

const NotFound = () => {
  const [language] = useState<Language>(detectLanguage);
  const content = useMemo(() => siteContent[language], [language]);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", window.location.pathname);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-6">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">{content.notFound.body}</p>
        <a href={import.meta.env.BASE_URL} className="text-primary underline hover:text-primary/90">
          {content.notFound.cta}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
