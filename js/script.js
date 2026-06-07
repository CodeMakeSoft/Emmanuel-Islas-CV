document.addEventListener('DOMContentLoaded', () => {
    // ==== COPIAR AL PORTAPAPELES ====
    const copyableItems = document.querySelectorAll('.copyable');
    copyableItems.forEach(item => {
        item.addEventListener('click', () => {
            const textToCopy = item.getAttribute('data-clipboard');
            navigator.clipboard.writeText(textToCopy).then(() => {
                item.classList.add('copied');
                setTimeout(() => {
                    item.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Error al copiar: ', err);
            });
        });
    });

    // ==== BOTÓN DE IMPRIMIR / PDF ====
    const printBtn = document.getElementById('print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // ==== TOGGLE DE MODO OSCURO/CLARO ====
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Check local storage or system preference
    const currentTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Initial load
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateIcon(currentTheme === 'dark');
    } else if (systemPrefersDark) {
        updateIcon(true);
    }

    // On click
    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let isDark = false;
        
        if (!theme) {
            theme = systemPrefersDark ? 'light' : 'dark';
        } else {
            theme = theme === 'dark' ? 'light' : 'dark';
        }
        
        isDark = theme === 'dark';
        
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateIcon(isDark);
    });

    function updateIcon(isDark) {
        if (isDark) {
            // Sun icon (Switch to light mode)
            themeIcon.innerHTML = '<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41.39.39 1.03.39 1.41 0l1.06-1.06z"/>';
        } else {
            // Moon icon (Switch to dark mode)
            themeIcon.innerHTML = '<path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>';
        }
    }
});
