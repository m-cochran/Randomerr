---
layout: default
title: Market
permalink: /market/
---

# Market

Feel free to reach out via email at [contact@randomerr.com](mailto:contact@randomerr.com).




<title>Checkout</title>
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/checkout.css" />
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/stripe.css" />

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
<form id="payment-form" aria-label="Payment Form">
<div id="card-element" class="card-input"></div>
<small id="card-help" class="form-text">Your card details are securely encrypted.</small>
<div id="card-errors" role="alert" aria-live="polite"></div>
<div id="spinner" class="spinner hidden" aria-hidden="true"></div>
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
<button id="submit-button" aria-label="Pay Now">Pay Now</button>
</form>
</section>

<!-- Include Stripe.js before your custom script -->
<script src="https://js.stripe.com/v3/"></script>
<script src="{{ site.baseurl }}/assets/js/combined_checkout.js"></script>
<script src="{{ site.baseurl }}/server/server.js"></script>
</main>
</body>


