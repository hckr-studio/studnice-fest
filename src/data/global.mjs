import { processTypo } from "../esm/lib/texy.js";

export default {
  title: "STUDNICE FEST 2024",
  currentYear: new Date().getFullYear(),
  formatDate(s) {
    const formatter = new Intl.DateTimeFormat("cs", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    })
    return formatter.format(new Date(s));
  },
  processTypo,
  event: {
    name: "Studnice Fest",
    startDate: new Date("2024-07-26T17:00:00+02:00"),
    endDate: new Date("2024-07-28T03:00:00+02:00"),
    location: "Cihelka, Hlinsko v Čechách",
    description: "Letní hudební festival Studnice Fest je opět tu! V Hlinsku v Čechách se potkáme 26. - 27. 7. 2024"
  },
}
