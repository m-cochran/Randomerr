---
layout: default
title: Profile
permalink: /pro/
---

# Profile




  <title>Google Sheets Data</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
      background-color: #f4f4f4;
    }

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

    #noDataMessage {
      text-align: center;
      font-size: 18px;
      color: #666;
      margin-top: 20px;
    }
  </style>


  <h1>Your Orders</h1>

  <div id="noDataMessage" style="display: none;">No data available for this user.</div>
  <div class="card-container" id="cardContainer">
    <!-- Cards will be inserted here -->
  </div>

  <script>
fetch('https://script.google.com/macros/s/AKfycbwGUhSttkDP3B8bUie3h_zHvoUHfZgohHofiL_EonGAyV6TNXhPbFmXiGD78DFXwzBKAA/exec') // Replace with your web app URL
  .then(response => response.json())
  .then(data => {
    console.log('Fetched Data:', data); // Debug fetched data

    // Verify stored email
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      console.error("No userEmail found in localStorage.");
      document.getElementById('noDataMessage').textContent = "Please log in to view your orders.";
      document.getElementById('noDataMessage').style.display = 'block';
      document.getElementById('cardContainer').style.display = 'none';
      return;
    }
    console.log("Stored userEmail:", userEmail);

    // Filter data for the logged-in user
    const userData = data.filter(row => row["Email"]?.trim() === userEmail.trim());
    console.log("Filtered userData:", userData);

    const cardContainer = document.getElementById('cardContainer');
    const noDataMessage = document.getElementById('noDataMessage');

    if (userData.length === 0) {
      // No data for the user
      noDataMessage.style.display = 'block';
      cardContainer.style.display = 'none';
      return;
    }

    // Hide no data message and show the card container
    noDataMessage.style.display = 'none';
    cardContainer.style.display = 'grid';

    // Display user-specific cards
    userData.forEach(row => {
      const card = document.createElement('div');
      card.classList.add('card');

      const cardHeader = document.createElement('div');
      cardHeader.classList.add('card-header');
      cardHeader.textContent = `${row["Name"]} (Order ID: ${row["Order ID"]})`;

      const cardBody = document.createElement('div');
      cardBody.classList.add('card-body');

      const fieldsToShow = [
        "Order Date",
        "Phone",
        "Billing Street",
        "Billing City",
        "Billing State",
        "Item Name",
        "Item Quantity",
        "Item Price",
        "Total Amount",
        "Tracking Number"
      ];

      fieldsToShow.forEach(field => {
        if (row[field]) {
          const p = document.createElement('p');
          p.innerHTML = `<strong>${field}:</strong> ${row[field]}`;
          cardBody.appendChild(p);
        }
      });

      card.appendChild(cardHeader);
      card.appendChild(cardBody);
      cardContainer.appendChild(card);
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    document.getElementById('noDataMessage').textContent = "Error fetching data. Please try again.";
    document.getElementById('noDataMessage').style.display = 'block';
  });

  </script>

