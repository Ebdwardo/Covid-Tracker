// API endpoint for COVID-19 data
const API_URL = "https://disease.sh/v3/covid-19/countries";

// Fetch data from the API
async function fetchData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    displayData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function fetchCountryData() {
  try {
    var COUNTRY = document.getElementById("country").value;
    var fullURL = API_URL + '/' + COUNTRY;
    const response = await fetch(fullURL);
    const data = await response.json();
    displayCountryData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Display data in the table
function displayData(data) {
  const tableBody = document.querySelector("#covid-table tbody");
  tableBody.innerHTML = ""; // Clear existing rows

  data.forEach(country => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${country.country}</td>
      <td>${country.cases.toLocaleString()}</td>
      <td>${country.active.toLocaleString()}</td>
      <td>${country.recovered.toLocaleString()}</td>
      <td>${country.deaths.toLocaleString()}</td>
    `;
    tableBody.appendChild(row);
  });
}

function displayCountryData(data) {
  const tableBody = document.querySelector("#covid-table tbody");
  tableBody.innerHTML = ""; // Clear existing rows

  const row = document.createElement("tr");
  row.innerHTML = `
      <td>${data.country}</td>
      <td>${data.cases.toLocaleString()}</td>
      <td>${data.active.toLocaleString()}</td>
      <td>${data.recovered.toLocaleString()}</td>
      <td>${data.deaths.toLocaleString()}</td>
    `;
  tableBody.appendChild(row);
}

function darkMode(){
  var x = document.getElementById('toggle');
  if (x.checked == true) {
    document.getElementById("body").style.backgroundColor = "gray"
    // document.getElementById("container").style.backgroundColor = "gray"
  } else {
    document.getElementById("body").style.backgroundColor = "#f4f4f4"
  }
}

// Fetch data when the page loads
fetchData();