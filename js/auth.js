/************************************************
 * EMIPulse v1.0
 * Authentication
 ************************************************/

const passwordBox = document.getElementById("password");

const toggle = document.getElementById("togglePassword");

if (toggle) {

    toggle.onclick = function () {

        passwordBox.type =
            passwordBox.type === "password"
                ? "text"
                : "password";

    };

}

document.getElementById("loginBtn").onclick = login;

async function login() {

    const collectorId = document
        .getElementById("collectorId")
        .value
        .trim();

    const password = document
        .getElementById("password")
        .value
        .trim();

    const status = document.getElementById("loginMessage");

    status.innerHTML = "Logging in...";

    try {

        const result = await api(
            "login",
            {
                collectorId,
                password
            }
        );

        if (!result.success) {

            status.innerHTML = result.message;

            return;

        }

        localStorage.setItem(
            "collector",
            JSON.stringify(result.data)
        );

        status.innerHTML = "";

        showScreen("dashboard");

        if (typeof initDashboard === "function") {

            initDashboard();

        }

    }

    catch (e) {

        status.innerHTML =
            "Unable to connect to server.";

        console.log(e);

    }

}
