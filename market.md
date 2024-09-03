---
layout: default
title: Market
permalink: /market/
---

# Market

Feel free to reach out via email at [contact@randomerr.com](mailto:contact@randomerr.com).




<style>
  body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #f4f4f4;
  }

  .container {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
  }

  #card-element {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    height: 40px;
    /* Adjust as necessary */
    width: 100%;
    /* Ensure it has enough width */
  }

  .error {
    color: red;
    margin-top: 10px;
  }

</style>

<div class="container">
  <h2>Test Stripe</h2>
  <form id="payment-form">
    <div id="card-element"></div>
    <button type="submit">Submit</button>
    <div id="card-errors" role="alert" class="error"></div>
  </form>
</div>

<script src="https://js.stripe.com/v3/"></script>
<script>
  const stripe = Stripe('your-publishable-key-here'); // Replace with your actual key
  const elements = stripe.elements();

  const card = elements.create('card');
  card.mount('#card-element');

  card.on('change', (event) => {
    const displayError = document.getElementById('card-errors');
    if (event.error) {
      displayError.textContent = event.error.message;
    } else {
      displayError.textContent = '';
    }
  });

  const form = document.getElementById('payment-form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const {
      token,
      error
    } = await stripe.createToken(card);
    if (error) {
      const displayError = document.getElementById('card-errors');
      displayError.textContent = error.message;
    } else {
      console.log('Token:', token);
    }
  });

</script>
