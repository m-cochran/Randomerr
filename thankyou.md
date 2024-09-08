---
layout: default
title: Thank You
permalink: /thank-you/
---

# Thank You for Your Purchase!

<h2>Your Purchased Items:</h2>
<div id="purchased-items">
  <!-- Items will be dynamically populated here -->
</div>

<p>We hope you enjoy your purchase. If you have any questions, feel free to <a href="/contact/">contact us</a>.</p>

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
      itemElement.textContent = item.name + " - $" + item.price;
      purchasedItemsContainer.appendChild(itemElement);
    });
  } else {
    purchasedItemsContainer.textContent = 'No items found.';
  }

  // Clear purchasedItems from localStorage after displaying
  localStorage.removeItem('purchasedItems');
</script>
