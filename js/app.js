// EMIPulse Main App
let currentCollector = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log('%cEMIPulse v1.0 Starting...', 'color: #2563EB; font-weight: bold;');

    const savedCollector = localStorage.getItem('collector');
    if (savedCollector) {
        currentCollector = JSON.parse(savedCollector);
        showMainApp();
    } else {
        // Splash → Login after 2 seconds
        setTimeout(() => {
            Utils.showScreen('login-screen');
        }, 2000);
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

function handleLogin(e) {
    e.preventDefault();
    
    const collectorId = document.getElementById('collector-id').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorEl = document.getElementById('login-error');

    if (!collectorId || !password) {
        errorEl.textContent = 'Please enter Collector ID and Password';
        return;
    }

    errorEl.textContent = 'Logging in...';
    
    // Demo Login
    setTimeout(() => {
        currentCollector = {
            collectorId: collectorId,
            name: collectorId,
            branch: 'Main Branch',
            role: 'Collector'
        };
        
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
    const dashboard = document.getElementById('dashboard-screen');
    dashboard.innerHTML = `
        <div style="padding: 20px; text-align: center; margin-top: 40px;">
            <img src="assets/Ecofin New Small trans.png" style="width: 90px; border-radius: 50%; margin-bottom: 20px;">
            <h2>Welcome, ${currentCollector ? currentCollector.name : 'Collector'}</h2>
            <p style="margin-top: 30px; color: #6B7280;">EMIPulse Phase 1 Ready</p>
            <button onclick="logout()" style="margin-top: 40px; padding: 12px 24px; background: #2563EB; color: white; border: none; border-radius: 12px;">Logout</button>
        </div>
    `;
}

function logout() {
    localStorage.removeItem('collector');
    location.reload();
}
