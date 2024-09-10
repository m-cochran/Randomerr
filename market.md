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
</head>
<body>
  <h2>Complete Your Payment</h2>
  <form id="payment-form">
    <label for="card-element">Credit or debit card</label>
    <div id="card-element"></div>
    <button id="submit-button">Pay Now</button>
    <div id="payment-status"></div>
  </form>

  <script>
    document.addEventListener("DOMContentLoaded", async () => {
      const stripe = Stripe('pk_test_51PulULDDaepf7cjiBCJQ4wxoptuvOfsdiJY6tvKxW3uXZsMUome7vfsIORlSEZiaG4q20ZLSqEMiBIuHi7Fsy9dP00nytmrtYb'); // Add your Stripe Publishable Key here

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

        try {
          // Create payment intent by calling backend API
          const response = await fetch('https://backend-github-io-m-cochrans-projects.vercel.app/api/create-payment-intent
', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: 2000, email: 'customer@example.com' }) // Example amount
          });

          const data = await response.json();

          // Confirm payment on the client-side using the client secret
          const result = await stripe.confirmCardPayment(data.clientSecret, {
            payment_method: {
              card: card,
              billing_details: {
                email: 'customer@example.com' // Replace with real email from form
              },
            },
          });

          if (result.error) {
            // Display error message if payment fails
            paymentStatus.textContent = result.error.message;
          } else {
            // Payment successful
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
</body>
</html>
