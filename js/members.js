async function searchMembers(){

const text=document
.getElementById("searchText")
.value
.trim();

const result=
await api(
"searchMembers",
{
search:text
}
);

if(!result.success){

return;

}

let html="";

result.data.forEach(function(member){

html+=`

<div class="member-card"

onclick="openMember('${member["Member ID"]}')">

<h3>${member["Full Name"]}</h3>

<p><b>Member :</b> ${member["Member ID"]}</p>

<p><b>Loan :</b> ${member["Loan ID"]}</p>

<p><b>Mobile :</b> ${member["Mobile Number"]}</p>

<p><b>Outstanding :</b>

₹ ${member["Outstanding"]}</p>

</div>

`;

});

document
.getElementById("memberList")
.innerHTML=html;

}

function openMember(id){

localStorage.setItem(
"memberId",
id
);

window.location=
"collection.html";

}

searchMembers();
