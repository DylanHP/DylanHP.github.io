// Modulo Matter.js
const { Engine, Render, Runner, Bodies, Composite } = Matter;

// Crea un motore
const engine = Engine.create();
const world = engine.world;

// Crea un renderer
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: '#fafafa'
    }
});

Render.run(render);

// Crea un runner
const runner = Runner.create();
Runner.run(runner, engine);

// Aggiungi dei corpi
const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight - 25, window.innerWidth, 50, {
    isStatic: true,
    render: {
        fillStyle: 'brown'
    }
});
Composite.add(world, ground);

// Seleziona gli elementi nav-buttons
const navButtons = document.querySelectorAll('.nav-buttons a');
navButtons.forEach(button => {
    const rect = button.getBoundingClientRect();
    const body = Bodies.rectangle(rect.left + rect.width / 2, rect.top + rect.height / 2, rect.width, rect.height, {
        render: {
            fillStyle: 'transparent',
            strokeStyle: 'black',
            lineWidth: 1
        }
    });
    Composite.add(world, body);

    // Aggiorna la posizione dell'elemento HTML in base alla posizione del corpo
    Events.on(engine, 'afterUpdate', () => {
        button.style.position = 'absolute';
        button.style.left = `${body.position.x - rect.width / 2}px`;
        button.style.top = `${body.position.y - rect.height / 2}px`;
    });
});

// Aggiungi un evento di resize per aggiornare il renderer
window.addEventListener('resize', () => {
    render.canvas.width = window.innerWidth;
    render.canvas.height = window.innerHeight;
    Matter.Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight - 25 });
    Matter.Body.setVertices(ground, [
        { x: 0, y: window.innerHeight - 25 },
        { x: window.innerWidth, y: window.innerHeight - 25 },
        { x: window.innerWidth, y: window.innerHeight + 25 },
        { x: 0, y: window.innerHeight + 25 }
    ]);
});