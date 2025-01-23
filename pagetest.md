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
  <title>Google Sheets Data</title>
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

  <h1>Data from Google Sheets</h1>

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
    // Fetch data from the Google Apps Script web app URL
    fetch('https://script.google.com/macros/s/AKfycbygmz83FkhcO6d2az2ocS_7gZYWlLKRGsQlQrT6UalW8ZvfnKSeTFt2zhq9UFtIT_40ig/exec') // Replace with your web app URL
      .then(response => response.json())
      .then(data => {
        // Get the column headers from the first object
        const headers = Object.keys(data[0]);
        
        // Insert headers into the table
        const headerRow = document.querySelector('thead tr');
        headers.forEach(header => {
          const th = document.createElement('th');
          th.textContent = header;
          headerRow.appendChild(th);
        });

        // Insert data rows into the table
        const tbody = document.querySelector('tbody');
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
  </script>

</body>
</html>
