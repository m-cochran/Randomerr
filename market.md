---
layout: default
title: Market
permalink: /market/
---

# Market

Feel free to reach out via email at [contact@randomerr.com](mailto:contact@randomerr.com).




<!-- Include Stripe.js -->
<script src="https://js.stripe.com/v3/"></script>
<script src="/Randomerr/server/combined_checkout.js"></script>
<script src="/Randomerr/server/server.js"></script>
<script src="/Randomerr/assets/js/checkout.js"></script>

<form id="payment-form">
  <div>
    <label for="name">Name</label>
    <input id="name" type="text" required />
  </div>
  <div>
    <label for="address">Address</label>
    <input id="address" type="text" required />
  </div>
  <div>
    <label for="city">City</label>
    <input id="city" type="text" required />
  </div>
  <div>
    <label for="state">State</label>
    <input id="state" type="text" required />
  </div>
  <div>
    <label for="zip">ZIP Code</label>
    <input id="zip" type="text" required />
  </div>

  <!-- Stripe Card Element -->
  <div id="card-element"></div>

  <!-- Display errors -->
  <div id="error-message" style="color: red;"></div>

  <button type="submit">Submit Payment</button>
  <div id="spinner" class="hidden">Processing...</div>
</form>


<Style>
.form-group {
  margin-bottom: 15px;
}

#card-element {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.spinner {
  display: none;
}

.spinner.hidden {
  display: none;
}
</Style>
