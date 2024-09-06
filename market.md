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
  <title>Stripe Checkout</title>
  <script src="https://js.stripe.com/v3/"></script>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 600px;
      margin: 50px auto;
      padding: 20px;
      text-align: center;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    label {
      text-align: left;
    }
    #card-element {
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 4px;
    }
    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  </style>
</head>
<body>
  <h2>Enter Amount</h2>
  <form id="payment-form">
    <label for="amount">Amount (USD):</label>
    <input id="amount" type="number" placeholder="Enter amount" required min="1" />

    <label for="cardholder-name">Cardholder Name</label>
    <input id="cardholder-name" type="text" placeholder="Jane Doe" required />

    <label for="card-element">Card Details</label>
    <div id="card-element"></div>
    <!-- Stripe injects card input here -->

    <button id="submit-button" type="submit">Pay Now</button>
  </form>

  <div id="payment-status"></div>

  <script>
    // Initialize Stripe
    var stripe = Stripe("pk_test_51PulULDDaepf7cjiBCJQ4wxoptuvOfsdiJY6tvKxW3uXZsMUome7vfsIORlSEZiaG4q20ZLSqEMiBIuHi7Fsy9dP00nytmrtYb");
    var elements = stripe.elements();
    var card = elements.create("card");
    card.mount("#card-element");

    var form = document.getElementById("payment-form");
    var submitButton = document.getElementById("submit-button");
    var paymentStatus = document.getElementById("payment-status");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      submitButton.disabled = true; // Disable button to prevent multiple submissions
      paymentStatus.textContent = ""; // Clear previous status

      var amount = document.getElementById("amount").value;
      var cardholderName = document.getElementById("cardholder-name").value;

      if (!amount || amount <= 0) {
        alert("Please enter a valid amount.");
        submitButton.disabled = false; // Re-enable button
        return;
      }

      // Create payment intent via your backend (Vercel endpoint)
      fetch('https://your-vercel-project.vercel.app/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: Math.round(amount * 100) }), // Convert dollars to cents
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        return stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: cardholderName,
            },
          },
        });
      })
      .then(function(result) {
        if (result.error) {
          paymentStatus.textContent = result.error.message;
          submitButton.disabled = false; // Re-enable button
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            paymentStatus.textContent = 'Payment succeeded!';
          }
        }
      })
      .catch(function(error) {
        paymentStatus.textContent = 'Payment failed: ' + error.message;
        submitButton.disabled = false; // Re-enable button
      });
    });
  </script>
</body>
</html>
