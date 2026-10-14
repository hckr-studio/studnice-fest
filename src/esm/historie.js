import "lite-youtube-embed";

// Navigace ročníků: výška hlavičky pro připnutý pás (mobil)
// a zvýraznění ročníku, který je právě na obrazovce.
const header = document.querySelector("body > header");
if (header) {
  const setHeaderHeight = () =>
    document.documentElement.style.setProperty(
      "--header-height",
      `${header.offsetHeight}px`
    );
  new ResizeObserver(setHeaderHeight).observe(header);
  setHeaderHeight();
}

const nav = document.querySelector('.main aside nav ol');
if (nav) {
  const links = new Map(
    [...nav.querySelectorAll('a[href^="#"]')].map((a) => [
      decodeURIComponent(a.hash.slice(1)),
      a
    ])
  );
  const headings = [...links.keys()]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  let active;

  const setActive = (id) => {
    const link = links.get(id);
    if (!link || link === active) return;
    active?.removeAttribute("aria-current");
    link.setAttribute("aria-current", "true");
    active = link;
    // posunout pás roků tak, aby aktivní rok byl vidět (jen vodorovně)
    if (nav.scrollWidth > nav.clientWidth) {
      const li = link.parentElement;
      nav.scrollTo({
        left: li.offsetLeft - (nav.clientWidth - li.offsetWidth) / 2,
        behavior: "smooth"
      });
    }
  };

  // aktivní je poslední ročník, jehož nadpis už přejel horní třetinu obrazovky
  const update = () => {
    const line = innerHeight / 3;
    let current = headings[0];
    for (const h of headings) {
      if (h.getBoundingClientRect().top <= line) current = h;
      else break;
    }
    if (current) setActive(current.id);
  };

  let ticking = false;
  addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        update();
      });
    },
    { passive: true }
  );
  update();
}

// Sbalené mřížky „Všichni vystupující“ – ukazují prvních pár řádků,
// zbytek se plynule rozbalí tlačítkem.
const VISIBLE_ROWS = 2;

function collapsedHeight(list) {
  const first = list.firstElementChild;
  if (!first) return 0;
  const gap = Number.parseFloat(getComputedStyle(list).rowGap) || 0;
  return first.offsetHeight * VISIBLE_ROWS + gap * (VISIBLE_ROWS - 1);
}

for (const section of document.querySelectorAll(".history-lineup")) {
  const clip = section.querySelector(".history-lineup__clip");
  const list = section.querySelector(".history-bands");
  const button = section.querySelector(".history-lineup__toggle");
  if (!clip || !list || !button) continue;

  const fitsCollapsed = () => list.scrollHeight <= collapsedHeight(list) + 1;

  const collapse = () => {
    clip.style.maxHeight = `${collapsedHeight(list)}px`;
  };

  const update = () => {
    if (section.classList.contains("is-open")) return;
    if (fitsCollapsed()) {
      // Vše se vejde – není co rozbalovat.
      section.classList.remove("is-collapsible");
      clip.style.maxHeight = "";
      button.hidden = true;
      return;
    }
    section.classList.add("is-collapsible");
    button.hidden = false;
    collapse();
  };

  button.addEventListener("click", () => {
    const open = !section.classList.contains("is-open");
    section.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
    button.textContent = open ? button.dataset.less : button.dataset.more;
    if (open) {
      clip.style.maxHeight = `${clip.scrollHeight}px`;
    } else {
      // z „none“ na pevnou výšku, aby animace sbalení měla odkud začít
      clip.style.maxHeight = `${clip.scrollHeight}px`;
      clip.offsetHeight;
      collapse();
      section.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  });

  // Po rozbalení uvolnit výšku, aby se nic neořezávalo (ani při změně šířky).
  clip.addEventListener("transitionend", (e) => {
    if (
      e.propertyName === "max-height" &&
      section.classList.contains("is-open")
    ) {
      clip.style.maxHeight = "none";
    }
  });

  new ResizeObserver(update).observe(list);
  update();
}
