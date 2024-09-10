---
layout: default
title: Market
permalink: /market/
---

# Checkout

Feel free to reach out via email at [contact@randomerr.com](mailto:contact@randomerr.com).


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Stripe Payment</title>
  <script src="https://js.stripe.com/v3/"></script>
  <style>
    body { font-family: Arial, sans-serif; }
    #payment-form { max-width: 600px; margin: auto; }
    input, button { display: block; width: 100%; margin: 10px 0; padding: 10px; }
    #card-element { border: 1px solid #ccc; padding: 10px; border-radius: 4px; }
    .error { color: red; }
    .success { color: green; }
  </style>
</head>
<body>
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
    <label for="address">Billing Address</label>
    <input type="text" id="address" placeholder="Street Address" required>
    <input type="text" id="city" placeholder="City" required>
    <input type="text" id="state" placeholder="State" required>
    <input type="text" id="postal-code" placeholder="Postal Code" required>
    <input type="text" id="country" placeholder="Country" required>

    <!-- Stripe Card Element -->
    <label for="card-element">Credit or debit card</label>
    <div id="card-element"></div>

    <button id="submit-button">Pay Now</button>
    <div id="payment-status"></div>
    <div id="receipt-url"></div>
  </form>

  <script>
    document.addEventListener("DOMContentLoaded", async () => {
      const stripe = Stripe('pk_test_51PulULDDaepf7cjiBCJQ4wxoptuvOfsdiJY6tvKxW3uXZsMUome7vfsIORlSEZiaG4q20ZLSqEMiBIuHi7Fsy9dP00nytmrtYb'); // Replace with your publishable key

      const form = document.getElementById("payment-form");
      const submitButton = document.getElementById("submit-button");
      const paymentStatus = document.getElementById("payment-status");
      const receiptUrlElement = document.getElementById("receipt-url");

      // Mount the Stripe Elements card UI
      const elements = stripe.elements();
      const card = elements.create("card");
      card.mount("#card-element");

      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        submitButton.disabled = true;
        paymentStatus.textContent = "";
        receiptUrlElement.textContent = "";

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const address = {
          line1: document.getElementById("address").value,
          city: document.getElementById("city").value,
          state: document.getElementById("state").value,
          postal_code: document.getElementById("postal-code").value,
          country: document.getElementById("country").value
        };

        try {
          // Create payment intent by calling the backend API
          const response = await fetch('https://backend-github-io.vercel.app/api/create-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: 2000, // Example amount in cents
              email: email,
              phone: phone,
              name: name,
              address: address
            })
          });

          if (!response.ok) {
            throw new Error('Failed to create payment intent');
          }

          const data = await response.json();

          // Confirm payment on the client-side using the client secret
          const result = await stripe.confirmCardPayment(data.clientSecret, {
            payment_method: {
              card: card,
              billing_details: {
                name: name,
                email: email,
                phone: phone,
                address: address
              },
            },
          });

          if (result.error) {
            // Display error message if payment fails
            paymentStatus.textContent = `Error: ${result.error.message}`;
            paymentStatus.classList.add('error');
          } else {
            // Payment successful
            if (result.paymentIntent.status === 'succeeded') {
              paymentStatus.textContent = 'Payment successful!';
              paymentStatus.classList.add('success');
              if (data.receiptUrl) {
                receiptUrlElement.innerHTML = `Receipt: <a href="${data.receiptUrl}" target="_blank">${data.receiptUrl}</a>`;
              }
            }
          }
        } catch (error) {
          paymentStatus.textContent = `Error: ${error.message}`;
          paymentStatus.classList.add('error');
        } finally {
          submitButton.disabled = false;
        }
      });
    });
  </script>
</body>
</html>
