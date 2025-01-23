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
  <title>Google Login with JSON Data</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    #orderTable {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    #orderTable th, #orderTable td {
      padding: 8px;
      border: 1px solid #ddd;
      text-align: left;
    }
    #orderTable th {
      background-color: #4CAF50;
      color: white;
    }
  </style>
</head>
<body>

  <!-- User Info -->
  <div id="userInfo"></div>

  <!-- Orders Table -->
  <h2>User Orders</h2>
  <table id="orderTable">
    <thead>
      <tr>
        <th>Account Number</th>
        <th>Name</th>
        <th>Email</th>
        <th>Order Date</th>
        <th>Order ID</th>
        <th>Phone</th>
        <th>Billing Street</th>
        <th>Billing City</th>
        <th>Billing State</th>
        <th>Billing Postal</th>
        <th>Billing Country</th>
        <th>Shipping Street</th>
        <th>Shipping City</th>
        <th>Shipping State</th>
        <th>Shipping Postal</th>
        <th>Shipping Country</th>
        <th>Item Name</th>
        <th>Item Quantity</th>
        <th>Item Price</th>
        <th>Total Amount</th>
        <th>Tracking Number</th>
      </tr>
    </thead>
    <tbody>
      <!-- Orders will be dynamically added here -->
    </tbody>
  </table>

  <script src="script.js"></script>
</body>
</html>


  <script>
// Function to handle Google Login response
function handleCredentialResponse(response) {
  // Decode the JWT token to get user info
  const user = parseJwt(response.credential);

  // Display user info
  document.getElementById("userInfo").innerHTML = `
    <p>Welcome, ${user.name} (${user.email})!</p>
  `;

  // Fetch and display user orders
  fetchUserOrders(user.email);
}


// Fetch and display user orders
function fetchUserOrders(email) {
  const tableBody = document.querySelector("#orderTable tbody");

  // Fetch the orders JSON
  fetch("https://raw.githubusercontent.com/m-cochran/Randomerr/main/orders.json")
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      // Filter orders for the logged-in user
      const userOrders = data.filter(order => order.Email === email);

      if (userOrders.length > 0) {
        userOrders.forEach(order => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${order["Account Number"] || "N/A"}</td>
            <td>${order["Name"] || "N/A"}</td>
            <td>${order["Email"] || "N/A"}</td>
            <td>${order["Order Date"] || "N/A"}</td>
            <td>${order["Order ID"] || "N/A"}</td>
            <td>${order["Phone"] || "N/A"}</td>
            <td>${order["Billing Street"] || "N/A"}</td>
            <td>${order["Billing City"] || "N/A"}</td>
            <td>${order["Billing State"] || "N/A"}</td>
            <td>${order["Billing Postal"] || "N/A"}</td>
            <td>${order["Billing Country"] || "N/A"}</td>
            <td>${order["Shipping Street"] || "N/A"}</td>
            <td>${order["Shipping City"] || "N/A"}</td>
            <td>${order["Shipping State"] || "N/A"}</td>
            <td>${order["Shipping Postal"] || "N/A"}</td>
            <td>${order["Shipping Country"] || "N/A"}</td>
            <td>${order["Item Name"] || "N/A"}</td>
            <td>${order["Item Quantity"] || "N/A"}</td>
            <td>$${order["Item Price"] || "N/A"}</td>
            <td>$${order["Total Amount"] || "N/A"}</td>
            <td>${order["Tracking Number"] || "N/A"}</td>
          `;
          tableBody.appendChild(row);
        });
      } else {
        tableBody.innerHTML = `
          <tr>
            <td colspan="21" style="text-align: center;">No orders found for this user.</td>
          </tr>
        `;
      }
    })
    .catch(error => {
      console.error("Error fetching orders:", error);
      tableBody.innerHTML = `
        <tr>
          <td colspan="21" style="text-align: center;">Error loading data.</td>
        </tr>
      `;
    });
}


  </script>

</body>
</html>
