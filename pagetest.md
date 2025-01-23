---
layout: default
title: Profile
permalink: /pro/
---

# Profile




<div class="container">
  <header>
    <h1>Order History</h1>
  </header>

  <!-- User Info Section -->
  <div id="userInfo">
    <p>Welcome, johndoe@example.com!</p>
  </div>

  <!-- Orders Table -->
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
      <tr>
        <td>123456</td>
        <td>John Doe</td>
        <td>johndoe@example.com</td>
        <td>2025-01-15</td>
        <td>ORD12345</td>
        <td>+1234567890</td>
        <td>123 Main Street</td>
        <td>New York</td>
        <td>NY</td>
        <td>10001</td>
        <td>USA</td>
        <td>456 Elm Street</td>
        <td>Los Angeles</td>
        <td>CA</td>
        <td>90001</td>
        <td>USA</td>
        <td>Laptop</td>
        <td>1</td>
        <td>1200.00</td>
        <td>1200.00</td>
        <td>TRACK123</td>
      </tr>
    </tbody>
  </table>
</div>


<style>
  /* General Reset */
body, h1, h2, p, table, th, td {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  color: #333;
  padding: 20px;
}

/* Page Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Header Section */
header {
  text-align: center;
  margin-bottom: 20px;
}

header h1 {
  font-size: 2rem;
  color: #0056b3;
}

/* User Info Section */
#userInfo {
  text-align: center;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #eef6ff;
  border: 1px solid #d3e2f4;
  border-radius: 8px;
  font-size: 1rem;
  color: #0056b3;
}

/* Orders Table */
#orderTable {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

#orderTable thead {
  background-color: #0056b3;
  color: #fff;
}

#orderTable th, #orderTable td {
  padding: 10px 12px;
  text-align: left;
  border: 1px solid #ddd;
}

#orderTable th {
  text-transform: uppercase;
  font-size: 0.9rem;
}

#orderTable tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

#orderTable tbody tr:hover {
  background-color: #e9f5ff;
}

/* No Data Message */
#orderTable tbody td {
  text-align: center;
  font-size: 0.9rem;
  color: #777;
}

/* Responsive Design */
@media (max-width: 768px) {
  #orderTable {
    font-size: 0.9rem;
  }

  #orderTable th, #orderTable td {
    padding: 8px;
  }

  header h1 {
    font-size: 1.5rem;
  }

  #userInfo {
    font-size: 0.9rem;
  }
}

</style>


<script>
  document.addEventListener("DOMContentLoaded", () => {
  const loggedInUserEmail = localStorage.getItem("userEmail") || "johndoe@example.com"; // Example fallback
  const orders = JSON.parse(localStorage.getItem("userOrders")) || []; // Fallback if no data exists

  // Display logged-in user email
  const userInfoDiv = document.getElementById("userInfo");
  userInfoDiv.innerHTML = `<p>Welcome, ${loggedInUserEmail}!</p>`;

  // Populate orders table
  const tableBody = document.querySelector("#orderTable tbody");
  if (orders.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="21">No orders found for ${loggedInUserEmail}.</td></tr>`;
  } else {
    orders.forEach((order) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${order["Account Number"]}</td>
        <td>${order.Name}</td>
        <td>${order.Email}</td>
        <td>${order["Order Date"]}</td>
        <td>${order["Order ID"]}</td>
        <td>${order.Phone}</td>
        <td>${order["Billing Street"]}</td>
        <td>${order["Billing City"]}</td>
        <td>${order["Billing State"]}</td>
        <td>${order["Billing Postal"]}</td>
        <td>${order["Billing Country"]}</td>
        <td>${order["Shipping Street"]}</td>
        <td>${order["Shipping City"]}</td>
        <td>${order["Shipping State"]}</td>
        <td>${order["Shipping Postal"]}</td>
        <td>${order["Shipping Country"]}</td>
        <td>${order["Item Name"]}</td>
        <td>${order["Item Quantity"]}</td>
        <td>${order["Item Price"]}</td>
        <td>${order["Total Amount"]}</td>
        <td>${order["Tracking Number"]}</td>
      `;
      tableBody.appendChild(row);
    });
  }
});

</script>
