---
layout: default
title: Market
permalink: /market/
---

# Market

Feel free to reach out via email at [contact@randomerr.com](mailto:contact@randomerr.com).





<title>Secure Checkout</title>

<!-- Checkout CSS -->
<!-- Stripe-specific CSS -->
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/checkout.css" />
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/stripe.css" />
<script src="/Randomerr/server/combined_checkout.js"></script>
<script src="/Randomerr/server/server.js"></script>

<!-- Stripe JS -->
<script src="https://js.stripe.com/v3/"></script>

<body>
<main class="checkout-container">
<!-- Cart Summary Section -->
<section id="cart-summary">
<h2>Your Cart</h2>
<div id="cart-items">
<!-- Cart items will be dynamically populated here -->
</div>
<div class="checkout-summary">
<div id="cart-total">Total: $0.00</div>
</div>
</section>

<!-- Shipping Information Section -->
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
</form>
</section>

<!-- Payment Section -->
<section class="payment-container">
<h2>Complete Your Purchase</h2>
<form id="payment-form" aria-label="Payment Form">
<div class="form-group">
<label for="card-element" class="form-label">Credit or debit card</label>
<div id="card-element" class="card-input"></div>
<small id="card-help" class="form-text">Your card details are securely encrypted.</small>
</div>
<button id="submit-button" aria-label="Pay Now">Pay Now</button>
<div id="spinner" class="spinner hidden" aria-hidden="true"></div>
<div id="card-errors" role="alert" aria-live="polite"></div>
</form>
</section>




<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Checkout</title>
<style>
body {
font-family: Arial, sans-serif;
margin: 0;
padding: 20px;
}
form {
max-width: 400px;
margin: 0 auto;
padding: 20px;
border: 1px solid #ccc;
border-radius: 8px;
}
label {
display: block;
margin-bottom: 8px;
}
input {
width: 100%;
padding: 10px;
margin-bottom: 16px;
border-radius: 4px;
border: 1px solid #ccc;
}
button {
padding: 10px;
background-color: #28a745;
color: white;
border: none;
cursor: pointer;
width: 100%;
border-radius: 4px;
}
</style>
<script src="https://js.stripe.com/v3/"></script>
</head>
<body>
<h1>Checkout</h1>
<form id="payment-form">
<label for="cardholder-name">Cardholder Name</label>
<input id="cardholder-name" type="text" placeholder="Jane Doe" required />

<label for="card-number">Card Number</label>
<div id="card-element"></div>

<button id="submit">Pay</button>
</form>

<script>
var stripe = Stripe("your-publishable-key-here");
var elements = stripe.elements();
var card = elements.create("card");
card.mount("#card-element");

var form = document.getElementById("payment-form");
form.addEventListener("submit", function (event) {
event.preventDefault();

stripe.createToken(card).then(function (result) {
if (result.error) {
// Show error in payment form
alert(result.error.message);
} else {
// Send the token to your server or payment gateway
alert("Token created: " + result.token.id);
}
});
});
</script>
</body>
</html>
