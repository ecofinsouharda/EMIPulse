/************************************************
 * EMIPulse Dashboard
 ************************************************/

// Check Login
const collector = JSON.parse(localStorage.getItem("collector"));

if (!collector) {
    window.location.href = "login.html";
}

// Collector Name
document.getElementById("collectorName").innerHTML =
    collector.collectorName + "<br><small>" +
    collector.branch +
    "</small>";

/************************************************
 * Greeting
 ************************************************/

const hour = new Date().getHours();

let greeting = "Good Morning";

if (hour >= 12 && hour < 17) {
    greeting = "Good Afternoon";
}

if (hour >= 17) {
    greeting = "Good Evening";
}

document.getElementById("greeting").innerHTML = greeting;

/************************************************
 * Load Dashboard
 ************************************************/

async function refreshDashboard() {

    try {

        const result = await api(
            "dashboard",
            {
                collectorId: collector.collectorId
            }
        );

        if (!result.success) {

            alert(result.message);

            return;

        }

        document.getElementById("todayCollection").innerHTML =
            "₹ " + Number(result.data.collection).toLocaleString("en-IN");

        document.getElementById("todayReceipts").innerHTML =
            result.data.receipts;

        document.getElementById("pendingEMI").innerHTML =
            result.data.pendingEMI || 0;

    }

    catch (err) {

        console.log(err);

        alert("Unable to connect to server.");

    }

}

/************************************************
 * Navigation
 ************************************************/

function goCollection() {

    window.location.href = "collection.html";

}

function goMembers() {

    window.location.href = "members.html";

}

function goReports() {

    window.location.href = "reports.html";

}

/************************************************
 * Logout
 ************************************************/

function logout() {

    if (!confirm("Logout from EMIPulse?"))
        return;

    localStorage.removeItem("collector");

    window.location.href = "login.html";

}

/************************************************
 * Initialize
 ************************************************/

refreshDashboard();
