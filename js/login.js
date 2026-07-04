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
.onclick = login;
