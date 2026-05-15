// Shared store for the calculator selections so the contact form can include
// them in the quote request.

export type QuoteSelection = {
  services: string[];
  cleaningTypes: string[];
  complexity: string | null;
  apartments: number | null;
  total: number;
  currency: string;
  lines: Array<{ label: string; amount: number }>;
};

const KEY = "fem.quoteSelection";

let current: QuoteSelection | null = readFromStorage();
const listeners = new Set<(s: QuoteSelection | null) => void>();

function readFromStorage(): QuoteSelection | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as QuoteSelection) : null;
  } catch {
    return null;
  }
}

export function getQuoteSelection() {
  return current;
}

export function setQuoteSelection(next: QuoteSelection | null) {
  current = next;
  if (typeof window !== "undefined") {
    try {
      if (next) window.localStorage.setItem(KEY, JSON.stringify(next));
      else window.localStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  }
  listeners.forEach((l) => l(current));
}

export function subscribeQuoteSelection(listener: (s: QuoteSelection | null) => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function formatQuoteSelectionAsText(s: QuoteSelection, lang: "sv" | "fi") {
  const isFi = lang === "fi";
  const fmt = new Intl.NumberFormat(isFi ? "fi-FI" : "sv-SE");
  const lines: string[] = [];
  lines.push(isFi ? "— Kalkulaattorin valinnat —" : "— Val från kalkylatorn —");
  if (s.services.length) {
    lines.push((isFi ? "Palvelut: " : "Tjänster: ") + s.services.join(", "));
  }
  if (s.cleaningTypes.length) {
    lines.push((isFi ? "Siivous: " : "Städning: ") + s.cleaningTypes.join(", "));
  }
  if (s.complexity) {
    lines.push((isFi ? "Laajuus: " : "Omfattning: ") + s.complexity);
  }
  if (s.apartments != null) {
    lines.push((isFi ? "Asuntoja portaaliin: " : "Lägenheter i portalen: ") + s.apartments);
  }
  if (s.lines.length) {
    lines.push("");
    lines.push(isFi ? "Erittely:" : "Specifikation:");
    s.lines.forEach((l) => lines.push(`  • ${l.label}: ${fmt.format(l.amount)} €`));
  }
  lines.push("");
  lines.push(
    (isFi ? "Alustava arvio yhteensä: n. " : "Preliminär uppskattning totalt: ca ") +
      fmt.format(s.total) +
      " €/" +
      (isFi ? "kk" : "mån"),
  );
  return lines.join("\n");
}
