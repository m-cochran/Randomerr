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


<script>
  /* General Styles for the Thank You Page */
h1, h2 {
  color: #4a90e2;
}

h2 {
  border-bottom: 2px solid #4a90e2;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

#purchased-items {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.purchased-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e1e1e1;
}

.purchased-item:last-child {
  border-bottom: none;
}

.item-image {
  max-width: 100px;
  max-height: 100px;
  margin-right: 20px;
  border-radius: 5px;
}

.item-details {
  font-size: 16px;
}

p {
  font-size: 16px;
  line-height: 1.5;
}

a {
  color: #4a90e2;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

</script>
