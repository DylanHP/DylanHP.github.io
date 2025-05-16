//se non hol il touch allora attivo il follower
if (!('ontouchstart' in window || navigator.maxTouchPoints)) {
    document.body.classList.add('no-touch');
    console.log("no touch");

    document.documentElement.style.cursor = 'none';
    const follower = document.querySelector('.follower');
    const content = document.querySelector('.content');
    document.body.style.cursor = 'none';


    document.body.onpointermove = ({ clientX, clientY }) => {
        const scrollX = window.scrollX || window.pageXOffset;
        const scrollY = window.scrollY || window.pageYOffset;
        follower.style.left = `${clientX + scrollX - 35}px`;
        follower.style.top = `${clientY + scrollY - 35}px`;
    };

    const elements = [
        { selector: '.passions', image: 'passions-follower.gif' },
        { selector: '.aboutme', image: 'me-follower.gif' },
        { selector: '.projects', image: 'projects-follower.gif' },
        { selector: '.icon', image: 'icons-follower.gif' },
        { selector: '.reset', image: 'reset-follower.gif' },
        { selector: '.send', image: 'send-follower.gif' },
        { selector: '.contacts', image: 'contact-follower.gif' },
        { selector: '.logo', image: 'rick-follower.gif' },
        { selector: '.close', image: 'close-follower.gif' }
    ];

    elements.forEach(({ selector, image }) => {
        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener('mouseover', () => {
                follower.style.backgroundImage = `url('../../images/${image}')`;
                follower.classList.remove('hidden');
            });
            element.addEventListener('mouseout', () => {
                follower.style.backgroundImage = "url('../../images/follower.gif')";
            });
        });
    });

    const toggleFollower = (show) => {
        follower.classList.toggle('hidden', !show);
        document.body.style.cursor = show ? 'none' : 'default';
    };

    document.querySelectorAll('article').forEach(article => {
        // Nacondo follower quando il mouse è sopra l'articolo
        article.addEventListener('mouseover', event => {
            if (!event.target.closest('.close, .icon, .send, .reset')) toggleFollower(false);
        });
        // Mostro follower quando il mouse esce dall'articolo
        article.addEventListener('mouseout', event => {
            if (!event.target.closest('.close, .icon, .send, .reset')) toggleFollower(true);
        });
    });

    function addClippyListeners(clippy) {
        clippy.addEventListener('mouseover', () => toggleFollower(false));
        clippy.addEventListener('mouseout', () => toggleFollower(true));
    }

    // Gestione per .clippy
    let clippy = document.querySelector('.clippy');
    if (clippy) {
        addClippyListeners(clippy);
    } else {
        const observer = new MutationObserver(() => {
            clippy = document.querySelector('.clippy');
            if (clippy) {
                addClippyListeners(clippy);
                observer.disconnect();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // Gestione per .clippy-balloon
    let clippyBalloon = document.querySelector('.clippy-balloon');
    if (clippyBalloon) {
        addClippyListeners(clippyBalloon);
    } else {
        const observerBalloon = new MutationObserver(() => {
            clippyBalloon = document.querySelector('.clippy-balloon');
            if (clippyBalloon) {
                addClippyListeners(clippyBalloon);
                observerBalloon.disconnect();
            }
        });
        observerBalloon.observe(document.body, { childList: true, subtree: true });
    }

    document.querySelectorAll('.close, .icon, .send, .reset').forEach(element => {
        element.addEventListener('mouseover', () => toggleFollower(true));
        element.addEventListener('mouseout', () => toggleFollower(false));
    });


    content.addEventListener('mouseover', () => toggleFollower(false));
    content.addEventListener('mouseout', () => toggleFollower(true));

    // Gestione per evitare di andare fuori dai bordi
    document.body.onpointermove = ({ clientX, clientY }) => {
        const scrollX = window.scrollX || window.pageXOffset;
        const scrollY = window.scrollY || window.pageYOffset;
        const followerRect = follower.getBoundingClientRect();
        const followerWidth = followerRect.width || 70;
        const followerHeight = followerRect.height || 70;
    
        // Usa l'area visibile effettiva per i limiti
        const maxLeft = document.documentElement.clientWidth + scrollX - followerWidth;
        const maxTop = document.documentElement.clientHeight + scrollY - followerHeight;
    
        // Centra il follower sul cursore, ma limita ai bordi
        let left = clientX + scrollX - followerWidth / 2;
        let top = clientY + scrollY - followerHeight / 2;
    
        left = Math.max(scrollX, Math.min(left, maxLeft));
        top = Math.max(scrollY, Math.min(top, maxTop));
    
        follower.style.left = `${left}px`;
        follower.style.top = `${top}px`;
    };
}
//altrimenti non faccio niente
else {
    console.log("touch");
}