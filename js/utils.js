const Utils = {
    showScreen: function(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        const target = document.getElementById(screenId);
        if (target) target.classList.add('active');
    },

    showToast: function(message, type = 'info') {
        const toast = document.createElement('div');
        toast.style.cssText = `position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:${type==='error'?'#EF4444':'#2563EB'};color:white;padding:12px 24px;border-radius:9999px;z-index:10000;box-shadow:0 10px 15px -3px rgba(0,0,0,0.1);`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 2800);
    }
};

window.Utils = Utils;
