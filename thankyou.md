---
layout: default
title: Thank You
permalink: /thank-you/
---

<div class="container">
  <h1>Thank You for Your Purchase!</h1>

  <h2>Your Purchased Items:</h2>
  <div id="purchased-items">
    <!-- Items will be dynamically populated here -->
  </div>

  <p>We hope you enjoy your purchase. If you have any questions, feel free to <a href="/contact/">contact us</a>.</p>
</div>

<style>
  /* General Styles for the Thank You Page */

  #purchased-items {
    margin: 0;
    padding: 0;
  }

  .purchased-item {
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #ddd;
    background-color: #f9f9f9;
    border-radius: 8px;
    margin-bottom: 15px;
  }

  .purchased-item:last-child {
    border-bottom: none;
  }

  .item-image {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .item-details {
    flex: 1;
  }

  .item-details strong {
    font-size: 1.2em;
    color: #34495e;
  }

  .item-details p {
    margin: 5px 0;
    font-size: 1em;
    color: #555;
  }

  p {
    font-size: 1.1em;
    line-height: 1.6;
    color: #666;
  }

  a {
    color: #2980b9;
    text-decoration: none;
    font-weight: bold;
  }

  a:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .container {
      padding: 15px;
    }

    .purchased-item {
      flex-direction: column;
      align-items: flex-start;
    }

    .item-image {
      margin-bottom: 10px;
      width: 100%;
      max-width: 150px;
    }
  }
</style>

<script>
  // Retrieve purchased items from localStorage
  var purchasedItems = JSON.parse(localStorage.getItem('purchasedItems'));

  // Reference to the HTML container where purchased items will be displayed
  var purchasedItemsContainer = document.getElementById('purchased-items');

  // Check if purchased items exist
  if (purchasedItems && purchasedItems.length > 0) {
    purchasedItems.forEach(function(item) {
      // Create an element for each purchased item and append to the container
      var itemElement = document.createElement('div');
      itemElement.className = 'purchased-item';

      // Create image element
      var itemImage = document.createElement('img');
      itemImage.src = item.image; // Assuming image URL is stored in 'image'
      itemImage.alt = item.name;
      itemImage.className = 'item-image';

      // Create details element
      var itemDetails = document.createElement('div');
      itemDetails.className = 'item-details';
      itemDetails.innerHTML = `<strong>${item.name}</strong><br>
                               Price: $${item.price}<br>
                               Quantity: ${item.quantity}`;

      // Append image and details to item element
      itemElement.appendChild(itemImage);
      itemElement.appendChild(itemDetails);
      purchasedItemsContainer.appendChild(itemElement);
    });
  } else {
    purchasedItemsContainer.textContent = 'No items found.';
  }

  // Clear purchasedItems from localStorage after displaying
  localStorage.removeItem('purchasedItems');
</script>
