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
  <title>Orders</title>
  <style>
/* General Styles */
body {
  font-family: Arial, sans-serif;
  margin: 20px;
  background-color: #f9f9f9;
  color: #333;
}

/* Table Styles */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 12px 15px;
  text-align: left;
  border: 1px solid #ddd;
}

/* Header Row */
th {
  background-color: #4CAF50;
  color: white;
  font-weight: bold;
}

/* Alternating Row Colors */
tr:nth-child(even) {
  background-color: #f2f2f2;
}

/* Hover Effect */
tr:hover {
  background-color: #f1f1f1;
}

/* Responsive Table */
@media screen and (max-width: 768px) {
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  th, td {
    font-size: 14px;
  }
}
  </style>
</head>
<body>
  <h1>User Orders</h1>
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
      <!-- Rows will be dynamically added here -->
    </tbody>
  </table>
  <script src="script.js"></script>
</body>
</html>


  <script>
document.addEventListener("DOMContentLoaded", function () {
  const loggedInEmail = "johndoe@example.com"; // Replace with actual logged-in user's email
  const tableBody = document.querySelector("#orderTable tbody");

  fetch("https://raw.githubusercontent.com/m-cochran/Randomerr/main/orders.json")
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return response.json();
    })
    .then(data => {
      // Filter data for the logged-in user's email
      const userOrders = data.filter(order => order.Email === loggedInEmail);

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
      console.error("Error fetching orders.json:", error);
      tableBody.innerHTML = `
        <tr>
          <td colspan="21" style="text-align: center;">Error loading data. Please try again later.</td>
        </tr>
      `;
    });
});

  </script>

</body>
</html>
