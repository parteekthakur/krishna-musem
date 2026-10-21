// ========== THEME TOGGLE FUNCTIONALITY ==========

// Initialize Theme
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'krishna';
    applyTheme(savedTheme);
    createThemeToggle();
}

// Apply Theme
function applyTheme(theme) {
    document.body.classList.remove('day-theme', 'krishna-theme');

    if (theme === 'day') {
        document.body.classList.add('day-theme');
    } else {
        document.body.classList.add('krishna-theme');
    }

    localStorage.setItem('theme', theme);
}

// Create Theme Toggle Button
function createThemeToggle() {
    if (document.getElementById('theme-toggle')) return;

    const toggle = document.createElement('button');
    toggle.id = 'theme-toggle';
    toggle.className = 'theme-toggle';
    toggle.innerHTML = getThemeIcon();
    toggle.onclick = toggleTheme;
    
    document.body.appendChild(toggle);
}

// Get Theme Icon
function getThemeIcon() {
    const currentTheme = localStorage.getItem('theme') || 'krishna';

    return currentTheme === 'day' ? '🌙' : '🕉️';
}

// Toggle Theme
function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'krishna';
    const newTheme = currentTheme === 'day' ? 'krishna' : 'day';

    applyTheme(newTheme);

    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.innerHTML = getThemeIcon();
        toggle.style.transform = 'rotate(180deg)';
        setTimeout(() => {
            toggle.style.transform = 'rotate(0deg)';
        }, 300);
    }

    showToast(`Switched to ${newTheme} mode! 🎨`, 'success');
}



// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeTheme);
