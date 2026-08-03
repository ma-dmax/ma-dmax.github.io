/*
  PROJECT CONTENT
  ----------------
  This is the main place to update project text, links, and images.
  Each project can have one or more images in its `media` list.
*/
const projects = [
  {
    title: "Cursor Trail Demo",
    description:
      "A customizable cursor-trail interaction with real-time controls for trail count, size, color, opacity, and scale.",
    tech: "JavaScript · HTML · CSS · DOM",
    demo: "https://ma-dmax.github.io/cursor-trail-v1/",
    code: "https://github.com/ma-dmax/cursor-trail-v1",
    media: [
      {
        src: "assets/project-media/cursor-trail/cursor-trail-effect-and-controls.png",
        alt: "Cursor Trail Demo with the orange trail effect and control panel",
        label: "Interactive effect and controls",
      },
    ],
  },
  {
    title: "Mood Journal Web App",
    description:
      "A multi-profile journal with editable entries, local storage, search, mood filtering, sorting, and asynchronous quote loading.",
    tech: "JavaScript · HTML · CSS · jQuery · Fetch API",
    demo: "https://ma-dmax.github.io/mood-journal/",
    code: "https://github.com/ma-dmax/mood-journal",
    media: [
      {
        src: "assets/project-media/mood-journal/mood-journal-entry-generation-workflow.png",
        alt: "Mood Journal with a selected mood, generated quote, and journal entry",
        label: "Generating a new journal entry",
      },
      {
        src: "assets/project-media/mood-journal/mood-journal-empty-state-overview.png",
        alt: "Mood Journal overview before an entry is created",
        label: "Entry form and empty history",
      },
      {
        src: "assets/project-media/mood-journal/mood-journal-search-history-and-actions.png",
        alt: "Mood Journal saved entry with search and edit controls",
        label: "Search, history, and entry actions",
      },
    ],
  },
  {
    title: "Arduino LED Controller",
    description:
      "A C# desktop application that controls Arduino-connected LED lighting through a serial COM port, with color, brightness, timing, and preset modes.",
    tech: "C# · WPF · Serial Communication · Arduino",
    code: "https://github.com/ma-dmax/Arduino",
    media: [
      {
        src: "assets/project-media/arduino-led-controller/arduino-led-controller-main-control-panel.png",
        alt: "Arduino LED Controller WPF main control panel",
        label: "Desktop lighting controls",
      },
      {
        src: "assets/project-media/arduino-led-controller/arduino-led-controller-led-segment-settings.png",
        alt: "Arduino LED Controller segment settings window",
        label: "Per-segment LED settings",
      },
      {
        src: "assets/project-media/arduino-led-controller/arduino-led-controller-full-strip-rainbow.jpg",
        alt: "Arduino-controlled LED strips running a full rainbow effect",
        label: "Full-strip rainbow effect on hardware",
      },
      {
        src: "assets/project-media/arduino-led-controller/arduino-led-controller-full-strip-solid-red.jpg",
        alt: "Arduino-controlled LED strips set to a solid red color",
        label: "Solid-color lighting mode on hardware",
      },
    ],
  },
];

/* Small helpers: $ gets one element, $$ gets an array of elements. */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

/*
  PAGE ELEMENTS
  -------------
  Keeping every selector here means the rest of the file does not need
  repeated document.querySelector calls.
*/
const ui = {
  title: $("#project-title"),
  description: $("#project-description"),
  tech: $("#project-tech"),
  number: $("#project-number"),
  links: $("#project-links"),
  image: $("#project-image"),
  caption: $("#project-image-caption"),
  mediaButtons: $("#project-media-controls"),
  openImage: $("#project-image-open"),
  thumbnails: $$(".project-thumbnail"),
  dots: $$(".carousel-position span"),
  previous: $("#project-prev"),
  next: $("#project-next"),
  lightbox: $("#media-lightbox"),
  lightboxImage: $("#media-lightbox-image"),
  lightboxCaption: $("#media-lightbox-caption"),
  lightboxClose: $("#media-lightbox-close"),
  lightboxBackdrop: $("#media-lightbox-backdrop"),
  lightboxPrevious: $("#media-lightbox-prev"),
  lightboxNext: $("#media-lightbox-next"),
};

/* The selected project and selected image within that project. */
let projectIndex = 0;
let mediaIndex = 0;

/* Create one project link without repeating the same HTML in every project. */
function createProjectLink(label, url, isPrimary = false) {
  const element = document.createElement("a");

  element.className = isPrimary
    ? "project-link project-link--primary"
    : "project-link";
  element.href = url;
  element.target = "_blank";
  element.rel = "noreferrer";
  element.textContent = `${label} ↗`;

  return element;
}

/* Update the large preview image and its small image-selector buttons. */
function renderMedia() {
  const project = projects[projectIndex];
  const media = project.media[mediaIndex];

  ui.image.src = media.src;
  ui.image.alt = media.alt;
  ui.caption.textContent = media.label;

  const mediaButtons = project.media.map((item, index) => {
    const button = document.createElement("button");
    const image = document.createElement("img");
    const isActive = index === mediaIndex;

    button.className = `project-media__thumbnail${isActive ? " is-active" : ""}`;
    button.type = "button";
    button.setAttribute("aria-label", `Show ${item.label}`);
    button.setAttribute("aria-pressed", String(isActive));

    image.src = item.src;
    image.alt = "";
    button.append(image);

    button.addEventListener("click", () => {
      mediaIndex = index;
      renderMedia();
    });

    return button;
  });

  ui.mediaButtons.replaceChildren(...mediaButtons);
  ui.mediaButtons.hidden = project.media.length === 1;
}

/* Update all carousel text, links, selected thumbnail, dots, and first image. */
function renderProject(nextIndex, moveFocus = false) {
  projectIndex = (nextIndex + projects.length) % projects.length;
  mediaIndex = 0;

  const project = projects[projectIndex];
  const number = String(projectIndex + 1).padStart(2, "0");
  const total = String(projects.length).padStart(2, "0");

  ui.title.textContent = project.title;
  ui.description.textContent = project.description;
  ui.tech.textContent = project.tech;
  ui.number.textContent = `${number} / ${total}`;

  const links = [
    project.demo && createProjectLink("Open demo", project.demo, true),
    project.code && createProjectLink("View code", project.code, !project.demo),
  ].filter(Boolean);

  ui.links.replaceChildren(...links);

  ui.thumbnails.forEach((thumbnail, index) => {
    const isActive = index === projectIndex;

    thumbnail.classList.toggle("is-active", isActive);
    thumbnail.setAttribute("aria-selected", String(isActive));
    thumbnail.tabIndex = isActive ? 0 : -1;
  });

  ui.dots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === projectIndex);
  });

  renderMedia();

  if (moveFocus) {
    ui.thumbnails[projectIndex].focus();
  }
}

/* Put the currently selected project image inside the full-screen viewer. */
function renderLightbox() {
  const project = projects[projectIndex];
  const media = project.media[mediaIndex];
  const hasMultipleImages = project.media.length > 1;

  ui.lightboxImage.src = media.src;
  ui.lightboxImage.alt = media.alt;
  ui.lightboxCaption.textContent = media.label;
  ui.lightboxPrevious.hidden = !hasMultipleImages;
  ui.lightboxNext.hidden = !hasMultipleImages;
}

function openLightbox() {
  renderLightbox();
  ui.lightbox.hidden = false;
  document.body.classList.add("has-lightbox");
  ui.lightboxClose.focus();
}

function closeLightbox() {
  ui.lightbox.hidden = true;
  document.body.classList.remove("has-lightbox");
  ui.openImage.focus();
}

/* Move left/right through a project's images. It wraps at each end. */
function moveMedia(direction) {
  const media = projects[projectIndex].media;

  mediaIndex = (mediaIndex + direction + media.length) % media.length;
  renderMedia();

  if (!ui.lightbox.hidden) {
    renderLightbox();
  }
}

/* CAROUSEL EVENTS */
ui.thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => renderProject(index));

  thumbnail.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;

    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    renderProject(projectIndex + direction, true);
  });
});

ui.previous.addEventListener("click", () => renderProject(projectIndex - 1));
ui.next.addEventListener("click", () => renderProject(projectIndex + 1));

/* IMAGE VIEWER EVENTS */
ui.openImage.addEventListener("click", openLightbox);
ui.lightboxClose.addEventListener("click", closeLightbox);
ui.lightboxBackdrop.addEventListener("click", closeLightbox);
ui.lightboxPrevious.addEventListener("click", () => moveMedia(-1));
ui.lightboxNext.addEventListener("click", () => moveMedia(1));

document.addEventListener("keydown", (event) => {
  if (ui.lightbox.hidden) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") moveMedia(-1);
  if (event.key === "ArrowRight") moveMedia(1);
});

/* SIDE NAVIGATION: highlight the section nearest the middle of the screen. */
const navLinks = $$(".section-nav__link");
const sections = navLinks.map((link) => $("#" + link.dataset.section));

function updateActiveSection() {
  const marker = window.scrollY + window.innerHeight * 0.4;
  const activeSection = sections.reduce((current, section) => {
    return section.offsetTop <= marker ? section : current;
  }, sections[0]);

  navLinks.forEach((link) => {
    const isActive = link.dataset.section === activeSection.id;

    link.classList.toggle("is-active", isActive);
    link.toggleAttribute("aria-current", isActive);
  });
}

window.addEventListener("scroll", updateActiveSection, { passive: true });
window.addEventListener("resize", updateActiveSection);

/* First render when the page opens. */
renderProject(0);
updateActiveSection();
