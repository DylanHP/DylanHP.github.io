/**
 * FAKE LINUX TERMINAL EASTER EGG
 * Uses jQuery Terminal Emulator
 */

$(document).ready(function () {
  // Inizializza il terminale dentro il div #fake-terminal
  $("#fake-terminal").terminal(
    {
      help: function () {
        this.echo("Available commands:");
        this.echo("  [[b;#00FF41;]whoami]     - Display current user info");
        this.echo("  [[b;#00FF41;]skills]     - List tech skills");
        this.echo("  [[b;#00FF41;]neofetch]   - System info");
        this.echo("  [[b;#00FF41;]sudo]       - Execute command as superuser");
        this.echo("  [[b;#00FF41;]clear]      - Clear the terminal");
      },
      whoami: function () {
        this.echo("Dylan Zanaglio");
        this.echo("Electronic Engineering Student & Tech Enthusiast.");
        this.echo("Location: Brescia, Italy.");
      },
      skills: function () {
        this.echo("Loading skills module...");
        this.echo(">> C, C++, Python, JavaScript");
        this.echo(">> Embedded Systems, PCB Design, Microcontrollers");
        this.echo(">> Homelabs, Linux, Docker");
      },
      neofetch: function () {
        const logo = [
          "[[b;#00FF41;]╔═══════════════════╗]   [[b;#fff;]root@dylan-os]",
          "[[b;#00FF41;]║ ██████╗ ██╗   ██╗ ║]   -----------------",
          "[[b;#00FF41;]║ ██╔══██╗╚██╗ ██╔╝ ║]   [[b;#00FF41;]OS]: DylanHP v1.0.0",
          "[[b;#00FF41;]║ ██║  ██║ ╚████╔╝  ║]   [[b;#00FF41;]Kernel]: Coffee & Vibes",
          "[[b;#00FF41;]║ ██║  ██║  ╚██╔╝   ║]   [[b;#00FF41;]Uptime]: 25 years",
          "[[b;#00FF41;]║ ██████╔╝   ██║    ║]   [[b;#00FF41;]Packages]: ∞ (npm i)",
          "[[b;#00FF41;]║ ╚═════╝    ╚═╝    ║]   [[b;#00FF41;]Shell]: zsh (Terminal)",
          "[[b;#00FF41;]║      DYLANOS      ║]   [[b;#00FF41;]CPU]: Driven by Dreams",
          "[[b;#00FF41;]╚═══════════════════╝] ",
        ].join("\n");

        this.echo(logo, { wrap: false });
      },
      sudo: function (command) {
        this.error(
          "dylan is not in the sudoers file. This incident will be reported.",
        );
      },
      rickroll: function () {
        this.echo("Initializing payload...");
        setTimeout(() => {
          // Attiva l'easter egg rickroll chiamando la funzione esistente
          if (typeof openrickroll === "function") {
            openrickroll();
            this.echo("[[b;#00FF41;]Payload executed successfully.]");
          } else {
            this.error("Payload missing. Rick Astley not found.");
          }
        }, 1000);
      },
    },
    {
      greetings:
        "Welcome to Dylan-OS Terminal [Version 1.0.0]\nType [[b;#00FF41;]help] to see available commands.\n",
      prompt: "[[b;#00FF41;]root@dylan-os:~#] ",
      cursorBlink: true,
      height: "100%",
      width: "100%",
      onInit: function (term) {
        // Fai partire in automatico il neofetch appena caricato!
        term.exec("neofetch");
      },
    },
  );

  // Risolvi il problema del focus:
  // Il terminale ruba i tasti premuti. Lo mettiamo in pausa se la finestra è chiusa.
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.target.classList.contains("hidden")) {
        $("#fake-terminal").terminal().disable(); // Disabilita quando nascosto
      } else {
        $("#fake-terminal").terminal().enable().focus(); // Abilita quando aperto
      }
    });
  });
  observer.observe(document.getElementById("terminal-box"), {
    attributes: true,
    attributeFilter: ["class"],
  });
});
