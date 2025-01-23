---
layout: default
title: Profile
permalink: /profile/
---

# Profile

<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/profile.css">

<main>
  <div class="profile-container">
    <h2>Your Profile</h2>
    <div class="profile">
      <img id="profilePicture" src="default-avatar.png" alt="Profile Picture" class="profile-picture" />
      <h1 id="profileName">Name</h1>
      <p id="profileEmail">Email</p>
    </div>

    <p class="profile-description">Welcome to your profile page. Here you can manage your account, view recent purchases, listings, and messages.</p>

    <!-- Section: Recent Purchases -->
    <section class="section">
      <h3>Recent Purchases</h3>
      <ul class="recent-purchases">
        <li>No recent purchases found.</li> <!-- Placeholder, you can dynamically populate this section -->
      </ul>
    </section>

    <!-- Section: Recent Listings -->
    <section class="section">
      <h3>Recent Listings</h3>
      <ul class="recent-listings">
        <li>No recent listings found.</li> <!-- Placeholder for recent listings -->
      </ul>
    </section>

    <!-- Section: Inbox Messages -->
    <section class="section">
      <h3>Inbox Messages</h3>
      <ul class="inbox-messages">
        <li>No new messages.</li> <!-- Placeholder for inbox messages -->
      </ul>
    </section>
  </div>
</main>

<script>
  // Existing placeholder logic for fetching recent purchases, listings, and messages
  function loadRecentItems() {
    const purchases = [
      'Item 1: Awesome Product',
      'Item 2: Cool Gadget',
      'Item 3: Amazing Accessory'
    ];

    const listings = [
      'Listing 1: Product for Sale',
      'Listing 2: Another Cool Item',
      'Listing 3: Vintage Collection'
    ];

    const messages = [
      'Message 1: You have a new offer!',
      'Message 2: Seller responded to your inquiry',
      'Message 3: You have a new comment on your listing'
    ];

    const purchaseList = document.querySelector('.recent-purchases');
    purchases.forEach(purchase => {
      const li = document.createElement('li');
      li.textContent = purchase;
      purchaseList.appendChild(li);
    });

    const listingList = document.querySelector('.recent-listings');
    listings.forEach(listing => {
      const li = document.createElement('li');
      li.textContent = listing;
      listingList.appendChild(li);
    });

    const messageList = document.querySelector('.inbox-messages');
    messages.forEach(message => {
      const li = document.createElement('li');
      li.textContent = message;
      messageList.appendChild(li);
    });
  }

  window.onload = loadRecentItems;  // Call the function to load recent items
</script>


<script>
  async function getRecentPurchases(accountNumber) {
  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbwGUhSttkDP3B8bUie3h_zHvoUHfZgohHofiL_EonGAyV6TNXhPbFmXiGD78DFXwzBKAA/exec" + accountNumber);
    const data = await response.json();

    if (data && data.length > 0) {
      displayRecentPurchases(data);
    } else {
      console.log("No recent purchases found.");
      displayMessage("No recent purchases found.", "info");
    }
  } catch (error) {
    console.error("Error fetching recent purchases:", error);
    displayMessage("Error fetching recent purchases. Please try again later.", "error");
  }
}

function displayRecentPurchases(purchases) {
  const purchaseContainer = document.getElementById("purchaseDetails");
  
  if (!purchaseContainer) return;

  // Clear existing content
  purchaseContainer.innerHTML = '';

  purchases.forEach(purchase => {
    const purchaseDiv = document.createElement("div");
    purchaseDiv.classList.add("purchase-item");

    purchaseDiv.innerHTML = `
      <h3>Order ID: ${purchase.OrderID}</h3>
      <p><strong>Account Number:</strong> ${purchase['Account Number']}</p>
      <p><strong>Billing Address:</strong> ${purchase['Billing Street']}, ${purchase['Billing City']}, ${purchase['Billing State']} ${purchase['Billing Postal']}, ${purchase['Billing Country']}</p>
      <p><strong>Shipping Address:</strong> ${purchase['Shipping Street']}, ${purchase['Shipping City']}, ${purchase['Shipping State']} ${purchase['Shipping Postal']}, ${purchase['Shipping Country']}</p>
      <p><strong>Item:</strong> ${purchase['Item Name']}</p>
      <p><strong>Quantity:</strong> ${purchase['Item Quantity']}</p>
      <p><strong>Price:</strong> ${purchase['Item Price']}</p>
      <p><strong>Total Amount:</strong> ${purchase['Total Amount']}</p>
    `;

    purchaseContainer.appendChild(purchaseDiv);
  });
}

function updateProfilePage(userInfo) {
  // Update profile page with Google account info
  document.getElementById("profileName").textContent = userInfo.name || 'Name';
  document.getElementById("profileEmail").textContent = userInfo.email || 'Email';
  document.getElementById("profilePicture").src = userInfo.picture || 'default-avatar.png';
  
  // Get recent purchases based on account number from the user's Google Sheets data
  const accountNumber = userInfo.email;  // Or any other identifier you are using
  getRecentPurchases(accountNumber);
}
</script>


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
      <!-- Example Row -->
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
        <td>$1200.00</td>
        <td>$1200.00</td>
        <td>TRACK123</td>
      </tr>
    </tbody>
  </table>
</div>




<style>
/* Page Container */
.container {
  max-width: 900px;
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
