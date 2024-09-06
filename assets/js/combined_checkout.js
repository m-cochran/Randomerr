document.addEventListener('DOMContentLoaded', function() {
  // Stripe Setup
  const stripe = Stripe('pk_test_51PulULDDaepf7cjiBCJQ4wxoptuvOfsdiJY6tvKxW3uXZsMUome7vfsIORlSEZiaG4q20ZLSqEMiBIuHi7Fsy9dP00nytmrtYb'); // Replace with your Stripe publishable key
  const elements = stripe.elements();
  
  const cardElement = elements.create('card');
  cardElement.mount('#card-element');

  // Function to update the cart
  function updateCart() {
    // Example static cart items; in a real app, this data might come from an API
    const cartItems = [
      { name: 'Item 1', price: 10.00 },
      { name: 'Item 2', price: 20.00 }
    ];

    // Generate HTML for cart items
    const cartItemsHtml = cartItems.map(item => `
      <div class="cart-item">
        <span>${item.name}</span>
        <span>$${item.price.toFixed(2)}</span>
      </div>
    `).join('');

    // Update the cart items and total
    document.getElementById('cart-items').innerHTML = cartItemsHtml;
    const total = cartItems.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
  }

  // Validate shipping form
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

  // Handle payment form submission
  const paymentForm = document.getElementById('payment-form');
  paymentForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!validateShippingForm()) {
      alert('Please fill out all required fields.');
      return;
    }

    // Assuming client secret is fetched dynamically from your server
    const clientSecret = 'sk_test_51PulULDDaepf7cji2kqbdFVOzF37bS8RrtgO8dpVBpT1m8AXZhcyIBAAf42VOcpE8auFxbm1xSjglmBhvaIYaRck00QkUGMkpF'; // Replace with the client secret from your server

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement
      }
    });

    if (error) {
      // Display error message in #card-errors
      document.getElementById('card-errors').textContent = error.message;
    } else {
      if (paymentIntent.status === 'succeeded') {
        // Payment was successful, handle it here
        alert('Payment successful!');
        // Redirect or update the page accordingly
      }
    }
  });

  // Initialize the cart on page load
  updateCart();
});
