---
layout: default
title: Profile
permalink: /pro/
---

# Profile






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
        const headers = Object.keys(data[0]);
        
        // Filter and group the data by user account info (e.g., account number)
        const groupedData = groupByAccount(data);

        const cardContainer = document.getElementById('cardContainer');

        // Iterate through grouped data and create cards
        Object.keys(groupedData).forEach(accountKey => {
          const userOrders = groupedData[accountKey];
          const card = document.createElement('div');
          card.classList.add('card');

          // Add user info as the card header
          const cardHeader = document.createElement('div');
          cardHeader.classList.add('card-header');
          cardHeader.textContent = `${userOrders[0].account_number} - ${userOrders[0].name} (${userOrders[0].email})`;

          const cardBody = document.createElement('div');
          cardBody.classList.add('card-body');

          // Add each order for this user
          userOrders.forEach(order => {
            const orderDetails = `
              <p><strong>Order ID:</strong> ${order.order_id}</p>
              <p><strong>Product:</strong> ${order.product_name}</p>
              <p><strong>Quantity:</strong> ${order.quantity}</p>
              <p><strong>Price:</strong> $${order.price}</p>
              <p><strong>Shipping Address:</strong> ${order.shipping_address}</p>
              <hr />
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

    // Function to group data by account number or user
    function groupByAccount(data) {
      return data.reduce((acc, row) => {
        const accountKey = row['account_number']; // Adjust this based on your column name
        if (!acc[accountKey]) {
          acc[accountKey] = [];
        }
        acc[accountKey].push({
          account_number: row['account_number'],
          name: row['name'],
          email: row['email'],
          order_id: row['order_id'],
          product_name: row['product_name'],
          quantity: row['quantity'],
          price: row['price'],
          shipping_address: row['shipping_address']
        });
        return acc;
      }, {});
    }
  </script>


