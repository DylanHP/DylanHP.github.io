// Scegli un agente casuale tra quelli disponibili, escludendo l'ultimo visualizzato
const agents = ['Bonzi', 'Clippy', 'F1', 'Genie', 'Merlin', 'Peedy', 'Rover'];
const lastAgent = localStorage.getItem('lastClippyAgent');
const availableAgents = lastAgent ? agents.filter(a => a !== lastAgent) : agents;
const randomAgent = availableAgents[Math.floor(Math.random() * availableAgents.length)];

// Salva l'agente scelto per il prossimo caricamento
localStorage.setItem('lastClippyAgent', randomAgent);

// Inizializzazione di Clippy (o altro agente)
clippy.load(randomAgent, function(agent) {
    agent.show();
    agent.speak(`Hi! I'm ${randomAgent}! I am here to annoy you.`);
    agent.play('Greet');
    
    // Interazione con il bottone About Me
    document.querySelector('.aboutme').addEventListener('click', function() {
        agent.speak("So you want to know more about me? Interesting!");
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