// #region password auth
let adminAppsLoaded = false;
let adminAuthenticated = false;

// Hash password using SHA-256
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

function showPasswordPrompt() {
    const modal = document.getElementById('password-modal');
    const passwordInput = document.getElementById('admin-password-input');
    const errorMsg = document.getElementById('password-error');

    modal.style.display = 'flex';
    errorMsg.style.display = 'none';
    passwordInput.value = '';
    
    // Delay focus for better mobile compatibility
    setTimeout(() => {
        passwordInput.focus();
    }, 300);
}

function closePasswordModal() {
    const modal = document.getElementById('password-modal');
    modal.style.display = 'none';
}

async function verifyPassword() {
    const passwordInput = document.getElementById('admin-password-input');
    const errorMsg = document.getElementById('password-error');
    const password = passwordInput.value;

    if (!password) {
        errorMsg.textContent = 'Please enter a password';
        errorMsg.style.display = 'block';
        return;
    }

    try {
        const response = await fetch('resources/data/auth.json');
        const data = await response.json();
        const storedHash = data.passwordHash;

        if (!storedHash) {
            errorMsg.textContent = 'Password not configured. Please contact administrator.';
            errorMsg.style.display = 'block';
            return;
        }

        const inputHash = await hashPassword(password);

        if (inputHash === storedHash) {
            adminAuthenticated = true;
            closePasswordModal();

            if (!adminAppsLoaded) {
                await loadAdminApps();
            }

            const content = document.getElementById('admin-section');
            const toggleIcon = document.getElementById('admin-section-toggle');
            content.classList.add('open');
            toggleIcon.classList.remove('collapsed');
        } else {
            errorMsg.textContent = 'Invalid password';
            errorMsg.style.display = 'block';
            passwordInput.value = '';
            passwordInput.focus();
        }
    } catch (error) {
        console.error('Error verifying password:', error);
        errorMsg.textContent = 'Error verifying password. Please try again.';
        errorMsg.style.display = 'block';
    }
}
// #endregion

function toggleCollapse(sectionId) {
    const content = document.getElementById(sectionId);
    const toggleIcon = document.getElementById(sectionId + '-toggle');
    if (!content || !toggleIcon) return;

    if (sectionId === 'admin-section' && !adminAuthenticated) {
        showPasswordPrompt();
        return;
    }

    const isOpen = content.classList.contains('open');
    if (isOpen) {
        content.classList.remove('open');
        toggleIcon.classList.add('collapsed');
    } else {
        content.classList.add('open');
        toggleIcon.classList.remove('collapsed');
    }
}

function createAppCard(app) {
    const card = document.createElement('a');
    card.href = app.url;
    card.className = 'app-card';
    
    // Add target="_blank" for external links
    if (app.url.startsWith('http')) {
        card.target = '_blank';
    }
    
    // Add badge if requires authentication
    if (app.showBadge) {
        const badge = document.createElement('span');
        badge.className = 'app-badge';
        badge.textContent = app.badge;
        badge.style.backgroundColor = app.badgeColor
        card.appendChild(badge);
    }
    
    // App icon
    const iconDiv = document.createElement('div');
    iconDiv.className = 'app-icon';
    const img = document.createElement('img');
    img.src = app.logo;
    img.alt = app.name + ' Logo';
    iconDiv.appendChild(img);
    card.appendChild(iconDiv);
    
    // App info
    const infoDiv = document.createElement('div');
    infoDiv.className = 'app-info';
    const title = document.createElement('h3');
    title.textContent = app.name;
    const description = document.createElement('p');
    description.textContent = app.description;
    infoDiv.appendChild(title);
    infoDiv.appendChild(description);
    card.appendChild(infoDiv);
    
    return card;
}

async function loadAdminApps() {
    try {
        const response = await fetch('resources/data/apps.json');
        const data = await response.json();

        const adminGrid = document.getElementById('admin-apps-grid');
        if (adminGrid) {
            adminGrid.innerHTML = '';
            (data.admin || []).forEach(app => {
                adminGrid.appendChild(createAppCard(app));
            });
            adminAppsLoaded = true;
        }
    } catch (error) {
        console.error('Error loading admin apps:', error);
    }
}

// Function to load apps from JSON
async function loadApps() {
    try {
        const response = await fetch('resources/data/apps.json');
        const data = await response.json();

        // Load home apps
        const homeGrid = document.getElementById('home-apps-grid');
        if (homeGrid) {
            data.public.slice(0,4).forEach(app => {
                homeGrid.appendChild(createAppCard(app));
            });
        }
        
        // Load public apps
        const publicGrid = document.getElementById('public-apps-grid');
        if (publicGrid) {
            data.public.forEach(app => {
                publicGrid.appendChild(createAppCard(app));
            });
        }
        
        // Load restricted apps
        const restrictedGrid = document.getElementById('restricted-apps-grid');
        if (restrictedGrid) {
            data.restricted.forEach(app => {
                restrictedGrid.appendChild(createAppCard(app));
            });
        }

    } catch (error) {
        console.error('Error loading apps:', error);
    }
}

// Load apps when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    loadApps();

    const passwordInput = document.getElementById('admin-password-input');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', e => {
            if (e.key === 'Enter') verifyPassword();
        });
    }

    const modal = document.getElementById('password-modal');
    if (modal) {
        modal.addEventListener('click', e => {
            if (e.target === modal) closePasswordModal();
        });
    }
});