/************************************************
 * EMIPulse v1.0
 * app.js
 ************************************************/

const screens = {
    splash: document.getElementById("screenSplash"),
    login: document.getElementById("screenLogin"),
    dashboard: document.getElementById("screenDashboard"),
    members: document.getElementById("screenMembers"),
    collection: document.getElementById("screenCollection")
};

/************************************************
 * Hide All Screens
 ************************************************/
function hideAllScreens() {

    Object.values(screens).forEach(function(screen) {
        screen.classList.remove("active");
    });

}

/************************************************
 * Show Screen
 ************************************************/
function showScreen(name) {

    hideAllScreens();

    screens[name].classList.add("active");

}

/************************************************
 * App Start
 ************************************************/
window.addEventListener("load", function () {

    setTimeout(function () {

        const collector = JSON.parse(
            localStorage.getItem("collector")
        );

        if (collector) {

            showScreen("dashboard");

            if (typeof initDashboard === "function") {
                initDashboard();
            }

        } else {

            showScreen("login");

        }

    }, 2000);

});

/************************************************
 * Navigation
 ************************************************/

document.getElementById("btnMembers").onclick = function () {

    showScreen("members");

    if (typeof searchMembers === "function") {
        searchMembers();
    }

};

document.getElementById("btnBack").onclick = function () {

    showScreen("dashboard");

};

document.getElementById("btnBackDashboard").onclick = function () {

    showScreen("dashboard");

};

document.getElementById("btnCollection").onclick = function () {

    showScreen("collection");

};

document.getElementById("btnReports").onclick = function () {

    alert("Reports will be added in Version 1.0");

};

document.getElementById("btnLogout").onclick = function () {

    if (!confirm("Do you want to logout?"))
        return;

    localStorage.removeItem("collector");

    showScreen("login");

};
