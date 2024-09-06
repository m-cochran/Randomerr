---
layout: default
title: Market
permalink: /market/
---

# Market

Feel free to reach out via email at [contact@randomerr.com](mailto:contact@randomerr.com).






<title>Secure Checkout</title>
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/checkout.css"/>
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/stripe.css"/>
<script src="https://js.stripe.com/v3/"></script>
<script src="{{ site.baseurl }}/assets/js/checkout.js"></script>
<script src="{{ site.baseurl }}/server/server.js"></script>
</head>
<body>
<main class="checkout-container">
<section id="cart-summary">
<h2>Your Cart</h2>
<div id="cart-items">
<!-- Cart items will be dynamically populated here -->
</div>
<div class="checkout-summary">
<div id="cart-total">Total: $0.00</div>
</div>
</section>

<section id="shipping-info">
<h2>Shipping Information</h2>
<form id="shipping-form">
<div class="form-group">
<label for="name">Name:</label>
<input type="text" id="name" name="name" required />
</div>

<div class="form-group">
<label for="address">Address:</label>
<input type="text" id="address" name="address" required />
</div>

<div class="form-group">
<label for="city">City:</label>
<input type="text" id="city" name="city" required />
</div>

<div class="form-group">
<label for="state">State:</label>
<input type="text" id="state" name="state" required />
</div>

<div class="form-group">
<label for="zip">Zip Code:</label>
<input type="text" id="zip" name="zip" required />
</div>

<section id="payment-section">
<h2>Complete Your Purchase</h2>
<form id="payment-form" aria-label="Payment Form">
<label for="card-element" class="form-label">Credit or debit card</label>
<div id="card-element" class="card-input"></div>
<small id="card-help" class="form-text">Your card details are securely encrypted.</small>

<button id="submit-button" aria-label="Pay Now">Pay Now</button>
<div id="spinner" class="spinner hidden" aria-hidden="true"></div>
<div id="card-errors" role="alert" aria-live="polite"></div>
</form>
</section>

<form id="payment-form">
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" required>
  </div>
  
  <div class="form-group">
    <label for="address">Address</label>
    <input type="text" id="address" name="address" required>
  </div>

  <div class="form-group">
    <label for="city">City</label>
    <input type="text" id="city" name="city" required>
  </div>

  <div class="form-group">
    <label for="state">State</label>
    <input type="text" id="state" name="state" required>
  </div>

  <div class="form-group">
    <label for="zip">ZIP Code</label>
    <input type="text" id="zip" name="zip" required>
  </div>

  <!-- This is where the Stripe card element will go -->
  <div id="card-element" class="form-group">
    <!-- Stripe Card Element will be inserted here -->
  </div>

  <!-- Error message container -->
  <div id="error-message" class="error-message"></div>

  <!-- Spinner for loading state -->
  <div id="spinner" class="spinner hidden">Processing...</div>

  <button type="submit" id="submit-button">Submit Payment</button>
</form>



<style>
.form-group {
  margin-bottom: 15px;
}

#card-element {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.spinner {
  display: none;
}

.spinner.hidden {
  display: none;
}
</style>
