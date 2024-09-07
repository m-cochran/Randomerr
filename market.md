---
layout: default
title: Market
permalink: /market/
---

# Market

Feel free to reach out via email at [contact@randomerr.com](mailto:contact@randomerr.com).


  <title>Stripe Checkout</title>
  <script src="https://js.stripe.com/v3/"></script>
  <style>
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
      fetch('https://backend-github-io.vercel.app/api/create-payment-intent', {
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








  <title>Secure Checkout</title>
  <link rel="stylesheet" href="{{ site.baseurl }}/assets/css/checkout.css" />
  <link rel="stylesheet" href="{{ site.baseurl }}/assets/css/stripe.css" />
  <script src="https://js.stripe.com/v3/"></script>
  <style>
    /* Custom styles if needed */
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

    var cartTotal = document.getElementById("cart-total").textContent.replace("Total: $", "");
    var shippingDetails = {
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
      submitButton.disabled = false; // Re-enable button
      return;
    }

    // Create payment intent via your backend (Vercel endpoint)
    fetch('https://backend-github-io.vercel.app/api/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: Math.round(cartTotal * 100) }), // Convert dollars to cents
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      return stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: card,
          billing_details: shippingDetails,
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

