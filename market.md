---
layout: default
title: Market
permalink: /market/
---

# Market

Feel free to reach out via email at [contact@randomerr.com](mailto:contact@randomerr.com).






<title>Secure Checkout</title>
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/stripe.css" />
<div class="payment-container">
    <h2>Complete Your Purchase</h2>
    <form id="payment-form" aria-label="Payment Form">
        <label for="card-element" class="form-label">Credit or debit card</label>
        <div id="card-element" class="card-input"></div>
        <small id="card-help" class="form-text">Your card details are securely encrypted.</small>
        <button id="submit-button" aria-label="Pay Now">Pay Now</button>
        <div id="spinner" class="spinner hidden" aria-hidden="true"></div>
        <div id="card-errors" role="alert" aria-live="polite"></div>
    </form>
</div>
<script src="https://js.stripe.com/v3/"></script>
<script src="{{ site.baseurl }}/server/stripe_checkout.js"></script>
<script src="{{ site.baseurl }}/server/server.js"></script>
