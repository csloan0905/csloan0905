function filterData() {
  event.preventDefault();

  // Get the start and end dates from the input fields
  var startdate = new Date(document.getElementById("startdate").value);
  var enddate = new Date(document.getElementById("enddate").value);

  console.log("Starting date: " + startdate);
  console.log("Ending date: " + enddate);

  // Get all rows from the table body
  var table = document.getElementById("pitchTable");
  var rows = table.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

  // Loop through all rows and hide those that are outside the date range
  for (var i = 0; i < rows.length; i++) {
      // Get the datetime cell value for each row
      var datetimeCell = rows[i].getElementsByTagName("td")[3].textContent;
      var rowDate = new Date(datetimeCell);

      // Check if the row date is within the range, and toggle row visibility
      if (rowDate >= startdate && rowDate <= enddate) {
          rows[i].style.display = "";  // Show the row
      } else {
          rows[i].style.display = "none";  // Hide the row
      }
  }
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
