document.addEventListener('DOMContentLoaded', function() {
  // Stripe Setup
  const stripe = Stripe('your-publishable-key-here'); // Replace with your Stripe publishable key
  const elements = stripe.elements();

  const cardElement = elements.create('card');
  cardElement.mount('#card-element');

  // Form validation
  const shippingForm = document.getElementById('shipping-form');
  
  function validateShippingForm() {
    const formData = new FormData(shippingForm);
    let valid = true;

    formData.forEach((value, key) => {
      const input = document.querySelector(`#${key}`);
      if (!value) {
        valid = false;
        input.classList.add('invalid');
      } else {
        input.classList.remove('invalid');
      }
    });

    return valid;
  }

  // Handle form submission
  const paymentForm = document.getElementById('payment-form');

  paymentForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!validateShippingForm()) {
      alert('Please fill out all required fields.');
      return;
    }

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      'your-client-secret-here', // Replace with the client secret from your server
      {
        payment_method: {
          card: cardElement
        }
      }
    );

    if (error) {
      // Display error.message in #card-errors
      document.getElementById('card-errors').textContent = error.message;
    } else {
      if (paymentIntent.status === 'succeeded') {
        // Payment was successful, handle it here
        alert('Payment successful!');
        // Redirect or update the page accordingly
      }
    }
  });
});
