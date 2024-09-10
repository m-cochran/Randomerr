document.addEventListener('DOMContentLoaded', () => {
  const stripe = Stripe('pk_test_51PulULDDaepf7cjiBCJQ4wxoptuvOfsdiJY6tvKxW3uXZsMUome7vfsIORlSEZiaG4q20ZLSqEMiBIuHi7Fsy9dP00nytmrtYb'); // Replace with your public Stripe key
  const elements = stripe.elements();
  const card = elements.create('card');
  card.mount('#card-element');

  const form = document.getElementById('payment-form');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const { clientSecret } = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: document.getElementById('cart-total').textContent.replace('Total: $', ''),
        email: document.getElementById('email').value
      })
    }).then(res => res.json());

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value
        }
      }
    });

    if (error) {
      document.getElementById('payment-status').textContent = error.message;
    } else if (paymentIntent.status === 'succeeded') {
      document.getElementById('payment-status').textContent = 'Payment succeeded!';
      // Clear cart and redirect
    }
  });
});
