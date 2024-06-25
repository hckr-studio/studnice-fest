const urls = [
  "https://www.studnicefest.cz/data/bands/band-vf.jpg",
  "https://www.studnicefest.cz/data/bands/band-noha.jpg",
  "https://www.studnicefest.cz/data/bands/band-lenny.jpg",
  "https://www.studnicefest.cz/data/bands/band-mydy.jpg",
  "https://www.studnicefest.cz/data/bands/band-pu.jpg",
  "https://www.studnicefest.cz/data/bands/band-ventolin.jpg",
  "https://www.studnicefest.cz/data/bands/band-xb.jpg",
  "https://www.studnicefest.cz/data/bands/band-imodium.jpg",
  "https://www.studnicefest.cz/data/bands/band-duklavozovna.jpg",
  "https://www.studnicefest.cz/data/bands/band-volant.jpg",
  "https://www.studnicefest.cz/data/bands/band-cb.jpg",
  "https://www.studnicefest.cz/data/bands/band-svahilec.jpg",
  "https://www.studnicefest.cz/data/bands/band-stryc.jpg",
  "https://www.studnicefest.cz/data/bands/band-gop.jpg"
];

for (const url of urls) {
  const resp = await fetch(url);
  const fileName = url.split("-").pop();
  await Deno.writeFile(`../src/cloudinary/artists/${fileName}`, resp.body);
}
