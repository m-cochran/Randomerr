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
  <title>Data from Google Sheets</title>
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

  <h1>Welcome, <span id="userEmail"></span></h1>
  
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
    // Set the logged-in user's email
    document.getElementById('userEmail').innerText = "Logged in as: " + Session.getActiveUser().getEmail();

    // Populate the table with data from Google Sheets
    const data = sheetData; // Passed from Google Apps Script
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
  </script>

</body>
</html>
