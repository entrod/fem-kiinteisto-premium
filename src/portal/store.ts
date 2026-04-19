// Centralt portal-store backat av localStorage.
// Allt är demo-data — försvinner om man rensar webbläsaren.

import { useEffect, useState, useSyncExternalStore } from "react";
import { DEFAULT_PERMISSIONS, type PermissionKey, type Role } from "./auth";

export type CaseStatus = "new" | "pending" | "active" | "done";
export type Priority = "Låg" | "Normal" | "Hög" | "Kritisk";

export type Company = {
  id: string;
  name: string;
  shortName: string;
  address: string;
  units: number; // antal lägenheter
};

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
  companyId: string;
  title: string;
  desc: string;
  status: CaseStatus;
  priority: Priority;
  assignee: string;
  createdByEmail: string;
  createdByName: string;
  createdAt: number;
  updatedAt: number;
};

export type BookingSlot = {
  id: string;
  companyId: string;
  space: string;
  date: string;
  time: string;
  bookedByEmail?: string;
  bookedByLabel?: string;
};

export type Message = {
  id: string;
  companyId: string;
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
  companyId: string;
  name: string;
  apt: string;
  email: string;
  role: string;
  since: string;
};

export type Membership = {
  id: string;
  companyId: string;
  email: string;
  name: string;
  initials: string;
  role: Role;
  roleLabel: string;
  apt?: string;
  permissions: PermissionKey[]; // finkorniga rättigheter, kan finjusteras av admin
};

type Store = {
  companies: Company[];
  cases: Case[];
  comments: Comment[];
  bookings: BookingSlot[];
  messages: Message[];
  residents: Resident[];
  memberships: Membership[];
};

const STORAGE_KEY = "fem_portal_store_v3"; // bumpad pga memberships

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

// Husbolag som FEM förvaltar. Andra roller är knutna till "sjostaden" (default).
export const COMPANIES: Company[] = [
  { id: "sjostaden", name: "Brf Sjöstaden 4", shortName: "Sjöstaden 4", address: "Strandvägen 12, Helsingfors", units: 24 },
  { id: "norrgatan", name: "As Oy Norrgatan 8", shortName: "Norrgatan 8", address: "Norrgatan 8, Esbo", units: 18 },
  { id: "parkvyn", name: "Brf Parkvyn", shortName: "Parkvyn", address: "Parkvägen 3, Vanda", units: 32 },
];

function seed(): Store {
  const now = Date.now();
  const today = todayISO();

  return {
    companies: COMPANIES,
    cases: [
      // ─── Sjöstaden 4 ───
      {
        id: "ÄR-047", companyId: "sjostaden",
        title: "Trasig lampa i trapphus B",
        desc: "Lampan i trapphus B plan 3 är trasig och behöver bytas. Boende har rapporterat bristande belysning sedan måndag.",
        status: "active", priority: "Hög", assignee: "Erik N.",
        createdByEmail: "agare@demo.fi", createdByName: "Mikael Korhonen",
        createdAt: now - 1000 * 60 * 60 * 2, updatedAt: now - 1000 * 60 * 30,
      },
      {
        id: "ÄR-046", companyId: "sjostaden",
        title: "Vattenläcka källare",
        desc: "Mindre vattenläcka observerad vid källartrapp. Behöver mer information om exakt plats.",
        status: "pending", priority: "Kritisk", assignee: "Maria S.",
        createdByEmail: "styrelse@demo.fi", createdByName: "Lars Eriksson",
        createdAt: now - 1000 * 60 * 60 * 26, updatedAt: now - 1000 * 60 * 60 * 4,
      },
      {
        id: "ÄR-045", companyId: "sjostaden",
        title: "Dörrkod ur funktion port 2",
        desc: "Dörrkoden till port 2 fungerade inte. Åtgärdat genom att återställa kodpanelen.",
        status: "done", priority: "Normal", assignee: "Erik N.",
        createdByEmail: "hyresgast@demo.fi", createdByName: "Sara Mäkinen",
        createdAt: now - 1000 * 60 * 60 * 50, updatedAt: now - 1000 * 60 * 60 * 26,
      },
      {
        id: "ÄR-044", companyId: "sjostaden",
        title: "Graffiti fasad",
        desc: "Klotter på fasaden mot Strandvägen. Behöver rengöras med specialmedel.",
        status: "new", priority: "Låg", assignee: "—",
        createdByEmail: "styrelse@demo.fi", createdByName: "Lars Eriksson",
        createdAt: now - 1000 * 60 * 60 * 72, updatedAt: now - 1000 * 60 * 60 * 72,
      },
      // ─── Norrgatan 8 ───
      {
        id: "ÄR-031", companyId: "norrgatan",
        title: "Hiss står still",
        desc: "Hissen i hus A reagerar inte på knapptryck. Tekniker behöver kallas omgående.",
        status: "active", priority: "Kritisk", assignee: "Maria S.",
        createdByEmail: "fem@demo.fi", createdByName: "Maria Sundberg",
        createdAt: now - 1000 * 60 * 60 * 5, updatedAt: now - 1000 * 60 * 60 * 1,
      },
      {
        id: "ÄR-030", companyId: "norrgatan",
        title: "Snöplogning saknas",
        desc: "Parkeringen plogades inte i morse. Boende har svårt att komma ut.",
        status: "new", priority: "Hög", assignee: "—",
        createdByEmail: "fem@demo.fi", createdByName: "Maria Sundberg",
        createdAt: now - 1000 * 60 * 60 * 8, updatedAt: now - 1000 * 60 * 60 * 8,
      },
      {
        id: "ÄR-029", companyId: "norrgatan",
        title: "Sopkärl överfullt",
        desc: "Sopkärlet vid hus B är överfullt. Tömning bokad till torsdag.",
        status: "pending", priority: "Normal", assignee: "Erik N.",
        createdByEmail: "fem@demo.fi", createdByName: "Maria Sundberg",
        createdAt: now - 1000 * 60 * 60 * 30, updatedAt: now - 1000 * 60 * 60 * 6,
      },
      // ─── Parkvyn ───
      {
        id: "ÄR-018", companyId: "parkvyn",
        title: "Bastu trasig",
        desc: "Bastun värms inte upp ordentligt. Termostat troligen trasig.",
        status: "active", priority: "Normal", assignee: "Erik N.",
        createdByEmail: "fem@demo.fi", createdByName: "Maria Sundberg",
        createdAt: now - 1000 * 60 * 60 * 12, updatedAt: now - 1000 * 60 * 60 * 3,
      },
      {
        id: "ÄR-017", companyId: "parkvyn",
        title: "Lekplats — gunga skadad",
        desc: "Kedjan på en av gungorna är skadad. Avspärrad tills åtgärdad.",
        status: "done", priority: "Hög", assignee: "Maria S.",
        createdByEmail: "fem@demo.fi", createdByName: "Maria Sundberg",
        createdAt: now - 1000 * 60 * 60 * 96, updatedAt: now - 1000 * 60 * 60 * 48,
      },
    ],
    comments: [
      {
        id: uid("c_"), caseId: "ÄR-047",
        authorEmail: "fem@demo.fi", authorName: "Erik N.", authorInitials: "EN",
        text: "Lampan är beställd, byter den imorgon förmiddag. Aviserar berörda boende.",
        createdAt: now - 1000 * 60 * 30,
      },
      {
        id: uid("c_"), caseId: "ÄR-031",
        authorEmail: "fem@demo.fi", authorName: "Maria Sundberg", authorInitials: "MS",
        text: "Hissfirma kontaktad, tekniker på plats inom 2 timmar.",
        createdAt: now - 1000 * 60 * 60,
      },
    ],
    bookings: [
      { id: uid("b_"), companyId: "sjostaden", space: "Tvättstuga A", date: today, time: "08:00–10:00", bookedByEmail: "styrelse@demo.fi", bookedByLabel: "Lgh 12" },
      { id: uid("b_"), companyId: "sjostaden", space: "Tvättstuga A", date: today, time: "12:00–14:00", bookedByEmail: "agare@demo.fi", bookedByLabel: "Lgh 3" },
      { id: uid("b_"), companyId: "sjostaden", space: "Tvättstuga B", date: today, time: "12:00–14:00", bookedByEmail: "hyresgast@demo.fi", bookedByLabel: "Lgh 7" },
      { id: uid("b_"), companyId: "sjostaden", space: "Bastu", date: today, time: "19:00–21:00", bookedByEmail: "agare@demo.fi", bookedByLabel: "Lgh 3" },
      { id: uid("b_"), companyId: "norrgatan", space: "Tvättstuga A", date: today, time: "10:00–12:00", bookedByEmail: "boende@norrgatan.fi", bookedByLabel: "Lgh 7" },
      { id: uid("b_"), companyId: "parkvyn", space: "Bastu", date: today, time: "17:00–19:00", bookedByEmail: "boende@parkvyn.fi", bookedByLabel: "Lgh 4" },
    ],
    messages: [
      {
        id: uid("m_"), companyId: "sjostaden", threadId: "general",
        authorEmail: "fem@demo.fi", authorName: "FEM", authorInitials: "FEM",
        text: "Vattenavstängning tisdag 22/4, kl 09–12. På grund av planerat underhåll stängs vattnet av i trapphus A och B.",
        createdAt: now - 1000 * 60 * 60 * 24, isAnnouncement: true,
      },
      {
        id: uid("m_"), companyId: "sjostaden", threadId: "general",
        authorEmail: "styrelse@demo.fi", authorName: "Lars Eriksson", authorInitials: "LE",
        text: "Påminnelse: Årsstämma 28 april kl 18:00. Dagordning finns under Dokument.",
        createdAt: now - 1000 * 60 * 60 * 18,
      },
      {
        id: uid("m_"), companyId: "norrgatan", threadId: "general",
        authorEmail: "fem@demo.fi", authorName: "FEM", authorInitials: "FEM",
        text: "Hiss i hus A åtgärdas idag. Beräknad klar kl 16.",
        createdAt: now - 1000 * 60 * 60 * 2, isAnnouncement: true,
      },
      {
        id: uid("m_"), companyId: "parkvyn", threadId: "general",
        authorEmail: "fem@demo.fi", authorName: "FEM", authorInitials: "FEM",
        text: "Trädgårdsdag lördag 26/4 kl 10–14. Korv och kaffe bjuds.",
        createdAt: now - 1000 * 60 * 60 * 36,
      },
    ],
    residents: [
      // Sjöstaden
      { id: uid("r_"), companyId: "sjostaden", name: "Anna Lindström", apt: "Lgh 14", email: "a.lindstrom@mail.com", role: "Boende", since: "2019" },
      { id: uid("r_"), companyId: "sjostaden", name: "Mikael Korhonen", apt: "Lgh 3", email: "agare@demo.fi", role: "Ägare", since: "2015" },
      { id: uid("r_"), companyId: "sjostaden", name: "Johan Björk", apt: "Lgh 9", email: "j.bjork@mail.com", role: "Boende", since: "2021" },
      { id: uid("r_"), companyId: "sjostaden", name: "Sara Mäkinen", apt: "Lgh 7", email: "hyresgast@demo.fi", role: "Hyresgäst", since: "2022" },
      { id: uid("r_"), companyId: "sjostaden", name: "Lars Eriksson", apt: "Lgh 12", email: "styrelse@demo.fi", role: "Styrelse (ordf.)", since: "2013" },
      { id: uid("r_"), companyId: "sjostaden", name: "Petra Nyström", apt: "Lgh 2", email: "p.nystrom@mail.com", role: "Boende", since: "2020" },
      // Norrgatan
      { id: uid("r_"), companyId: "norrgatan", name: "Heikki Virtanen", apt: "Lgh 4", email: "h.virtanen@mail.fi", role: "Styrelse (ordf.)", since: "2017" },
      { id: uid("r_"), companyId: "norrgatan", name: "Riina Salo", apt: "Lgh 7", email: "r.salo@mail.fi", role: "Boende", since: "2020" },
      { id: uid("r_"), companyId: "norrgatan", name: "Jukka Niemi", apt: "Lgh 11", email: "j.niemi@mail.fi", role: "Boende", since: "2018" },
      // Parkvyn
      { id: uid("r_"), companyId: "parkvyn", name: "Eva Holm", apt: "Lgh 4", email: "e.holm@mail.fi", role: "Styrelse (ordf.)", since: "2014" },
      { id: uid("r_"), companyId: "parkvyn", name: "Otto Lehto", apt: "Lgh 19", email: "o.lehto@mail.fi", role: "Boende", since: "2019" },
    ],
    memberships: seedMemberships(),
  };
}

function mkMembership(p: Omit<Membership, "id" | "permissions"> & { permissions?: PermissionKey[] }): Membership {
  return {
    id: uid("m_"),
    permissions: p.permissions ?? DEFAULT_PERMISSIONS[p.role],
    ...p,
  };
}

function seedMemberships(): Membership[] {
  return [
    // ── Sjöstaden ──
    mkMembership({ companyId: "sjostaden", email: "fem@demo.fi", name: "Maria Sundberg", initials: "MS", role: "fem", roleLabel: "Förvaltare (FEM)" }),
    mkMembership({ companyId: "sjostaden", email: "enlund.t@gmail.com", name: "Tobias Enlund", initials: "TE", role: "fem", roleLabel: "Förvaltare (FEM)" }),
    mkMembership({ companyId: "sjostaden", email: "admin@demo.fi", name: "Anna Karlsson", initials: "AK", role: "admin", roleLabel: "Husbolagsadmin" }),
    mkMembership({ companyId: "sjostaden", email: "styrelse@demo.fi", name: "Lars Eriksson", initials: "LE", role: "board", roleLabel: "Styrelse (ordf.)", apt: "Lgh 12" }),
    mkMembership({ companyId: "sjostaden", email: "agare@demo.fi", name: "Mikael Korhonen", initials: "MK", role: "owner", roleLabel: "Ägare", apt: "Lgh 3" }),
    mkMembership({ companyId: "sjostaden", email: "hyresgast@demo.fi", name: "Sara Mäkinen", initials: "SM", role: "tenant", roleLabel: "Hyresgäst", apt: "Lgh 7" }),
    // ── Norrgatan ──
    mkMembership({ companyId: "norrgatan", email: "fem@demo.fi", name: "Maria Sundberg", initials: "MS", role: "fem", roleLabel: "Förvaltare (FEM)" }),
    mkMembership({ companyId: "norrgatan", email: "enlund.t@gmail.com", name: "Tobias Enlund", initials: "TE", role: "fem", roleLabel: "Förvaltare (FEM)" }),
    mkMembership({ companyId: "norrgatan", email: "admin.norrgatan@demo.fi", name: "Heikki Virtanen", initials: "HV", role: "admin", roleLabel: "Husbolagsadmin", apt: "Lgh 4" }),
    // ── Parkvyn ──
    mkMembership({ companyId: "parkvyn", email: "fem@demo.fi", name: "Maria Sundberg", initials: "MS", role: "fem", roleLabel: "Förvaltare (FEM)" }),
    mkMembership({ companyId: "parkvyn", email: "enlund.t@gmail.com", name: "Tobias Enlund", initials: "TE", role: "fem", roleLabel: "Förvaltare (FEM)" }),
  ];
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
    const parsed = JSON.parse(raw) as Store;
    // Säkerhetsnät — om gammal data utan companies eller memberships finns
    if (!parsed.companies || parsed.companies.length === 0 || !parsed.memberships) {
      const s = seed();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
      return s;
    }
    return parsed;
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
  // Cacha senast beräknat värde per anrop så att useSyncExternalStore
  // får en stabil referens när underliggande state inte ändrats.
  // Annars triggar nya array/objekt-referenser från selektorn en oändlig loop.
  const cacheRef = { current: { state: null as Store | null, value: undefined as unknown as T } };
  const get = () => {
    const s = getSnapshot();
    if (cacheRef.current.state !== s) {
      cacheRef.current = { state: s, value: selector(s) };
    }
    return cacheRef.current.value;
  };
  return useSyncExternalStore(subscribe, get, get);
}

// ────── Active company (per-tab) ──────
const ACTIVE_COMPANY_KEY = "fem_active_company";
const companyListeners = new Set<() => void>();
let activeCompanyId: string =
  (typeof window !== "undefined" && sessionStorage.getItem(ACTIVE_COMPANY_KEY)) || COMPANIES[0].id;

export function setActiveCompany(id: string) {
  activeCompanyId = id;
  try { sessionStorage.setItem(ACTIVE_COMPANY_KEY, id); } catch { /* noop */ }
  companyListeners.forEach((l) => l());
}

export function useActiveCompany(): Company {
  const id = useSyncExternalStore(
    (l) => { companyListeners.add(l); return () => companyListeners.delete(l); },
    () => activeCompanyId,
    () => activeCompanyId,
  );
  return state.companies.find((c) => c.id === id) || state.companies[0];
}

export function getActiveCompanyId() {
  return activeCompanyId;
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
  createCase(input: {
    companyId: string;
    title: string;
    desc: string;
    priority: Priority;
    createdByEmail: string;
    createdByName: string;
  }): Case {
    const c: Case = {
      id: nextCaseId(),
      companyId: input.companyId,
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
      cases: state.cases.map((c) => (c.id === id ? { ...c, status, updatedAt: Date.now() } : c)),
    };
    emit();
  },
  assignCase(id: string, assignee: string) {
    state = {
      ...state,
      cases: state.cases.map((c) => (c.id === id ? { ...c, assignee: assignee || "—", updatedAt: Date.now() } : c)),
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
      cases: state.cases.map((cs) => (cs.id === input.caseId ? { ...cs, updatedAt: Date.now() } : cs)),
    };
    emit();
  },

  bookSlot(input: { companyId: string; space: string; date: string; time: string; email: string; label: string }) {
    const exists = state.bookings.find(
      (b) => b.companyId === input.companyId && b.space === input.space && b.date === input.date && b.time === input.time,
    );
    if (exists) return false;
    state = {
      ...state,
      bookings: [
        ...state.bookings,
        {
          id: uid("b_"),
          companyId: input.companyId,
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

  postMessage(input: {
    companyId: string;
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
      companyId: input.companyId,
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

  // ── Memberships ──
  setMemberPermissions(membershipId: string, permissions: PermissionKey[]) {
    state = {
      ...state,
      memberships: state.memberships.map((m) =>
        m.id === membershipId ? { ...m, permissions } : m,
      ),
    };
    emit();
  },
  toggleMemberPermission(membershipId: string, key: PermissionKey) {
    const m = state.memberships.find((x) => x.id === membershipId);
    if (!m) return;
    const next = m.permissions.includes(key)
      ? m.permissions.filter((k) => k !== key)
      : [...m.permissions, key];
    actions.setMemberPermissions(membershipId, next);
  },
  removeMember(membershipId: string) {
    state = { ...state, memberships: state.memberships.filter((m) => m.id !== membershipId) };
    emit();
  },
  addMember(input: Omit<Membership, "id" | "permissions"> & { permissions?: PermissionKey[] }) {
    const m: Membership = {
      id: uid("mem_"),
      permissions: input.permissions ?? DEFAULT_PERMISSIONS[input.role],
      ...input,
    };
    state = { ...state, memberships: [...state.memberships, m] };
    emit();
    return m;
  },
};

// Hämta effektiva permissions för en användare i ett bolag (utan hook).
export function getEffectivePermissions(email: string, companyId: string, fallbackRole?: Role): PermissionKey[] {
  const m = state.memberships.find((x) => x.email.toLowerCase() === email.toLowerCase() && x.companyId === companyId);
  if (m) return m.permissions;
  if (fallbackRole) return DEFAULT_PERMISSIONS[fallbackRole];
  return [];
}

export function hasPermission(email: string, companyId: string, key: PermissionKey, fallbackRole?: Role): boolean {
  return getEffectivePermissions(email, companyId, fallbackRole).includes(key);
}

export function useEffectivePermissions(email: string, companyId: string, fallbackRole?: Role): PermissionKey[] {
  return useStore((s) => {
    const m = s.memberships.find((x) => x.email.toLowerCase() === email.toLowerCase() && x.companyId === companyId);
    if (m) return m.permissions;
    if (fallbackRole) return DEFAULT_PERMISSIONS[fallbackRole];
    return [];
  });
}

export function useMyCompanies(email: string): Company[] {
  return useStore((s) => {
    const ids = new Set(s.memberships.filter((m) => m.email.toLowerCase() === email.toLowerCase()).map((m) => m.companyId));
    return s.companies.filter((c) => ids.has(c.id));
  });
}

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

// Prioritetsvikt för sortering — Kritisk högst.
export const PRIORITY_WEIGHT: Record<Priority, number> = {
  Kritisk: 4, Hög: 3, Normal: 2, Låg: 1,
};

// Score: kritikalitet + ålder. Större = mer akut.
export function caseUrgencyScore(c: Case): number {
  if (c.status === "done") return -1;
  const ageHours = (Date.now() - c.createdAt) / 3_600_000;
  return PRIORITY_WEIGHT[c.priority] * 10 + Math.min(72, ageHours);
}

export { useEffect, useState };
