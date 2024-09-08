<!-- Thank-You Page -->
---
layout: default
title: Thank You
permalink: /thank-you/
---

# Thank You!

We hope you enjoy your purchase. If you have any questions, feel free to contact us at [contact@randomerr.com](mailto:contact@randomerr.com).

<script>
  document.addEventListener("DOMContentLoaded", () => {
    const purchasedItems = JSON.parse(localStorage.getItem('purchasedItems'));
    if (purchasedItems && purchasedItems.length > 0) {
      const cartItemsContainer = document.getElementById('cart-items');
      cartItemsContainer.innerHTML = '';
      purchasedItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'purchased-item';
        itemDiv.innerHTML = `
          <h3>${item.name}</h3>
          <p>Price: $${item.price}</p>
          <p>Quantity: ${item.quantity}</p>
        `;
        cartItemsContainer.appendChild(itemDiv);
      });
      document.getElementById('cart-summary').style.display = 'block';
    } else {
      document.getElementById('cart-summary').innerHTML = '<p>No items found.</p>';
    }
  });
</script>
