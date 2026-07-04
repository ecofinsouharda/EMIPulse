/************************************************
 * EMIPulse Dashboard (SPA)
 ************************************************/

let currentCollector = null;

/************************************************
 * Initialize Dashboard
 ************************************************/
async function initDashboard() {

    currentCollector = JSON.parse(
        localStorage.getItem("collector")
    );

    if (!currentCollector) {
        showScreen("login");
        return;
    }

    document.getElementById("collectorName").innerHTML =
        currentCollector.collectorName +
        "<br><small>" +
        currentCollector.branch +
        "</small>";

    setGreeting();

    await loadDashboard();

}

/************************************************
 * Greeting
 ************************************************/
function setGreeting() {

    const hour = new Date().getHours();

    let greeting = "Good Morning";

    if (hour >= 12 && hour < 17)
        greeting = "Good Afternoon";

    if (hour >= 17)
        greeting = "Good Evening";

    document.getElementById("greeting").innerHTML =
        greeting;

}

/************************************************
 * Load Dashboard
 ************************************************/
async function loadDashboard() {

    try {

        const result = await api(
            "dashboard",
            {
                collectorId:
                currentCollector.collectorId
            }
        );

        if (!result.success) {

            alert(result.message);

            return;

        }

        document.getElementById("todayCollection").innerHTML =
            "₹ " +
            Number(result.data.collection)
            .toLocaleString("en-IN");

        document.getElementById("todayReceipts").innerHTML =
            result.data.receipts;

        document.getElementById("pendingEMI").innerHTML =
            result.data.pendingEMI;

    }

    catch (err) {

        console.log(err);

        alert("Unable to connect to server.");

    }

}
