// ========== EVENTS FUNCTIONALITY ==========

// Load All Events
function loadAllEvents() {
    fetch('/api/events')
    .then(res => res.json())
    .then(data => displayEvents(data))
    .catch(err => console.log('Error loading events'));
}

// Load Upcoming Events
function loadUpcomingEvents() {
    fetch('/api/events/upcoming')
    .then(res => res.json())
    .then(data => displayEvents(data, true))
    .catch(err => console.log('Error loading upcoming events'));
}

// Filter Events by Category
function filterEventsByCategory(category) {
    fetch(`/api/events/category/${category}`)
    .then(res => res.json())
    .then(data => displayEvents(data))
    .catch(err => console.log('Error filtering events'));
}

// View Event Detail
function viewEventDetail(eventId) {
    fetch(`/api/events/${eventId}`)
    .then(res => res.json())
    .then(event => {
        const modal = document.getElementById('eventModal');
        const modalContent = modal.querySelector('.detail-modal');
        if (modal && modalContent) {
            const registered = isEventRegistered(event.eventId);
            const buttonText = registered ? 'Unregister' : 'Register Now';
            const buttonClass = registered ? 'btn btn-unregister' : 'btn';
            
            const content = `
                <button class="modal-close" onclick="closeEventModalDirect()">✕</button>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:30px;">
                    <img src="${event.imageUrl}" alt="${event.title}" style="width:100%; border-radius:12px; max-height:400px; object-fit:cover;">
                    <div>
                        <h2 style="color:#bb86fc; margin-top:0;">${event.title}</h2>
                        <p style="color:#aaa; font-size:16px; line-height:1.6;">${event.description}</p>
                        <div style="margin:20px 0; padding:15px; background:#151520; border-radius:8px;">
                            <p><strong>Date:</strong> ${new Date(event.eventDate).toLocaleDateString()}</p>
                            <p><strong>Location:</strong> ${event.location}</p>
                            <p><strong>Category:</strong> ${event.category}</p>
                            <p><strong>Capacity:</strong> ${event.registered}/${event.capacity}</p>
                        </div>
                        <button class="${buttonClass}" style="width:100%; padding:12px;" onclick="toggleEventRegistration(${event.eventId})">${buttonText}</button>
                    </div>
                </div>
            `;
            modalContent.innerHTML = content;
            modal.classList.add('open');
        }
    })
    .catch(err => console.log('Error loading event detail'));
}

// Close Event Modal
function closeEventModal(e) {
    if (e.target.id === "eventModal") {
        const modal = document.getElementById('eventModal');
        if (modal) {
            modal.classList.remove('open');
        }
    }
}

function closeEventModalDirect() {
    const modal = document.getElementById('eventModal');
    if (modal) {
        modal.classList.remove('open');
    }
}

function getCurrentUserKey() {
    const username = sessionStorage.getItem('username');
    if (!username) return null;
    return `registeredEvents_${encodeURIComponent(username)}`;
}

function getRegisteredEventsForCurrentUser() {
    const key = getCurrentUserKey();
    if (!key) return [];
    const raw = localStorage.getItem(key);

    try {
        const value = raw ? JSON.parse(raw) : [];
        return Array.isArray(value) ? value : [];
    } catch {
        return [];
    }
}

function isEventRegistered(eventId) {
    return getRegisteredEventsForCurrentUser().includes(eventId);
}

function saveRegisteredEvent(eventId) {
    const key = getCurrentUserKey();
    if (!key) return;

    const registered = getRegisteredEventsForCurrentUser();
    if (!registered.includes(eventId)) {
        registered.push(eventId);
    }
    localStorage.setItem(key, JSON.stringify(registered));
}

function removeRegisteredEvent(eventId) {
    const key = getCurrentUserKey();
    if (!key) return;

    const registered = getRegisteredEventsForCurrentUser();
    const index = registered.indexOf(eventId);
    if (index > -1) {
        registered.splice(index, 1);
    }
    localStorage.setItem(key, JSON.stringify(registered));
}

// Toggle Event Registration
function toggleEventRegistration(eventId) {
    const role = sessionStorage.getItem('role');
    if (!role) {
        window.location.href = '/login';
        return;
    }

    if (isEventRegistered(eventId)) {
        // Unregister
        removeRegisteredEvent(eventId);
        showToast('✅ Successfully unregistered from the event!', 'success');
    } else {
        // Register
        saveRegisteredEvent(eventId);
        showToast('✅ Successfully registered for the event!', 'success');
    }
    
    // Update modal button if modal is open
    updateModalButton(eventId);
    
    // Reload events to update the cards
    loadUpcomingEvents();
}

function updateModalButton(eventId) {
    const modal = document.getElementById('eventModal');
    if (!modal || !modal.classList.contains('open')) return;
    
    const registered = isEventRegistered(eventId);
    const buttonText = registered ? 'Unregister' : 'Register Now';
    const buttonClass = registered ? 'btn btn-unregister' : 'btn';
    
    // Find the register/unregister button (not the close button)
    const buttons = modal.querySelectorAll('.detail-modal button');
    const registerButton = Array.from(buttons).find(btn => !btn.classList.contains('modal-close'));
    
    if (registerButton) {
        registerButton.textContent = buttonText;
        registerButton.className = buttonClass;
        registerButton.onclick = () => toggleEventRegistration(eventId);
    }
}

function displayEvents(events, isUpcoming = false) {
    const container = document.getElementById('events-container');
    if (!container) return;

    if (events.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#aaa; grid-column:1/-1;">No events found.</p>';
        return;
    }

    container.innerHTML = '';
    events.forEach((event, index) => {
        const eventDate = new Date(event.eventDate);
        const daysLeft = Math.ceil((eventDate - new Date()) / (1000 * 60 * 60 * 24));
        const registered = isEventRegistered(event.eventId);
        const buttonText = registered ? 'Unregister' : 'Register Now';
        const buttonClass = registered ? 'btn btn-unregister' : 'btn';

        const html = `
            <div class="event-card" onclick="viewEventDetail(${event.eventId})">
                <img src="${event.imageUrl}" alt="${event.title}" class="event-image" onerror="this.src='/images/default-event.jpg'">
                <div class="event-content">
                    <div class="event-date">${eventDate.toLocaleDateString()} ${daysLeft > 0 ? `(${daysLeft} days left)` : '(Ongoing)'}</div>
                    <div class="event-title">${event.title}</div>
                    <p style="color:#aaa; font-size:14px;">${event.description.substring(0, 80)}...</p>
                    <div class="event-capacity">📍 ${event.location} | Registered: ${event.registered}/${event.capacity}</div>
                    <button class="${buttonClass}" style="width:100%; margin-top:10px;" onclick="event.stopPropagation(); toggleEventRegistration(${event.eventId})">${buttonText}</button>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}

// Load events on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('events-container')) {
        loadUpcomingEvents();
    }
});
