const API_BASE = 'https://script.google.com/macros/s/AKfycbwmCd0mOOLhx-x6ecksTwI-zji2aFRPpDUpF4oSIC9460K025fpipHDJxiC7i9Q6kQ/exec'; 
const Api = {
    async post(action, payload = {}) {
        try {
            const response = await fetch(API_BASE, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ action, ...payload })
            });
            
            if (!response.ok) throw new Error('Network error');
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            return { status: 'error', message: 'Connection failed. Please try again.' };
        }
    }
};

window.Api = Api;
