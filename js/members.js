/************************************************
 * EMIPulse Members (SPA)
 ************************************************/

/************************************************
 * Search Members
 ************************************************/
async function searchMembers() {

    const text = document
        .getElementById("searchText")
        .value
        .trim();

    try {

        const result = await api(
            "searchMembers",
            {
                search: text
            }
        );

        if (!result.success) {

            document.getElementById("memberList").innerHTML =
                "<p style='padding:20px;'>No members found.</p>";

            return;

        }

        renderMembers(result.data);

    }

    catch (err) {

        console.log(err);

    }

}

/************************************************
 * Render Member Cards
 ************************************************/
function renderMembers(members) {

    const list = document.getElementById("memberList");

    if (!members || members.length === 0) {

        list.innerHTML =
            "<p style='padding:20px;'>No members found.</p>";

        return;

    }

    let html = "";

    members.forEach(function(member) {

        html += `

<div class="member-card">

    <div style="display:flex;justify-content:space-between;align-items:center;">

        <div>

            <h3>${member["Full Name"]}</h3>

            <p>${member["Member ID"]}</p>

            <p>${member["Mobile Number"] || ""}</p>

        </div>

        <button
            onclick="openCollection('${member["Member ID"]}')"
            class="primary-btn">

            Collect

        </button>

    </div>

</div>

`;

    });

    list.innerHTML = html;

}

/************************************************
 * Search While Typing
 ************************************************/

document
.getElementById("searchText")
.addEventListener(
    "keyup",
    searchMembers
);

/************************************************
 * Open Collection
 ************************************************/

function openCollection(memberId){

    localStorage.setItem(
        "selectedMember",
        memberId
    );

    alert(
        "Collection Screen will open next.\n\nMember : " + memberId
    );

}
