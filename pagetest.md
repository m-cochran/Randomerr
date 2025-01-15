---
layout: default
title: Profile
permalink: /pro/
---

# Profile





  <title>Grouped Google Sheets Data</title>
  <style>

    .card-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .card {
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .card h2 {
      font-size: 18px;
      margin-bottom: 10px;
    }

    .card p {
      font-size: 16px;
      margin: 5px 0;
    }

    .card .card-header {
      font-weight: bold;
      color: #333;
      margin-bottom: 10px;
    }

    .card .card-body {
      color: #666;
    }
  </style>


  <h1>Grouped Data from Google Sheets</h1>

  <div class="card-container" id="cardContainer">
    <!-- Cards will be inserted here -->
  </div>

  <script>
    // Fetch data from the Google Apps Script web app URL
    fetch('https://script.google.com/macros/s/AKfycbwGUhSttkDP3B8bUie3h_zHvoUHfZgohHofiL_EonGAyV6TNXhPbFmXiGD78DFXwzBKAA/exec') // Replace with your web app URL
      .then(response => response.json())
      .then(data => {
        // Group the data by "Account Number" and "Order ID"
        const groupedData = {};

        data.forEach(row => {
          const accountNumber = row['Account Number'];
          const orderId = row['Order ID'];
          const key = accountNumber + '|' + orderId; // Use both Account Number and Order ID as the key

          if (!groupedData[key]) {
            groupedData[key] = {
              accountNumber,
              orderId,
              rows: []
            };
          }
          groupedData[key].rows.push(row);
        });

        // Get the container where cards will be displayed
        const cardContainer = document.getElementById('cardContainer');

        // Create a card for each group of Account Number and Order ID
        Object.values(groupedData).forEach(group => {
          const card = document.createElement('div');
          card.classList.add('card');

          // Add the card header with the Account Number and Order ID
          const cardHeader = document.createElement('div');
          cardHeader.classList.add('card-header');
          cardHeader.textContent = `Account Number: ${group.accountNumber} | Order ID: ${group.orderId}`;

          // Add the body with the rows for this group
          const cardBody = document.createElement('div');
          cardBody.classList.add('card-body');

          group.rows.forEach(row => {
            // Add each row's details as a paragraph in the card body
            const p = document.createElement('p');
            const details = Object.keys(row)
              .map(header => `<strong>${header}:</strong> ${row[header]}`)
              .join(' | ');
            p.innerHTML = details;
            cardBody.appendChild(p);
          });

          // Append the header and body to the card
          card.appendChild(cardHeader);
          card.appendChild(cardBody);

          // Append the card to the container
          cardContainer.appendChild(card);
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  </script>

