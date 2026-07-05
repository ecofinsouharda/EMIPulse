const password = document.getElementById("password");

document
.getElementById("togglePassword")
.onclick = () => {

    password.type =
    password.type === "password"
    ? "text"
    : "password";

};

document
.getElementById("loginBtn")
.onclick = async function(){

    const collectorId =
    document
    .getElementById("collectorId")
    .value
    .trim();

    const password =
    document
    .getElementById("password")
    .value;

    const status =
    document
    .getElementById("status");

    status.innerHTML="Logging in...";

    try{

        const result =
        await api(
            "login",
            {
                collectorId,
                password
            }
        );

        if(!result.success){

            status.innerHTML=result.message;

            return;

        }

        localStorage.setItem(
            "collector",
            JSON.stringify(result.data)
        );

        window.location="dashboard.html";

    }

    catch(e){

        status.innerHTML=e.message;

    }

};
