const API_BASE = 'https://script.google.com/macros/s/AKfycbwmCd0mOOLhx-x6ecksTwI-zji2aFRPpDUpF4oSIC9460K025fpipHDJxiC7i9Q6kQ/exec'; // ← Replace after deployment

const Api = {
  async post(action, payload) {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, ...payload })
    });
    return response.json();
  }
};

window.Api = Api;
