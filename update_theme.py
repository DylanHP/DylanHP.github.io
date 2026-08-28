import re

with open("assets/js/bento.js", "r") as f:
    content = f.read()

old = """    function initTheme() {
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
    });"""

new = """    function initTheme() {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        updateIcon(true);
      } else if (savedTheme === "light") {
        document.documentElement.removeAttribute("data-theme");
        updateIcon(false);
      } else {
        const prefersDark = colorScheme.matches;
        if (prefersDark) {
          document.documentElement.setAttribute("data-theme", "dark");
        } else {
          document.documentElement.removeAttribute("data-theme");
        }
        updateIcon(prefersDark);
      }
    }

    initTheme();

    // Ascolta i cambiamenti di sistema se non c'è un tema salvato manualmente
    colorScheme.addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        if (e.matches) {
          document.documentElement.setAttribute("data-theme", "dark");
        } else {
          document.documentElement.removeAttribute("data-theme");
        }
        updateIcon(e.matches);
      }
    });

    themeToggleBtn.addEventListener("click", () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      if (isDark) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "light");
        updateIcon(false);
      } else {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        updateIcon(true);
      }
    });"""

if old in content:
    content = content.replace(old, new)
    with open("assets/js/bento.js", "w") as f:
        f.write(content)
    print("Updated")
else:
    print("Not found")
