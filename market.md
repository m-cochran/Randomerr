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
<title>Checkout</title>
<style>
body {
font-family: Arial, sans-serif;
margin: 0;
padding: 20px;
}
form {
max-width: 400px;
margin: 0 auto;
padding: 20px;
border: 1px solid #ccc;
border-radius: 8px;
}
label {
display: block;
margin-bottom: 8px;
}
input {
width: 100%;
padding: 10px;
margin-bottom: 16px;
border-radius: 4px;
border: 1px solid #ccc;
}
button {
padding: 10px;
background-color: #28a745;
color: white;
border: none;
cursor: pointer;
width: 100%;
border-radius: 4px;
}
</style>
<script src="https://js.stripe.com/v3/"></script>
</head>
<body>
<h1>Checkout</h1>
<form id="payment-form">
<label for="cardholder-name">Cardholder Name</label>
<input id="cardholder-name" type="text" placeholder="Jane Doe" required />

<label for="card-number">Card Number</label>
<div id="card-element"></div>

<button id="submit">Pay</button>
</form>

<script>
var stripe = Stripe("pk_test_51PulULDDaepf7cjiBCJQ4wxoptuvOfsdiJY6tvKxW3uXZsMUome7vfsIORlSEZiaG4q20ZLSqEMiBIuHi7Fsy9dP00nytmrtYb");
var elements = stripe.elements();
var card = elements.create("card");
card.mount("#card-element");

var form = document.getElementById("payment-form");
form.addEventListener("submit", function (event) {
event.preventDefault();

stripe.createToken(card).then(function (result) {
if (result.error) {
// Show error in payment form
alert(result.error.message);
} else {
// Send the token to your server or payment gateway
alert("Token created: " + result.token.id);
}
});
});
</script>
</body>
</html>
