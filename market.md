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
</head>
<body>
<h2>Total Amount: $25.00</h2>
<!-- Fixed amount displayed -->

<form id="payment-form">
<label for="cardholder-name">Cardholder Name</label>
<input id="cardholder-name" type="text" placeholder="Jane Doe" required />

<label for="card-element">Card Number</label>
<div id="card-element"></div>
<!-- Stripe injects card input here -->

<button type="submit">Pay $25.00</button>
<!-- Fixed amount button -->
</form>

<script>
var stripe = Stripe("pk_test_51PulULDDaepf7cjiBCJQ4wxoptuvOfsdiJY6tvKxW3uXZsMUome7vfsIORlSEZiaG4q20ZLSqEMiBIuHi7Fsy9dP00nytmrtYb");
var elements = stripe.elements();
var card = elements.create("card");
card.mount("#card-element");

var form = document.getElementById("payment-form");
form.addEventListener("submit", function (event) {
event.preventDefault();

// Create a payment token
stripe.createToken(card).then(function (result) {
if (result.error) {
alert(result.error.message); // Display error message
} else {
alert("Token created successfully: " + result.token.id);
// You would send the token to the server to complete the payment
// The amount can also be included with the token on the server side.
}
});
});
</script>
</body>
</html>
