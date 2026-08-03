const projects = [
  {
    title: "Cursor Trail Demo",

    description:
      "A customizable cursor-trail interaction with real-time controls for trail count, size, color, opacity, and scale.",

    tech:
      "JavaScript · HTML · CSS · DOM",

    media: [
      {
        src:
          "assets/project-media/cursor-trail/cursor-trail-effect-and-controls.png",
        alt:
          "Cursor Trail Demo with the orange trail effect and control panel",
        label:
          "Interactive effect and controls",
      },
    ],

    demo:
      "https://ma-dmax.github.io/cursor-trail-v1/",

    code:
      "https://github.com/ma-dmax/cursor-trail-v1",
  },

  {
    title: "Mood Journal Web App",

    description:
      "A multi-profile journal with editable entries, local storage, search, mood filtering, sorting, and asynchronous quote loading.",

    tech:
      "JavaScript · HTML · CSS · jQuery · Fetch API",

    media: [
      {
        src:
          "assets/project-media/mood-journal/mood-journal-entry-generation-workflow.png",
        alt:
          "Mood Journal with a selected mood, generated quote, and journal entry",
        label:
          "Generating a new journal entry",
      },
      {
        src:
          "assets/project-media/mood-journal/mood-journal-empty-state-overview.png",
        alt:
          "Mood Journal overview before an entry is created",
        label:
          "Entry form and empty history",
      },
      {
        src:
          "assets/project-media/mood-journal/mood-journal-search-history-and-actions.png",
        alt:
          "Mood Journal saved entry with search and edit controls",
        label:
          "Search, history, and entry actions",
      },
    ],

    demo:
      "https://ma-dmax.github.io/mood-journal/",

    code:
      "https://github.com/ma-dmax/mood-journal",
  },

  {
    title: "Arduino LED Controller",

    description:
      "A C# desktop application that controls Arduino-connected LED lighting through a serial COM port, with color, brightness, timing, and preset modes.",

    tech:
      "C# · WPF · Serial Communication · Arduino",

    media: [
      {
        src:
          "assets/project-media/arduino-led-controller/arduino-led-controller-main-control-panel.png",
        alt:
          "Arduino LED Controller WPF main control panel",
        label:
          "Desktop lighting controls",
      },
      {
        src:
          "assets/project-media/arduino-led-controller/arduino-led-controller-led-segment-settings.png",
        alt:
          "Arduino LED Controller segment settings window",
        label:
          "Per-segment LED settings",
      },
      {
        src:
          "assets/project-media/arduino-led-controller/arduino-led-controller-full-strip-rainbow.jpg",
        alt:
          "Arduino-controlled LED strips running a full rainbow effect",
        label:
          "Full-strip rainbow effect on hardware",
      },
      {
        src:
          "assets/project-media/arduino-led-controller/arduino-led-controller-full-strip-solid-red.jpg",
        alt:
          "Arduino-controlled LED strips set to a solid red color",
        label:
          "Solid-color lighting mode on hardware",
      },
    ],

    demo: null,

    code:
      "https://github.com/ma-dmax/Arduino",
  },
];

const title =
  document.querySelector("#project-title");

const description =
  document.querySelector("#project-description");

const tech =
  document.querySelector("#project-tech");

const number =
  document.querySelector("#project-number");

const links =
  document.querySelector("#project-links");

const projectImage =
  document.querySelector("#project-image");

const projectImageCaption =
  document.querySelector("#project-image-caption");

const projectMediaControls =
  document.querySelector("#project-media-controls");

const projectImageOpen =
  document.querySelector("#project-image-open");

const mediaLightbox =
  document.querySelector("#media-lightbox");

const mediaLightboxImage =
  document.querySelector("#media-lightbox-image");

const mediaLightboxCaption =
  document.querySelector("#media-lightbox-caption");

const mediaLightboxClose =
  document.querySelector("#media-lightbox-close");

const mediaLightboxBackdrop =
  document.querySelector("#media-lightbox-backdrop");

const mediaLightboxPrevious =
  document.querySelector("#media-lightbox-prev");

const mediaLightboxNext =
  document.querySelector("#media-lightbox-next");

const thumbnails = [
  ...document.querySelectorAll(".project-thumbnail"),
];

const positionMarks = [
  ...document.querySelectorAll(".carousel-position span"),
];

const previousButton =
  document.querySelector("#project-prev");

const nextButton =
  document.querySelector("#project-next");

let activeProject = 0;
let activeMedia = 0;
let lightboxIsOpen = false;

function makeProjectLink(
  label,
  href,
  primary = false
) {
  const link =
    document.createElement("a");

  link.className = primary
    ? "project-link project-link--primary"
    : "project-link";

  link.href = href;
  link.target = "_blank";
  link.rel = "noreferrer";

  link.textContent = `${label} `;

  const arrow =
    document.createElement("span");

  arrow.setAttribute(
    "aria-hidden",
    "true"
  );

  arrow.textContent = "↗";

  link.append(arrow);

  return link;
}

function renderProject(
  index,
  moveFocus = false
) {
  activeProject =
    (index + projects.length)
    % projects.length;

  const project =
    projects[activeProject];

  title.textContent =
    project.title;

  description.textContent =
    project.description;

  tech.textContent =
    project.tech;

  number.textContent =
    `${String(activeProject + 1).padStart(2, "0")} / ${String(
      projects.length
    ).padStart(2, "0")}`;

  activeMedia = 0;

  renderProjectMedia();

  links.replaceChildren();

  if (project.demo) {
    links.append(
      makeProjectLink(
        "Open demo",
        project.demo,
        true
      )
    );
  }

  if (project.code) {
    links.append(
      makeProjectLink(
        "View code",
        project.code,
        !project.demo
      )
    );
  }

  thumbnails.forEach(
    (thumbnail, thumbnailIndex) => {
      const selected =
        thumbnailIndex === activeProject;

      thumbnail.classList.toggle(
        "is-active",
        selected
      );

      thumbnail.setAttribute(
        "aria-selected",
        String(selected)
      );

      thumbnail.tabIndex =
        selected ? 0 : -1;
    }
  );

  positionMarks.forEach(
    (mark, markIndex) => {
      mark.classList.toggle(
        "is-active",
        markIndex === activeProject
      );
    }
  );

  if (moveFocus) {
    thumbnails[activeProject].focus();
  }
}

function renderProjectMedia() {
  const project = projects[activeProject];
  const media = project.media[activeMedia];

  projectImage.src = media.src;
  projectImage.alt = media.alt;
  projectImageCaption.textContent = media.label;

  projectMediaControls.replaceChildren();

  if (project.media.length === 1) {
    projectMediaControls.hidden = true;
    return;
  }

  projectMediaControls.hidden = false;

  project.media.forEach((item, mediaIndex) => {
    const button = document.createElement("button");
    const image = document.createElement("img");

    button.type = "button";
    button.className = "project-media__thumbnail";
    button.classList.toggle(
      "is-active",
      mediaIndex === activeMedia
    );
    button.setAttribute(
      "aria-label",
      `Show ${item.label}`
    );
    button.setAttribute(
      "aria-pressed",
      String(mediaIndex === activeMedia)
    );

    image.src = item.src;
    image.alt = "";

    button.append(image);

    button.addEventListener("click", () => {
      activeMedia = mediaIndex;
      renderProjectMedia();
    });

  projectMediaControls.append(button);
  });
}

function renderLightboxMedia() {
  const project = projects[activeProject];
  const media = project.media[activeMedia];
  const hasMultipleImages = project.media.length > 1;

  mediaLightboxImage.src = media.src;
  mediaLightboxImage.alt = media.alt;
  mediaLightboxCaption.textContent = media.label;

  mediaLightboxPrevious.hidden = !hasMultipleImages;
  mediaLightboxNext.hidden = !hasMultipleImages;
}

function openLightbox() {
  lightboxIsOpen = true;
  mediaLightbox.hidden = false;
  document.body.classList.add("has-lightbox");

  renderLightboxMedia();
  mediaLightboxClose.focus();
}

function closeLightbox() {
  lightboxIsOpen = false;
  mediaLightbox.hidden = true;
  document.body.classList.remove("has-lightbox");

  projectImageOpen.focus();
}

function showAdjacentLightboxMedia(direction) {
  const project = projects[activeProject];

  activeMedia =
    (activeMedia + direction + project.media.length)
    % project.media.length;

  renderProjectMedia();
  renderLightboxMedia();
}

projectImageOpen.addEventListener("click", openLightbox);

mediaLightboxClose.addEventListener("click", closeLightbox);
mediaLightboxBackdrop.addEventListener("click", closeLightbox);

mediaLightboxPrevious.addEventListener("click", () => {
  showAdjacentLightboxMedia(-1);
});

mediaLightboxNext.addEventListener("click", () => {
  showAdjacentLightboxMedia(1);
});

document.addEventListener("keydown", (event) => {
  if (!lightboxIsOpen) {
    return;
  }

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowLeft") {
    showAdjacentLightboxMedia(-1);
  }

  if (event.key === "ArrowRight") {
    showAdjacentLightboxMedia(1);
  }
});

thumbnails.forEach(
  (thumbnail, index) => {
    thumbnail.addEventListener(
      "click",
      () => renderProject(index)
    );

    thumbnail.addEventListener(
      "keydown",
      (event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();

          renderProject(
            activeProject + 1,
            true
          );
        }

        if (event.key === "ArrowLeft") {
          event.preventDefault();

          renderProject(
            activeProject - 1,
            true
          );
        }
      }
    );
  }
);

previousButton.addEventListener(
  "click",
  () => {
    renderProject(activeProject - 1);
  }
);

nextButton.addEventListener(
  "click",
  () => {
    renderProject(activeProject + 1);
  }
);

/* Side navigation active state */

const sectionLinks = [
  ...document.querySelectorAll(
    ".section-nav__link"
  ),
];

const observedSections =
  sectionLinks
    .map((link) => {
      return document.querySelector(
        `#${link.dataset.section}`
      );
    })
    .filter(Boolean);

let currentSectionId = null;
let scrollUpdateRequested = false;

function setActiveSection(sectionId) {
  if (
    !sectionId
    || sectionId === currentSectionId
  ) {
    return;
  }

  currentSectionId = sectionId;

  sectionLinks.forEach((link) => {
    const isActive =
      link.dataset.section === sectionId;

    link.classList.toggle(
      "is-active",
      isActive
    );

    if (isActive) {
      link.setAttribute(
        "aria-current",
        "page"
      );
    } else {
      link.removeAttribute(
        "aria-current"
      );
    }
  });
}

function updateActiveSection() {
  scrollUpdateRequested = false;

  /*
    The active section is determined
    around 38% down the screen.
  */
  const marker =
    window.scrollY
    + window.innerHeight * 0.38;

  let activeSection =
    observedSections[0];

  observedSections.forEach((section) => {
    if (section.offsetTop <= marker) {
      activeSection = section;
    }
  });

  const reachedBottom =
    window.scrollY
    + window.innerHeight
    >= document.documentElement.scrollHeight - 10;

  if (reachedBottom) {
    activeSection =
      observedSections[
        observedSections.length - 1
      ];
  }

  setActiveSection(
    activeSection?.id
  );
}

function requestSectionUpdate() {
  if (scrollUpdateRequested) {
    return;
  }

  scrollUpdateRequested = true;

  window.requestAnimationFrame(
    updateActiveSection
  );
}

sectionLinks.forEach((link) => {
  link.addEventListener(
    "click",
    () => {
      setActiveSection(
        link.dataset.section
      );
    }
  );
});

window.addEventListener(
  "scroll",
  requestSectionUpdate,
  { passive: true }
);

window.addEventListener(
  "resize",
  requestSectionUpdate
);

updateActiveSection();

renderProject(0);
