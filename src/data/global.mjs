import { processTypo } from "../esm/lib/texy.js";
import * as transducers from "@thi.ng/transducers";

export default {
  title: "STUDNICE FEST 2025",
  meta: {
    title: "Studnice fest",
    url: "https://www.studnicefest.cz/"
  },
  tickets: {
    url: "https://tickets.nfctron.com/event/eupathia/studnice-fest-2025",
    currentWave: 1,
    waves: { 1: [{ days: 2, price: 590 }] },
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
      "pokac",
      "skyline",
      "the-prostitutes",
      "fast-food-orchestra",
      "jamaron",
      "mucha"
    ],
    stages: {
      main: "Hlavní stage",
      outlook: "Na Vyhlídce",
      tent: "Dětský stan",
    }
  },
  lineup: {
    visible: false,
    friday: {
      title: "Pátek 25. 7.",
      schedule: [
        { date: "2025-07-25", time: "16:00", stage: "main", slug: "zadnej-stres" },
        { date: "2025-07-25", time: "18:00", stage: "main", slug: "volant" },
        { date: "2025-07-25", time: "19:10", stage: "outlook", slug: "anatol-svahilec" },
        { date: "2025-07-25", time: "20:25", stage: "main", slug: "vypsana-fixa" },
        { date: "2025-07-25", time: "21:50", stage: "outlook", slug: "xavier-baumaxa" },
        { date: "2025-07-25", time: "23:00", stage: "main", slug: "mydy" },
        { date: "2025-07-26", time: "00:00", stage: "outlook", slug: "zavis" },
        { date: "2025-07-26", time: "01:00", stage: "main", slug: "ventolin" }
      ]
    },
    saturday: {
      title: "Sobota 26. 7.",
      schedule: [
        { date: "2025-07-26", time: "11:30", stage: "main", slug: "gorale-originale-pardubicensis" },
        { date: "2025-07-26", time: "13:00", stage: "main", slug: "drum-for-fun" },
        { date: "2025-07-26", time: "14:00", stage: "tent", title: "Pohádka s dlouhým krkem" },
        { date: "2025-07-26", time: "14:30", stage: "main", slug: "circus-problem" },
        { date: "2025-07-26", time: "15:40", stage: "tent", title: "Hitovky z pohádek Příběhů měsíční duhy" },
        { date: "2025-07-26", time: "16:20", stage: "main", slug: "lenny" },
        { date: "2025-07-26", time: "17:30", stage: "outlook", slug: "the-stryc" },
        { date: "2025-07-26", time: "19:00", stage: "main", slug: "dukla-vozovna" },
        { date: "2025-07-26", time: "20:10", stage: "outlook", slug: "dva" },
        { date: "2025-07-26", time: "21:20", stage: "main", slug: "noha" },
        { date: "2025-07-26", time: "23:20", stage: "main", slug: "imodium" },
        { date: "2025-07-27", time: "01:00", stage: "main", slug: "prago-union" }
      ]
    },
  },
  currentYear: new Date().getFullYear(),
  processTypo,
  removeHashtags,
  timeslots,
  formatDate,
  formatTime,
  transducers
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

function formatDate(s) {
  const formatter = new Intl.DateTimeFormat("cs", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  })
  return formatter.format(new Date(s));
}

function removeHashtags(s) {
  return s.replaceAll(/#\S+/g, "");
}
