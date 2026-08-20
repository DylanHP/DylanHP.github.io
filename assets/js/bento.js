/**
 * BENTO OS - True Floating Desktop Manager
 */

$(document).ready(function () {
  console.log("Floating OS Booted...");
});

document.addEventListener("DOMContentLoaded", () => {
  const windowTiles = Array.from(document.querySelectorAll(".window-tile"));
  const navButtons = document.querySelectorAll(".nav-btn");
  const closeButtons = document.querySelectorAll(".close-btn");

  let zIndexCounter = 100;

  // 1. TOGGLE LOGIC
  function toggleTile(targetId) {
    const tile = document.getElementById(targetId);
    const btn = document.querySelector(`.nav-btn[data-target="${targetId}"]`);

    if (!tile) return;

    if (tile.classList.contains("hidden")) {
      // Sta aprendo
      tile.classList.remove("hidden");
      if (btn) btn.classList.add("active");
      tile.style.zIndex = ++zIndexCounter;

      // Gestione Autoplay Rickroll
      if (targetId === "rickrolled") {
        const rickFrame = document.getElementById("rick-iframe");
        if (rickFrame) {
          rickFrame.src =
            "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0";
        }
      }
    } else {
      // Sta chiudendo
      tile.classList.add("hidden");
      if (btn) {
        btn.classList.remove("active");
        btn.blur();
        setTimeout(() => btn.blur(), 10); // Fix per mobile che mantiene :active
      }

      // Ferma l'audio del Rickroll quando chiudi la finestra
      if (targetId === "rickrolled") {
        const rickFrame = document.getElementById("rick-iframe");
        if (rickFrame) {
          rickFrame.src = "";
        }
      }
    }
  }

  // Initialize button states
  navButtons.forEach((btn) => {
    const targetId = btn.getAttribute("data-target");
    const tile = document.getElementById(targetId);
    if (tile && !tile.classList.contains("hidden")) {
      btn.classList.add("active");
    }
  });

  // Event Listeners for Nav Buttons
  navButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute("data-target");
      toggleTile(targetId);

      // On mobile, scroll to the newly opened tile so the user sees it
      if (window.innerWidth <= 1200) {
        const tile = document.getElementById(targetId);
        if (tile && !tile.classList.contains("hidden")) {
          setTimeout(
            () => tile.scrollIntoView({ behavior: "smooth", block: "start" }),
            50,
          );
        }
      }
    });
  });

  // Event Listeners for Close [X] Buttons
  function attachCloseEvent(btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute("data-target");
      toggleTile(targetId);
    });
  }

  closeButtons.forEach(attachCloseEvent);

  // 2. DRAGGABLE WINDOWS (Corretto per schermi centrati)
  const gridContainer = document.getElementById("grid");

  function attachDragEvents(tile) {
    const titleBar = tile.querySelector(".title-bar");

    tile.addEventListener("mousedown", () => {
      if (window.innerWidth > 1200) {
        tile.style.zIndex = ++zIndexCounter;
      }
    });

    titleBar.addEventListener("mousedown", function (e) {
      if (window.innerWidth <= 1200) return;
      if (e.target.closest(".close-btn")) return;

      tile.style.zIndex = ++zIndexCounter;

      const gridRect = gridContainer.getBoundingClientRect();
      const tileRect = tile.getBoundingClientRect();

      let shiftX = e.clientX - tileRect.left;
      let shiftY = e.clientY - tileRect.top;

      function moveAt(clientX, clientY) {
        let newLeft = clientX - gridRect.left - shiftX;
        let newTop = clientY - gridRect.top - shiftY;
        tile.style.left = newLeft + "px";
        tile.style.top = newTop + "px";
      }

      function onMouseMove(event) {
        moveAt(event.clientX, event.clientY);
      }

      document.addEventListener("mousemove", onMouseMove);

      document.onmouseup = function () {
        document.removeEventListener("mousemove", onMouseMove);
        document.onmouseup = null;
      };
    });

    titleBar.ondragstart = function () {
      return false;
    };
  }

  windowTiles.forEach(attachDragEvents);

  // 3. THEME TOGGLE
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const icon = themeToggleBtn.querySelector("i");
      if (currentTheme === "dark") {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      }
    });

    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      document.documentElement.setAttribute("data-theme", "dark");
      const icon = themeToggleBtn.querySelector("i");
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    }

    // Listen for system theme changes if no user preference is saved
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        if (!localStorage.getItem("theme")) {
          const newColorScheme = event.matches ? "dark" : "light";
          const icon = themeToggleBtn.querySelector("i");
          if (newColorScheme === "dark") {
            document.documentElement.setAttribute("data-theme", "dark");
            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");
          } else {
            document.documentElement.removeAttribute("data-theme");
            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");
          }
        }
      });
  }

  // 4. AJAX Form Submission
  const form = document.querySelector(".bento-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const btn = form.querySelector(".submit-btn");
      const originalText = btn.innerText;
      btn.innerText = "Sending...";
      btn.disabled = true;

      const formData = new URLSearchParams(new FormData(form));
      formData.set("subject", "New portfolio contact message");

      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            btn.innerText = "Sent Successfully!";
            btn.style.backgroundColor = "var(--accent-color)";
            btn.style.color = "var(--border-color)";
            form.reset();
            setTimeout(() => {
              btn.innerText = originalText;
              btn.style.backgroundColor = "";
              btn.style.color = "";
              btn.disabled = false;
            }, 3000);
          } else {
            throw new Error("Network response was not ok.");
          }
        })
        .catch((error) => {
          btn.innerText = "Error! Try again.";
          btn.style.backgroundColor = "var(--danger-color)";
          setTimeout(() => {
            btn.innerText = originalText;
            btn.style.backgroundColor = "";
            btn.disabled = false;
          }, 3000);
        });
    });
  }
});
