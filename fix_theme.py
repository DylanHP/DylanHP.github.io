import re

with open("assets/js/bento.js", "r") as f:
    content = f.read()

old_logic = """  // 3. THEME TOGGLE
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (themeToggleBtn) {
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");

    function applySystemTheme() {
      const prefersDark = colorScheme.matches;
      const icon = themeToggleBtn.querySelector("i");
      if (prefersDark) {
        document.documentElement.setAttribute("data-theme", "dark");
        icon.classList.replace("fa-moon", "fa-sun");
      } else {
        document.documentElement.removeAttribute("data-theme");
        icon.classList.replace("fa-sun", "fa-moon");
      }
    }

    localStorage.removeItem("theme");
    applySystemTheme();
    colorScheme.addEventListener("change", applySystemTheme);
    themeToggleBtn.addEventListener("click", applySystemTheme);
  }"""

new_logic = """  // 3. THEME TOGGLE
  const themeToggleBtn = document.getElementById("theme-toggle");
  if (themeToggleBtn) {
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");

    function updateIcon(isDark) {
      const icon = themeToggleBtn.querySelector("i");
      if (isDark) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      } else {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
      }
    }

    function initTheme() {
      const prefersDark = colorScheme.matches;
      if (prefersDark) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
      updateIcon(prefersDark);
    }

    initTheme();

    themeToggleBtn.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      if (isDark) {
        document.documentElement.removeAttribute("data-theme");
        updateIcon(false);
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        updateIcon(true);
      }
    });
  }"""

if old_logic in content:
    content = content.replace(old_logic, new_logic)
    with open("assets/js/bento.js", "w") as f:
        f.write(content)
    print("Theme logic replaced.")
else:
    print("Old logic not found. Trying regex.")
