const data = {
  title: "STUDNICE FEST 2027",
  analytics: {
    gtmID: "G-1V8Y40118V"
  },
  meta: {
    title: "Studnice fest",
    url: "https://www.studnicefest.cz/"
  },
  hero: {
    heading: "",
    text: "21. ročník festivalu",
    cta: "Koupit si vstupenky",
    footer: "#VidimeSeVLese",
    "bg-big": "hero-bg-big.avif",
    "bg-medium": "hero-bg-big.avif",
    "bg-small": "hero-bg-small.avif"
  },
  info: {
    visible: false
  },
  // Sekce s aftermovie hned pod hero. visible: false ji skryje.
  vibe: {
    visible: true,
    heading: "Malý festival s velkou energií",
    // Volitelný text pod nadpisem – prázdný = nezobrazí se.
    text: "",
    video: {
      id: "sK-eE2CCUv4",
      title: "Aftermovie Studnice Fest 2026",
      caption: "Aftermovie z 20. ročníku"
    }
  },
  newsList: {
    exclude: ["https://www.facebook.com/100063521171808/posts/1029078449219518"]
  },
  tickets: {
    url: "https://tickets.nfctron.com/event/eupathia/studnice-fest-2027",
    currentWave: 2, //"onsite",
    waves: [
      [
        "onsite",
        [
          { days: 1, price: 990 },
          { days: 3, price: 1290 }
        ]
      ],
      [
        6,
        [
          {
            days: 3,
            price: 1240,
            id: "celofestivalová---6.-vlna",
            soldOut: true
          },
          { days: 1, price: 890, id: "jednodenní---pátek", soldOut: true }
        ]
      ],
      [5, [{ days: 3, price: 1090, id: "tcelofestivalová---5.-vlna" }]],
      [4, [{ days: 3, price: 990 }]],
      [3, [{ days: 3, price: 890 }]],
      [2, [{ days: 2, price: 950 }]],
      [1, [{ days: 2, price: 850 }]]
    ]
  },
  event: {
    name: "Studnice Fest",
    startDate: new Date("2027-07-30T15:00:00+02:00"),
    // Konec = noc po posledním dni (např. sobota 31. 7. → neděle 1. 8. 3:00)
    endDate: new Date("2027-08-01T03:00:00+02:00"),
    location: "Cihelka, Hlinsko v Čechách",
    description:
      "Letní hudební festival Studnice Fest je opět tu! V Hlinsku v Čechách se potkáme 30. - 31. 7. 2027",
    artists: ["tata-bojs"],
    stages: {
      main: "Hlavní stage",
      outlook: "Na Vyhlídce",
      tent: "Dětský stan"
    }
  },
  history: {
    // Všichni vystupující u ročníků na stránce Historie (sbalená mřížka dlaždic).
    // Slug z src/data/artists = dlaždice s fotkou; { slug, title } přepíše jméno.
    // Nový ročník: přidej sem pole a do historie/text.md {{ bands(history[ROK]) }}
    // (poslední dva ročníky dlaždice s fotkou), starší {{ bandList(history[ROK]) }}.
    2026: [
      "dub-fx",
      "mnaga-a-zdorp",
      "david-koller",
      "barbora-polakova",
      { slug: "vypsana-fixa", title: "Vypsaná fiXa (překvapení)" },
      "letni-kapela",
      "midi-lidi",
      "prago-union",
      "skyline",
      "elektrick-mann",
      "zrni",
      "the-stylists",
      "nikola-mucha",
      "xavier-baumaxa",
      "lazer-viking",
      "dukla-vozovna",
      "volant",
      "zavis",
      "byt-cislo-4",
      "mr-moss",
      "anicka",
      "jezek-v-deci",
      "jana-sindelarova"
    ],
    2025: [
      "the-subways",
      "tata-bojs",
      "skyline",
      "pokac",
      "the-prostitutes",
      "jamaron",
      "mucha",
      "fast-food-orchestra",
      "vojtaano",
      "dukla-vozovna",
      "i-love-you-honey-bunny",
      "volant",
      "dukla",
      "zavis",
      "brixtn",
      "rozalie",
      "rodan",
      "neni-zac",
      "anicka",
      "slavicek",
      "tybrdo-divadlo"
    ],
    // Starší ročníky: zjednodušený výpis (bez fotek). 2004–2012 jen jména,
    // která známe z textů historie – doplnit, až budou kompletní seznamy.
    2024: [
      "vypsana-fixa",
      "noha",
      "mydy",
      "lenny",
      "prago-union",
      "ventolin",
      "imodium",
      "xavier-baumaxa",
      "zavis",
      "volant",
      "dukla-vozovna",
      "zadnej-stres",
      "circus-problem",
      "anatol-svahilec",
      "gorale-originale-pardubicensis",
      "the-stryc",
      { title: "DVA" }
    ],
    2023: [
      "tata-bojs",
      { title: "Monkey Business" },
      "mnaga-a-zdorp",
      "skyline",
      "lazer-viking",
      { title: "Gaia Mesiah" },
      "letni-kapela",
      { title: "Vasilův rubáš" },
      "dukla-vozovna",
      { title: "Fredy & Krasty" },
      { title: "Wyfe" },
      { title: "The Atavists" },
      "i-love-you-honey-bunny",
      "zavis",
      { title: "Corpulent Provocateur" },
      { title: "B1nary" },
      { title: "themayrevolution" },
      { title: "The Valentines" },
      { title: "Sešlost" }
    ],
    2022: [
      "vypsana-fixa",
      { title: "Gaia Mesiah" },
      "noha",
      { title: "Sto zvířat" },
      { title: "Kapitán Demo" },
      "zrni",
      "ventolin",
      "fast-food-orchestra",
      { title: "Vltava" },
      { title: "The Atavists" },
      "vojtaano",
      "dukla-vozovna",
      "zavis",
      { title: "Aiko" },
      { title: "něco něco" },
      { title: "A Dull Set" },
      "drum-for-fun"
    ],
    2021: [
      "tata-bojs",
      { title: "Visací zámek" },
      "skyline",
      "midi-lidi",
      { title: "Hentai Corporation" },
      { title: "Lenka Dusilová" },
      "xavier-baumaxa",
      { title: "Aid Kid" },
      { title: "John Wolfhooker" },
      { title: "Circus Brothers" },
      "fast-food-orchestra",
      { title: "Deaf Heart" },
      "dukla-vozovna",
      "volant",
      "lazer-viking",
      "zavis",
      { title: "Corpulent Provocateur" },
      { title: "Herbert Einstein" }
    ],
    2020: [
      "pokac",
      "vypsana-fixa",
      { title: "Monkey Business" },
      { title: "Gaia Mesiah" },
      "skyline",
      { title: "The Atavists" },
      { title: "Kurtizány z 25. avenue" },
      "dukla-vozovna",
      { title: "The Silver Spoons" },
      "volant"
    ],
    2019: [
      { title: "Wohnout" },
      { title: "Pipes and Pints" },
      "skyline",
      { title: "Kapitán Demo" },
      { title: "Jiří Schmitzer" },
      "ventolin",
      "circus-problem",
      { title: "Big S" },
      { title: "Corpulent Provocateur" },
      "dukla-vozovna",
      { title: "Esence" },
      { title: "Ghost of You" },
      { title: "Herbert Einstein" },
      { title: "MoveBreakers" },
      { title: "Sabrage" },
      "volant"
    ],
    2018: [
      "tata-bojs",
      "mydy",
      { title: "Michal Hrůza" },
      "skyline",
      { title: "Poletíme?" },
      "fast-food-orchestra",
      "dukla-vozovna",
      { title: "Honza Křížek" },
      "volant",
      "zavis"
    ],
    2017: [
      { title: "Buty" },
      "skyline",
      { title: "Lenka Dusilová & Baromantika" },
      "fast-food-orchestra",
      "xavier-baumaxa",
      "imodium",
      "dukla-vozovna",
      { title: "Lety Mimo" },
      { title: "Smrtislav" },
      "volant",
      "zavis"
    ],
    "2008–2012": [
      { title: "Clou" },
      { title: "Southpaw" },
      { title: "Sunshine" },
      "skyline",
      "the-prostitutes",
      { title: "Green Frog Feet" }
    ],
    2007: [
      { title: "Gaia Mesiah" },
      { title: "Mañana" }
    ],
    2006: [
      { title: "Tleskači" }
    ],
    2005: [
      { title: "Tleskači" },
      "imodium"
    ],
    2004: [
      "vypsana-fixa",
      { title: "Gaia Mesiah" },
      "dukla-vozovna"
    ]
  },
  lineup: {
    visible: false,
    heading: "Na 21. ročníku vystoupí",
    // Doplněk za ohlášené kapely (hero + Kdo vystoupí). Prázdný řetězec = skryto.
    moreSoon: "a brzy další…",
    thursday: {
      title: "Čtvrtek 23. 7.",
      schedule: [
        {
          date: "2026-07-23",
          time: "19:00",
          stage: "main",
          slug: "dukla-vozovna"
        },
        { date: "2026-07-23", time: "21:00", stage: "main", slug: "zrni" },
        { date: "2026-07-23", time: "23:00", stage: "main", slug: "prekvapeni" }
      ]
    },
    friday: {
      title: "Pátek 24. 7.",
      schedule: [
        {
          date: "2026-07-24",
          time: "14:30",
          stage: "main",
          slug: "byt-cislo-4"
        },
        { date: "2026-07-24", time: "16:30", stage: "main", slug: "volant" },
        {
          date: "2026-07-24",
          time: "17:30",
          stage: "outlook",
          slug: "jana-sindelarova"
        },
        {
          date: "2026-07-24",
          time: "18:30",
          stage: "main",
          slug: "letni-kapela"
        },
        {
          date: "2026-07-24",
          time: "19:35",
          stage: "outlook",
          slug: "jezek-v-deci"
        },
        { date: "2026-07-24", time: "20:30", stage: "main", slug: "midi-lidi" },
        {
          date: "2026-07-24",
          time: "21:30",
          stage: "outlook",
          slug: "xavier-baumaxa"
        },
        { date: "2026-07-24", time: "22:45", stage: "main", slug: "dub-fx" },
        { date: "2026-07-25", time: "00:00", stage: "tent", slug: "zavis" },
        {
          date: "2026-07-25",
          time: "01:00",
          stage: "main",
          slug: "elektrick-mann"
        }
      ]
    },
    saturday: {
      title: "Sobota 25. 7.",
      schedule: [
        { date: "2026-07-25", time: "11:50", stage: "main", slug: "mr-moss" },
        {
          date: "2026-07-25",
          time: "14:00",
          stage: "main",
          slug: "barbora-polakova"
        },
        {
          date: "2026-07-25",
          time: "15:00",
          stage: "tent",
          slug: "tybrdo-divadlo"
        },
        { date: "2026-07-25", time: "15:50", stage: "outlook", slug: "anicka" },
        {
          date: "2026-07-25",
          time: "17:00",
          stage: "main",
          slug: "david-koller"
        },
        {
          date: "2026-07-25",
          time: "18:20",
          stage: "outlook",
          slug: "lazer-viking"
        },
        {
          date: "2026-07-25",
          time: "19:40",
          stage: "main",
          slug: "mnaga-a-zdorp"
        },
        {
          date: "2026-07-25",
          time: "21:00",
          stage: "outlook",
          slug: "nikola-mucha"
        },
        {
          date: "2026-07-25",
          time: "22:20",
          stage: "main",
          slug: "the-stylists"
        },
        {
          date: "2026-07-25",
          time: "23:40",
          stage: "outlook",
          slug: "prago-union"
        },
        { date: "2026-07-26", time: "01:00", stage: "main", slug: "skyline" }
      ]
    }
  },
  currentYear: new Date().getFullYear(),
  timeslots,
  formatTime,
  festivalDay,
  galleries,
  // Jeden ročník galerie + sousední ročníky (newer/older) pro navigaci.
  gallery(images, year) {
    const all = galleries(images);
    const i = all.findIndex((g) => g.year === Number(year));
    if (i < 0) return null;
    return {
      ...all[i],
      newer: all[i - 1]?.year ?? null,
      older: all[i + 1]?.year ?? null
    };
  },

  formatNumber(n) {
    return Intl.NumberFormat("cs").format(n);
  },
  filterNews(news) {
    const excluded = new Set(this.ctx.newsList.exclude);
    return news.filter(({ url }) => !excluded.has(url));
  }
};

// Kapely, které mají stránku s detailem (/kapely/<slug>/): poslední dva
// ročníky z `history` + chystaný ročník (event.artists).
data.artistPages = (() => {
  const years = Object.keys(data.history)
    .filter((y) => /^\d{4}$/.test(y))
    .map(Number)
    .sort((a, b) => b - a);
  const slugs = new Set(data.event.artists);
  for (const year of years.slice(0, 2)) {
    for (const item of data.history[year]) slugs.add(item.slug ?? item);
  }
  return [...slugs];
})();

export default data;

// Den a měsíc festivalu v pražském čase. Konec akce je v noci po posledním
// dni, proto se od něj odečte pár hodin, aby vyšel skutečný poslední den
// (funguje i přes přelom měsíce).
function festivalDay(date, isEnd = false) {
  const d = new Date(date.getTime() - (isEnd ? 6 * 3600 * 1000 : 0));
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("cs", {
      timeZone: "Europe/Prague",
      day: "numeric",
      month: "numeric",
      year: "numeric"
    })
      .formatToParts(d)
      .map((p) => [p.type, p.value])
  );
  return {
    day: Number(parts.day),
    month: Number(parts.month),
    year: Number(parts.year)
  };
}

// Fotogalerie podle ročníků: složky src/cloudinary/gallery/<rok>/.
// Vrací [{ year, photos: [image, …] }] od nejnovějšího ročníku,
// fotky seřazené podle názvu souboru (přirozeně: _2 před _10).
function galleries(images) {
  const byYear = new Map();
  for (const [key, image] of Object.entries(images ?? {})) {
    const match = key.match(/^gallery\/(\d{4})\//);
    if (!match) continue;
    const year = Number(match[1]);
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year).push({ key, ...image });
  }
  const collator = new Intl.Collator("cs", { numeric: true });
  const stem = (key) => key.replace(/\.[^.]+$/, "");
  return [...byYear.entries()]
    .sort(([a], [b]) => b - a)
    .map(([year, photos]) => ({
      year,
      photos: photos.sort((a, b) => collator.compare(stem(a.key), stem(b.key)))
    }));
}

function timeslots({ friday, saturday }) {
  return new Map(
    friday.schedule
      .map((x) => [x.slug, { day: "pátek", time: x.time }])
      .concat(
        saturday.schedule.map((x) => [x.slug, { day: "sobotu", time: x.time }])
      )
  );
}

function hasLongPreposition(time) {
  return (
    time.startsWith("2") ||
    time.startsWith("12") ||
    time.startsWith("13") ||
    time.startsWith("14")
  );
}

function formatTime({ day, time }) {
  const preposition = hasLongPreposition(time) ? "ve" : "v";
  return `${day} ${preposition} ${time}`;
}
