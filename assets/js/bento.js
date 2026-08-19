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
      if (window.innerWidth > 980) {
        tile.style.zIndex = ++zIndexCounter;
      }
    });

    titleBar.addEventListener("mousedown", function (e) {
      if (window.innerWidth <= 980) return;
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
});
