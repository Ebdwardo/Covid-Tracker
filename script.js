// API endpoint for COVID-19 data
const API_URL = "https://disease.sh/v3/covid-19/countries";
const ctx = document.getElementById("covid-chart").getContext("2d");
var c = null;

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

//Fetch data for a single country
async function fetchCountryData() {
  try {
    var COUNTRY = document.getElementById("country").value;
    var fullURL = API_URL + '/' + COUNTRY;

    //update container size to fit chart
    var container = document.getElementById("container");
    container.style.height="240px";
    container.style.overflowY = "hidden";

    const response = await fetch(fullURL);
    const data = await response.json();
    displayCountryData(data);
    createChart(data);

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Display data in the table
function displayData(data) {
  //get rid of existing chart when reset is pressed 
  destroyChart();

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

//Display the data for a single conutry
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
  //Change modes depending on toggle position
  var x = document.getElementById('toggle');
  if (x.checked == true) {
    document.getElementById("body").style.backgroundColor = "gray"
  } else {
    document.getElementById("body").style.backgroundColor = "#f4f4f4"
  }
}

function createChart(data) {
  // Extract data for the chart
  const countries = data.country;
  const totalCases = data.cases;
  const recoveredCases = data.recovered;
  const deaths = data.deaths;

  //Destroy existing chart to reuse
  if (c){
    c.destroy();
  }

  c = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Total Cases", "Recovered Cases", "Deaths"],
      datasets: [
        {
          label: "Data",
          data: [totalCases,recoveredCases,deaths],
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "# of People",
          },
        },
        x: {
          title: {
            display: true,
            text: "Statistics",
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: countries + " COVID-19 Statistics",
        },
      },
    },
  });
}

//Reload the page instead of resetting every value is chart is in canvas
function destroyChart(){
  const canvas = document.getElementById('covid-chart');
  if(!isCanvasBlank(canvas)){
    location.reload();
  }
}

//Checks if there is a chart in the canvas
function isCanvasBlank(canvas) {
  return !canvas.getContext('2d')
    .getImageData(0, 0, canvas.width, canvas.height).data
    .some(channel => channel !== 0);
}
// Fetch data when the page loads
fetchData();