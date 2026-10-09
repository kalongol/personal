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

    // Language toggle (initial language is set in <head>)
    const langBtn = document.getElementById('lang-toggle');
    const titles = { en: '👋 Hi from Haekal Sandewang', id: '👋 Halo dari Haekal Sandewang' };

    function applyLang(lang) {
        html.setAttribute('data-lang', lang);
        html.lang = lang;
        document.title = titles[lang];
        // The button offers the *other* language
        langBtn.textContent = lang === 'en' ? '[ Bahasa Indonesia ]' : '[ English ]';
        langBtn.lang = lang === 'en' ? 'id' : 'en';
    }

    applyLang(html.getAttribute('data-lang') === 'id' ? 'id' : 'en');

    langBtn.addEventListener('click', () => {
        const newLang = html.getAttribute('data-lang') === 'en' ? 'id' : 'en';
        applyLang(newLang);
        try { localStorage.setItem('lang', newLang); } catch (e) { }
    });

    // Start Glitch Sequence
    startGlitchSequence();
});

// Glitch Sequence Logic
function startGlitchSequence() {
    const html = document.documentElement;

    // Intro is skipped for reduced motion / repeat visits (decided in <head>), or if the failsafe already fired.
    if (html.classList.contains('skip-intro')) return;

    html.classList.add('intro-started');
    try { sessionStorage.setItem('introSeen', '1'); } catch (e) { }

    // Text comes from the HTML itself, so wording is edited in one place only.
    // Bilingual elements hold one <span lang> per language; only the active language is animated.
    const lang = html.getAttribute('data-lang');
    const elements = ['.name', '.role', '.location', '.portfolio-link a']
        .map(selector => document.querySelector(selector))
        .filter(Boolean)
        .map(el => {
            const target = el.querySelector('span[lang="' + lang + '"]') || el;
            return { el, target, text: target.textContent.trim() };
        });

    let globalDelay = 200;

    elements.forEach((item) => {
        item.el.classList.add('glitch-active');
        item.target.textContent = ''; // clear original text

        // Split into words, keeping spaces
        const words = item.text.split(/(\s+)/);
        
        words.forEach((word, wordIndex) => {
            if (word.trim() === '') {
                item.target.appendChild(document.createTextNode(word));
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
            item.target.appendChild(wordContainer);
            
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

    // Trigger pull-up of the header after glitch sequence completely finishes
    setTimeout(() => {
        document.querySelector('.cv-header').classList.add('pull-up');
    }, globalDelay + 250);

    // Wait 0.3s (300ms) after the pull up starts to reveal the rest of the content
    setTimeout(() => {
        const revealElements = document.querySelectorAll('.divider, .section, .cv-footer');
        revealElements.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('reveal-content');
            }, i * 150); // Stagger each section's appearance by 150ms
        });
    }, globalDelay + 550);
}
