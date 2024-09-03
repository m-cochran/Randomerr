---
layout: default
title: Checkout
permalink: /checkout/
---

# Checkout



  <link rel="stylesheet" href="{{ site.baseurl }}/assets/css/checkout.css">


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
          <input type="text" id="name" name="name" required>
        </div>

        <div class="form-group">
          <label for="address">Address:</label>
          <input type="text" id="address" name="address" required>
        </div>

        <div class="form-group">
          <label for="city">City:</label>
          <input type="text" id="city" name="city" required>
        </div>

        <div class="form-group">
          <label for="state">State:</label>
          <input type="text" id="state" name="state" required>
        </div>

        <div class="form-group">
          <label for="zip">Zip Code:</label>
          <input type="text" id="zip" name="zip" required>
        </div>

        <div class="form-group">
          <label for="payment">Payment Method:</label>
          <select id="payment" name="payment" required>
            <option value="credit-card">Credit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        <button type="submit" class="btn-submit">Complete Purchase</button>
      </form>
    </section>
  </main>

  <script src="{{ site.baseurl }}/assets/js/checkout.js">






    <script src="https://js.stripe.com/v3/"></script>

    <style>
      /* Basic styling for checkout form */
      .checkout-form {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
      }

      .checkout-form input,
      .checkout-form button {
        width: 100%;
        padding: 10px;
        margin: 10px 0;
      }

    </style>

    <h1>Checkout</h1>
    <form id="payment-form" class="checkout-form">
      <div id="card-element">
        <!-- A Stripe Element will be inserted here. -->
      </div>
      <button id="submit">Pay Now</button>
      <div id="error-message"></div>
    </form>

    <script src="{{ site.baseurl }}/server/checkout.js"></script>


