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
  <title>Google Sheets Data</title>
  <style>
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
</head>
<body>

  <h1>Data from Google Sheets</h1>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Data</title>
  <link rel="stylesheet" href="styles.css"> <!-- Link your CSS file -->
</head>
<body>
  <h1>User Orders</h1>
  <table id="orderTable">
    <thead>
      <tr>
        <th>Order ID</th>
        <th>Item Name</th>
        <th>Item Quantity</th>
        <th>Item Price</th>
        <th>Total Amount</th>
        <th>Order Date</th>
        <th>Tracking Number</th>
      </tr>
    </thead>
    <tbody>
      <!-- Data will be dynamically added here -->
    </tbody>
  </table>

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
            <td>${order["Order ID"]}</td>
            <td>${order["Name"]}</td>
            <td>${order["Email"]}</td>
            <td>${order["Order Date"]}</td>
            <td>${order["Item Name"]}</td>
            <td>${order["Item Quantity"]}</td>
            <td>$${order["Total Amount"]}</td>
          `;
          tableBody.appendChild(row);
        });
      } else {
        tableBody.innerHTML = `
          <tr>
            <td colspan="7" style="text-align: center;">No orders found for this user.</td>
          </tr>
        `;
      }
    })
    .catch(error => {
      console.error("Error fetching orders.json:", error);
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center;">Error loading data. Please try again later.</td>
        </tr>
      `;
    });
});

  </script>

</body>
</html>
