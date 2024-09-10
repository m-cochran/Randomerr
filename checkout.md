---
layout: default
title: Checkout
permalink: /checkout/
---

# Checkout

Feel free to reach out via email at [contact@randomerr.com](mailto:contact@randomerr.com).

<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/checkout.css" />
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/stripe.css" />
<script src="https://js.stripe.com/v3/"></script>

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
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
      </div>
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
    </form>
  </section>

  <section id="payment-info">
    <h2>Complete Your Purchase</h2>
    <form id="payment-form" aria-label="Payment Form">
      <label for="card-element" class="form-label">Credit or debit card</label>
      <div id="card-element" class="card-input"></div>
      <small id="card-help" class="form-text">Your card details are securely encrypted.</small>
      <button id="submit-button" aria-label="Pay Now">Pay Now</button>
      <div id="spinner" class="spinner hidden" aria-hidden="true"></div>
      <div id="payment-status" role="alert" aria-live="polite"></div>
    </form>
  </section>
</main>

<script src="{{ site.baseurl }}/assets/js/checkout.js"></script>
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      const stripe = Stripe("pk_test_51PulULDDaepf7cjiBCJQ4wxoptuvOfsdiJY6tvKxW3uXZsMUome7vfsIORlSEZiaG4q20ZLSqEMiBIuHi7Fsy9dP00nytmrtYb");
      const elements = stripe.elements();
      const card = elements.create("card");
      card.mount("#card-element");

      const form = document.getElementById("payment-form");
      const submitButton = document.getElementById("submit-button");
      const paymentStatus = document.getElementById("payment-status");

      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        submitButton.disabled = true;
        paymentStatus.textContent = "";

        const cartTotal = document.getElementById("cart-total").textContent.replace("Total: $", "");
        const shippingDetails = {
          email: document.getElementById("email").value,
          name: document.getElementById("name").value,
          address: {
            line1: document.getElementById("address").value,
            city: document.getElementById("city").value,
            state: document.getElementById("state").value,
            postal_code: document.getElementById("zip").value
          }
        };

        if (!cartTotal || cartTotal <= 0) {
          alert("Your cart is empty.");
          submitButton.disabled = false;
          return;
        }

        try {
          const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: parseFloat(cartTotal), email: shippingDetails.email }),
          });

          const data = await response.json();

          if (data.error) {
            paymentStatus.textContent = data.error;
            submitButton.disabled = false;
            return;
          }

          const result = await stripe.confirmCardPayment(data.clientSecret, {
            payment_method: {
              card: card,
              billing_details: shippingDetails,
            },
          });

          if (result.error) {
            paymentStatus.textContent = result.error.message;
          } else {
            if (result.paymentIntent.status === 'succeeded') {
              paymentStatus.textContent = 'Payment succeeded!';
              clearCart();
              window.location.href = "/thank-you/";
            }
          }
        } catch (error) {
          paymentStatus.textContent = 'Payment failed: ' + error.message;
        } finally {
          submitButton.disabled = false;
        }
      });

      function clearCart() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems'));
        if (cartItems && cartItems.length > 0) {
          localStorage.setItem('purchasedItems', JSON.stringify(cartItems));
        }
        localStorage.removeItem('cartItems');
        document.getElementById("cart-items").innerHTML = "";
        document.getElementById("cart-total").textContent = "Total: $0.00";
      }
    });
  </script>
