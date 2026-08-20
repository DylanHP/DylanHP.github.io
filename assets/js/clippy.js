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
        clippyEl.style.right = '16px';
        clippyEl.style.bottom = '16px';
        clippyEl.style.left = 'auto';
        clippyEl.style.top = 'auto';
        
        clippyEl.addEventListener('click', function(e) {
            agent.speak("Don't touch me pls! I am busy! Give me some space!");
            agent.animate('GetAttention');
        });

        // Drag support: touch and mouse (viewport clamp, delta handling, no jump)
        let dragType = null;
        let dragStartX, dragStartY, elemStartLeft, elemStartTop;
        let dragHasMoved = false;

        function clamp(val, min, max) {
            return Math.max(min, Math.min(max, val));
        }
        function getClippyDims() {
            const rect = clippyEl.getBoundingClientRect();
            return { width: rect.width, height: rect.height };
        }
        function getViewportDims() {
            return { width: window.innerWidth, height: window.innerHeight };
        }

        // Start drag universal
        function dragStart(x, y, type) {
            dragType = type;
            dragStartX = x;
            dragStartY = y;
            const rect = clippyEl.getBoundingClientRect();
            elemStartLeft = rect.left;
            elemStartTop = rect.top;
            // Fix style
            clippyEl.style.right = 'auto';
            clippyEl.style.bottom = 'auto';
            clippyEl.style.left = elemStartLeft + 'px';
            clippyEl.style.top = elemStartTop + 'px';
            dragHasMoved = false;
        }
        
        // Drag move universal
        function dragMove(x, y) {
            const dx = x - dragStartX;
            const dy = y - dragStartY;
            const dims = getClippyDims();
            const vp = getViewportDims();
            let newLeft = clamp(elemStartLeft + dx, 2, vp.width - dims.width - 2);
            let newTop  = clamp(elemStartTop + dy, 2, vp.height - dims.height - 2);
            clippyEl.style.left = newLeft + 'px';
            clippyEl.style.top  = newTop  + 'px';
            dragHasMoved = Math.abs(dx) > 5 || Math.abs(dy) > 5;
        }
        // End drag universal
        function dragEnd(e) {
            dragType = null;
        }
        // Touch events
        clippyEl.addEventListener('touchstart', function(e) {
            if (e.touches.length !== 1) return;
            dragStart(e.touches[0].clientX, e.touches[0].clientY, 'touch');
        }, { passive: true });
        window.addEventListener('touchmove', function(e) {
            if (dragType !== 'touch' || e.touches.length !== 1) return;
            dragMove(e.touches[0].clientX, e.touches[0].clientY);
            if (dragHasMoved && e.cancelable) e.preventDefault();
        }, { passive: false });
        window.addEventListener('touchend', function(e) {
            if (dragType === 'touch') dragEnd(e);
        });
        // Mouse events
        clippyEl.addEventListener('mousedown', function(e) {
            if (e.button !== 0) return;
            dragStart(e.clientX, e.clientY, 'mouse');
            e.preventDefault();
        });
        window.addEventListener('mousemove', function(e) {
            if (dragType !== 'mouse') return;
            dragMove(e.clientX, e.clientY);
        });
        window.addEventListener('mouseup', function(e) {
            if (dragType === 'mouse') dragEnd(e);
        });
    }
});