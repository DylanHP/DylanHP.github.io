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

         // --- Drag universal: mouse + touch, clamp e spawn always ---
         (function(){
            let dragging = false, dragStartX, dragStartY, startLeft, startTop, moved;
            // Spawn sempre tutto visibile
            function setDefaultPosition() {
                clippyEl.style.position = "fixed";
                clippyEl.style.left = (window.innerWidth - clippyEl.offsetWidth - 16) + "px";
                clippyEl.style.top = (window.innerHeight - clippyEl.offsetHeight - 16) + "px";
            }
            setDefaultPosition();
            function clamp(val, min, max) { return Math.max(min, Math.min(max, val)); }
            function clampToViewport() {
                let left = parseFloat(clippyEl.style.left||0);
                let top = parseFloat(clippyEl.style.top||0);
                left = clamp(left, 0, window.innerWidth - clippyEl.offsetWidth);
                top = clamp(top, 0, window.innerHeight - clippyEl.offsetHeight);
                clippyEl.style.left = left + "px";
                clippyEl.style.top = top + "px";
            }
            function startDrag(x, y) {
                dragging = true; moved = false;
                dragStartX = x; dragStartY = y;
                startLeft = parseFloat(clippyEl.style.left||0);
                startTop = parseFloat(clippyEl.style.top||0);
                document.body.style.userSelect = "none";
            }
            function moveDrag(x, y) {
                if (!dragging) return;
                let dx = x - dragStartX, dy = y - dragStartY;
                if (!moved && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) moved = true;
                if (moved) {
                    clippyEl.style.left = clamp(startLeft + dx, 0, window.innerWidth - clippyEl.offsetWidth) + "px";
                    clippyEl.style.top = clamp(startTop + dy, 0, window.innerHeight - clippyEl.offsetHeight) + "px";
                }
            }
            function endDrag() {
                dragging = false;
                document.body.style.userSelect = "";
            }
            // Touch
            clippyEl.addEventListener("touchstart", function(e){
                if (e.touches.length === 1) startDrag(e.touches[0].clientX, e.touches[0].clientY);
            }, {passive:true});
            window.addEventListener("touchmove", function(e){
                if (dragging && e.touches.length === 1) {
                    moveDrag(e.touches[0].clientX, e.touches[0].clientY);
                    if (moved && e.cancelable) e.preventDefault();
                }
            }, {passive:false});
            window.addEventListener("touchend", function(e){
                if (!dragging) return;
                if (!moved) {
                    agent.speak("Don't touch me pls! I am busy! Give me some space!");
                    agent.animate('GetAttention');
                }
                endDrag();
            });
            // Mouse
            clippyEl.addEventListener("mousedown", function(e){
                if (e.button === 0) startDrag(e.clientX, e.clientY);
            });
            window.addEventListener("mousemove", function(e){
                if (dragging) moveDrag(e.clientX, e.clientY);
            });
            window.addEventListener("mouseup", function(e){
                if (!dragging) return;
                if (!moved) {
                    agent.speak("Don't touch me pls! I am busy! Give me some space!");
                    agent.animate('GetAttention');
                }
                endDrag();
            });
            window.addEventListener("resize", clampToViewport);
            window.clippyReset = setDefaultPosition;
         })();


    }
});