---
layout: default
title: Profile
permalink: /pro/
---

# Profile




  <title>Google Sheets Data</title>
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


  <h1>Data from Google Sheets</h1>

  <div class="card-container" id="cardContainer">
    <!-- Cards will be inserted here -->
  </div>

  <script>
    // Fetch data from the Google Apps Script web app URL
    fetch('https://script.google.com/macros/s/AKfycbwGUhSttkDP3B8bUie3h_zHvoUHfZgohHofiL_EonGAyV6TNXhPbFmXiGD78DFXwzBKAA/exec') // Replace with your web app URL
      .then(response => response.json())
      .then(data => {
        // Get the column headers from the first object
        const headers = Object.keys(data[0]);
        
        // Object to store merged cards by Account Number and Order ID
        const mergedCards = {};

        // Loop through the data and merge rows with the same Account Number and Order ID
        data.forEach(row => {
          // Create a unique key for grouping by Account Number and Order ID
          const key = row['Account Number'] + '-' + row['Order ID'];

          // If the key already exists, merge the row
          if (mergedCards[key]) {
            mergedCards[key].rows.push(row); // Add the row to the existing merged card
          } else {
            // Otherwise, create a new merged card
            mergedCards[key] = {
              accountNumber: row['Account Number'],
              orderId: row['Order ID'],
              rows: [row], // Store rows in an array
            };
          }
        });

        // Get the container where cards will be displayed
        const cardContainer = document.getElementById('cardContainer');

        // Create a card for each merged entry
        Object.values(mergedCards).forEach(mergedCard => {
          const card = document.createElement('div');
          card.classList.add('card');
          
          // Add the header with the Account Number and Order ID
          const cardHeader = document.createElement('div');
          cardHeader.classList.add('card-header');
          cardHeader.textContent = `Account: ${mergedCard.accountNumber} | Order ID: ${mergedCard.orderId}`;
          
          // Add the body with the merged rows' data
          const cardBody = document.createElement('div');
          cardBody.classList.add('card-body');
          
          mergedCard.rows.forEach(row => {
            headers.forEach(header => {
              if (header !== 'Account Number' && header !== 'Order ID') { // Skip Account Number and Order ID
                const p = document.createElement('p');
                p.innerHTML = `<strong>${header}:</strong> ${row[header]}`;
                cardBody.appendChild(p);
              }
            });
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

