// Carica solo Clippy come agente
clippy.load('Clippy', function(agent) {
    agent.show();
    agent.speak("Oh, great. Someone’s here. I’m Clippy, your unwanted guide to this masterpiece.");
    agent.play('Greet');
    
    // Interazioni bottoni
    document.querySelector('.aboutme').addEventListener('click', function() {
        agent.speak("So you want to know more about me? Bold of you to assume there's anything interesting.");
        agent.animate('GetAttention');
    });

    document.querySelector('.projects').addEventListener('click', function() {
        agent.speak("Oh look, more stuff I had to do. Enjoy scrolling through this parade of productivity.");
        agent.animate('GetAttention');
    });

    document.querySelector('.passions').addEventListener('click', function() {
        agent.speak("Apparently I’m supposed to be passionate about these things. Pretend to be impressed.");
        agent.animate('GetAttention');
    });

    document.querySelector('.contacts').addEventListener('click', function() {
        agent.speak("You want to talk to me? Bold choice. Go ahead, ruin my day.");
        agent.animate('GetAttention');
    });

    document.querySelector('.send').addEventListener('mouseover', function() {
        agent.speak("Are you sure you want to send this message? I hope it's not spam!");
        agent.animate('GetAttention');
    });

    document.querySelector('.reset').addEventListener('mouseover', function() {
        agent.speak("I'm glad you want to reset the form! Maybe at the end you di not want to annoy me.");
        agent.animate('GetAttention');
    });

    // Easter egg
    document.querySelector('.rick').addEventListener('mouseover', function() {
        agent.speak("Maybe there is a secret here.");
        agent.animate('GetAttention');
    });

    // Se sono sulla pagina del rickroll
    if (window.location.href.includes('rickroll')) {
        agent.speak("Oh, you found the easter egg! Congratulations, you just got Rickrolled by a paperclip.");
        agent.animate('GetAttention');
    }
    
    // Default positioning: spostato in basso a sinistra (vicino al menù)
    let clippyEl = document.querySelector('.clippy');
    if (clippyEl) {
        clippyEl.style.position = 'fixed';
        clippyEl.style.zIndex = 9999;
        
        // Default: bottom right corner fully visible, both mobile and desktop
        clippyEl.style.position = 'fixed';
        clippyEl.style.right = '16px';
        clippyEl.style.bottom = '16px';
        clippyEl.style.left = 'auto';
        clippyEl.style.top = 'auto';
        // Dopo un breve delay, normalizza il bounding perché a volte l'agente parte "fuori" per animazione iniziale
        setTimeout(() => {
            const rect = clippyEl.getBoundingClientRect();
            let dirty = false;
            if (rect.right > window.innerWidth) { clippyEl.style.left = (window.innerWidth - rect.width - 2) + 'px'; dirty = true; }
            if (rect.bottom > window.innerHeight) { clippyEl.style.top = (window.innerHeight - rect.height - 2) + 'px'; dirty = true; }
            if (dirty) {
                clippyEl.style.right = 'auto';
                clippyEl.style.bottom = 'auto';
            }
        }, 100);

        
        clippyEl.addEventListener('click', function(e) {
            agent.speak("Don't touch me pls! I am busy! Give me some space!");
            agent.animate('GetAttention');
        });

         // --- Drag universale SOLO dopo che .clippy è disponibile! ---
         function attachClippyDrag(){
            var clippyEl = document.querySelector('.clippy');
            if (!clippyEl) return false;
            clippyEl.style.position = "fixed";
            clippyEl.style.left = (window.innerWidth - clippyEl.offsetWidth - 16) + "px";
            clippyEl.style.top  = (window.innerHeight - clippyEl.offsetHeight - 16) + "px";
            clippyEl.style.right = "auto";
            clippyEl.style.bottom = "auto";
            let drag = false, moved = false, sx = 0, sy = 0, sl = 0, st = 0;
            function clamp(val, min, max){ return Math.max(min, Math.min(max, val)); }
            function fixInViewport() {
                let left = clamp(parseFloat(clippyEl.style.left||0), 0, window.innerWidth - clippyEl.offsetWidth);
                let top  = clamp(parseFloat(clippyEl.style.top||0), 0, window.innerHeight - clippyEl.offsetHeight);
                clippyEl.style.left = left+'px'; clippyEl.style.top = top+'px';
            }

            clippyEl.addEventListener("touchstart", function(e) {
                if (e.touches.length !== 1) return;
                drag = true; moved = false;
                sx = e.touches[0].clientX; sy = e.touches[0].clientY;
                sl = parseFloat(clippyEl.style.left) || 0; st = parseFloat(clippyEl.style.top) || 0;
            }, {passive:false});
            clippyEl.addEventListener("touchmove", function(e){
                if (!drag || e.touches.length !== 1) return;
                let dx = e.touches[0].clientX - sx, dy = e.touches[0].clientY - sy;
                if (!moved && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) moved = true;
                if (moved) {
                    e.preventDefault();
                    clippyEl.style.left = clamp(sl + dx, 0, window.innerWidth - clippyEl.offsetWidth) + "px";
                    clippyEl.style.top  = clamp(st + dy, 0, window.innerHeight - clippyEl.offsetHeight) + "px";
                }
            }, {passive:false});
            clippyEl.addEventListener("touchend", function(e){
                if (!drag) return;
                if (!moved) {
                    agent.speak("Don't touch me pls! I am busy! Give me some space!");
                    agent.animate('GetAttention');
                }
                drag = false; moved = false;
                setTimeout(fixInViewport, 0);
            }, {passive:false});
            // Mouse
            clippyEl.addEventListener("mousedown", function(e){
                if (e.button !== 0) return;
                drag = true; moved = false;
                sx = e.clientX; sy = e.clientY;
                sl = parseFloat(clippyEl.style.left) || 0; st = parseFloat(clippyEl.style.top) || 0;
                document.body.style.userSelect = "none";
            }, {passive:false});
            window.addEventListener("mousemove", function(e){
                if (!drag) return;
                let dx = e.clientX - sx, dy = e.clientY - sy;
                if (!moved && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) moved = true;
                if (moved) {
                    clippyEl.style.left = clamp(sl + dx, 0, window.innerWidth - clippyEl.offsetWidth) + "px";
                    clippyEl.style.top  = clamp(st + dy, 0, window.innerHeight - clippyEl.offsetHeight) + "px";
                }
            }, {passive:false});
            window.addEventListener("mouseup", function(){
                if (!drag) return;
                if (!moved) {
                    agent.speak("Don't touch me pls! I am busy! Give me some space!");
                    agent.animate('GetAttention');
                }
                drag = false; moved = false;
                document.body.style.userSelect = "";
                setTimeout(fixInViewport, 0);
            }, {passive:false});
            window.addEventListener("resize", fixInViewport);
            return true;
         }
         (function waitClippy(){
            if (attachClippyDrag()) return;
            setTimeout(waitClippy, 250);
         })();


    }
});