export default {
  title: "STUDNICE FEST 2026",
  analytics: {
    gtmID: "G-1V8Y40118V",
  },
  meta: {
    title: "Studnice fest",
    url: "https://www.studnicefest.cz/"
  },
  hero: {
    heading: "",
    text: "20. ročník festivalu",
    cta: "Koupit si vstupenky",
    footer: "#VidimeSeVLese",
    "bg-big": "hero-bg-big.avif",
    "bg-medium": "hero-bg-big.avif",
    "bg-small": "hero-bg-small.avif"
  },
  info: {
    visible: false,
  },
  newsList: {
    exclude: ["https://www.facebook.com/100063521171808/posts/1029078449219518"]
  },
  tickets: {
    url: "https://tickets.nfctron.com/event/eupathia/studnice-fest-2026",
    currentWave: 5, //"onsite",
    waves: [
      ["onsite", [{ days: 1, price: 990 }, { days: 3, price: 1290 }]],
      [6, [{ days: 3, price: 1240 }, { days: 1, price: 890, id: "ticket-name-ac63f98f-5b8f-425f-bd2d-a9776ce3733b" }]],
      [5, [
        { days: 3, price: 1090, id: "ticket-name-005552b5-2c97-4ab6-96c7-6fa93d760321" },
        { days: 1, price: 890, id: "ticket-name-ac63f98f-5b8f-425f-bd2d-a9776ce3733b" }
      ]],
      [4, [{ days: 3, price: 990 }]],
      [3, [{ days: 3, price: 890 }]],
      [2, [{ days: 3, price: 790 }]],
      [1, [{ days: 3, price: 690 }]],
    ],
    parking: [
      { days: 3, name: "osobní automobil", price: 200, id: "ticket-name-1c343dd9-44dd-4728-967d-7aa3c46fdc6c" },
      { days: 3, name: "obytňák s elektrikou", price: 800, id: "ticket-name-25a3b6c1-bd9a-4455-9ea6-50b8b8a5e77f" }
    ],
  },
  event: {
    name: "Studnice Fest",
    startDate: new Date("2026-07-23T15:00:00+02:00"),
    endDate: new Date("2026-07-26T03:00:00+02:00"),
    location: "Cihelka, Hlinsko v Čechách",
    description: "Letní hudební festival Studnice Fest je opět tu! V Hlinsku v Čechách se potkáme 23. - 25. 7. 2026",
    artists: [
      "dub-fx",
      "mnaga-a-zdorp",
      "david-koller",
      "barbora-polakova",
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
      "jezek-v-deci",
      "jana-sindelarova"
    ],
    stages: {
      main: "Hlavní stage",
      outlook: "Na Vyhlídce",
      tent: "Dětský stan",
    }
  },
  lineup: {
  visible: true,
  heading: "Na 20. ročníku vystoupí",
  thursday: {
    title: "Čtvrtek 23. 7.",
    schedule: [
      { date: "2026-07-23", time: "19:00", stage: "main", slug: "dukla-vozovna" },
      { date: "2026-07-23", time: "21:00", stage: "main", slug: "zrni" },
      { date: "2026-07-23", time: "23:00", stage: "main", slug: "prekvapeni" }
    ]
  },
  friday: {
    title: "Pátek 24. 7.",
    schedule: [
      { date: "2026-07-24", time: "14:30", stage: "main", slug: "byt-cislo-4" },
      { date: "2026-07-24", time: "16:30", stage: "main", slug: "volant" },
      { date: "2026-07-24", time: "17:30", stage: "outlook", slug: "jana-sindelarova" },
      { date: "2026-07-24", time: "18:30", stage: "main", slug: "letni-kapela" },
      { date: "2026-07-24", time: "19:35", stage: "outlook", slug: "jezek-v-deci" },
      { date: "2026-07-24", time: "20:30", stage: "main", slug: "midi-lidi" },
      { date: "2026-07-24", time: "21:30", stage: "outlook", slug: "xavier-baumaxa" },
      { date: "2026-07-24", time: "22:45", stage: "main", slug: "dub-fx" },
      { date: "2026-07-25", time: "00:00", stage: "tent", slug: "zavis" },
      { date: "2026-07-25", time: "01:00", stage: "main", slug: "elektrick-mann" }
    ]
  },
  saturday: {
    title: "Sobota 25. 7.",
    schedule: [
      { date: "2026-07-25", time: "11:40", stage: "outlook", slug: "anicka" },
      { date: "2026-07-25", time: "12:50", stage: "main", slug: "mr-moss" },
      { date: "2026-07-25", time: "13:50", stage: "tent", slug: "tybrdo-divadlo" },
      { date: "2026-07-25", time: "14:50", stage: "main", slug: "barbora-polakova" },
      { date: "2026-07-25", time: "17:00", stage: "main", slug: "david-koller" },
      { date: "2026-07-25", time: "18:20", stage: "outlook", slug: "lazer-viking" },
      { date: "2026-07-25", time: "19:40", stage: "main", slug: "mnaga-a-zdorp" },
      { date: "2026-07-25", time: "21:00", stage: "outlook", slug: "nikola-mucha" },
      { date: "2026-07-25", time: "22:20", stage: "main", slug: "the-stylists" },
      { date: "2026-07-25", time: "23:40", stage: "outlook", slug: "prago-union" },
      { date: "2026-07-26", time: "01:00", stage: "main", slug: "skyline" }
    ]
  },
},
  currentYear: new Date().getFullYear(),
  timeslots,
  formatTime,
  formatNumber(n) {
    return Intl.NumberFormat("cs").format(n);
  },
  filterNews(news) {
    const excluded = new Set(this.ctx.newsList.exclude);
    return news.filter(({ url }) => !excluded.has(url));
  }
}

function timeslots({ friday, saturday }) {
  return new Map(
    friday.schedule.map(x => [x.slug, { day: "pátek", time: x.time }]).concat(
      saturday.schedule.map(x => [x.slug, { day: "sobotu", time: x.time }]))
  );
}

function hasLongPreposition(time) {
  return time.startsWith("2") || time.startsWith("12") || time.startsWith("13") || time.startsWith("14");
}

function formatTime({ day, time }) {
  const preposition = hasLongPreposition(time) ? "ve" : "v";
  return `${day} ${preposition} ${time}`;
}
