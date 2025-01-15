---
layout: default
title: Profile
permalink: /pro/
---

# Profile





  <title>Filtered Data from Google Sheets</title>
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

  <h1>Filtered Data for Logged-in User</h1>

  <div class="card-container" id="cardContainer">
    <!-- Cards will be inserted here -->
  </div>

  <script>
    // Fetch data from the Google Apps Script web app URL
    fetch('https://script.google.com/macros/s/AKfycbwGUhSttkDP3B8bUie3h_zHvoUHfZgohHofiL_EonGAyV6TNXhPbFmXiGD78DFXwzBKAA/exec') // Replace with your web app URL
      .then(response => response.json())
      .then(data => {
        // Get logged-in user's email
        const loggedInUserEmail = localStorage.getItem('userEmail');

        if (!loggedInUserEmail) {
          alert('No user is logged in.');
          return;
        }

        // Filter data for the logged-in user
        const filteredData = data.filter(row => row.email === loggedInUserEmail);

        // Get the container where cards will be displayed
        const cardContainer = document.getElementById('cardContainer');

        if (filteredData.length === 0) {
          cardContainer.innerHTML = `<p>No data found for the logged-in user (${loggedInUserEmail}).</p>`;
          return;
        }

        // Create a card for each row of filtered data
        filteredData.forEach(row => {
          const card = document.createElement('div');
          card.classList.add('card');

          // Add the header with the row's first column
          const cardHeader = document.createElement('div');
          cardHeader.classList.add('card-header');
          cardHeader.textContent = row.name; // Assuming 'name' is a column in your data

          // Add the body with the rest of the data
          const cardBody = document.createElement('div');
          cardBody.classList.add('card-body');

          Object.keys(row).forEach(key => {
            if (key !== 'email' && key !== 'name') { // Skip the 'email' field and header column
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
      })
      .catch(error => console.error('Error fetching data:', error));
  </script>
