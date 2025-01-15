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
        // Group data by user account (ACC1736804012667)
        const groupedData = groupBy(data, 'Account');

        // Get the container where cards will be displayed
        const cardContainer = document.getElementById('cardContainer');

        // Create a card for each grouped user
        Object.keys(groupedData).forEach(accountId => {
          const orders = groupedData[accountId];

          // Create a card for this user
          const card = document.createElement('div');
          card.classList.add('card');
          
          // Add the header with user info
          const cardHeader = document.createElement('div');
          cardHeader.classList.add('card-header');
          cardHeader.textContent = `User: ${accountId} - ${orders[0].Name}`;
          
          // Add the body with the combined order information
          const cardBody = document.createElement('div');
          cardBody.classList.add('card-body');

          // Loop through the orders and display each one
          orders.forEach(order => {
            const orderDetails = `
              <p><strong>Order ID:</strong> ${order.OrderID}</p>
              <p><strong>Product:</strong> ${order.Product}</p>
              <p><strong>Price:</strong> $${order.Price}</p>
              <p><strong>Quantity:</strong> ${order.Quantity}</p>
            `;
            cardBody.innerHTML += orderDetails;
          });

          // Append the header and body to the card
          card.appendChild(cardHeader);
          card.appendChild(cardBody);

          // Append the card to the container
          cardContainer.appendChild(card);
        });
      })
      .catch(error => console.error('Error fetching data:', error));

    // Function to group data by a specific key (in this case, 'Account')
    function groupBy(array, key) {
      return array.reduce((result, item) => {
        // Use the account ID as the key to group orders
        const groupKey = item[key];
        if (!result[groupKey]) {
          result[groupKey] = [];
        }
        result[groupKey].push(item);
        return result;
      }, {});
    }
  </script>


