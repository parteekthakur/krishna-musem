let allData = [];

window.onload = function () {

    fetch("/api/artefacts")
        .then(res => res.json())
        .then(data => {
            allData = data;
            display(data.slice(0, 6)); // ONLY 6
        });
};

function display(data) {
    let container = document.getElementById("artefacts-container");
    container.innerHTML = "";

    data.forEach(a => {
        container.innerHTML += `
            <div class="artefact-card" onclick="openModal(${a.artefactId})">
                <img class="card-image" src="${a.imageUrl}">
                <div class="card-info">
                    <h3>${a.name}</h3>
                    <p>${a.type}</p>
                    <div class="card-bottom">
                        ${a.dynasty}<br>${a.region}
                    </div>
                </div>
            </div>
        `;
    });
}

// HOMEPAGE IMAGE ZOOM FUNCTIONS
function zoomHomepageImage(imageSrc) {
    const modal = document.getElementById('homepageImageModal');
    const image = document.getElementById('homepageImage');
    
    if (modal && image) {
        image.src = imageSrc;
        modal.classList.add('open');
    }
}

function closeHomepageImageModal(e) {
    if (e.target.id === "homepageImageModal") {
        const modal = document.getElementById('homepageImageModal');
        if (modal) {
            modal.classList.remove('open');
        }
    }
}

function closeHomepageImageModalDirect() {
    const modal = document.getElementById('homepageImageModal');
    if (modal) {
        modal.classList.remove('open');
    }
}