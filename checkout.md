---
layout: default
title: Checkout
permalink: /checkout/
---

# Checkout

<div id="cart-items"></div>
<div id="cart-total"></div>

<!-- Checkout Form -->
<form id="checkout-form" action="/checkout-success" method="post">
  <h2>Billing Information</h2>
  <label for="name">Name:</label>
  <input type="text" id="name" name="name" required><br>

  <label for="address">Address:</label>
  <input type="text" id="address" name="address" required><br>

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required><br>

  <!-- Add any other necessary fields here -->

  <button type="submit">Complete Purchase</button>
</form>

<script src="cart.js"></script>
<script>
  // Populate the cart items and total
  updateCartPage();

  // Submit checkout form handling
  document.getElementById("checkout-form").onsubmit = function(event) {
    event.preventDefault();
    // Implement your checkout logic here (e.g., sending data to your backend)
    alert("Checkout completed!");
  };
</script>
