---
layout: default
title: Market
permalink: /market/
---

# Market

Feel free to reach out via email at [contact@randomerr.com](mailto:contact@randomerr.com).





<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Secure Checkout</title>
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/checkout.css"/>
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/stripe.css"/>
<script src="https://js.stripe.com/v3/"></script>
<script src="{{ site.baseurl }}/assets/js/combined_checkout.js"></script>
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

<div class="form-group">
<label for="payment">Payment Method:</label>
<select id="payment" name="payment" required>
<option value="credit-card">Credit Card</option>
<option value="paypal">PayPal</option>
</select>
</div>
</form>
</section>

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
</main>
</body>
</html>


