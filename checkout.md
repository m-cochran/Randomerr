---
layout: default
title: Checkout
permalink: /checkout/
---

# Checkout




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

