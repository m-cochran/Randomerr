---
layout: default
title: Thank You
permalink: /thank-you/
---

# Thank You for Your Purchase!

<div id="purchased-items">
  <h2>Your Purchased Items:</h2>
  <div id="purchased-items-list">
    <!-- Purchased items will be displayed here -->
  </div>
</div>

<script>
  document.addEventListener("DOMContentLoaded", function() {
    var purchasedItems = JSON.parse(localStorage.getItem('purchasedItems'));

    if (purchasedItems && purchasedItems.length > 0) {
      var purchasedItemsList = document.getElementById("purchased-items-list");
      purchasedItems.forEach(function(item) {
        var itemElement = document.createElement("div");
        itemElement.classList.add("purchased-item");
        itemElement.innerHTML = `<strong>${item.name}</strong> - ${item.quantity} x $${item.price}`;
        purchasedItemsList.appendChild(itemElement);
      });

      // Optionally clear the purchasedItems after displaying them
      localStorage.removeItem('purchasedItems');
    } else {
      document.getElementById("purchased-items").innerHTML = "<p>No items found.</p>";
    }
  });
</script>
