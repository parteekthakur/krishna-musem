let allData = [];

// LOAD DEFAULT FLOOR
window.onload = function () {
    loadFloor(1);
};


// LOAD FLOOR DATA
function loadFloor(floor) {

    // 🔹 FLOOR DESCRIPTION
    let info = document.getElementById("floor-info");

    if (floor == 1) {
        info.innerHTML = "<h2>Floor 1 - Sculptures</h2><p>Ancient sculptures of Krishna, Vishnu, and deities.</p>";
    }
    else if (floor == 2) {
        info.innerHTML = "<h2>Floor 2 - Paintings & Manuscripts</h2><p>Mahabharata paintings and sacred texts.</p>";
    }
    else {
        info.innerHTML = "<h2>Floor 3 - Coins & Ritual Objects</h2><p>Ancient coins and temple objects.</p>";
    }

    // 🔹 FETCH DATA
    fetch("/api/artefacts/floor/" + floor)
        .then(res => res.json())
        .then(data => {
            allData = data;
            display(data);
        })
        .catch(() => {
            document.getElementById("travel-container").innerHTML =
                "<h2>Failed to load artefacts</h2>";
        });
}


// DISPLAY FUNCTION (UPDATED 🔥)
function display(data) {

    let container = document.getElementById("travel-container"); // ✅ FIXED
    container.innerHTML = "";

    data.forEach(a => {
        container.innerHTML += `
            <div class="artefact-card" onclick="openModal(${a.artefactId})">
                
                <img class="card-image" src="${a.imageUrl}" alt="${a.name}">
                
                <div class="card-info">
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
}


// 🔥 MODAL OPEN
function openModal(id) {

    let a = allData.find(x => x.artefactId === id);

    if (!a) return;

    document.getElementById("detailImage").src = a.imageUrl;
    document.getElementById("detailCode").innerText = a.code || "";
    document.getElementById("detailName").innerText = a.name;
    document.getElementById("detailType").innerText = a.type;
    document.getElementById("detailMaterial").innerText = a.material;
    document.getElementById("detailDynasty").innerText = a.dynasty;
    document.getElementById("detailRegion").innerText = a.region;
    document.getElementById("detailDeity").innerText = a.deity;
    document.getElementById("detailMuseum").innerText = a.museum;
    document.getElementById("detailDesc").innerText = a.description;

    document.getElementById("artefactModal").classList.add("open");
}


// 🔹 CLOSE MODAL (click outside)
function closeModal(e) {
    if (e.target.id === "artefactModal") {
        closeModalDirect();
    }
}

// 🔹 CLOSE BUTTON
function closeModalDirect() {
    document.getElementById("artefactModal").classList.remove("open");
}