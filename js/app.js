// EMIPulse Main App
let currentCollector = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log('%cEMIPulse v1.0 - Phase 2 Starting...', 'color: #2563EB; font-weight: bold;');

    const savedCollector = localStorage.getItem('collector');
    if (savedCollector) {
        currentCollector = JSON.parse(savedCollector);
        showMainApp();
    } else {
        setTimeout(() => {
            Utils.showScreen('login-screen');
        }, 2000);
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

async function handleLogin(e) {
    e.preventDefault();
    
    const collectorId = document.getElementById('collector-id').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorEl = document.getElementById('login-error');

    if (!collectorId || !password) {
        errorEl.textContent = 'Please enter Collector ID and Password';
        return;
    }

    errorEl.textContent = 'Authenticating...';

    try {
        const result = await Api.post('login', { 
            collectorId: collectorId, 
            password: password 
        });
        
        if (result.status === 'success') {
            currentCollector = result.data;
            localStorage.setItem('collector', JSON.stringify(currentCollector));
            Utils.showToast('Login Successful!', 'success');
            showMainApp();
        } else {
            errorEl.textContent = result.message || 'Login failed';
        }
    } catch(err) {
        errorEl.textContent = 'Connection error. Please check internet.';
    }
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
            <p>Branch: ${currentCollector ? currentCollector.branch : ''}</p>
            <p style="margin-top: 30px; color: #6B7280;">EMIPulse Phase 2 Ready ✅</p>
            <button onclick="logout()" style="margin-top: 40px; padding: 12px 24px; background: #2563EB; color: white; border: none; border-radius: 12px;">Logout</button>
        </div>
    `;
}

function logout() {
    localStorage.removeItem('collector');
    location.reload();
}

// Make functions available
window.logout = logout;
