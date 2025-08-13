document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Scroll-triggered Fade-in Animation ---
    // This uses the Intersection Observer API for high performance.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add the 'visible' class to trigger the CSS animation.
                entry.target.classList.add('visible');
                // Stop observing the element once it's visible to save resources.
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible.
    });

    // Find all elements with the 'fade-in' class and start observing them.
    const elementsToAnimate = document.querySelectorAll('.fade-in');
    elementsToAnimate.forEach(el => observer.observe(el));


    // --- 2. Typewriter Effect ---
    const h1 = document.querySelector('h1#typewriter');
    if (h1) {
        const textToType = h1.getAttribute('data-text');
        h1.textContent = ''; // Clear original text to prepare for typing.
        
        const textSpan = document.createElement('span');
        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'typewriter-cursor';
        
        h1.appendChild(textSpan);
        h1.appendChild(cursorSpan);

        let charIndex = 0;
        function type() {
            if (charIndex < textToType.length) {
                textSpan.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(type, 80); // Adjust typing speed here (in milliseconds).
            } else {
                // When typing is done, make the cursor stop blinking.
                cursorSpan.style.animation = 'none';
                cursorSpan.style.borderRightColor = 'transparent';
            }
        }
        
        // Start the animation after a brief delay to let the page settle.
        setTimeout(type, 500);
    }

    // --- 3. Logo fallback paths if the primary source fails ---
    const logoImg = document.querySelector('img.logo');
    if (logoImg) {
        const fallbackSources = [
            './images/logo.png',
            './Images/logo.png',
            './images/Logo.png',
            './logo.png',
        ];
        let currentAttemptIndex = 0;

        const tryNextSource = () => {
            if (currentAttemptIndex >= fallbackSources.length) {
                return; // No more fallbacks
            }
            const next = fallbackSources[currentAttemptIndex];
            currentAttemptIndex += 1;
            // Add a cache-busting query to avoid stale 404 caches on GH Pages
            const cacheBust = (next.includes('?') ? '&' : '?') + 'v=' + Date.now();
            logoImg.src = next + cacheBust;
        };

        logoImg.addEventListener('error', () => {
            tryNextSource();
        });

        // If the initial src is broken, the error handler will fire and iterate fallbacks
    }
}); 