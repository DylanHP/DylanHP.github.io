/**
 * BENTO OS - True Floating Desktop Manager
 */

document.addEventListener("DOMContentLoaded", () => {
  const windowTiles = Array.from(document.querySelectorAll(".window-tile"));
  const navButtons = document.querySelectorAll(".nav-btn");
  const closeButtons = document.querySelectorAll(".close-btn");

  let zIndexCounter = 100;

  // 1. TOGGLE LOGIC
  function toggleTile(targetId, open) {
    const tile = document.getElementById(targetId);
    const btn = document.querySelector(`.nav-btn[data-target="${targetId}"]`);

    if (!tile) return;

    const isOpen = !tile.classList.contains("hidden");
    const shouldOpen = open === undefined ? !isOpen : open;
    if (shouldOpen === isOpen) return;

    tile.classList.toggle("hidden", !shouldOpen);
    if (btn) {
      btn.classList.toggle("active", shouldOpen);
      btn.setAttribute("aria-expanded", String(shouldOpen));
    }

    if (targetId === "rickrolled") {
      const rickFrame = document.getElementById("rick-iframe");
      if (shouldOpen) {
        rickFrame.src = "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0";
      } else {
        rickFrame.removeAttribute("src");
      }
    }

    if (!shouldOpen) return;
    tile.style.zIndex = ++zIndexCounter;
    if (window.innerWidth <= 1200) {
      tile.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  document.addEventListener("open-rickroll", () => toggleTile("rickrolled", true));

  // Initialize button states
  navButtons.forEach((btn) => {
    const targetId = btn.getAttribute("data-target");
    const tile = document.getElementById(targetId);
    if (!tile) return;
    const isOpen = !tile.classList.contains("hidden");
    btn.classList.toggle("active", isOpen);
    btn.setAttribute("aria-controls", targetId);
    btn.setAttribute("aria-expanded", String(isOpen));
  });

  // Event Listeners for Nav Buttons
  navButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      toggleTile(btn.getAttribute("data-target"));
    });
  });

  // Event Listeners for Close [X] Buttons
  function attachCloseEvent(btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute("data-target");
      const restoreFocus = btn === document.activeElement || e.detail === 0;
      toggleTile(targetId);
      if (restoreFocus) {
        const opener = document.querySelector(`.nav-btn[data-target="${targetId}"]`);
        if (opener) opener.focus();
      }
    });
  }

  closeButtons.forEach(attachCloseEvent);

  // 2. DRAGGABLE WINDOWS (Corretto per schermi centrati)
  const gridContainer = document.getElementById("grid");

  function attachDragEvents(tile) {
    const titleBar = tile.querySelector(".title-bar");

    function raiseTile() {
      if (window.innerWidth > 1200) {
        tile.style.zIndex = ++zIndexCounter;
      }
    }
    tile.addEventListener("mousedown", raiseTile);
    tile.addEventListener("focusin", raiseTile);

    titleBar.addEventListener("mousedown", function (e) {
      if (window.innerWidth <= 1200 || e.button !== 0) return;
      if (e.target.closest(".close-btn")) return;

      e.preventDefault();

      const gridRect = gridContainer.getBoundingClientRect();
      const tileRect = tile.getBoundingClientRect();

      const shiftX = e.clientX - tileRect.left;
      const shiftY = e.clientY - tileRect.top;

      function moveAt(clientX, clientY) {
        const minLeft = -gridRect.left;
        const maxLeft = window.innerWidth - gridRect.left - tileRect.width;
        const maxTop = gridRect.height - tileRect.height - 20;
        const left = clientX - gridRect.left - shiftX;
        const top = clientY - gridRect.top - shiftY;
        const newLeft = Math.max(minLeft, Math.min(left, maxLeft));
        const newTop = Math.max(0, Math.min(top, maxTop));
        tile.style.left = newLeft + "px";
        tile.style.setProperty("--drag-top", newTop + "px");
      }

      function onMouseMove(event) {
        moveAt(event.clientX, event.clientY);
      }

      document.addEventListener("mousemove", onMouseMove);

      function stopDragging() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", stopDragging);
        window.removeEventListener("blur", stopDragging);
      }

      document.addEventListener("mouseup", stopDragging);
      window.addEventListener("blur", stopDragging);
    });

    titleBar.ondragstart = function () {
      return false;
    };
  }

  windowTiles.forEach(attachDragEvents);

  window.addEventListener("resize", () => {
    windowTiles.forEach((tile) => {
      tile.style.removeProperty("left");
      tile.style.removeProperty("--drag-top");
    });
  });

  const contactForm = document.querySelector(".bento-form");
  if (contactForm) {
    contactForm.addEventListener("focusin", () => {
      document.body.classList.add("contact-form-focused");
    });
    contactForm.addEventListener("focusout", (event) => {
      if (!contactForm.contains(event.relatedTarget)) {
        document.body.classList.remove("contact-form-focused");
      }
    });
  }

  if (contactForm && window.fetch && window.FormData && window.AbortController) {
    const submitButton = contactForm.querySelector(".submit-btn");
    const status = contactForm.querySelector(".form-status");

    contactForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (submitButton.disabled) return;

      submitButton.disabled = true;
      status.textContent = "Sending message…";
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      try {
        const response = await fetch(contactForm.action, {
          method: "POST",
          body: new FormData(contactForm),
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });

        if (!response.ok) throw new Error("FormBold submission failed");

        contactForm.reset();
        status.textContent = "Message sent successfully.";
      } catch (error) {
        status.textContent = error.name === "AbortError"
          ? "The request timed out. Your message may have been sent."
          : "Could not confirm delivery. Your message is still here if you want to try again.";
      } finally {
        clearTimeout(timeout);
        submitButton.disabled = false;
      }
    });
  }

  // 3. THEME TOGGLE
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (themeToggleBtn) {
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const icon = themeToggleBtn.querySelector("i");
    let savedTheme;

    try {
      savedTheme = localStorage.getItem("theme");
    } catch {
      // The browser may block storage. Keep the choice for this page only.
    }

    function applyTheme(isDark) {
      if (isDark) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      icon.classList.toggle("fa-sun", isDark);
      icon.classList.toggle("fa-moon", !isDark);
      const label = isDark ? "Switch to light theme" : "Switch to dark theme";
      themeToggleBtn.setAttribute("aria-label", label);
      themeToggleBtn.title = label;
    }

    function followSystemTheme(event) {
      if (savedTheme !== "dark" && savedTheme !== "light") {
        applyTheme(event.matches);
      }
    }

    applyTheme(savedTheme === "dark" || (savedTheme !== "light" && colorScheme.matches));

    if (colorScheme.addEventListener) {
      colorScheme.addEventListener("change", followSystemTheme);
    } else if (colorScheme.addListener) {
      colorScheme.addListener(followSystemTheme);
    }

    themeToggleBtn.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      savedTheme = isDark ? "light" : "dark";
      applyTheme(!isDark);
      try {
        localStorage.setItem("theme", savedTheme);
      } catch {
        // The theme is already applied for this page.
      }
    });
  }
});
