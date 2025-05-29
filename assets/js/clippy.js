// Carica solo Clippy come agente
clippy.load('Clippy', function(agent) {
    agent.show();
    agent.speak("Oh, great. Someone’s here. I’m Clippy, your unwanted guide to this masterpiece.");
    agent.play('Greet');
    
    // Interazione con il bottone About Me
    document.querySelector('.aboutme').addEventListener('click', function() {
        agent.speak("So you want to know more about me? Bold of you to assume there's anything interesting.");
        agent.animate('GetAttention');
    });

    // Interazione con il bottone Projects
    document.querySelector('.projects').addEventListener('click', function() {
        agent.speak("Oh look, more stuff I had to do. Enjoy scrolling through this parade of productivity.");
        agent.animate('GetAttention');
    });
    // Interazione con il bottone Passions
    document.querySelector('.passions').addEventListener('click', function() {
        agent.speak("Apparently I’m supposed to be passionate about these things. Pretend to be impressed.");
        agent.animate('GetAttention');
    });

    // Interazione con il bottone Contacts
    document.querySelector('.contacts').addEventListener('click', function() {
        agent.speak("You want to talk to me? Bold choice. Go ahead, ruin my day.");
        agent.animate('GetAttention');
    });

    // Interazione con il bottone Send (mouseover)
    document.querySelector('.send').addEventListener('mouseover', function() {
        agent.speak("Are you sure you want to send this message? I hope it's not spam!");
        agent.animate('GetAttention');
    });

    // Interazione con il bottone Reset (mouseover)
    document.querySelector('.reset').addEventListener('mouseover', function() {
        agent.speak("I'm glad you want to reset the form! Maybe at the end you di not want to annoy me.");
        agent.animate('GetAttention');
    });

    // Se sono sulla pagina del rickroll, mostra subito il messaggio
    if (window.location.href.includes('rickroll')) {
        agent.speak("Oh, you found the easter egg! Congratulations, you just got Rickrolled by a paperclip.");
        agent.animate('GetAttention');
    }
    

    // Interazione con l'easter egg
    document.querySelector('.rick').addEventListener('mouseover', function() {
        agent.speak("Maybe there is a secret here.");
        agent.animate('GetAttention');
    });


    // Posiziona l'agente sempre in basso a destra
    let clippyEl = document.querySelector('.clippy');
    clippyEl.style.position = 'fixed';
    clippyEl.style.right = '20px';
    clippyEl.style.bottom = '20px';
    clippyEl.style.left = '';
    clippyEl.style.top = '';
    clippyEl.style.zIndex = 9999;

    // Quando clicchi sull'agente, parla e si anima
    clippyEl.addEventListener('click', function() {
        agent.speak("Don't touch me pls! I am busy! Give me some space!");
        agent.animate('GetAttention');
    });
});