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
