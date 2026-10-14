import "lite-youtube-embed";

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
