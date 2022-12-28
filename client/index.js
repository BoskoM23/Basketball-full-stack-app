//Load the table and button to the HTML page
document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:5000/getAll")
        .then((response) => response.json())
        .then((data) => loadHTMLTable(data["data"]));
});
document
    .querySelector("table tbody")
    .addEventListener("click", function (event) {
        if (event.target.className === "delete-row-btn") {
            deleteRowById(event.target.dataset.id);
        }
        if (event.target.className === "edit-row-btn") {
            handleEditRow(event.target.dataset.id);
        }
        if (event.target.id === "#add-name-btn") {
            handleEditRow(event.target.dataset.id);
        }
    });

const updateBtn = document.querySelector("#update-row-btn");
const searchBtn = document.querySelector("#search-btn");
const addBtn = document.querySelector("#add-name-btn");
//Search players
searchBtn.onclick = function () {
    const searchValue = document.querySelector("#search-input").value;
    fetch("http://localhost:5000/search/" + searchValue)
        .then((response) => response.json())
        .then((data) => loadHTMLTable(data["data"]));
};
//Change the name of the player
updateBtn.onclick = function () {
    const updateNameInput = document.querySelector("#update-name-input");
    console.log(updateNameInput.value);
    fetch("http://localhost:5000/update", {
        method: "PATCH",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            id: updateNameInput.dataset.ID,
            firstName: updateNameInput.value,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                location.reload();
            }
            console.log(data);
        })
        .catch((err) => console.log(err));
};
//Add player
addBtn.onclick = function () {
    const fnameInput = document.querySelector("#fname-input");
    const fname = fnameInput.value;
    fnameInput.value = "";
    const lnameInput = document.querySelector("#lname-input");
    const lname = lnameInput.value;
    lnameInput.value = "";
    const teamInput = document.querySelector("#team-input");
    const team = teamInput.value;
    teamInput.value = "";
    const pointsInput = document.querySelector("#points-input");
    const points = pointsInput.value;
    pointsInput.value = "";
    const reboundsInput = document.querySelector("#rebounds-input");
    const rebounds = reboundsInput.value;
    reboundsInput.value = "";
    const asistsInput = document.querySelector("#asists-input");
    const asists = asistsInput.value;
    asistsInput.value = "";
    console.log(fname, lname, team, points, rebounds, asists);
    fetch("http://localhost:5000/insert", {
        headers: {
            "Content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            firstName: fname,
            lastName: lname,
            team: team,
            points: points,
            rebounds: rebounds,
            asists: asists,
        }),
    })
        .then((response) => response.json())
        .then((data) => insertRowIntoTable(data["data"]))
        .catch((err) => console.log(err));
};
//Function that insert new row into the table
function insertRowIntoTable(data) {
    const table = document.querySelector("table tbody");
    const isTableData = table.querySelector(".no-data");
    let tableHtml = "<tr>";
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === "ID") {
                data[key] = new data[key]();
            }
            tableHtml += `<td>${data[key]}</td>`;
        }
    }
    tableHtml += `<td><button class="delete-row-btn" data-id=${data.ID}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.ID}>Edit</td>`;
    tableHtml += "</tr>";
    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}
//Function that finds the ID of player which name should be changed
function handleEditRow(ID) {
    const updateSection = document.querySelector("#update-row");
    updateSection.hidden = false;
    document.querySelector("#update-name-input").dataset.ID = ID;
}
//Function that delete specific row
function deleteRowById(ID) {
    fetch("http://localhost:5000/delete/" + ID, {
        method: "DELETE",
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                location.reload();
            }
        });
}
//Function that load data into tables and show them
function loadHTMLTable(data) {
    const table = document.querySelector("table tbody");
    console.log(data);
    let tableHtml = "";
    data.forEach(function ({
        ID,
        firstName,
        lastName,
        Team,
        points,
        rebounds,
        asists,
    }) {
        tableHtml += "<tr>";
        tableHtml += `<td>${ID}</td>`;
        tableHtml += `<td>${firstName}</td>`;
        tableHtml += `<td>${lastName}</td>`;
        tableHtml += `<td>${Team}</td>`;
        tableHtml += `<td>${points}</td>`;
        tableHtml += `<td>${rebounds}</td>`;
        tableHtml += `<td>${asists}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${ID}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${ID}>Edit</td>`;
        tableHtml += "</tr>";
    });
    table.innerHTML = tableHtml;
}