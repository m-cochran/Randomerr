---
layout: default
title: Market
permalink: /market/
---

# Checkout

Feel free to reach out via email at [contact@randomerr.com](mailto:contact@randomerr.com).


<h2>Complete Your Payment</h2>

<form id="payment-form">
  <!-- Cardholder's Name -->
  <label for="name">Full Name</label>
  <input type="text" id="name" required>

  <!-- Email Address -->
  <label for="email">Email Address</label>
  <input type="email" id="email" required>

  <!-- Phone Number -->
  <label for="phone">Phone Number</label>
  <input type="tel" id="phone" required>

  <!-- Billing Address -->
  <h3>Billing Address</h3>
  <input type="text" id="billing-address" placeholder="Street Address" required>
  <input type="text" id="billing-city" placeholder="City" required>
  <input type="text" id="billing-state" placeholder="State" required>
  <input type="text" id="billing-postal-code" placeholder="Postal Code" required>
  <input type="text" id="billing-country" placeholder="Country" required>

  <!-- Shipping Address -->
  <h3>Shipping Address</h3>
  <input type="text" id="shipping-address" placeholder="Street Address" required>
  <input type="text" id="shipping-city" placeholder="City" required>
  <input type="text" id="shipping-state" placeholder="State" required>
  <input type="text" id="shipping-postal-code" placeholder="Postal Code" required>
  <input type="text" id="shipping-country" placeholder="Country" required>

  <!-- Stripe Card Element -->
  <label for="card-element">Credit or debit card</label>
  <div id="card-element"></div>

  <button id="submit-button">Pay Now</button>
  <div id="payment-status"></div>
</form>

<script>
document.addEventListener("DOMContentLoaded", async () => {
  const stripe = Stripe('pk_test_51PulULDDaepf7cjiBCJQ4wxoptuvOfsdiJY6tvKxW3uXZsMUome7vfsIORlSEZiaG4q20ZLSqEMiBIuHi7Fsy9dP00nytmrtYb');

  const form = document.getElementById("payment-form");
  const submitButton = document.getElementById("submit-button");
  const paymentStatus = document.getElementById("payment-status");

  // Mount the Stripe Elements card UI
  const elements = stripe.elements();
  const card = elements.create("card");
  card.mount("#card-element");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    paymentStatus.textContent = "";

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const billingAddress = {
      line1: document.getElementById("billing-address").value,
      city: document.getElementById("billing-city").value,
      state: document.getElementById("billing-state").value,
      postal_code: document.getElementById("billing-postal-code").value,
      country: document.getElementById("billing-country").value
    };
    const shippingAddress = {
      line1: document.getElementById("shipping-address").value,
      city: document.getElementById("shipping-city").value,
      state: document.getElementById("shipping-state").value,
      postal_code: document.getElementById("shipping-postal-code").value,
      country: document.getElementById("shipping-country").value
    };

    try {
      const response = await fetch('https://backend-github-io.vercel.app/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 2000,
          email: email,
          phone: phone,
          name: name,
          billingAddress: billingAddress,
          shippingAddress: shippingAddress
        })
      });

      const data = await response.json();

      // Confirm payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: name,
            email: email,
            phone: phone,
            address: billingAddress
          }
        },
        shipping: {
          name: name,
          address: shippingAddress
        }
      });

      if (result.error) {
        paymentStatus.textContent = result.error.message;
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          paymentStatus.textContent = 'Payment successful!';
        }
      }
    } catch (error) {
      paymentStatus.textContent = `Error: ${error.message}`;
    } finally {
      submitButton.disabled = false;
    }
  });
});
</script>
