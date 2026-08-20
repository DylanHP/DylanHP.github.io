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
        clippyEl.style.left = '120px';  // Sotto il profilo
        clippyEl.style.bottom = '40px'; 
        clippyEl.style.right = 'auto';  // Rimuoviamo l'ancoraggio a destra
        clippyEl.style.zIndex = 9999;
        
        clippyEl.addEventListener('click', function(e) {
            agent.speak("Don't touch me pls! I am busy! Give me some space!");
            agent.animate('GetAttention');
        });

        // Touch drag support for mobile
        let isDragging = false;
        let startX, startY, initialLeft, initialTop;

        clippyEl.addEventListener('touchstart', function(e) {
            isDragging = true;
            let rect = clippyEl.getBoundingClientRect();
            initialLeft = rect.left;
            initialTop = rect.top;
            
            // Convert to top/left positioning for dragging
            clippyEl.style.bottom = 'auto';
            clippyEl.style.right = 'auto';
            clippyEl.style.top = initialTop + 'px';
            clippyEl.style.left = initialLeft + 'px';

            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            
            let currentX = e.touches[0].clientX;
            let currentY = e.touches[0].clientY;
            
            let dx = currentX - startX;
            let dy = currentY - startY;
            
            if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
                clippyEl.style.left = (initialLeft + dx) + 'px';
                clippyEl.style.top = (initialTop + dy) + 'px';
                if (e.cancelable) e.preventDefault();
            }
        }, { passive: false });

        document.addEventListener('touchend', function() {
            isDragging = false;
        });
    }
});