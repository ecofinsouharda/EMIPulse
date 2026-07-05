let currentCollector = null;

document.addEventListener('DOMContentLoaded', () => {
    const saved = localStorage.getItem('collector');
    if (saved) {
        currentCollector = JSON.parse(saved);
        showMainApp();
    } else {
        setTimeout(() => Utils.showScreen('login-screen'), 1800);
    }

    document.getElementById('login-form').addEventListener('submit', handleLogin);
});

async function handleLogin(e) {
    e.preventDefault();
    const collectorId = document.getElementById('collector-id').value.trim();
    const errorEl = document.getElementById('login-error');

    errorEl.textContent = 'Connecting...';

    // Demo login (Phase 1)
    setTimeout(() => {
        currentCollector = { collectorId, name: "Demo Collector", branch: "Main Branch" };
        localStorage.setItem('collector', JSON.stringify(currentCollector));
        showMainApp();
    }, 800);
}

function showMainApp() {
    document.getElementById('splash-screen').style.display = 'none';
    document.getElementById('login-screen').style.display = 'none';
    document.getElementById('main-app').classList.remove('hidden');
    Utils.showScreen('dashboard-screen');
    renderBasicDashboard();
}

function renderBasicDashboard() {
    document.getElementById('dashboard-screen').innerHTML = `
        <div style="padding:20px;text-align:center;">
            <img src="assets/Ecofin New Small trans.png" style="width:80px;border-radius:50%;margin-bottom:16px;">
            <h2>Welcome, ${currentCollector ? currentCollector.name : 'Collector'}</h2>
            <p>EMIPulse Phase 1 Complete ✅</p>
        </div>
    `;
}
