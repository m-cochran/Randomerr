// stripe_checkout.js
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
