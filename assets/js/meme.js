let lastPositions = [], shakeCount = 0, firstShakeTime = null;
const shakeThreshold = 500, timeLimit = 1000, requiredShakes = 15;

function openrickroll() {
    const newWindow = window.open(
        'https://www.youtube.com/watch?v=dQw4w9WgXcQ&autoplay=1&vq=hd1080&fs=1&modestbranding=1&rel=0&showinfo=0',
        '_blank', 'width=800,height=600'
    );
    if (newWindow) {
        newWindow.focus();
        newWindow.moveTo(0, 0);
        newWindow.resizeTo(screen.width, screen.height);
    }
    window.location.hash = "rickrolled";
}


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
            openrickroll();
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
                openrickroll();
                clickCount = 0;
            }
        });
    }
});