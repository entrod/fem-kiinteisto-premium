export type Language = "sv" | "fi" | "en";

export type SiteContent = {
  locale: string;
  nav: {
    services: string;
    pricing: string;
    portal: string;
    contact: string;
    cta: string;
  };
  languageLabel: string;
  hero: {
    eyebrow: string;
    title: string;
    highlight: string;
    titleSuffix: string;
    body: string;
    primaryCta: string;
    secondaryCta: string;
  };
  problem: {
    eyebrow: string;
    title: string;
    body: string;
  };
  services: {
    eyebrow: string;
    title: string;
    items: Array<{ title: string; description: string }>;
  };
  differentiation: {
    eyebrow: string;
    title: string;
    traditionalTitle: string;
    femTitle: string;
    traditional: string[];
    fem: string[];
  };
  calculator: {
    eyebrow: string;
    title: string;
    apartments: string;
    maintenance: string;
    cleaning: string;
    complexity: string;
    levels: {
      simple: string;
      normal: string;
      advanced: string;
    };
    estimate: string;
    quoteCta: string;
    perMonth: string;
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    steps: Array<{ number: string; title: string; description: string }>;
  };
  portal: {
    badge: string;
    title: string;
    body: string;
    features: Array<{ title: string; description: string }>;
  };
  localTrust: {
    eyebrow: string;
    title: string;
    body: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    successTitle: string;
    successBody: string;
    fields: {
      name: string;
      company: string;
      apartments: string;
      contact: string;
      message: string;
    };
    submit: string;
  };
  footer: {
    rights: string;
  };
  notFound: {
    body: string;
    cta: string;
  };
};

export const languageOptions: Array<{ code: Language; label: string; flag: string }> = [
  { code: "sv", label: "SV", flag: "🇸🇪" },
  { code: "fi", label: "FI", flag: "🇫🇮" },
  { code: "en", label: "EN", flag: "🇬🇧" },
];

export const siteContent: Record<Language, SiteContent> = {
  sv: {
    locale: "sv-SE",
    nav: {
      services: "Tjänster",
      pricing: "Priser",
      portal: "Portal",
      contact: "Kontakt",
      cta: "Be om offert",
    },
    languageLabel: "Språk",
    hero: {
      eyebrow: "Fastighetsservice i Jakobstad",
      title: "Modern fastighetsservice",
      highlight: "för husbolag",
      titleSuffix: "i Jakobstad",
      body: "Snabbare service. Tydligare kommunikation. Enklare vardag.",
      primaryCta: "Be om offert",
      secondaryCta: "Se pris",
    },
    problem: {
      eyebrow: "Utmaningen",
      title: "Ett husbolag ska inte behöva jaga svar.",
      body: "Många husbolag är vana vid sega återkopplingar, otydliga upplägg och för lite insyn. FEM gör det enklare, med raka besked, god tillgänglighet och digital service som faktiskt hjälper i vardagen.",
    },
    services: {
      eyebrow: "Tjänster",
      title: "Det ni behöver, samlat på ett ställe.",
      items: [
        {
          title: "Förvaltning",
          description: "Praktisk och trygg förvaltning med tydlig kommunikation och ordning i det löpande arbetet.",
        },
        {
          title: "Fastighetsskötsel",
          description: "Snabb hjälp med felanmälningar, underhåll och det som behöver fungera i huset varje dag.",
        },
        {
          title: "Städning",
          description: "Omsorgsfull städning av trapphus och gemensamma utrymmen, med jämn kvalitet över tid.",
        },
      ],
    },
    differentiation: {
      eyebrow: "Skillnaden",
      title: "Därför väljer husbolag FEM.",
      traditionalTitle: "Det gamla vanliga",
      femTitle: "FEM",
      traditional: ["Sena svar", "Otydliga upplägg", "Svårt att få tag på rätt person", "För lite insyn"],
      fem: ["Snabb återkoppling", "Tydlig struktur", "Lätt att nå oss", "Bättre överblick"],
    },
    calculator: {
      eyebrow: "Priskalkylator",
      title: "Räkna på en första nivå.",
      apartments: "Antal lägenheter",
      maintenance: "Fastighetsskötsel",
      cleaning: "Städning",
      complexity: "Omfattning",
      levels: {
        simple: "Liten",
        normal: "Normal",
        advanced: "Omfattande",
      },
      estimate: "Preliminär uppskattning",
      quoteCta: "Be om exakt offert",
      perMonth: "€/mån",
    },
    howItWorks: {
      eyebrow: "Så går det till",
      title: "Tre steg till en smidigare vardag.",
      steps: [
        { number: "01", title: "Kontakt", description: "Ni berättar kort om huset, nuläget och vad ni vill ha hjälp med." },
        { number: "02", title: "Förslag", description: "Vi tar fram ett upplägg med tydligt innehåll och en prisbild som går att förstå." },
        { number: "03", title: "Start", description: "När allt känns rätt sätter vi igång och tar hand om övergången på ett ordnat sätt." },
      ],
    },
    portal: {
      badge: "Kommer snart",
      title: "En portal som gör jobbet lättare.",
      body: "På sikt samlar vi felanmälan, uppföljning och viktig information på ett och samma ställe.",
      features: [
        { title: "Felanmälan", description: "Skicka in ärenden snabbt och få bättre överblick från start." },
        { title: "Ärendestatus", description: "Se vad som är på gång och vad som redan har blivit gjort." },
        { title: "Dokument och kontakt", description: "Viktig information samlad där den faktiskt går att hitta." },
        { title: "Bokningar", description: "Enklare hantering av gemensamma utrymmen och vardagsrutiner." },
      ],
    },
    localTrust: {
      eyebrow: "Lokalt närvarande",
      title: "Verksamma i Jakobstad med omnejd.",
      body: "Vi arbetar nära husbolag i regionen och erbjuder service på svenska, finska och engelska. Närhet, tillgänglighet och ett personligt bemötande är grunden i vårt sätt att jobba.",
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Ska vi ta ett första samtal?",
      successTitle: "Tack!",
      successBody: "Vi hör av oss så snart vi kan.",
      fields: {
        name: "Namn",
        company: "Företag / husbolag",
        apartments: "Antal lägenheter",
        contact: "E-post / telefon",
        message: "Meddelande",
      },
      submit: "Skicka förfrågan",
    },
    footer: {
      rights: "Alla rättigheter förbehållna.",
    },
    notFound: {
      body: "Sidan kunde inte hittas.",
      cta: "Till startsidan",
    },
  },
  fi: {
    locale: "fi-FI",
    nav: {
      services: "Palvelut",
      pricing: "Hinnat",
      portal: "Portaali",
      contact: "Yhteys",
      cta: "Pyydä tarjous",
    },
    languageLabel: "Kieli",
    hero: {
      eyebrow: "Kiinteistöpalvelut Pietarsaaressa",
      title: "Modernia kiinteistöpalvelua",
      highlight: "taloyhtiöille",
      titleSuffix: "Pietarsaaressa",
      body: "Nopeampi palvelu. Selkeämpi viestintä. Sujuvampi arki.",
      primaryCta: "Pyydä tarjous",
      secondaryCta: "Katso hinta",
    },
    problem: {
      eyebrow: "Haaste",
      title: "Taloyhtiön arjen ei pitäisi olla jatkuvaa perään kysymistä.",
      body: "Moni taloyhtiö on tottunut hitaisiin vastauksiin, epäselviin käytäntöihin ja liian vähäiseen näkyvyyteen. FEM tekee arjesta suoraviivaisempaa selkeällä viestinnällä, hyvällä tavoitettavuudella ja digitaalisilla palveluilla, joista on oikeasti hyötyä.",
    },
    services: {
      eyebrow: "Palvelut",
      title: "Taloyhtiön tarvitsemat palvelut yhdestä paikasta.",
      items: [
        {
          title: "Isännöinti",
          description: "Sujuvaa ja vastuullista isännöintiä, jossa viestintä toimii ja kokonaisuus pysyy hallinnassa.",
        },
        {
          title: "Huolto",
          description: "Nopeaa apua vikailmoituksiin, ylläpitoon ja niihin asioihin, joiden pitää toimia joka päivä.",
        },
        {
          title: "Siivous",
          description: "Huolellista siivousta porrashuoneisiin ja yhteisiin tiloihin tasaisella työnjäljellä.",
        },
      ],
    },
    differentiation: {
      eyebrow: "Ero näkyy arjessa",
      title: "Miksi taloyhtiöt valitsevat FEMin.",
      traditionalTitle: "Vanha tapa",
      femTitle: "FEM",
      traditional: ["Hidas reagointi", "Epäselvät käytännöt", "Vaikea tavoittaa", "Liian vähän näkyvyyttä"],
      fem: ["Nopea vastaus", "Selkeä toimintatapa", "Helppo ottaa yhteyttä", "Parempi kokonaiskuva"],
    },
    calculator: {
      eyebrow: "Hintalaskuri",
      title: "Laske suuntaa-antava taso.",
      apartments: "Huoneistojen määrä",
      maintenance: "Huolto",
      cleaning: "Siivous",
      complexity: "Laajuus",
      levels: {
        simple: "Kevyt",
        normal: "Tavallinen",
        advanced: "Laaja",
      },
      estimate: "Suuntaa-antava arvio",
      quoteCta: "Pyydä tarkka tarjous",
      perMonth: "€/kk",
    },
    howItWorks: {
      eyebrow: "Näin se etenee",
      title: "Kolme askelta sujuvampaan arkeen.",
      steps: [
        { number: "01", title: "Yhteydenotto", description: "Kerro lyhyesti taloyhtiöstä, nykytilanteesta ja siitä, missä tarvitsette apua." },
        { number: "02", title: "Ehdotus", description: "Laadimme selkeän kokonaisuuden ja hinnan, joka on helppo ymmärtää." },
        { number: "03", title: "Aloitus", description: "Kun kaikki tuntuu oikealta, käynnistämme yhteistyön hallitusti ja ilman turhaa säätöä." },
      ],
    },
    portal: {
      badge: "Tulossa",
      title: "Portaali, joka helpottaa tekemistä.",
      body: "Tavoitteena on tuoda vikailmoitukset, seuranta ja tärkeät tiedot samaan paikkaan.",
      features: [
        { title: "Vikailmoitukset", description: "Ilmoita ongelmista nopeasti ja seuraa asian etenemistä alusta asti." },
        { title: "Tilanneseuranta", description: "Näe mitä on työn alla ja mitä on jo hoidettu." },
        { title: "Dokumentit ja yhteydet", description: "Oleellinen tieto siellä missä sen pitääkin olla." },
        { title: "Varaukset", description: "Yhteisten tilojen ja arjen käytäntöjen hallinta helpottuu." },
      ],
    },
    localTrust: {
      eyebrow: "Paikallisesti läsnä",
      title: "Toimimme Pietarsaaressa ja lähialueilla.",
      body: "Palvelemme taloyhtiöitä alueella suomeksi ja ruotsiksi. Läheisyys, tavoitettavuus ja henkilökohtainen palvelu ovat meille työn perusta.",
    },
    contact: {
      eyebrow: "Yhteys",
      title: "Keskustellaanko ensin hetki?",
      successTitle: "Kiitos!",
      successBody: "Palaamme asiaan mahdollisimman pian.",
      fields: {
        name: "Nimi",
        company: "Yritys / taloyhtiö",
        apartments: "Huoneistojen määrä",
        contact: "Sähköposti / puhelin",
        message: "Viesti",
      },
      submit: "Lähetä yhteydenotto",
    },
    footer: {
      rights: "Kaikki oikeudet pidätetään.",
    },
    notFound: {
      body: "Sivua ei löytynyt.",
      cta: "Takaisin etusivulle",
    },
  },
  en: {
    locale: "en-GB",
    nav: {
      services: "Services",
      pricing: "Pricing",
      portal: "Portal",
      contact: "Contact",
      cta: "Request a quote",
    },
    languageLabel: "Language",
    hero: {
      eyebrow: "Property services in Jakobstad",
      title: "Modern property services",
      highlight: "for housing companies",
      titleSuffix: "in Jakobstad",
      body: "Faster service. Clearer communication. Easier everyday life.",
      primaryCta: "Request a quote",
      secondaryCta: "See pricing",
    },
    problem: {
      eyebrow: "The challenge",
      title: "Managing a housing company should not feel heavy.",
      body: "Many housing companies are used to slow replies, unclear routines and too little visibility. FEM keeps things simpler with direct communication, easy access and digital tools that are genuinely useful in day-to-day work.",
    },
    services: {
      eyebrow: "Services",
      title: "What your housing company needs, in one place.",
      items: [
        {
          title: "Property management",
          description: "Reliable day-to-day management with clear communication and a steady grip on the practical details.",
        },
        {
          title: "Maintenance",
          description: "Quick help with fault reports, upkeep and the things that need to work every single day.",
        },
        {
          title: "Cleaning",
          description: "Careful cleaning of stairwells and shared spaces, delivered with consistent quality.",
        },
      ],
    },
    differentiation: {
      eyebrow: "The difference",
      title: "Why housing companies choose FEM.",
      traditionalTitle: "The usual way",
      femTitle: "FEM",
      traditional: ["Slow responses", "Unclear routines", "Hard to reach", "Too little visibility"],
      fem: ["Quick follow-up", "Clear structure", "Easy to contact", "Better overview"],
    },
    calculator: {
      eyebrow: "Price calculator",
      title: "Estimate the level.",
      apartments: "Number of apartments",
      maintenance: "Maintenance",
      cleaning: "Cleaning",
      complexity: "Scope",
      levels: {
        simple: "Light",
        normal: "Standard",
        advanced: "Extended",
      },
      estimate: "Indicative estimate",
      quoteCta: "Request an exact quote",
      perMonth: "€/mo",
    },
    howItWorks: {
      eyebrow: "How it works",
      title: "Three steps to a smoother setup.",
      steps: [
        { number: "01", title: "Contact", description: "Tell us a little about the property, the current situation and the support you need." },
        { number: "02", title: "Proposal", description: "We put together a clear setup with pricing that is easy to understand." },
        { number: "03", title: "Start", description: "Once everything feels right, we get started and handle the transition in an orderly way." },
      ],
    },
    portal: {
      badge: "Coming soon",
      title: "A portal that makes daily work easier.",
      body: "Our next step is to bring fault reports, follow-up and key information together in one place.",
      features: [
        { title: "Fault reports", description: "Report issues quickly and follow the case from the very beginning." },
        { title: "Case status", description: "See what is in progress and what has already been completed." },
        { title: "Documents and contacts", description: "Important information collected where people can actually find it." },
        { title: "Bookings", description: "A simpler way to manage shared spaces and everyday routines." },
      ],
    },
    localTrust: {
      eyebrow: "Local presence",
      title: "Working in Jakobstad and the surrounding area.",
      body: "We work closely with housing companies in the region and provide service in both Swedish and Finnish. Accessibility, local presence and a personal approach are central to how we work.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Shall we start with a conversation?",
      successTitle: "Thank you!",
      successBody: "We will get back to you as soon as we can.",
      fields: {
        name: "Name",
        company: "Company / housing company",
        apartments: "Number of apartments",
        contact: "Email / phone",
        message: "Message",
      },
      submit: "Send enquiry",
    },
    footer: {
      rights: "All rights reserved.",
    },
    notFound: {
      body: "We could not find that page.",
      cta: "Back to home",
    },
  },
};
