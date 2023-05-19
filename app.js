let xhr;
let endPoint = "https://restcountries.com/v2/all";
let countryNames = document.getElementById("countryNames");
// Pointing select
let countryDetails;
let loadCountries;
let countryDetailsSection;

function fetchCountryNames() {

}

function fetchingCountryDetails() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        countryDetails = JSON.parse(xhr.responseText);
        let str = "<option>Select any Country</option>";
        countryDetails.forEach(details => {
            str += `<option>${details.name}</option>`;
        });
        countryNames.innerHTML = str;
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
        alert("Error while fetching Country Details");
    }
}

loadCountries = document.getElementById("loadCountries");
loadCountries.addEventListener("click", () => {
    countryNames.innerHTML = `<option>Loading... Please Wait</option>`;
    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = fetchingCountryDetails;
    xhr.open("get", endPoint, true);
    xhr.send(null);
})

countryNames.addEventListener("change", () => {
    if (countryNames.value === "Select any Country") {
        countryDetailsSection.style.display = "none";
        return;
    }
    countryDetailsSection = document.getElementById("countryDetailsSection");
    countryDetails.forEach((details) => {
        if (details.name === countryNames.value) {
            document.querySelector("#countryFlag img").src = details.flags.png;
            document.querySelector("#countryName").innerText = details.name;
            document.querySelector("#countryContinent").innerText = details.region;
            document.querySelector("#countryPopulation").innerHTML = `<span>👨‍👩‍👧</span> ${(details.population / 1000000).toFixed(2)} Million`;
            document.querySelector("#countryLanguage").innerHTML = "<span>🗣️</span> " + details.languages[0].name;
            document.querySelector("#countryCurrency").innerHTML = "<span>💰</span> " + details.currencies[0].name;
            countryDetailsSection.style.display = "block";
        }
    })
})