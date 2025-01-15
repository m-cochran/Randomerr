---
layout: default
title: Profile
permalink: /pro/
---

# Profile


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
    fetch('https://script.google.com/macros/s/AKfycbwjeC0RupOcsZIbhyNJ8ABGtTgKFde35ZhBXfDVWXDpuuW_87Hq-QJfr9s1pXVeAfDwXQ/exec') // Replace with your web app URL
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
