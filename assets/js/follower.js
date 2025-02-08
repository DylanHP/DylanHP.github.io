document.documentElement.style.cursor = 'none';
const follower = document.querySelector('.follower');
const content = document.querySelector('.content');
document.body.style.cursor = 'none';

document.body.onpointermove = ({ clientX, clientY }) => {
    follower.style.left = `${clientX - 35}px`;
    follower.style.top = `${clientY - 35}px`;
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
    article.addEventListener('mouseover', event => {
        if (!event.target.closest('.close, .icon, .send, .reset, .nav-buttons')) toggleFollower(false);
    });
    article.addEventListener('mouseout', event => {
        if (!event.target.closest('.close, .icon, .send, .reset, .nav-buttons')) toggleFollower(true);
    });
});

document.querySelectorAll('.close, .icon, .send, .reset, .nav-buttons').forEach(element => {
    element.addEventListener('mouseover', () => toggleFollower(true));
    element.addEventListener('mouseout', () => toggleFollower(false));
});

content.addEventListener('mouseover', () => toggleFollower(false));
content.addEventListener('mouseout', () => toggleFollower(true));

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('article, .content').forEach(element => {
        element.addEventListener('mouseover', () => toggleFollower(false));
        element.addEventListener('mouseout', () => toggleFollower(true));
    });
});

let lastPositions = [], shakeCount = 0, firstShakeTime = null;
const shakeThreshold = 500, timeLimit = 1000, requiredShakes = 15;

document.addEventListener("mousemove", ({ clientX, clientY }) => {
    const now = Date.now();
    lastPositions = lastPositions.filter(pos => now - pos.time <= timeLimit);
    lastPositions.push({ x: clientX, y: clientY, time: now });

    let totalDistance = lastPositions.reduce((dist, pos, i, arr) => {
        if (i === 0) return dist;
        const dx = pos.x - arr[i - 1].x, dy = pos.y - arr[i - 1].y;
        return dist + Math.sqrt(dx * dx + dy * dy);
    }, 0);

    if (totalDistance > shakeThreshold) {
        if (shakeCount === 0) firstShakeTime = now;
        shakeCount++;
        lastPositions = [];

        if (shakeCount >= requiredShakes && (now - firstShakeTime) <= timeLimit) {
            const newWindow = window.open(
                'https://www.youtube.com/watch?v=dQw4w9WgXcQ&autoplay=1&vq=hd1080&fs=1&modestbranding=1&rel=0&showinfo=0',
                '_blank', 'width=800,height=600'
            );
            if (newWindow) {
                newWindow.focus();
                newWindow.moveTo(0, 0);
                newWindow.resizeTo(screen.width, screen.height);
            }
        }

        if ((now - firstShakeTime) > timeLimit) {
            shakeCount = 1;
            firstShakeTime = now;
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    let clickCount = 0;
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            clickCount++;
            if (clickCount === 7) {
                const newWindow = window.open(
                    'https://www.youtube.com/watch?v=dQw4w9WgXcQ&autoplay=1&vq=hd1080&fs=1&modestbranding=1&rel=0&showinfo=0',
                    '_blank', 'width=800,height=600'
                );
                if (newWindow) {
                    newWindow.focus();
                    newWindow.moveTo(0, 0);
                    newWindow.resizeTo(screen.width, screen.height);
                }
                clickCount = 0;
            }
        });
    }
});