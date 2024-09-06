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
<h2>Enter Amount</h2>
<form id="payment-form">
<label for="amount">Amount:</label>
<input id="amount" type="number" placeholder="Enter amount" required />

<label for="cardholder-name">Cardholder Name</label>
<input id="cardholder-name" type="text" placeholder="Jane Doe" required />

<label for="card-element">Card Number</label>
<div id="card-element"></div>
<!-- Stripe injects card input here -->

<button type="submit">Pay Now</button>
</form>

<script>
var stripe = Stripe("your-publishable-key-here");
var elements = stripe.elements();
var card = elements.create("card");
card.mount("#card-element");

var form = document.getElementById("payment-form");
form.addEventListener("submit", function (event) {
event.preventDefault();

var amount = document.getElementById("amount").value; // Get the user-entered amount
if (!amount || amount <= 0) {
alert("Please enter a valid amount.");
return;
}

// Create a payment token
stripe.createToken(card).then(function (result) {
if (result.error) {
alert(result.error.message); // Display error message
} else {
alert("Token created successfully for $" + amount + ": " + result.token.id);
// You would send the token and amount to your server to complete the payment.
}
});
});
</script>
</body>
</html>
