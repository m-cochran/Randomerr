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

