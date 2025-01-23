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
  <title>Google Login and User Data</title>
  <style>
  /* General Styles */


    <div class="profile-container">
    <h2>Your Profile</h2>
    <div class="profile">
      <img id="profilePicture" src="default-avatar.png" alt="Profile Picture" class="profile-picture" />
      <h1 id="profileName">Name</h1>
      <p id="profileEmail">Email</p>
    </div>

  h1, h2 {
    text-align: center;
    margin: 20px 0;
  }

  h1 {
    font-size: 2rem;
    color: #4CAF50;
  }

  h2 {
    font-size: 1.5rem;
    color: #333;
  }

  /* Container */
  .container {
    width: 90%;
    max-width: 95hw;
    margin: 0 auto;
    padding: 20px;
    background: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  /* Table Styles */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }

  th, td {
    text-align: left;
    padding: 12px 15px;
    border: 1px solid #ddd;
  }

  th {
    background-color: #4CAF50;
    color: white;
    font-weight: bold;
  }

  td {
    background-color: #f9f9f9;
  }

  /* Zebra striping for rows */
  tr:nth-child(even) td {
    background-color: #f1f1f1;
  }

  /* Responsive Table */
  @media (max-width: 768px) {
    table {
      font-size: 14px;
    }

    th, td {
      padding: 10px;
    }
  }

  /* No Orders Message */
  .no-orders {
    text-align: center;
    font-size: 1.2rem;
    color: #888;
    margin: 20px 0;
  }

  </style>
</head>
<body>
  <h1>Welcome to the User Orders Page</h1>
  
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
      <!-- Orders will be displayed here -->
    </tbody>
  </table>

  <script src="https://accounts.google.com/gsi/client" async defer></script>
  <script>
    // Your existing code to handle Google Sign-In

    // Fetch user info and display orders
    function getUserInfo() {
      const authInstance = gapi.auth2.getAuthInstance();
      const user = authInstance.currentUser.get();
      if (user.isSignedIn()) {
        const userInfo = user.getBasicProfile();
        const email = userInfo.getEmail(); // Get the logged-in user's email
        localStorage.setItem("loggedInUserEmail", email); // Store in localStorage
        return email;
      }
    }

    // Fetch orders based on email
    function fetchUserOrders(email) {
      const tableBody = document.querySelector("#orderTable tbody");
      fetch("https://raw.githubusercontent.com/m-cochran/Randomerr/main/orders.json")
        .then(response => response.json())
        .then(data => {
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
            tableBody.innerHTML = "<tr><td colspan='21'>No orders found for this user.</td></tr>";
          }
        });
    }

    window.onload = function () {
      const loggedInEmail = getUserInfo();
      if (loggedInEmail) {
        fetchUserOrders(loggedInEmail);
      }
    };
  </script>
</body>
</html>

