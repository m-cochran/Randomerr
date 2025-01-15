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
fetch('https://script.google.com/macros/s/AKfycbyCqyVsJ3_CMsxzFTKgtIklgH_YWIXyObM75ddwYSDGEiMjVUBclGtSII-_sSG_HkEjHw/exec') // Replace with your web app URL
  .then(response => response.json())
  .then(data => {
    if (!data.length) {
      alert('You are not logged in or no data is available for your account.');
      return;
    }
    
    const headers = Object.keys(data[0]);

    const headerRow = document.querySelector('thead tr');
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });

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
