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

  <!-- User Info -->
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
  </table>
</div>



<style>
/* Page Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Header Section */
header {
  text-align: center;
  margin-bottom: 20px;
}

header h1 {
  font-size: 2rem;
  color: #444;
}

/* User Info Section */
#userInfo {
  text-align: center;
  margin-bottom: 20px;
  padding: 10px;
  background: #eef6ff;
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
  background: #0056b3;
  color: #fff;
}

#orderTable th, #orderTable td {
  padding: 12px 15px;
  text-align: left;
  border: 1px solid #ddd;
}

#orderTable th {
  font-size: 0.9rem;
  text-transform: uppercase;
  font-weight: bold;
}

#orderTable tr:nth-child(even) {
  background: #f2f2f2;
}

#orderTable tr:hover {
  background: #e9f5ff;
}

/* No Orders Message */
#orderTable tbody tr td {
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
    padding: 8px 10px;
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
  document.addEventListener("DOMContentLoaded", function () {
  const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");

  if (!loggedInUserEmail) {
    // Redirect to login page if the user is not logged in
    window.location.href = "/login.html";
    return;
  }

  // Display user information
  document.getElementById("userInfo").innerHTML = `
    <p>Welcome, ${loggedInUserEmail}!</p>
  `;

  // Fetch and display user orders
  fetchUserOrders(loggedInUserEmail);
});

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

