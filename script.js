function filterData() {
  event.preventDefault();
  var startdate = document.getElementById("startdate").value;
  var enddate = document.getElementById("enddate").value;
  console.log("Starting date: " + startdate);
  console.log("Ending date: " + enddate);
  fetch("https://compute.samford.edu/zohauth/clients/data");
}

// Fetch the data from the provided URL
fetch('https://compute.samford.edu/zohauth/clients/datajson')
    .then(response => response.json())  // Convert the response to JSON
    .then(data => {
        const table = document.getElementById('pitchTable'); // Get the table

        data.forEach(pitch => {
            // Create a new row for each pitch
            let row = table.insertRow();

            // Create cells for ID, Speed, Result, and Datetime
            let idCell = row.insertCell(0);
            let speedCell = row.insertCell(1);
            let resultCell = row.insertCell(2);
            let datetimeCell = row.insertCell(3);

            // Populate the cells with the relevant data
            idCell.innerHTML = `<a href="details.html">Pitch ${pitch.id}</a>`;
            speedCell.textContent = pitch.speed;
            resultCell.textContent = pitch.result || '--';  // Default to '--' if no result
            datetimeCell.textContent = pitch.datetime || '--'; // Default to '--' if no datetime
        });
    })
    .catch(error => console.error('Error fetching data:', error));
