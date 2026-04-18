// Centralt portal-store backat av localStorage.
// Allt är demo-data — försvinner om man rensar webbläsaren.

import { useEffect, useState, useSyncExternalStore } from "react";

export type CaseStatus = "new" | "pending" | "active" | "done";
export type Priority = "Låg" | "Normal" | "Hög" | "Kritisk";

export type Comment = {
  id: string;
  caseId: string;
  authorEmail: string;
  authorName: string;
  authorInitials: string;
  text: string;
  createdAt: number;
};

export type Case = {
  id: string;
  title: string;
  desc: string;
  status: CaseStatus;
  priority: Priority;
  assignee: string; // namn, "—" om otilldelad
  createdByEmail: string;
  createdByName: string;
  createdAt: number;
  updatedAt: number;
};

export type BookingSlot = {
  id: string; // unikt nyckel för (space + date + time)
  space: string;
  date: string; // ISO yyyy-mm-dd
  time: string; // ex "08:00–10:00"
  bookedByEmail?: string;
  bookedByLabel?: string; // ex "Lgh 12"
};

export type Message = {
  id: string;
  threadId: string; // "general" eller "case:<id>"
  authorEmail: string;
  authorName: string;
  authorInitials: string;
  text: string;
  createdAt: number;
  isAnnouncement?: boolean;
};

export type Resident = {
  id: string;
  name: string;
  apt: string;
  email: string;
  role: string;
  since: string;
};

type Store = {
  cases: Case[];
  comments: Comment[];
  bookings: BookingSlot[]; // endast bokade slots; lediga genereras
  messages: Message[];
  residents: Resident[];
};

const STORAGE_KEY = "fem_portal_store_v1";

const SPACES = ["Tvättstuga A", "Tvättstuga B", "Bastu"];
const SLOT_TIMES_LAUNDRY = ["08:00–10:00", "10:00–12:00", "12:00–14:00", "14:00–16:00", "16:00–18:00", "18:00–20:00"];
const SLOT_TIMES_SAUNA = ["17:00–19:00", "19:00–21:00", "21:00–23:00"];

export function getSpaces() {
  return SPACES;
}
export function getSlotTimesFor(space: string): string[] {
  return space === "Bastu" ? SLOT_TIMES_SAUNA : SLOT_TIMES_LAUNDRY;
}

function uid(prefix = "") {
  return prefix + Math.random().toString(36).slice(2, 9);
}

function todayISO() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function seed(): Store {
  const now = Date.now();
  const today = todayISO();
  return {
    cases: [
      {
        id: "ÄR-047",
        title: "Trasig lampa i trapphus B",
        desc: "Lampan i trapphus B plan 3 är trasig och behöver bytas. Boende har rapporterat bristande belysning sedan måndag.",
        status: "active",
        priority: "Hög",
        assignee: "Erik N.",
        createdByEmail: "agare@demo.fi",
        createdByName: "Mikael Korhonen",
        createdAt: now - 1000 * 60 * 60 * 2,
        updatedAt: now - 1000 * 60 * 30,
      },
      {
        id: "ÄR-046",
        title: "Vattenläcka källare",
        desc: "Mindre vattenläcka observerad vid källartrapp. Behöver mer information om exakt plats.",
        status: "pending",
        priority: "Kritisk",
        assignee: "Maria S.",
        createdByEmail: "styrelse@demo.fi",
        createdByName: "Lars Eriksson",
        createdAt: now - 1000 * 60 * 60 * 26,
        updatedAt: now - 1000 * 60 * 60 * 4,
      },
      {
        id: "ÄR-045",
        title: "Dörrkod ur funktion port 2",
        desc: "Dörrkoden till port 2 fungerade inte. Åtgärdat genom att återställa kodpanelen.",
        status: "done",
        priority: "Normal",
        assignee: "Erik N.",
        createdByEmail: "hyresgast@demo.fi",
        createdByName: "Sara Mäkinen",
        createdAt: now - 1000 * 60 * 60 * 50,
        updatedAt: now - 1000 * 60 * 60 * 26,
      },
      {
        id: "ÄR-044",
        title: "Graffiti fasad",
        desc: "Klotter på fasaden mot Strandvägen. Behöver rengöras med specialmedel.",
        status: "new",
        priority: "Låg",
        assignee: "—",
        createdByEmail: "styrelse@demo.fi",
        createdByName: "Lars Eriksson",
        createdAt: now - 1000 * 60 * 60 * 72,
        updatedAt: now - 1000 * 60 * 60 * 72,
      },
    ],
    comments: [
      {
        id: uid("c_"),
        caseId: "ÄR-047",
        authorEmail: "fem@demo.fi",
        authorName: "Erik N.",
        authorInitials: "EN",
        text: "Lampan är beställd, byter den imorgon förmiddag. Aviserar berörda boende.",
        createdAt: now - 1000 * 60 * 30,
      },
    ],
    bookings: [
      { id: uid("b_"), space: "Tvättstuga A", date: today, time: "08:00–10:00", bookedByEmail: "styrelse@demo.fi", bookedByLabel: "Lgh 12" },
      { id: uid("b_"), space: "Tvättstuga A", date: today, time: "12:00–14:00", bookedByEmail: "agare@demo.fi", bookedByLabel: "Lgh 3" },
      { id: uid("b_"), space: "Tvättstuga B", date: today, time: "12:00–14:00", bookedByEmail: "hyresgast@demo.fi", bookedByLabel: "Lgh 7" },
      { id: uid("b_"), space: "Bastu", date: today, time: "19:00–21:00", bookedByEmail: "agare@demo.fi", bookedByLabel: "Lgh 3" },
    ],
    messages: [
      {
        id: uid("m_"),
        threadId: "general",
        authorEmail: "fem@demo.fi",
        authorName: "FEM",
        authorInitials: "FEM",
        text: "Vattenavstängning tisdag 22/4, kl 09–12. På grund av planerat underhåll stängs vattnet av i trapphus A och B.",
        createdAt: now - 1000 * 60 * 60 * 24,
        isAnnouncement: true,
      },
      {
        id: uid("m_"),
        threadId: "general",
        authorEmail: "styrelse@demo.fi",
        authorName: "Lars Eriksson",
        authorInitials: "LE",
        text: "Påminnelse: Årsstämma 28 april kl 18:00. Dagordning finns under Dokument.",
        createdAt: now - 1000 * 60 * 60 * 18,
      },
    ],
    residents: [
      { id: uid("r_"), name: "Anna Lindström", apt: "Lgh 14", email: "a.lindstrom@mail.com", role: "Boende", since: "2019" },
      { id: uid("r_"), name: "Mikael Korhonen", apt: "Lgh 3", email: "agare@demo.fi", role: "Ägare", since: "2015" },
      { id: uid("r_"), name: "Johan Björk", apt: "Lgh 9", email: "j.bjork@mail.com", role: "Boende", since: "2021" },
      { id: uid("r_"), name: "Sara Mäkinen", apt: "Lgh 7", email: "hyresgast@demo.fi", role: "Hyresgäst", since: "2022" },
      { id: uid("r_"), name: "Lars Eriksson", apt: "Lgh 12", email: "styrelse@demo.fi", role: "Styrelse (ordf.)", since: "2013" },
      { id: uid("r_"), name: "Petra Nyström", apt: "Lgh 2", email: "p.nystrom@mail.com", role: "Boende", since: "2020" },
    ],
  };
}

function load(): Store {
  if (typeof window === "undefined") return seed();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const s = seed();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
      return s;
    }
    return JSON.parse(raw) as Store;
  } catch {
    return seed();
  }
}

let state: Store = load();
const listeners = new Set<() => void>();

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* noop */
  }
}

function emit() {
  persist();
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

function getSnapshot() {
  return state;
}

export function useStore<T>(selector: (s: Store) => T): T {
  return useSyncExternalStore(subscribe, () => selector(getSnapshot()), () => selector(getSnapshot()));
}

// ────── Actions ──────

function nextCaseId(): string {
  const nums = state.cases
    .map((c) => parseInt(c.id.replace(/\D/g, ""), 10))
    .filter((n) => !Number.isNaN(n));
  const next = (nums.length ? Math.max(...nums) : 0) + 1;
  return `ÄR-${String(next).padStart(3, "0")}`;
}

export const actions = {
  // Cases
  createCase(input: {
    title: string;
    desc: string;
    priority: Priority;
    createdByEmail: string;
    createdByName: string;
  }): Case {
    const c: Case = {
      id: nextCaseId(),
      title: input.title.trim() || "Nytt ärende",
      desc: input.desc.trim(),
      status: "new",
      priority: input.priority,
      assignee: "—",
      createdByEmail: input.createdByEmail,
      createdByName: input.createdByName,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    state = { ...state, cases: [c, ...state.cases] };
    emit();
    return c;
  },
  updateCaseStatus(id: string, status: CaseStatus) {
    state = {
      ...state,
      cases: state.cases.map((c) =>
        c.id === id ? { ...c, status, updatedAt: Date.now() } : c,
      ),
    };
    emit();
  },
  assignCase(id: string, assignee: string) {
    state = {
      ...state,
      cases: state.cases.map((c) =>
        c.id === id ? { ...c, assignee: assignee || "—", updatedAt: Date.now() } : c,
      ),
    };
    emit();
  },
  deleteCase(id: string) {
    state = {
      ...state,
      cases: state.cases.filter((c) => c.id !== id),
      comments: state.comments.filter((c) => c.caseId !== id),
    };
    emit();
  },

  // Comments
  addComment(input: {
    caseId: string;
    text: string;
    authorEmail: string;
    authorName: string;
    authorInitials: string;
  }) {
    if (!input.text.trim()) return;
    const c: Comment = {
      id: uid("c_"),
      caseId: input.caseId,
      text: input.text.trim(),
      authorEmail: input.authorEmail,
      authorName: input.authorName,
      authorInitials: input.authorInitials,
      createdAt: Date.now(),
    };
    state = {
      ...state,
      comments: [...state.comments, c],
      cases: state.cases.map((cs) =>
        cs.id === input.caseId ? { ...cs, updatedAt: Date.now() } : cs,
      ),
    };
    emit();
  },

  // Bookings
  bookSlot(input: { space: string; date: string; time: string; email: string; label: string }) {
    const exists = state.bookings.find(
      (b) => b.space === input.space && b.date === input.date && b.time === input.time,
    );
    if (exists) return false;
    state = {
      ...state,
      bookings: [
        ...state.bookings,
        {
          id: uid("b_"),
          space: input.space,
          date: input.date,
          time: input.time,
          bookedByEmail: input.email,
          bookedByLabel: input.label,
        },
      ],
    };
    emit();
    return true;
  },
  cancelBooking(id: string) {
    state = { ...state, bookings: state.bookings.filter((b) => b.id !== id) };
    emit();
  },

  // Messages
  postMessage(input: {
    text: string;
    threadId: string;
    authorEmail: string;
    authorName: string;
    authorInitials: string;
    isAnnouncement?: boolean;
  }) {
    if (!input.text.trim()) return;
    const m: Message = {
      id: uid("m_"),
      threadId: input.threadId,
      text: input.text.trim(),
      authorEmail: input.authorEmail,
      authorName: input.authorName,
      authorInitials: input.authorInitials,
      isAnnouncement: !!input.isAnnouncement,
      createdAt: Date.now(),
    };
    state = { ...state, messages: [...state.messages, m] };
    emit();
  },

  resetAll() {
    state = seed();
    emit();
  },
};

// Hjälpare
export function formatRelative(ts: number): string {
  const diff = Date.now() - ts;
  const min = Math.floor(diff / 60000);
  if (min < 1) return "nyss";
  if (min < 60) return `${min} min sedan`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h} tim sedan`;
  const d = Math.floor(h / 24);
  if (d < 7) return `${d} dag${d > 1 ? "ar" : ""} sedan`;
  return new Date(ts).toLocaleDateString("sv-FI");
}

export function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString("sv-FI", { hour: "2-digit", minute: "2-digit" });
}

// Re-export hook for convenience
export { useEffect, useState };
