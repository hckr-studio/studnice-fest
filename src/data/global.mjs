import { processTypo } from "../esm/lib/texy.js";
import * as transducers from "@thi.ng/transducers";

export default {
  meta: {
    title: "Studnice fest",
    url: "https://www.studnicefest.cz/"
  },
  title: "STUDNICE FEST 2024",
  event: {
    name: "Studnice Fest",
    startDate: new Date("2024-07-26T15:00:00+02:00"),
    endDate: new Date("2024-07-28T03:00:00+02:00"),
    location: "Cihelka, Hlinsko v Čechách",
    description: "Letní hudební festival Studnice Fest je opět tu! V Hlinsku v Čechách se potkáme 26. - 27. 7. 2024",
    artists: [
      "vypsana-fixa",
      "noha",
      "lenny",
      "mydy",
      "prago-union",
      "ventolin",
      "xavier-baumaxa",
      "imodium",
      "dukla-vozovna",
      "volant",
      "circus-problem",
      "zavis",
      "anatol-svahilec",
      "drum-for-fun",
      "zadnej-stres",
      "the-stryc",
      "gorale-originale-pardubicensis",
    ],
    stages: {
      "main": "Hlavní stage",
      "outlook": "Na Vyhlídce",
      "tent": "Dětský stan",
    }
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
    friday.map(x => [x.slug, { day: "pátek", time: x.time }]).concat(
      saturday.map(x => [x.slug, { day: "sobotu", time: x.time }]))
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
