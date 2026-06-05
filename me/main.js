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

    // Start Glitch Sequence
    startGlitchSequence();
});

// Glitch Sequence Logic
function startGlitchSequence() {
    const name = document.querySelector('.name');
    const role = document.querySelector('.role');
    const location = document.querySelector('.location');
    const portfolio = document.querySelector('.portfolio-link a');

    const elements = [
        { el: name, text: 'Haekal Sandewang' },
        { el: role, text: 'Into tech, animation, design, and all things creative' },
        { el: location, text: 'Makassar, Indonesia' },
        { el: portfolio, text: 'Portfolio ↗' }
    ];

    let globalDelay = 200;

    elements.forEach((item, lineIndex) => {
        if (!item.el) return;
        
        item.el.classList.add('glitch-active');
        item.el.textContent = ''; // clear original text
        
        // Split into words, keeping spaces
        const words = item.text.split(/(\s+)/); 
        
        words.forEach((word, wordIndex) => {
            if (word.trim() === '') {
                item.el.appendChild(document.createTextNode(word));
                return;
            }
            
            const wordContainer = document.createElement('span');
            wordContainer.className = 'glitch-word';
            
            const textSpan = document.createElement('span');
            textSpan.className = 'glitch-text';
            textSpan.textContent = word;
            
            const blockSpan = document.createElement('span');
            blockSpan.className = 'glitch-block';
            
            wordContainer.appendChild(textSpan);
            wordContainer.appendChild(blockSpan);
            item.el.appendChild(wordContainer);
            
            // Stagger each word
            const delay = globalDelay + (wordIndex * 120);
            
            setTimeout(() => {
                blockSpan.classList.add('is-glitching');
                setTimeout(() => {
                    blockSpan.classList.remove('is-glitching');
                    blockSpan.style.display = 'none';
                    textSpan.style.opacity = '1';
                }, 250); // Glitch flash duration
            }, delay);
        });
        
        // Add enough delay for the next line to start after this line finishes
        globalDelay += (words.length * 120) + 100;
    });

    // Add 0.3s (300ms) delay after the header animation to reveal the rest of the content
    setTimeout(() => {
        document.querySelectorAll('.divider, .section, .cv-footer').forEach(el => {
            el.classList.add('reveal-content');
        });
    }, globalDelay + 300);
}
