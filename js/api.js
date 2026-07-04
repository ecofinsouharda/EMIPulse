const API_URL = "https://script.google.com/macros/s/AKfycbwmCd0mOOLhx-x6ecksTwI-zji2aFRPpDUpF4oSIC9460K025fpipHDJxiC7i9Q6kQ/exec";

async function api(action, data={}){

    const response = await fetch(API_URL,{

        method:"POST",

        body:JSON.stringify({

            action,

            data

        })

    });

    return await response.json();

}
