/************************************************
 * EMIPulse Dashboard
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

    await loadDashboard();

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

    }

    catch(err){

        console.log(err);

        alert("Unable to load dashboard.");

    }

}
