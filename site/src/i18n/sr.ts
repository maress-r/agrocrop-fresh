import type { Dictionary } from './types';

export const sr: Dictionary = {
  meta: {
    title: 'Agrocrop Fresh — Sveža paprika iz Srema | Babura i šilja',
    description:
      'Porodična proizvodnja paprike od 1975. godine. Petnaest hektara savremenih plastenika i staklenika, 2.500 tona godišnje, GLOBALG.A.P. sertifikat i izvoz na evropsko tržište.',
    ogLocale: 'sr_RS',
  },

  nav: {
    story: 'O proizvodnji',
    production: 'Proizvodnja',
    products: 'Proizvodi',
    quality: 'Kvalitet',
    gallery: 'Galerija',
    contact: 'Kontakt',
    cta: 'Zatražite ponudu',
  },

  hero: {
    kicker: 'Hidroponska proizvodnja · Vojvodina, Srbija',
    titleLine1: 'Sveža paprika,',
    titleLine2: 'cele godine.',
    lede: 'Babura i šilja iz kontrolisane proizvodnje na 15 hektara savremenih plastenika i staklenika — konzistentan kvalitet za veletrgovce, maloprodajne lance, prerađivače i izvoznike.',
    ctaPrimary: 'Zatražite ponudu',
    ctaSecondary: 'Naši proizvodi',
    scroll: 'Skrolujte',
  },

  story: {
    kicker: 'O proizvodnji',
    title: 'Pola veka posvećenosti jednoj kulturi.',
    lede: 'Od porodičnog gazdinstva do jednog od najmodernijih proizvođača paprike u regionu — priča o tri generacije, jednoj biljci i standardu koji ne pravi kompromise.',
    timeline: [
      {
        year: '1975',
        title: 'Porodično gazdinstvo',
        text: 'U srcu Srema porodica Đurđević počinje da obrađuje zemlju. Paprika brzo postaje kultura kojoj se posvećuje posebna pažnja — i to ostaje do danas.',
      },
      {
        year: '1997',
        title: 'Prelazak u zaštićen prostor',
        text: 'Proizvodnja se seli sa otvorenog polja u prve plastenike. Kontrolisani uslovi donose ono što tržište traži: ujednačen kvalitet i sigurnost isporuke.',
      },
      {
        year: '2012',
        title: 'Osnivanje Agrocrop Fresh',
        text: 'Porodična proizvodnja prerasta u privredno društvo Agrocrop Fresh d.o.o. sa sedištem u Novom Sadu. Tradicija dobija profesionalnu strukturu.',
      },
      {
        year: 'Danas',
        title: '15 hektara savremene proizvodnje',
        text: 'Moderni plastenici i staklenici, biološka zaštita bilja i GLOBALG.A.P. sertifikat. Paprika iz Pećinaca stiže do kupaca širom evropskog tržišta.',
      },
    ],
  },

  production: {
    kicker: 'Proizvodnja',
    title: 'Kontrolisani uslovi. Konzistentan rezultat.',
    lede: 'Svaka faza — od rasada do berbe — odvija se u zaštićenom prostoru pod stalnim nadzorom. Zato naša paprika izgleda isto u martu i u novembru.',
    stats: [
      { value: '15', suffix: 'ha', label: 'savremenih plastenika i staklenika' },
      { value: '2.500', suffix: 't', label: 'godišnja proizvodnja paprike' },
      { value: '400', suffix: 't', label: 'kapacitet hladnjača' },
      { value: '2.500', suffix: 'm²', label: 'pakirni centar' },
    ],
    bioTitle: 'Biološka zaštita bilja',
    bioText:
      'Prednost dajemo prirodnim mehanizmima zaštite — korisni organizmi čuvaju useve, a plod ostaje čist, bezbedan i spreman za najzahtevnija tržišta.',
  },

  products: {
    kicker: 'Proizvodi',
    title: 'Dve sorte. Jedan standard.',
    lede: 'Specijalizovani smo za belu papriku — baburu i šilju. Fokus na dve sorte znači potpunu kontrolu kalibraže, pakovanja i kvaliteta u svakoj isporuci.',
    items: [
      {
        id: 'babura',
        name: 'Babura',
        tagline: 'Krupna, mesnata, blistava.',
        description:
          'Bela babura ujednačene kalibraže i čvrstog, sočnog mesa. Idealna za svežu potrošnju, punjenje i preradu — standard srpske i evropske trpeze.',
        traits: ['Ujednačena kalibraža', 'Čvrst, mesnat plod', 'Duga svežina u hladnom lancu'],
      },
      {
        id: 'silja',
        name: 'Šilja',
        tagline: 'Izdužena, slatka, hrskava.',
        description:
          'Bela šilja prepoznatljivog izduženog oblika i blago slatkog ukusa. Tražena u maloprodaji i preradi — od svežih salata do tradicionalnih zimnica.',
        traits: ['Prepoznatljiv oblik', 'Blago sladak ukus', 'Odlična za svežu prodaju i preradu'],
      },
    ],
  },

  quality: {
    kicker: 'Kvalitet',
    title: 'Standard koji se proverava, ne obećava.',
    lede: 'Kvalitet za nas nije marketinška reč nego procedura — sertifikovana, dokumentovana i vidljiva u svakoj gajbici koja napusti pakirni centar.',
    pillars: [
      {
        title: 'GLOBALG.A.P. sertifikat',
        text: 'Proizvodnja usklađena sa najstrožim međunarodnim standardom dobre poljoprivredne prakse — uslov za police vodećih evropskih lanaca.',
      },
      {
        title: 'Biološka zaštita',
        text: 'Zdravlje biljaka čuvamo prirodnim mehanizmima, uz minimalnu upotrebu hemijskih sredstava i punu bezbednost ploda.',
      },
      {
        title: 'Hladni lanac',
        text: 'Hladnjače kapaciteta 400 tona obezbeđuju da paprika od berbe do isporuke zadrži punu svežinu, čvrstinu i ukus.',
      },
      {
        title: 'Sledljivost',
        text: 'Svaka isporuka nosi potpunu dokumentaciju — od parcele i datuma berbe do kupca. Poverenje se gradi podacima.',
      },
    ],
  },

  logistics: {
    kicker: 'Logistika i izvoz',
    title: 'Od berbe do rampe kupca — bez zastoja.',
    lede: 'Pakirni centar od 2.500 m² i sopstvene hladnjače omogućavaju brzu pripremu robe po specifikaciji kupca i pouzdane isporuke na evropsko tržište.',
    points: [
      {
        title: 'Pakovanje po specifikaciji',
        text: 'Kartonska i plastična ambalaža, kalibraža i deklaracije prilagođene svakom kupcu i tržištu.',
      },
      {
        title: 'Hladni lanac bez prekida',
        text: 'Roba se odmah po berbi hladi i čuva na optimalnoj temperaturi sve do utovara.',
      },
      {
        title: 'Izvoz na evropsko tržište',
        text: 'Redovne isporuke velikim trgovinskim lancima i distributerima u regionu i Evropskoj uniji.',
      },
    ],
  },

  gallery: {
    kicker: 'Galerija',
    title: 'Proizvodnja koju vredi videti.',
  },

  contact: {
    kicker: 'Kontakt',
    title: 'Razgovarajmo o vašoj sledećoj isporuci.',
    lede: 'Pošaljite upit sa okvirnim količinama i terminima — odgovaramo u roku od jednog radnog dana.',
    form: {
      name: 'Ime i prezime',
      company: 'Kompanija',
      email: 'E-mail',
      phone: 'Telefon',
      message: 'Poruka',
      messagePlaceholder: 'Sorta, količina, dinamika isporuke…',
      submit: 'Pošaljite upit',
      note: 'Slanjem upita otvarate poruku u vašem e-mail programu.',
    },
    salesHeading: 'Prodaja i upiti',
    hqHeading: 'Sedište',
    productionHeading: 'Proizvodno-distributivni centar',
    productionValue: 'Pećinci, Srem',
  },

  footer: {
    tagline: 'Porodična proizvodnja paprike od 1975. Iz Srema, za evropsku trpezu.',
    navHeading: 'Navigacija',
    contactHeading: 'Kontakt',
    rights: 'Sva prava zadržana.',
  },

  a11y: {
    skipToContent: 'Pređite na sadržaj',
    openMenu: 'Otvorite meni',
    closeMenu: 'Zatvorite meni',
    langSwitch: 'Switch to English',
    langSwitchShort: 'EN',
    heroVideoLabel: 'Snimak plastenika iz vazduha',
    lightboxClose: 'Zatvorite prikaz',
    lightboxPrev: 'Prethodna fotografija',
    lightboxNext: 'Sledeća fotografija',
    galleryOpen: 'Uvećajte fotografiju',
  },
};
