---
layout: default
title: Checkout
permalink: /test/
---

# Checkout


<body>
  <h1>Append Orders to GitHub File</h1>
  <form id="updateForm">
    <label for="orders">New Order Data (JSON Format):</label>
    <textarea id="orders" rows="10" required>
{
  "order_id": "67890",
  "customer": "Jane Smith",
  "items": [
    {"item": "Orange", "quantity": 5},
    {"item": "Grapes", "quantity": 1}
  ],
  "total": 15.75
}
    </textarea>
    <label for="token">GitHub Personal Access Token:</label>
    <input type="password" id="token" placeholder="Enter your GitHub token" required>
    <label for="username">GitHub Username:</label>
    <input type="text" id="username" placeholder="Enter your GitHub username" required>
    <label for="repo">Repository Name:</label>
    <input type="text" id="repo" placeholder="Enter your repository name" required>
    <label for="path">File Path (e.g., orders.json):</label>
    <input type="text" id="path" placeholder="Enter the file path" value="orders.json" required>
    
    <!-- Payment Form -->
    <h2>Payment Information</h2>
    <label for="name">Full Name</label>
    <input type="text" id="name" required>

    <label for="email">Email Address</label>
    <input type="email" id="email" required>

    <label for="phone">Phone Number</label>
    <input type="tel" id="phone" required>

    <h3>Billing Address</h3>
    <label for="address">Street Address</label>
    <input type="text" id="address" placeholder="Street Address" required>
    <input type="text" id="city" placeholder="City" required>
    <input type="text" id="state" placeholder="State" required>
    <input type="text" id="postal-code" placeholder="Postal Code" required>
    <input type="text" id="country" placeholder="Country" required>

    <!-- Shipping Address Checkbox -->
    <label for="same-address" class="same-line">
      Shipping address is the same as billing address
      <input type="checkbox" id="same-address">
    </label>

    <!-- Shipping Address -->
    <div id="shipping-address-container">
      <h3>Shipping Address</h3>
      <label for="shipping-address">Street Address</label>
      <input type="text" id="shipping-address" placeholder="Street Address" required>
      <input type="text" id="shipping-city" placeholder="City" required>
      <input type="text" id="shipping-state" placeholder="State" required>
      <input type="text" id="shipping-postal-code" placeholder="Postal Code" required>
      <input type="text" id="shipping-country" placeholder="Country" required>
    </div>

    <button type="submit">Update File</button>
  </form>
  <p id="response" class=""></p>

  <script>
document.addEventListener("DOMContentLoaded", async () => {
  const stripe = Stripe('pk_test_51PulULDDaepf7cjiBCJQ4wxoptuvOfsdiJY6tvKxW3uXZsMUome7vfsIORlSEZiaG4q20ZLSqEMiBIuHi7Fsy9dP00nytmrtYb');
  const form = document.getElementById("payment-form");
  const submitButton = document.getElementById("submit-button");
  const paymentStatus = document.getElementById("payment-status");
  const sameAddressCheckbox = document.getElementById("same-address");
  const shippingAddressContainer = document.getElementById("shipping-address-container");
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const generateOrderId = () => `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const elements = stripe.elements();
  const card = elements.create("card");
  card.mount("#card-element");

  sameAddressCheckbox.addEventListener("change", () => {
    const isChecked = sameAddressCheckbox.checked;
    shippingAddressContainer.style.display = isChecked ? "none" : "block";
    if (isChecked) {
      ["address", "city", "state", "postal-code", "country"].forEach(field => {
        document.getElementById(`shipping-${field}`).value = document.getElementById(field).value;
      });
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    paymentStatus.textContent = "";

    const getFieldValue = (id) => document.getElementById(id).value;

    const orderDetails = {
      name: getFieldValue("name"),
      email: getFieldValue("email"),
      phone: getFieldValue("phone"),
      address: {
        line1: getFieldValue("address"),
        city: getFieldValue("city"),
        state: getFieldValue("state"),
        postal_code: getFieldValue("postal-code"),
        country: getFieldValue("country")
      },
      shippingAddress: sameAddressCheckbox.checked ? null : {
        line1: getFieldValue("shipping-address"),
        city: getFieldValue("shipping-city"),
        state: getFieldValue("shipping-state"),
        postal_code: getFieldValue("shipping-postal-code"),
        country: getFieldValue("shipping-country")
      }
    };

    const totalInCents = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100;

    try {
      const response = await fetch('https://backend-github-io.vercel.app/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalInCents })
      });

      if (!response.ok) throw new Error('Failed to create payment intent');

      const data = await response.json();
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: orderDetails.name,
            email: orderDetails.email,
            phone: orderDetails.phone,
            address: orderDetails.address
          }
        }
      });

      if (result.error) {
        paymentStatus.textContent = `Error: ${result.error.message}`;
        paymentStatus.classList.add('error');
      } else if (result.paymentIntent.status === 'succeeded') {
        const orderId = generateOrderId();
        paymentStatus.textContent = `Payment successful! Your Order ID is: ${orderId}`;
        paymentStatus.classList.add('success');

        localStorage.setItem("orderId", orderId);
        localStorage.setItem("purchasedItems", JSON.stringify(cartItems));
        localStorage.removeItem("cartItems");
        window.location.href = `https://m-cochran.github.io/Randomerr/thank-you/?orderId=${orderId}`;
      }
    } catch (error) {
      paymentStatus.textContent = `Error: ${error.message}`;
      paymentStatus.classList.add('error');
    } finally {
      submitButton.disabled = false;
    }
  });
});

  </script>
</body>
</html>

