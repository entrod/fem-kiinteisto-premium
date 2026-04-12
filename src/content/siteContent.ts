export type Language = "sv" | "fi";

export type SiteContent = {
  nav: {
    services: string;
    pricing: string;
    portal: string;
    about: string;
    contact: string;
    cta: string;
  };
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
    levels: { simple: string; normal: string; advanced: string };
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
};

export const siteContent: Record<Language, SiteContent> = {
  sv: {
    nav: {
      services: "Tjänster",
      pricing: "Priser",
      portal: "Plattform",
      about: "Om oss",
      contact: "Kontakt",
      cta: "Be om offert",
    },
    hero: {
      eyebrow: "Fastighetsservice i Jakobstad",
      title: "Fastighetsservice",
      highlight: "för husbolag",
      titleSuffix: "i Jakobstad",
      body: "Snabbare service. Tydligare kommunikation. Enklare vardag.",
      primaryCta: "Be om offert",
      secondaryCta: "Se pris",
    },
    problem: {
      eyebrow: "Utmaningen",
      title: "Ett husbolag ska inte behöva jaga svar.",
      body: "Många husbolag är vana vid sega återkopplingar, otydliga upplägg och för lite insyn. FEM gör det enklare — med raka besked, god tillgänglighet och digital service som faktiskt hjälper i vardagen.",
    },
    services: {
      eyebrow: "Tjänster",
      title: "Det ni behöver, samlat på ett ställe.",
      items: [
        { title: "Förvaltning", description: "Praktisk och trygg förvaltning med tydlig kommunikation och ordning i det löpande arbetet." },
        { title: "Fastighetsskötsel", description: "Snabb hjälp med felanmälningar, underhåll och det som behöver fungera i huset varje dag." },
        { title: "Städning", description: "Omsorgsfull städning av trapphus och gemensamma utrymmen, med jämn kvalitet över tid." },
        { title: "Digital plattform", description: "Allt från ärenden till bokningar och kommunikation, samlat på ett ställe." },
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
      levels: { simple: "Liten", normal: "Normal", advanced: "Omfattande" },
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
        { title: "Dokument & kontakt", description: "Viktig information samlad där den faktiskt går att hitta." },
        { title: "Bokningar", description: "Enklare hantering av gemensamma utrymmen och vardagsrutiner." },
      ],
    },
    localTrust: {
      eyebrow: "Lokalt närvarande",
      title: "Verksamma i Jakobstad med omnejd.",
      body: "Vi arbetar nära husbolag i regionen och erbjuder service på både svenska och finska. Närhet, tillgänglighet och ett personligt bemötande är grunden i vårt sätt att jobba.",
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
  },
  fi: {
    nav: {
      services: "Palvelut",
      pricing: "Hinnat",
      portal: "Alusta",
      about: "Meistä",
      contact: "Yhteys",
      cta: "Pyydä tarjous",
    },
    hero: {
      eyebrow: "Kiinteistöpalvelut Pietarsaaressa",
      title: "Kiinteistöpalvelua",
      highlight: "taloyhtiöille",
      titleSuffix: "Pietarsaaressa",
      body: "Nopeampi palvelu. Selkeämpi viestintä. Sujuvampi arki.",
      primaryCta: "Pyydä tarjous",
      secondaryCta: "Katso hinta",
    },
    problem: {
      eyebrow: "Haaste",
      title: "Taloyhtiön arjen ei pitäisi olla jatkuvaa perään kysymistä.",
      body: "Moni taloyhtiö on tottunut hitaisiin vastauksiin, epäselviin käytäntöihin ja liian vähäiseen näkyvyyteen. FEM tekee arjesta suoraviivaisempaa — selkeällä viestinnällä, hyvällä tavoitettavuudella ja digitaalisilla palveluilla, joista on oikeasti hyötyä.",
    },
    services: {
      eyebrow: "Palvelut",
      title: "Taloyhtiön tarvitsemat palvelut yhdestä paikasta.",
      items: [
        { title: "Isännöinti", description: "Sujuvaa ja vastuullista isännöintiä, jossa viestintä toimii ja kokonaisuus pysyy hallinnassa." },
        { title: "Huolto", description: "Nopeaa apua vikailmoituksiin, ylläpitoon ja niihin asioihin, joiden pitää toimia joka päivä." },
        { title: "Siivous", description: "Huolellista siivousta porrashuoneisiin ja yhteisiin tiloihin tasaisella työnjäljellä." },
        { title: "Digitaalinen alusta", description: "Kaikki asioista varauksiin ja viestintään, yhdessä paikassa." },
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
      levels: { simple: "Kevyt", normal: "Tavallinen", advanced: "Laaja" },
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
        { title: "Dokumentit & yhteystiedot", description: "Oleellinen tieto siellä missä sen pitääkin olla." },
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
  },
};
