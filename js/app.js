/************************************************
 * EMIPulse
 * App Controller (SPA)
 ************************************************/

const Screens = {

    splash: document.getElementById("screenSplash"),

    login: document.getElementById("screenLogin"),

    dashboard: document.getElementById("screenDashboard"),

    members: document.getElementById("screenMembers")

};

/************************************************
 * Hide All Screens
 ************************************************/

function hideScreens(){

    Object.values(Screens).forEach(function(screen){

        screen.classList.remove("active");

    });

}

/************************************************
 * Show Screen
 ************************************************/

function showScreen(name){

    hideScreens();

    Screens[name].classList.add("active");

}

/************************************************
 * App Startup
 ************************************************/

window.onload=function(){

    setTimeout(function(){

        const collector=
        JSON.parse(
            localStorage.getItem("collector")
        );

        if(collector){

            showScreen("dashboard");

            if(typeof initDashboard==="function"){

                initDashboard();

            }

        }

        else{

            showScreen("login");

        }

    },2000);

};

/************************************************
 * Open Members
 ************************************************/

document
.getElementById("btnMembers")
.onclick=function(){

    showScreen("members");

    if(typeof searchMembers==="function"){

        searchMembers();

    }

};

/************************************************
 * Back To Dashboard
 ************************************************/

document
.getElementById("backDashboard")
.onclick=function(){

    showScreen("dashboard");

};

/************************************************
 * Collection
 ************************************************/

document
.getElementById("btnCollection")
.onclick=function(){

    alert("Collection Screen - Next Module");

};

/************************************************
 * Reports
 ************************************************/

document
.getElementById("btnReports")
.onclick=function(){

    alert("Reports - Coming Soon");

};

/************************************************
 * Logout
 ************************************************/

document
.getElementById("btnLogout")
.onclick=function(){

    if(!confirm("Logout?")){

        return;

    }

    localStorage.removeItem("collector");

    showScreen("login");

};
