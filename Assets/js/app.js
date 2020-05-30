const totalConfirmed = document.getElementById("value-infected"),
    totalDeath = document.getElementById("value-death"),
    totalRecovery = document.getElementById("value-recovery"),
    btnSearch = document.querySelector(".searchButton"),
    countryInput = document.getElementById("country"),
    tableBody = document.querySelector(".table-body"),
    ALERT = document.querySelector(".alert");
let table = document.querySelector("table");

function getResult() {
    try{
        fetch("https://api.covid19api.com/summary")
            .then((response) => response.json())
            .then((data) => {
                const global = data["Global"];
                totalConfirmed.textContent = global.TotalConfirmed.toLocaleString('en');
                totalDeath.textContent = global.TotalDeaths.toLocaleString('en');
                totalRecovery.textContent = global.TotalRecovered.toLocaleString('en');
                let countries = data["Countries"];
                for (var i = 0; i < countries.length; i++) {
                    var tr = table.insertRow(-1);
                    tr.className = "table-data"
                    tr.innerHTML = `
                        <td>${countries[i].Country}</td>
                        <td>${countries[i].TotalConfirmed}</td>
                        <td>${countries[i].NewConfirmed}</td>
                        <td>${countries[i].TotalDeaths}</td>
                        <td>${countries[i].NewDeaths}</td>
                        <td>${countries[i].TotalRecovered}</td>
                        <td>${countries[i].NewRecovered}</td>
                    `
                }        

        });
    }
    finally {
        
    }
}

window.addEventListener("error", getResult);

getResult();

setInterval(() => {
    let rows = document.querySelectorAll(".table-data").length;
    if (rows == 0) {
        getResult();
    }
}, 1000)


let searchBox = document.querySelector("#country");
searchBox.addEventListener("keyup", () => {
    let input = searchBox.value.toLowerCase();
    let rows = document.querySelectorAll("tr");
    for (var i = 1; i < rows.length; i++) {
        elements = rows[i].querySelectorAll("td");
        let country = elements[0].textContent;
        country = country.toLowerCase();
        if (country.includes(input)) {
            rows[i].style.display = "";
        }
        else {
            rows[i].style.display = "none";
        }
    }
})
