const projects = [
  {
    title: "Cursor Trail Demo",

    description:
      "A customizable cursor-trail interaction with real-time controls for trail count, size, color, opacity, and scale.",

    tech:
      "JavaScript · HTML · CSS · DOM",

    artClass:
      "project-art--cursor",

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

    artClass:
      "project-art--mood",

    demo:
      "https://scc-cisw.com/cisw400-fa25/mhorbachov/final/",

    code: null,
  },

  {
    title: "Arduino LED Controller",

    description:
      "A C# desktop application that controls Arduino-connected LED lighting through a serial COM port, with color, brightness, timing, and preset modes.",

    tech:
      "C# · WPF · Serial Communication · Arduino",

    artClass:
      "project-art--arduino",

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

const art =
  document.querySelector("#project-art");

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

  art.className =
    `project-art ${project.artClass}`;

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

thumbnails.forEach(
  (thumbnail, index) => {
    thumbnail.addEventListener(
      "mouseenter",
      () => renderProject(index)
    );

    thumbnail.addEventListener(
      "focus",
      () => renderProject(index)
    );

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

