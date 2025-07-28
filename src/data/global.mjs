export default {
  title: "STUDNICE FEST 2025",
  analytics: {
    gtmID: "G-1V8Y40118V",
  },
  meta: {
    title: "Studnice fest",
    url: "https://www.studnicefest.cz/"
  },
  hero: {
    heading: "",
    text: "19. ročník festivalu",
    cta: "Koupit si vstupenky",
    footer: "#VidimeSeVLese",
    "bg-big": "hero-bg-big.jpg",
    "bg-medium": "hero-bg-big.jpg",
    "bg-small": "hero-bg-small.jpg"
  },
  info: {
    visible: true,
  },
  newsList: {
    exclude: ["https://www.facebook.com/100063521171808/posts/1029078449219518"]
  },
  tickets: {
    url: "https://tickets.nfctron.com/event/eupathia/studnice-fest-2026",
    currentWave: 1, //"onsite",
    waves: [
      ["onsite", [{ days: 1, price: 990 }, { days: 2, price: 1190 }]],
      [6, [
        { days: 2, price: 1090, id: "ticket-group-content-651201b9-d36e-4e67-96b7-1674d1662f7a" },
        { days: 1, price: 890, id: "ticket-group-609e91ee-d505-41f4-99ea-edb2d82fcc1c" }]
      ],
      [5, [{ days: 2, price: 1090 }]],
      [4, [{ days: 2, price: 990 }]],
      [3, [{ days: 2, price: 890 }]],
      [2, [{ days: 2, price: 790 }]],
      [1, [{ days: 2, price: 690 }]],
    ],
    parking: { days: 2, price: 150, id: "ticket-group-7e605dcc-ee61-4f10-a41c-3261d1de7025" },
  },
  event: {
    name: "Studnice Fest",
    startDate: new Date("2025-07-25T15:00:00+02:00"),
    endDate: new Date("2025-07-27T03:00:00+02:00"),
    location: "Cihelka, Hlinsko v Čechách",
    description: "Letní hudební festival Studnice Fest je opět tu! V Hlinsku v Čechách se potkáme 25. - 26. 7. 2025",
    artists: [
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
    stages: {
      main: "Hlavní stage",
      outlook: "Na Vyhlídce",
      tent: "Dětský stan",
    }
  },
  lineup: {
    visible: true,
    heading: "Na 19. ročníku vystoupí",
    friday: {
      title: "Pátek 25. 7.",
      schedule: [
        { date: "2025-07-25", time: "16:00", stage: "main", slug: "neni-zac" },
        { date: "2025-07-25", time: "17:00", stage: "outlook", title: "Slavíček" },
        { date: "2025-07-25", time: "18:00", stage: "main", slug: "dukla-vozovna" },
        { date: "2025-07-25", time: "19:00", stage: "outlook", title: "Vojtaano stand-up" },
        { date: "2025-07-25", time: "19:50", stage: "main", slug: "mucha" },
        { date: "2025-07-25", time: "21:00", stage: "outlook", slug: "brixtn" },
        { date: "2025-07-25", time: "22:30", stage: "main", slug: "tata-bojs" },
        { date: "2025-07-25", time: "23:50", stage: "outlook", slug: "vojtaano" },
        { date: "2025-07-26", time: "01:00", stage: "main", slug: "jamaron" }
      ]
    },
    saturday: {
      title: "Sobota 26. 7.",
      schedule: [
        { date: "2025-07-26", time: "11:30", stage: "main", slug: "rodan" },
        { date: "2025-07-26", time: "12:20", stage: "tent", slug: "anicka" },
        { date: "2025-07-26", time: "13:10", stage: "main", slug: "fast-food-orchestra" },
        { date: "2025-07-26", time: "14:10", stage: "tent", slug: "tybrdo-divadlo" },
        { date: "2025-07-26", time: "15:00", stage: "main", slug: "volant" },
        { date: "2025-07-26", time: "16:10", stage: "outlook", slug: "pokac" },
        { date: "2025-07-26", time: "17:30", stage: "main", slug: "i-love-you-honey-bunny" },
        { date: "2025-07-26", time: "18:40", stage: "outlook", slug: "rozalie" },
        { date: "2025-07-26", time: "20:00", stage: "main", slug: "the-prostitutes" },
        { date: "2025-07-26", time: "21:10", stage: "outlook", slug: "dukla" },
        { date: "2025-07-26", time: "22:40", stage: "main", slug: "the-subways" },
        { date: "2025-07-26", time: "23:50", stage: "tent", slug: "zavis" },
        { date: "2025-07-27", time: "01:00", stage: "main", slug: "skyline" }
      ]
    },
  },
  currentYear: new Date().getFullYear(),
  timeslots,
  formatTime,
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
