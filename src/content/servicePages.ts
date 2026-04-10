export type ServicePageContent = {
  slug: string;
  hero: { title: string; subtitle: string };
  features: { title: string; items: string[] };
  steps: { title: string; items: Array<{ number: string; title: string; description: string }> };
  diff: { title: string; items: Array<{ label: string; description: string }> };
  cta: { title: string; button: string };
};

export const servicePages: Record<string, Record<"sv" | "fi", ServicePageContent>> = {
  forvaltning: {
    sv: {
      slug: "forvaltning",
      hero: { title: "Förvaltning som håller ordning.", subtitle: "Tydlig struktur, snabb kommunikation och full kontroll över husbolagets vardag." },
      features: {
        title: "Vad ni får",
        items: [
          "Löpande ekonomisk uppföljning och budgetarbete",
          "Styrelsestöd med dagordning, protokoll och planering",
          "Kontakt med myndigheter och leverantörer",
          "Underhållsplanering med tydlig prioritering",
          "Tillgång till digital portal med alla dokument",
          "Snabb återkoppling — aldrig mer än en arbetsdag",
        ],
      },
      steps: {
        title: "Hur det fungerar",
        items: [
          { number: "01", title: "Genomgång", description: "Vi går igenom husbolagets nuläge, avtal och behov." },
          { number: "02", title: "Upplägg", description: "Ni får ett tydligt förslag med innehåll och pris." },
          { number: "03", title: "Igång", description: "Vi tar över smidigt och sköter övergången." },
        ],
      },
      diff: {
        title: "Vad som skiljer oss",
        items: [
          { label: "Snabbare svar", description: "Återkoppling inom en arbetsdag, inte veckor." },
          { label: "Tydligare struktur", description: "Allt dokumenterat och lätt att följa." },
          { label: "Bättre översikt", description: "Digital portal där ni ser status i realtid." },
          { label: "Personligt bemötande", description: "Ni har alltid en fast kontaktperson." },
        ],
      },
      cta: { title: "Redo att byta till enklare förvaltning?", button: "Be om offert" },
    },
    fi: {
      slug: "forvaltning",
      hero: { title: "Isännöintiä, joka pitää asiat järjestyksessä.", subtitle: "Selkeä rakenne, nopea viestintä ja täysi hallinta taloyhtiön arjesta." },
      features: {
        title: "Mitä saatte",
        items: [
          "Jatkuva taloudellinen seuranta ja budjetointi",
          "Hallituksen tuki: esityslistat, pöytäkirjat ja suunnittelu",
          "Yhteydenpito viranomaisiin ja toimittajiin",
          "Kunnossapitosuunnitelma selkeällä priorisoinnilla",
          "Pääsy digitaaliseen portaaliin kaikkine dokumentteineen",
          "Nopea vastaus — aina yhden työpäivän sisällä",
        ],
      },
      steps: {
        title: "Näin se toimii",
        items: [
          { number: "01", title: "Kartoitus", description: "Käymme läpi taloyhtiön nykytilanteen, sopimukset ja tarpeet." },
          { number: "02", title: "Ehdotus", description: "Saatte selkeän tarjouksen sisältöineen ja hintoineen." },
          { number: "03", title: "Käynnistys", description: "Aloitamme sujuvasti ja hoidamme siirtymän." },
        ],
      },
      diff: {
        title: "Mikä erottaa meidät",
        items: [
          { label: "Nopeampi vastaus", description: "Vastaus yhden työpäivän sisällä, ei viikkojen." },
          { label: "Selkeämpi rakenne", description: "Kaikki dokumentoitu ja helppo seurata." },
          { label: "Parempi kokonaiskuva", description: "Digitaalinen portaali jossa näette tilanteen reaaliajassa." },
          { label: "Henkilökohtainen palvelu", description: "Teillä on aina oma yhteyshenkilö." },
        ],
      },
      cta: { title: "Valmiit vaihtamaan helpompaan isännöintiin?", button: "Pyydä tarjous" },
    },
  },
  fastighetsskotsel: {
    sv: {
      slug: "fastighetsskotsel",
      hero: { title: "Fastighetsskötsel som fungerar varje dag.", subtitle: "Snabb felanmälan, förebyggande underhåll och ett hus som bara fungerar." },
      features: {
        title: "Vad ni får",
        items: [
          "Felanmälan via portal med statusuppdateringar",
          "Regelbundna rondering och tillsyn",
          "Akut jour vid brådskande situationer",
          "Förebyggande underhåll enligt plan",
          "Kontroll av VVS, el och gemensamma utrymmen",
          "Dokumentation av allt utfört arbete",
        ],
      },
      steps: {
        title: "Hur det fungerar",
        items: [
          { number: "01", title: "Anmälan", description: "Felanmälan via portal, telefon eller e-post." },
          { number: "02", title: "Bedömning", description: "Vi prioriterar och planerar åtgärd." },
          { number: "03", title: "Åtgärd", description: "Problemet löses och ni får bekräftelse." },
        ],
      },
      diff: {
        title: "Vad som skiljer oss",
        items: [
          { label: "Du vet alltid status", description: "Följ ärendet i realtid via portalen." },
          { label: "Snabb reaktion", description: "Brådskande ärenden hanteras samma dag." },
          { label: "Förebyggande fokus", description: "Vi åtgärdar problem innan de blir dyra." },
          { label: "Tydlig dokumentation", description: "Allt loggas och finns tillgängligt." },
        ],
      },
      cta: { title: "Vill ni ha fastighetsskötsel som faktiskt fungerar?", button: "Be om offert" },
    },
    fi: {
      slug: "fastighetsskotsel",
      hero: { title: "Huoltoa, joka toimii joka päivä.", subtitle: "Nopea vikailmoitus, ennaltaehkäisevä huolto ja talo, joka yksinkertaisesti toimii." },
      features: {
        title: "Mitä saatte",
        items: [
          "Vikailmoitukset portaalin kautta tilannepäivityksillä",
          "Säännölliset kierrokset ja tarkastukset",
          "Kiireellinen päivystys hätätilanteissa",
          "Ennaltaehkäisevä huolto suunnitelman mukaan",
          "LVI:n, sähkön ja yhteisten tilojen tarkastukset",
          "Kaiken tehdyn työn dokumentointi",
        ],
      },
      steps: {
        title: "Näin se toimii",
        items: [
          { number: "01", title: "Ilmoitus", description: "Vikailmoitus portaalin, puhelimen tai sähköpostin kautta." },
          { number: "02", title: "Arviointi", description: "Priorisoimme ja suunnittelemme korjauksen." },
          { number: "03", title: "Korjaus", description: "Ongelma ratkaistaan ja saatte vahvistuksen." },
        ],
      },
      diff: {
        title: "Mikä erottaa meidät",
        items: [
          { label: "Tiedät aina tilanteen", description: "Seuraa asiaa reaaliajassa portaalissa." },
          { label: "Nopea reagointi", description: "Kiireelliset asiat hoidetaan samana päivänä." },
          { label: "Ennaltaehkäisevä ote", description: "Korjaamme ongelmat ennen kuin ne tulevat kalliiksi." },
          { label: "Selkeä dokumentointi", description: "Kaikki kirjataan ja on saatavilla." },
        ],
      },
      cta: { title: "Haluatteko huoltoa, joka oikeasti toimii?", button: "Pyydä tarjous" },
    },
  },
  stadning: {
    sv: {
      slug: "stadning",
      hero: { title: "Städning som syns och håller.", subtitle: "Omsorgsfullt utförd städning av gemensamma utrymmen med jämn kvalitet." },
      features: {
        title: "Vad ni får",
        items: [
          "Regelbunden trappstädning enligt schema",
          "Fönsterputsning av gemensamma ytor",
          "Storstädning säsongsvis",
          "Flexibla scheman anpassade efter ert behov",
          "Kvalitetskontroll med dokumentation",
          "Miljövänliga rengöringsprodukter",
        ],
      },
      steps: {
        title: "Hur det fungerar",
        items: [
          { number: "01", title: "Inventering", description: "Vi besiktigar fastigheten och kartlägger behov." },
          { number: "02", title: "Schema", description: "Ni får ett tydligt städschema med innehåll." },
          { number: "03", title: "Uppföljning", description: "Vi följer upp kvaliteten löpande." },
        ],
      },
      diff: {
        title: "Vad som skiljer oss",
        items: [
          { label: "Jämn kvalitet", description: "Samma noggrannhet varje gång, inte bara första veckan." },
          { label: "Tydligt schema", description: "Ni vet exakt vad som görs och när." },
          { label: "Snabb anpassning", description: "Behov ändras? Vi justerar utan krångel." },
          { label: "Dokumenterat resultat", description: "Kvalitetskontroller som ni kan följa." },
        ],
      },
      cta: { title: "Vill ni ha städning som faktiskt håller?", button: "Be om offert" },
    },
    fi: {
      slug: "stadning",
      hero: { title: "Siivousta, joka näkyy ja kestää.", subtitle: "Huolellisesti tehty yhteisten tilojen siivous tasaisella laadulla." },
      features: {
        title: "Mitä saatte",
        items: [
          "Säännöllinen porrassiivous aikataulun mukaan",
          "Yhteisten tilojen ikkunanpesu",
          "Kausiluonteinen suursiivous",
          "Joustavat aikataulut tarpeidenne mukaan",
          "Laadunvalvonta dokumentoinnilla",
          "Ympäristöystävälliset puhdistusaineet",
        ],
      },
      steps: {
        title: "Näin se toimii",
        items: [
          { number: "01", title: "Kartoitus", description: "Tarkastamme kiinteistön ja kartoitamme tarpeet." },
          { number: "02", title: "Aikataulu", description: "Saatte selkeän siivousaikataulun sisältöineen." },
          { number: "03", title: "Seuranta", description: "Seuraamme laatua jatkuvasti." },
        ],
      },
      diff: {
        title: "Mikä erottaa meidät",
        items: [
          { label: "Tasainen laatu", description: "Sama tarkkuus joka kerta, ei vain ensimmäisellä viikolla." },
          { label: "Selkeä aikataulu", description: "Tiedätte tarkalleen mitä tehdään ja milloin." },
          { label: "Nopea mukautuminen", description: "Tarpeet muuttuvat? Mukaudumme ilman säätöä." },
          { label: "Dokumentoitu tulos", description: "Laadunvalvonta jota voitte seurata." },
        ],
      },
      cta: { title: "Haluatteko siivousta, joka oikeasti kestää?", button: "Pyydä tarjous" },
    },
  },
};
