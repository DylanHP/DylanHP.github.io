function initializeLogoClick() {
    document.addEventListener('DOMContentLoaded', () => {
        let clickCount = 0;
        const logo = document.querySelector('.logo');

        if (logo) {
            logo.addEventListener('click', () => {
                clickCount++;
                if (clickCount === 5) {
                    const newWindow = window.open(
                        'https://www.youtube.com/watch?v=dQw4w9WgXcQ&autoplay=1&vq=hd1080&fs=1&modestbranding=1&rel=0&showinfo=0',
                        '_blank',
                        'width=800,height=600'
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
}

initializeLogoClick();
