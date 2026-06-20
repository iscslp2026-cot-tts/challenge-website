const boards = {
  t1u: [],
  t1s: [],
  t2u: [],
  t2s: []
};

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const boardButtons = [...document.querySelectorAll(".leaderboard-tabs button")];
const fileTriggers = [...document.querySelectorAll(".file-trigger")];
const leaderboardBody = document.querySelector("#leaderboard-body");
const submissionForm = document.querySelector("#submission-form");
const submissionWarning = document.querySelector("#submission-warning");
const statusList = document.querySelector("#status-list");

function renderBoard(boardName) {
  if (!leaderboardBody) {
    return;
  }
  const rows = boards[boardName] || boards.t1u;
  if (!rows.length) {
    leaderboardBody.innerHTML = `
      <tr>
        <td colspan="9">No leaderboard entries yet.</td>
      </tr>
    `;
    return;
  }
  leaderboardBody.innerHTML = rows
    .map(
      (row) => `
        <tr>
          <td><strong>#${row[0]}</strong></td>
          <td>${row[1]}</td>
          <td>${row[2]}</td>
          <td><strong>${row[3]}</strong></td>
          <td>${row[4]}</td>
          <td>${row[5]}</td>
          <td>${row[6]}</td>
          <td>${row[7]}</td>
          <td>${row[8]}</td>
        </tr>
      `
    )
    .join("");
}

function setStatus(doneCount) {
  if (!statusList) {
    return;
  }
  [...statusList.children].forEach((item, index) => {
    item.classList.toggle("done", index < doneCount);
  });
}

function updateActiveNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    link.classList.toggle("active", href === currentPage);
  });
}

navToggle?.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

fileTriggers.forEach((button) => {
  const inputId = button.dataset.fileInput;
  const input = inputId ? document.getElementById(inputId) : null;
  const status = input?.getAttribute("aria-describedby")
    ? document.getElementById(input.getAttribute("aria-describedby"))
    : null;

  if (!input || !status) {
    return;
  }

  button.addEventListener("click", () => {
    if (!input.disabled) {
      input.click();
    }
  });

  input.addEventListener("change", () => {
    status.textContent = input.files?.[0]?.name || "No file chosen";
  });
});

if (boardButtons.length && leaderboardBody) {
  boardButtons.forEach((button) => {
    button.addEventListener("click", () => {
      boardButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      renderBoard(button.dataset.board);
    });
  });
}

submissionForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(submissionForm);
  const category = data.get("category");
  const params = Number(data.get("params"));
  const team = String(data.get("teamName") || "").trim();
  const model = String(data.get("modelName") || "").trim();
  const file = data.get("package");

  submissionWarning.classList.remove("ok", "error");

  if (!team || !model || !params) {
    submissionWarning.textContent = "Please complete team name, model name, and parameter count.";
    submissionWarning.classList.add("error");
    setStatus(1);
    return;
  }

  if (category === "small" && params >= 1_000_000_000) {
    submissionWarning.textContent = "Parameter-constrained leaderboard requires parameter count below 1B.";
    submissionWarning.classList.add("error");
    setStatus(1);
    return;
  }

  if (!file || !file.name) {
    submissionWarning.textContent = "Metadata is valid. Upload a submission archive to continue smoke-test validation.";
    submissionWarning.classList.add("ok");
    setStatus(2);
    return;
  }

  submissionWarning.textContent = `Submission package "${file.name}" passed the front-end checks and is ready for server validation.`;
  submissionWarning.classList.add("ok");
  setStatus(4);
});

submissionForm?.addEventListener("reset", () => {
  window.setTimeout(() => {
    submissionWarning.classList.remove("ok", "error");
    submissionWarning.textContent = "Select a track and category, then validate your package.";
    const packageStatus = document.querySelector("#package-status");
    if (packageStatus) {
      packageStatus.textContent = "No file chosen";
    }
    setStatus(1);
  }, 0);
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

if (leaderboardBody) {
  renderBoard("t1u");
}

if (statusList) {
  setStatus(1);
}

updateActiveNav();
