---
layout: default
title: Market
permalink: /market/
---

# Market

Feel free to reach out via email at [contact@randomerr.com](mailto:contact@randomerr.com).


<style>
  /* Step 6: CSS for better UI */
  .StripeElement {
    box-sizing: border-box;
    height: 40px;
    padding: 10px 12px;
    border: 1px solid #ccd0d2;
    border-radius: 4px;
    background-color: white;
    box-shadow: 0 1px 3px 0 #e6ebf1;
    transition: box-shadow 150ms ease;
  }

  .StripeElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
  }

  .StripeElement--invalid {
    border-color: #fa755a;
  }

  .StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
  }

  #card-errors {
    color: #fa755a;
    margin-top: 12px;
  }

  #payment-form {
    max-width: 400px;
    margin: 0 auto;
  }

  button {
    background-color: #6772e5;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  button:disabled {
    background-color: #bbb;
    cursor: not-allowed;
  }

</style>


<body>
  <h2>Complete Your Purchase</h2>
  <form id="payment-form">
    <div id="card-element">
      <!-- Stripe's Card Element will be inserted here -->
    </div>
    <div id="card-errors" role="alert"></div>
    <button id="submit-button">Pay Now</button>
  </form>

  <!-- Step 2: Stripe.js Library -->
  <script src="https://js.stripe.com/v3/"></script>

  <!-- Step 5: JavaScript to Handle Payment -->
  <script>
    // Initialize Stripe with your public key
    const stripe = Stripe('pk_test_51PulULDDaepf7cjiBCJQ4wxoptuvOfsdiJY6tvKxW3uXZsMUome7vfsIORlSEZiaG4q20ZLSqEMiBIuHi7Fsy9dP00nytmrtYb'); // Replace with your Stripe public key

    // Create an instance of Elements
    const elements = stripe.elements();

    // Create an instance of the card Element
    const card = elements.create('card', {
      hidePostalCode: false, // You can hide the postal code field if not needed
      style: {
        base: {
          fontSize: '16px',
          color: '#32325d',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a',
        },
      },
    });

    // Add an instance of the card Element into the `card-element` div
    card.mount('#card-element');

    // Handle real-time validation errors from the card Element
    card.on('change', function(event) {
      const displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });

    // Handle form submission
    const form = document.getElementById('payment-form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const {
        token,
        error
      } = await stripe.createToken(card);

      if (error) {
        // Inform the user if there was an error
        const errorElement = document.getElementById('card-errors');
        errorElement.textContent = error.message;
      } else {
        // Send the token to your server
        stripeTokenHandler(token);
      }
    });

    // Submit the token to your server
    function stripeTokenHandler(token) {
      // Insert the token ID into the form so it gets submitted to the server
      const hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.setAttribute('name', 'stripeToken');
      hiddenInput.setAttribute('value', token.id);
      form.appendChild(hiddenInput);

      // Submit the form
      form.submit();
    }

  </script>
