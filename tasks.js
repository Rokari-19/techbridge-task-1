const taskData = {
  data: {
    name: "Data Analytics",
    description: "Work with data, find useful patterns, and communicate evidence-based insights.",
    tasks: [
      {
        number: 1,
        day: 1,
        title: "Data Cleaning Basics",
        description: "Clean a messy dataset using Google Sheets or Excel. Identify and fix duplicate rows, blank cells, inconsistent formatting, and incorrect data types.",
        difficulty: "Beginner"
      },
      {
        number: 2,
        day: 4,
        title: "Formulas & Pivot Tables",
        description: "Use spreadsheet formulas and Pivot Tables to answer questions and extract useful insights from a dataset.",
        difficulty: "Beginner"
      },
      {
        number: 3,
        day: 8,
        title: "Data Visualization",
        description: "Create charts and a simple dashboard that communicate useful insights from a dataset.",
        difficulty: "Beginner → Intermediate"
      },
      {
        number: 4,
        day: 11,
        title: "Introduction to SQL",
        description: "Practice basic SQL queries and use them to answer real-world questions about data.",
        difficulty: "Beginner → Intermediate"
      },
      {
        number: 5,
        day: 15,
        title: "SQL Joins & Aggregations",
        description: "Use JOIN, GROUP BY and aggregate functions such as COUNT, SUM and AVG to analyze information across multiple tables.",
        difficulty: "Intermediate"
      },
      {
        number: 6,
        day: 19,
        title: "Lookup Functions & Data Wrangling",
        description: "Use VLOOKUP or XLOOKUP to combine related datasets and handle data mismatches.",
        difficulty: "Intermediate"
      },
      {
        number: 7,
        day: 22,
        title: "Mini Analysis Project",
        description: "Complete a small end-to-end analysis involving data cleaning, formulas, Pivot Tables, charts and recommendations.",
        difficulty: "Intermediate"
      },
      {
        number: 8,
        day: 26,
        title: "Capstone Project",
        description: "Complete a larger project combining spreadsheet analysis and SQL using at least two related tables.",
        difficulty: "Intermediate"
      }
    ]
  },
  web: {
    name: "Web Development",
    description: "Build web experiences in stages, moving from page structure and styling to an integrated internship platform.",
    tasks: [
      {
        number: 1,
        day: 1,
        title: "Build the TechBridge Homepage",
        description: "Create the first version of the TechBridge website using HTML and CSS.",
        difficulty: "Beginner"
      },
      {
        number: 2,
        day: 4,
        title: "Build the TechBridge Programs Experience",
        description: "Create a Programs experience presenting TechBridge's available learning programs.",
        difficulty: "Beginner"
      },
      {
        number: 3,
        day: 8,
        title: "Build the Internship Tasks Experience",
        description: "Create an interface that presents the TechBridge internship tasks and helps users understand the internship journey.",
        difficulty: "Beginner → Intermediate"
      },
      {
        number: 4,
        day: 11,
        title: "Build an Interactive Internship Roadmap",
        description: "Use JavaScript to allow visitors to switch between the Data Analytics and Web Development internship tracks.",
        difficulty: "Beginner → Intermediate"
      },
      {
        number: 5,
        day: 15,
        title: "Build the Intern Registration Experience",
        description: "Create a professional registration and onboarding interface for TechBridge interns.",
        difficulty: "Intermediate"
      },
      {
        number: 6,
        day: 19,
        title: "Build the Task Submission System",
        description: "Create an interface through which interns can prepare and submit their task work.",
        difficulty: "Intermediate"
      },
      {
        number: 7,
        day: 22,
        title: "Build the Intern Dashboard",
        description: "Create a dashboard where an intern can view their profile, progress, tasks and submissions.",
        difficulty: "Intermediate"
      },
      {
        number: 8,
        day: 26,
        title: "Build the Complete TechBridge Internship Platform",
        description: "Combine the different components created during the internship into a complete TechBridge platform.",
        difficulty: "Intermediate"
      }
    ]
  }
};

let currentTrack = "data";

const trackTabs = document.querySelectorAll(".track-tab");
const taskPanel = document.querySelector("#task-panel");
const selectedTrackName = document.querySelector("#selected-track-name");
const selectedTrackDescription = document.querySelector("#selected-track-description");
const taskList = document.querySelector("#task-list");
const taskListNote = document.querySelector("#task-list-note");
const milestoneDays = document.querySelector("#milestone-days");

function createTaskCard(task) {
  const card = document.createElement("article");
  card.className = "task-card";

  const top = document.createElement("div");
  top.className = "task-card-top";

  const number = document.createElement("span");
  number.className = "task-number";
  number.textContent = `TASK ${String(task.number).padStart(2, "0")}`;

  const day = document.createElement("span");
  day.className = "task-day";
  day.textContent = `DAY ${String(task.day).padStart(2, "0")}`;

  const title = document.createElement("h5");
  title.textContent = task.title;

  const description = document.createElement("p");
  description.className = "task-description";
  description.textContent = task.description;

  const bottom = document.createElement("div");
  bottom.className = "task-card-bottom";

  const difficulty = document.createElement("span");
  difficulty.className = task.difficulty === "Intermediate"
    ? "task-difficulty difficulty-intermediate"
    : "task-difficulty";
  difficulty.textContent = task.difficulty;

  const kind = document.createElement("span");
  kind.className = "task-kind";
  kind.textContent = task.number === 8 ? "CAPSTONE" : "MILESTONE";

  top.append(number, day);
  bottom.append(difficulty, kind);
  card.append(top, title, description, bottom);

  return card;
}

function renderTrack(trackKey) {
  const selectedTrack = taskData[trackKey];

  if (!selectedTrack) {
    return;
  }

  currentTrack = trackKey;
  selectedTrackName.textContent = selectedTrack.name;
  selectedTrackDescription.textContent = selectedTrack.description;
  taskListNote.textContent = `${selectedTrack.name} · ${selectedTrack.tasks.length} tasks`;
  taskPanel.setAttribute("aria-labelledby", trackKey === "data" ? "tab-data" : "tab-web");

  trackTabs.forEach((tab) => {
    const isSelected = tab.dataset.track === currentTrack;
    tab.classList.toggle("is-active", isSelected);
    tab.setAttribute("aria-selected", String(isSelected));
    tab.tabIndex = isSelected ? 0 : -1;
  });

  taskList.replaceChildren();
  milestoneDays.replaceChildren();

  selectedTrack.tasks.forEach((task) => {
    taskList.append(createTaskCard(task));

    const milestone = document.createElement("li");
    const dayNumber = document.createElement("span");
    const dayLabel = document.createElement("small");

    dayNumber.textContent = String(task.day).padStart(2, "0");
    dayLabel.textContent = "DAY";
    milestone.append(dayNumber, dayLabel);
    milestoneDays.append(milestone);
  });

  taskList.setAttribute("aria-busy", "false");
}

function handleTrackSelection(event) {
  const selectedTab = event.currentTarget;
  const selectedKey = selectedTab.dataset.track;

  if (selectedKey !== currentTrack && taskData[selectedKey]) {
    renderTrack(selectedKey);
  }
}

function handleTrackKeyboard(event) {
  const tabs = Array.from(trackTabs);
  const activeIndex = tabs.indexOf(document.activeElement);
  let nextIndex = activeIndex;

  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    nextIndex = (activeIndex + 1) % tabs.length;
  } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    nextIndex = (activeIndex - 1 + tabs.length) % tabs.length;
  } else if (event.key === "Home") {
    nextIndex = 0;
  } else if (event.key === "End") {
    nextIndex = tabs.length - 1;
  } else {
    return;
  }

  event.preventDefault();
  tabs[nextIndex].focus();
  renderTrack(tabs[nextIndex].dataset.track);
}

trackTabs.forEach((tab) => {
  tab.addEventListener("click", handleTrackSelection);
  tab.addEventListener("keydown", handleTrackKeyboard);
});

renderTrack(currentTrack);

// Keep the existing mobile navigation available on every page.
const menuToggle = document.querySelector(".menu-toggle");
const mainNavigation = document.querySelector(".main-nav");

if (menuToggle && mainNavigation) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    mainNavigation.classList.toggle("is-open", !isExpanded);
  });

  mainNavigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNavigation.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}
