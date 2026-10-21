// FUNCTION TO UPDATE NAVBAR
if (typeof window.showToast !== "function") {
    window.showToast = function(message, type) {
        const toast = document.createElement("div");
        toast.textContent = message;
        toast.style.position = "fixed";
        toast.style.top = "20px";
        toast.style.right = "20px";
        toast.style.padding = "12px 16px";
        toast.style.borderRadius = "10px";
        toast.style.zIndex = "9999";
        toast.style.fontWeight = "600";
        toast.style.background = type === "error" ? "#c62828" : "#2e7d32";
        toast.style.color = "#fff";
        toast.style.boxShadow = "0 10px 24px rgba(0,0,0,0.3)";

        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2500);
    };
}

function updateNavbar() {
    let role = sessionStorage.getItem("role");
    let name = sessionStorage.getItem("name") || sessionStorage.getItem("username");

    let loginBtn = document.getElementById("loginBtn");
    let registerBtn = document.getElementById("registerBtn");
    let logoutBtn = document.getElementById("logoutBtn");
    let welcomeText = document.getElementById("welcomeText");
    let adminBtn = document.getElementById("adminBtn");
    let dashboardBtn = document.getElementById("dashboardBtn");

    // 🔥 LOGIN STATE (ROLE-INDEPENDENT)
    if (role) {
        // Hide login/register
        if (loginBtn) loginBtn.style.display = "none";
        if (registerBtn) registerBtn.style.display = "none";

        // Show logout
        if (logoutBtn) logoutBtn.style.display = "inline-block";

        // Show dashboard
        if (dashboardBtn) dashboardBtn.style.display = "inline-block";

        // Show user name
        if (welcomeText && name) {
            welcomeText.innerText = "Welcome, " + name;
        }

        // 🔹 ADMIN BUTTON ONLY FOR ADMIN
        if (adminBtn) {
            adminBtn.style.display = (role === "ADMIN") ? "inline-block" : "none";
        }
    } else {
        // Not logged in
        if (loginBtn) loginBtn.style.display = "inline-block";
        if (registerBtn) registerBtn.style.display = "inline-block";
        if (logoutBtn) logoutBtn.style.display = "none";
        if (dashboardBtn) dashboardBtn.style.display = "none";
        if (welcomeText) welcomeText.innerText = "";
        if (adminBtn) adminBtn.style.display = "none";
    }
}

// RUN NAVBAR UPDATE IMMEDIATELY
document.addEventListener("DOMContentLoaded", function() {
    updateNavbar();

    // 🔹 LOAD ONLY 6 ARTEFACTS (HOME PAGE)
    let container = document.getElementById("artefacts-container");
    if (container) {
        fetch("/api/artefacts")
            .then(res => res.json())
            .then(data => display(data.slice(0, 6)))
            .catch(() => {
                container.innerHTML = "<h2>Failed to load data</h2>";
            });
    }
});

// Also run on window load as backup
window.addEventListener("load", updateNavbar);


// DISPLAY FUNCTION
function display(data) {

    let container = document.getElementById("artefacts-container");
    if (!container) return;

    container.innerHTML = "";

    data.forEach((a, index) => {
        container.innerHTML += `
            <div class="artefact-card" style="animation-delay: ${index * 0.1}s;">
                <button class="wishlist-btn" data-wishlist-id="${a.artefactId}" onclick="event.stopPropagation(); addToWishlist(${a.artefactId})">🤍</button>
                <img class="card-image" src="${a.imageUrl}" alt="${a.name}" onclick="showDetail(${a.artefactId})">
                
                <div class="card-info" onclick="showDetail(${a.artefactId})">
                    <h3>${a.name}</h3>
                    <p>${a.type}</p>

                    <div class="card-bottom">
                        ${a.dynasty}<br>
                        ${a.region}
                    </div>
                </div>
            </div>
        `;
    });

    // Check wishlist status for each artefact
    data.forEach(a => {
        checkWishlist(a.artefactId);
    });
}


// SEARCH FUNCTION
function search() {

    let keyword = document.getElementById("searchInput").value;

    fetch("/api/artefacts/search?keyword=" + keyword)
        .then(res => res.json())
        .then(data => display(data))
        .catch(() => {
            alert("Search failed!");
        });
}


// CARD CLICK - SHOW DETAIL
function showDetail(id) {
    fetch(`/api/artefacts/${id}`)
        .then(res => res.json())
        .then(artefact => {
            displayDetail(artefact);
        })
        .catch(err => showToast('Error loading details', 'error'));
}

// DISPLAY DETAIL MODAL
function displayDetail(artefact) {
    const modal = document.getElementById("artefactModal");
    
    let html = `
        <div class="detail-modal">
            <button class="modal-close" onclick="closeModalDirect()">✕</button>
            <button class="wishlist-btn" style="position:absolute; top:70px; right:20px;" data-wishlist-id="${artefact.artefactId}" onclick="addToWishlist(${artefact.artefactId})">🤍</button>
            
            <div class="detail-layout">
                <div class="detail-left">
                    <img id="detailImage" src="${artefact.imageUrl}">
                </div>

                <div class="detail-right">
                    <div id="detailCode" class="detail-code">${artefact.code}</div>
                    <h2 id="detailName">${artefact.name}</h2>
                    <p id="detailType" style="color:#bb86fc; font-size:16px;">${artefact.type}</p>

                    <div class="detail-grid">
                        <div><strong>Material:</strong> <span id="detailMaterial">${artefact.material}</span></div>
                        <div><strong>Dynasty:</strong> <span id="detailDynasty">${artefact.dynasty}</span></div>
                        <div><strong>Region:</strong> <span id="detailRegion">${artefact.region}</span></div>
                        <div><strong>Deity:</strong> <span id="detailDeity">${artefact.deity}</span></div>
                        <div><strong>Museum:</strong> <span id="detailMuseum">${artefact.museum}</span></div>
                        <div><strong>Floor:</strong> <span id="detailFloor">${artefact.floor}</span></div>
                    </div>

                    <p id="detailDesc" style="color:#ddd; line-height:1.6; margin-top:20px;">${artefact.description}</p>
                    
                    <div id="ratings-${artefact.artefactId}"></div>
                    <div id="reviews-${artefact.artefactId}"></div>
                </div>
            </div>
        </div>
    `;
    
    modal.innerHTML = html;
    modal.classList.add('open');
    
    // Load ratings
    displayStarRating(artefact.artefactId);
    loadArtefactRatings(artefact.artefactId);
    
    // Check wishlist
    checkWishlist(artefact.artefactId);
}

// CLOSE MODAL
function closeModal(event) {
    if (event.target.id === "artefactModal") {
        document.getElementById("artefactModal").classList.remove('open');
    }
}

function closeModalDirect() {
    document.getElementById("artefactModal").classList.remove('open');
}


// LOGOUT FUNCTION
function logout() {
    sessionStorage.clear();
    window.location.href = "/";
}