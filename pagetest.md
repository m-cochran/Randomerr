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
  <title>Filtered Data by User</title>
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

    .no-data {
      font-size: 18px;
      color: #666;
      text-align: center;
      margin-top: 50px;
    }

  </style>
</head>
<body>

  <h1>Your Filtered Data</h1>

  <div class="card-container" id="cardContainer">
    <!-- Cards will be inserted here -->
  </div>

  <div class="no-data" id="noData" style="display: none;">No data available for this user.</div>

  <script>
    // Fetch data from the Google Apps Script web app URL
    fetch('https://script.google.com/macros/s/AKfycbwGUhSttkDP3B8bUie3h_zHvoUHfZgohHofiL_EonGAyV6TNXhPbFmXiGD78DFXwzBKAA/exec') // Replace with your web app URL
      .then(response => response.json())
      .then(data => {
        // Get the logged-in user's email from localStorage
        const userEmail = localStorage.getItem('userEmail');

        if (!userEmail) {
          alert('No user is logged in!');
          return;
        }

        // Filter the data based on the logged-in user's email
        const filteredData = data.filter(row => row.email === userEmail);

        // Get the container where cards will be displayed
        const cardContainer = document.getElementById('cardContainer');
        const noData = document.getElementById('noData');

        // Clear the container before adding new cards
        cardContainer.innerHTML = '';

        if (filteredData.length === 0) {
          // Show a "no data" message if no matching data is found
          noData.style.display = 'block';
        } else {
          noData.style.display = 'none';

          // Create a card for each row of filtered data
          filteredData.forEach(row => {
            const card = document.createElement('div');
            card.classList.add('card');

            // Add the header with the row's first column
            const cardHeader = document.createElement('h2');
            cardHeader.textContent = row.name; // Use the "name" column for the header

            // Add the body with the rest of the data
            const cardBody = document.createElement('div');
            Object.keys(row).forEach(key => {
              if (key !== 'name' && key !== 'email') { // Skip name and email if they are already displayed
                const p = document.createElement('p');
                p.innerHTML = `<strong>${key}:</strong> ${row[key]}`;
                cardBody.appendChild(p);
              }
            });

            // Append the header and body to the card
            card.appendChild(cardHeader);
            card.appendChild(cardBody);

            // Append the card to the container
            cardContainer.appendChild(card);
          });
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  </script>

</body>
</html>
