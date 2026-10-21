// ========== DASHBOARD FUNCTIONALITY ==========

// Load User Dashboard
function loadUserDashboard() {
    const role = sessionStorage.getItem('role');
    const email = sessionStorage.getItem('username');
    const name = sessionStorage.getItem('name');

    if (!role || !email) {
        window.location.href = '/login';
        return;
    }

    const localUser = {
        name: name || email,
        email: email
    };

    updateProfileSection(localUser);
    loadRegisteredEvents();
    calculateDashboardStats();

    fetch('/api/users/me')
        .then(res => {
            if (!res.ok) {
                return null;
            }
            return res.json();
        })
        .then(user => {
            if (!user) return;
            sessionStorage.setItem('name', user.name || '');
            sessionStorage.setItem('username', user.email || '');
            updateProfileSection(user);
        })
        .catch(() => {});
}

// Update Profile Section
function updateProfileSection(user) {
    const profileSection = document.getElementById('profile-section');
    if (!profileSection) return;

    const html = `
        <div class="profile-container">
            <div class="profile-header">
                <img src="/images/default-avatar.jpg" alt="${user.name || user.email}" class="profile-image" onerror="this.src='https://via.placeholder.com/120?text=${(user.name || user.email).charAt(0)}'">
                <div class="profile-info">
                    <h2>${user.name || user.email}</h2>
                    <p>${user.email}</p>
                    <p>Member since ${new Date().toLocaleDateString()}</p>
                    <div style="margin-top:15px;">
                        <button class="btn" style="padding:10px 15px;" onclick="openEditProfileModal()">Edit Profile</button>
                        <button class="btn" style="padding:10px 15px; margin-left:10px;" onclick="logout()">Logout</button>
                    </div>
                </div>
            </div>
        </div>
        <div id="edit-profile-modal" class="modal-overlay"></div>
    `;
    profileSection.innerHTML = html;
}

function openEditProfileModal() {
    const name = sessionStorage.getItem('name') || '';
    const email = sessionStorage.getItem('username') || '';

    const modal = document.getElementById('edit-profile-modal');
    if (!modal) return;

    modal.innerHTML = `
        <div class="detail-modal" style="max-width:520px;">
            <button class="modal-close" onclick="closeEditProfileModal()">✕</button>
            <h2 style="margin-top:0; color:#fcd34d;">Edit Profile</h2>
            <div class="form-box" style="margin:0; padding:0; background:transparent; border:none; box-shadow:none;">
                <input type="text" id="editName" placeholder="Name" value="${name}">
                <input type="email" id="editEmail" placeholder="Email" value="${email}">
                <input type="password" id="editPassword" placeholder="New Password">
                <button class="btn" style="width:100%; margin-top:10px;" onclick="saveProfileChanges()">Save Changes</button>
            </div>
        </div>
    `;
    modal.classList.add('open');
}

function closeEditProfileModal() {
    const modal = document.getElementById('edit-profile-modal');
    if (!modal) return;
    modal.classList.remove('open');
}

function saveProfileChanges() {
    const name = document.getElementById('editName')?.value?.trim();
    const email = document.getElementById('editEmail')?.value?.trim();
    const password = document.getElementById('editPassword')?.value;

    if (!name || !email || !password) {
        alert('Please enter name, email, and a new password.');
        return;
    }

    const user = { name, email, password };

    fetch('/api/users/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
    .then(async res => {
        if (!res.ok) {
            const data = await res.text();
            alert('Unable to update profile. ' + data);
            return;
        }
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('username', email);
        updateNavbar();
        loadUserDashboard();
        closeEditProfileModal();
        alert('Profile updated successfully.');
    })
    .catch(() => alert('Unable to update profile.'));
}


function getRegisteredEvents() {
    const username = sessionStorage.getItem('username');
    if (!username) return [];

    const key = `registeredEvents_${encodeURIComponent(username)}`;
    const raw = localStorage.getItem(key);
    if (!raw) return [];

    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function getVisitedArtefacts() {
    const username = sessionStorage.getItem('username');
    if (!username) return [];

    const key = `visitedArtefacts_${encodeURIComponent(username)}`;
    const raw = localStorage.getItem(key);
    if (!raw) return [];

    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function loadRegisteredEvents() {
    const container = document.getElementById('registered-events');
    if (!container) return;

    const registeredIds = getRegisteredEvents();
    if (registeredIds.length === 0) {
        container.innerHTML = `<p style="color:#ccc; padding:18px;">You haven't registered for any events yet.</p>`;
        return;
    }

    fetch('/api/events')
        .then(res => res.json())
        .then(events => {
            const registeredEvents = events.filter(event => registeredIds.includes(event.eventId));

            if (registeredEvents.length === 0) {
                container.innerHTML = `<p style="color:#ccc; padding:18px;">You haven't registered for any events yet.</p>`;
                return;
            }

            container.innerHTML = registeredEvents.map(event => `
                <div class="event-card" style="margin-bottom: 18px;">
                    <img src="${event.imageUrl}" alt="${event.title}" class="event-image" onerror="this.src='/images/default-event.jpg'">
                    <div class="event-content">
                        <div class="event-date">${new Date(event.eventDate).toLocaleDateString()}</div>
                        <div class="event-title">${event.title}</div>
                        <p style="color:#aaa; font-size:14px; margin:12px 0;">${event.description.substring(0, 100)}...</p>
                        <div class="event-capacity">📍 ${event.location} | Registered: ${event.registered}/${event.capacity}</div>
                    </div>
                </div>
            `).join('');
        })
        .catch(() => {
            container.innerHTML = `<p style="color:#ffb347; padding:18px;">Unable to load registered events.</p>`;
        });
}

function calculateDashboardStats() {
    const statsContainer = document.getElementById('dashboard-stats');
    if (!statsContainer) return;

    const visitedArtefacts = getVisitedArtefacts();
    const visitedCount = visitedArtefacts.length;

    const html = `
        <div class="dashboard-card">
            <h3>👁️ Visited</h3>
            <div class="number">${visitedCount}</div>
            <p>Artefacts Explored</p>
        </div>
    `;
    statsContainer.innerHTML = html;

    document.querySelectorAll('.dashboard-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Initialize Dashboard on Load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('dashboard-stats')) {
        loadUserDashboard();
    }
});
