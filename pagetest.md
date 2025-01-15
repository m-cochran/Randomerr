---
layout: default
title: Profile
permalink: /pro/
---

# Profile



<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Filtered Data</title>
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 8px;
      text-align: left;
      border: 1px solid #ddd;
    }
  </style>
</head>
<body>

  <h1>Your Data</h1>
  
  <table id="dataTable">
    <thead>
      <tr>
        <!-- Column headers will be inserted here -->
      </tr>
    </thead>
    <tbody>
      <!-- Data rows will be inserted here -->
    </tbody>
  </table>

<script>
  function fetchData(email) {
    // Construct the URL with the email query parameter
    const url = `https://script.google.com/macros/s/AKfycbwP2i89wVvZQhur1B5mLTDSQed-M3DO2EXw8xMUl9GjS_nuRx7zS4S1LJQYfGjclMuX/exec?email=${email}`; // Replace with your web app URL
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Process the data (filter and display it)
        const table = document.querySelector('#dataTable');
        const headerRow = table.querySelector('thead tr');
        const tbody = table.querySelector('tbody');
        
        // Insert headers
        const headers = Object.keys(data[0]);
        headers.forEach(header => {
          const th = document.createElement('th');
          th.textContent = header;
          headerRow.appendChild(th);
        });

        // Insert data rows
        data.forEach(row => {
          const tr = document.createElement('tr');
          headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header];
            tr.appendChild(td);
          });
          tbody.appendChild(tr);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }
</script>

</body>
</html>
