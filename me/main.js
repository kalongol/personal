document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check Local Storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.setAttribute('data-theme', 'dark');
    }

    toggleBtn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Start Typewriter Sequence
    startTypingSequence();
});

// Typewriter Logic
function typeWriter(element, text, speed = 40) {
    return new Promise(resolve => {
        element.textContent = '';
        element.style.visibility = 'visible';
        element.classList.add('typing-active');
        element.classList.add('typing-cursor');

        let i = 0;
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.remove('typing-cursor');
                resolve();
            }
        }
        type();
    });
}

async function startTypingSequence() {
    const name = document.querySelector('.name');
    const role = document.querySelector('.role');
    const portfolio = document.querySelector('.portfolio-link a');
    const location = document.querySelector('.location');

    const elements = [
        { el: name, text: 'Haekal Sandewang', speed: 80 },
        { el: role, text: 'Into tech, animation, design, and all things creative', speed: 30 },
        { el: portfolio, text: 'Portfolio ↗', speed: 50 },
        { el: location, text: 'Makassar, Indonesia', speed: 50 }
    ];

    // Ensure elements exist and are ready
    elements.forEach(item => {
        if (item.el) {
            // Store original text if we wanted to read it from DOM, but hardcoding for effect control is safer for now.
            // Actually, reading from DOM is better to avoid duplication.
            // Let's refactor to read from DOM if text is empty in config, but I've hardcoded.
            // Hardcoding matches the file content I verified.
            // Wait, the Portfolio text includes an arrow. The HTML has "Portfolio ↗".
            // My hardcoded text is safe.
        }
    });

    for (const item of elements) {
        if (item.el) {
            await typeWriter(item.el, item.text, item.speed);
            // Small pause between lines
            await new Promise(r => setTimeout(r, 300));
        }
    }
}
