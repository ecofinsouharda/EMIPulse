/************************************************
 * EMIPulse v1.0
 * Authentication
 ************************************************/

document.getElementById("loginBtn").onclick = login;

document.getElementById("password").addEventListener("keypress", function(e){

    if(e.key==="Enter"){

        login();

    }

});

async function login(){

    const collectorId=document
        .getElementById("collectorId")
        .value
        .trim();

    const password=document
        .getElementById("password")
        .value
        .trim();

    const status=document.getElementById("loginMessage");

    status.innerHTML="";

    if(collectorId===""){

        status.innerHTML="Enter Collector ID";

        return;

    }

    if(password===""){

        status.innerHTML="Enter Password";

        return;

    }

    document.getElementById("loginBtn").disabled=true;

    document.getElementById("loginBtn").innerHTML="Logging in...";

    try{

        const result=await api("login",{

            collectorId:collectorId,

            password:password

        });

        if(!result.success){

            status.innerHTML=result.message;

            document.getElementById("loginBtn").disabled=false;

            document.getElementById("loginBtn").innerHTML="LOGIN";

            return;

        }

        localStorage.setItem(

            "collector",

            JSON.stringify(result.data)

        );

        showScreen("dashboard");

        initDashboard();

        document.getElementById("loginBtn").disabled=false;

        document.getElementById("loginBtn").innerHTML="LOGIN";

    }

    catch(err){

        console.log(err);

        status.innerHTML="Unable to connect to server.";

        document.getElementById("loginBtn").disabled=false;

        document.getElementById("loginBtn").innerHTML="LOGIN";

    }

}
