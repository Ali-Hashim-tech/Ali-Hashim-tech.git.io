let lastScrollTop = 0; // Keeps track of the last scroll position
const header = document.querySelector('header'); // Select the header element

// Throttle function to limit the rate of function calls
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function() {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

function handleScroll() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        // Scrolling down
        header.classList.add('hidden');
    } else {
        // Scrolling up or at the top
        header.classList.remove('hidden');
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
}

// Throttle scroll event handling
window.addEventListener('scroll', throttle(handleScroll, 100));

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');

// Apply theme based on the state
function applyTheme(isLightTheme) {
    document.body.className = isLightTheme ? 'light-theme' : 'dark-theme';
}

// Check the saved theme in localStorage and apply it
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        themeToggle.checked = savedTheme === 'light';
        applyTheme(savedTheme === 'light');
    } else {
        // Default theme
        applyTheme(false);
    }
});

// Save the selected theme to localStorage when the toggle changes
themeToggle.addEventListener('change', (e) => {
    const isLightTheme = e.target.checked;
    applyTheme(isLightTheme);
    localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
});

