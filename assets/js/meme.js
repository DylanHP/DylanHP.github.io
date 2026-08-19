let lastPositions = [], shakeCount = 0, firstShakeTime = null;
const shakeThreshold = 500, timeLimit = 1000, requiredShakes = 15;

function openrickroll() {
    // Mostra la tile del rickroll nel Bento OS e fa partire il video
    const rickTile = document.getElementById('rickrolled');
    const btn = document.querySelector('.nav-btn[data-target="rickrolled"]');
    
    if (rickTile && rickTile.classList.contains('hidden')) {
        rickTile.classList.remove('hidden');
        if (btn) btn.classList.add('active');
        
        // Portalo in primo piano
        rickTile.style.zIndex = 9999;
        
        // Inietta il video di YouTube con autoplay
        const rickFrame = document.getElementById('rick-iframe');
        if (rickFrame) {
            // Rimossa la playlist RD... perché YouTube blocca gli embed delle "Radio/Mix"
            rickFrame.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";
        }
    }
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
    const logo = document.querySelector('.logo img');
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