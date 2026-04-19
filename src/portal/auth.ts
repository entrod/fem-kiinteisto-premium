// Hårdkodade demo-konton. Inga riktiga säkerhetskrav — endast för demo.
// Roller styr vad användaren ser i dashboarden.

export type Role = "fem" | "admin" | "board" | "owner" | "tenant";

export type DemoUser = {
  email: string;
  password: string;
  name: string;
  initials: string;
  role: Role;
  roleLabel: string; // visningsnamn på rollen
  apt?: string;
  company: string;
};

export const DEMO_USERS: DemoUser[] = [
  {
    email: "enlund.t@gmail.com",
    password: "1234TEadmin",
    name: "Tobias Enlund",
    initials: "TE",
    role: "fem",
    roleLabel: "Förvaltare (FEM)",
    company: "FEM Kiinteistöpalvelut",
  },
  {
    email: "fem@demo.fi",
    password: "demo",
    name: "Maria Sundberg",
    initials: "MS",
    role: "fem",
    roleLabel: "Förvaltare (FEM)",
    company: "FEM Kiinteistöpalvelut",
  },
  {
    email: "admin@demo.fi",
    password: "demo",
    name: "Anna Karlsson",
    initials: "AK",
    role: "admin",
    roleLabel: "Husbolagsadmin",
    company: "Brf Sjöstaden 4",
  },
  {
    email: "admin.norrgatan@demo.fi",
    password: "demo",
    name: "Heikki Virtanen",
    initials: "HV",
    role: "admin",
    roleLabel: "Husbolagsadmin",
    apt: "Lgh 4",
    company: "As Oy Norrgatan 8",
  },
  {
    email: "styrelse@demo.fi",
    password: "demo",
    name: "Lars Eriksson",
    initials: "LE",
    role: "board",
    roleLabel: "Styrelse (ordf.)",
    apt: "Lgh 12",
    company: "Brf Sjöstaden 4",
  },
  {
    email: "agare@demo.fi",
    password: "demo",
    name: "Mikael Korhonen",
    initials: "MK",
    role: "owner",
    roleLabel: "Ägare",
    apt: "Lgh 3",
    company: "Brf Sjöstaden 4",
  },
  {
    email: "hyresgast@demo.fi",
    password: "demo",
    name: "Sara Mäkinen",
    initials: "SM",
    role: "tenant",
    roleLabel: "Hyresgäst (andra hand)",
    apt: "Lgh 7",
    company: "Brf Sjöstaden 4",
  },
];

const SESSION_KEY = "fem_session";

export function login(email: string, password: string): DemoUser | null {
  const user = DEMO_USERS.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
  );
  if (!user) return null;
  // Lagra utan lösenord
  const { password: _pw, ...safe } = user;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(safe));
  return user;
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function getSession(): Omit<DemoUser, "password"> | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// Vad får respektive roll göra?
export const can = {
  // Tilldela ärenden, ändra status, se alla ärenden
  manageCases: (r: Role) => r === "fem" || r === "admin" || r === "board",
  // Endast FEM och admin kan ladda upp/radera dokument
  manageDocuments: (r: Role) => r === "fem" || r === "admin",
  // Skicka officiella meddelanden ("VIKTIGT MEDDELANDE")
  postAnnouncement: (r: Role) => r === "fem" || r === "admin" || r === "board",
  // Hantera boendelistan
  manageResidents: (r: Role) => r === "fem" || r === "admin",
  // Se ekonomi/intern info
  seeInternal: (r: Role) => r === "fem",
};
