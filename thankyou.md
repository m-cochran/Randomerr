---
layout: default
title: Thank You
permalink: /thank-you/
---

<main class="thankyou-container">
  <h1>Thank You for Your Purchase!</h1>
  <p>Your order has been successfully processed. Below are the details of your purchased items:</p>
  
  <div id="purchased-items">
    <!-- Purchased items will be dynamically populated here -->
  </div>
  
  <p>We appreciate your business and look forward to serving you again!</p>
</main>


<script>
  // Retrieve purchased items from localStorage
  var purchasedItems = JSON.parse(localStorage.getItem('purchasedItems'));
  
  if (purchasedItems && purchasedItems.length > 0) {
    var purchasedItemsContainer = document.getElementById('purchased-items');
    
    purchasedItems.forEach(function(item) {
      // Assuming each item has 'name', 'quantity', and 'price'
      var itemElement = document.createElement('div');
      itemElement.textContent = item.name + " x " + item.quantity + " - $" + item.price;
      purchasedItemsContainer.appendChild(itemElement);
    });
  } else {
    document.getElementById('purchased-items').textContent = "No items found.";
  }
  
  // Optionally, clear the purchased items from localStorage after displaying
  localStorage.removeItem('purchasedItems');
</script>
