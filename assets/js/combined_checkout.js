document.addEventListener('DOMContentLoaded', function() {
  // Stripe Setup
  const stripe = Stripe('pk_test_51PulULDDaepf7cjiBCJQ4wxoptuvOfsdiJY6tvKxW3uXZsMUome7vfsIORlSEZiaG4q20ZLSqEMiBIuHi7Fsy9dP00nytmrtYb'); // Replace with your Stripe publishable key
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
      'sk_test_51PulULDDaepf7cji2kqbdFVOzF37bS8RrtgO8dpVBpT1m8AXZhcyIBAAf42VOcpE8auFxbm1xSjglmBhvaIYaRck00QkUGMkpF', // Replace with the client secret from your server
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
