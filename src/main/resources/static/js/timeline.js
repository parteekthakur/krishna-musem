// ========== TIMELINE FUNCTIONALITY ==========

// Load Timeline View
function loadTimeline() {
    fetch('/api/artefacts')
    .then(res => res.json())
    .then(data => displayTimeline(data))
    .catch(err => console.log('Error loading timeline'));
}

// Display Timeline
function displayTimeline(artefacts) {
    const container = document.getElementById('timeline-container');
    if (!container) return;

    // Sort by floor or period
    const sorted = artefacts.sort((a, b) => (a.floor || 0) - (b.floor || 0));

    let html = '<div class="timeline">';
    sorted.forEach((artefact, index) => {
        const isEven = index % 2 === 0;
        html += `
            <div class="timeline-item" style="margin-left: ${isEven ? '0' : '50%'}; padding-right:20px">
                <div class="timeline-content" onclick="showDetail(${artefact.artefactId})">
                    <div class="timeline-year">Floor ${artefact.floor || 'Unknown'}</div>
                    <div style="color:#bb86fc; font-weight:bold; margin:8px 0;">${artefact.name}</div>
                    <div class="timeline-period">${artefact.dynasty} | ${artefact.region}</div>
                    <div style="color:#ddd; font-size:13px; margin-top:8px;">${artefact.description ? artefact.description.substring(0, 100) + '...' : 'No description'}</div>
                </div>
            </div>
        `;
    });
    html += '</div>';
    container.innerHTML = html;
}

// Filter Timeline by Dynasty
function filterTimelineByDynasty(dynasty) {
    fetch('/api/artefacts')
    .then(res => res.json())
    .then(data => {
        const filtered = data.filter(a => a.dynasty === dynasty);
        displayTimeline(filtered);
    })
    .catch(err => console.log('Error filtering timeline'));
}

// Filter Timeline by Period
function filterTimelineByPeriod(startYear, endYear) {
    fetch('/api/artefacts')
    .then(res => res.json())
    .then(data => {
        // Implement year-based filtering
        const filtered = data.filter(a => {
            // Assuming dynasty contains year info
            return true;
        });
        displayTimeline(filtered);
    })
    .catch(err => console.log('Error filtering timeline'));
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('timeline-container')) {
        loadTimeline();
    }
});
