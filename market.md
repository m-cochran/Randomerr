---
layout: default
title: Market
permalink: /market/
---

# Market

Feel free to reach out via email at [contact@randomerr.com](mailto:contact@randomerr.com).



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

<form id="payment-form" class="checkout-form">
  <div id="card-element">
    <!-- A Stripe Element will be inserted here. -->
  </div>
  <button id="submit">Pay Now</button>
  <div id="error-message"></div>
</form>

<script src="{{ site.baseurl }}/server/checkout.js"></script>


<script>
    // checkout.js
    const stripe = Stripe('pk_test_51PulULDDaepf7cjiBCJQ4wxoptuvOfsdiJY6tvKxW3uXZsMUome7vfsIORlSEZiaG4q20ZLSqEMiBIuHi7Fsy9dP00nytmrtYb'); // Replace with your Stripe publishable key
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');

    const form = document.getElementById('payment-form');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const { token, error } = await stripe.createToken(cardElement);

    if (error) {
    errorMessage.textContent = error.message;
    } else {
    // Send the token to your server
    fetch('/charge', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: token.id })
    }).then(response => {
    if (response.ok) {
    alert('Payment successful!');
    window.location.href = 'thank-you.html'; // Redirect to a thank you page or home page
    } else {
    errorMessage.textContent = 'Payment failed.';
    }
    });
    }
    });
</script>
