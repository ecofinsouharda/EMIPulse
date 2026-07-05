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
  const password = document.getElementById('password').value.trim();
  const errorEl = document.getElementById('login-error');

  errorEl.textContent = 'Authenticating...';

  try {
    const result = await Api.post('login', { collectorId, password });
    
    if (result.status === 'success') {
      currentCollector = result.data;
      localStorage.setItem('collector', JSON.stringify(currentCollector));
      Utils.showToast('Login Successful!', 'success');
      showMainApp();
    } else {
      errorEl.textContent = result.message || 'Login failed';
    }
  } catch(err) {
    errorEl.textContent = 'Connection error. Check API URL.';
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
    document.getElementById('dashboard-screen').innerHTML = `
        <div style="padding:20px;text-align:center;">
            <img src="assets/Ecofin New Small trans.png" style="width:80px;border-radius:50%;margin-bottom:16px;">
            <h2>Welcome, ${currentCollector ? currentCollector.name : 'Collector'}</h2>
            <p>EMIPulse Phase 1 Complete ✅</p>
        </div>
    `;
}
