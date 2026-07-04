const API_URL = "PASTE_YOUR_APPS_SCRIPT_WEBAPP_URL_HERE";

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
