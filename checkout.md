---
layout: default
title: Checkout
permalink: /checkout/
---

# Checkout


<script src="https://js.stripe.com/v3/"></script>
<style>
  /* General Form Styles */
  #payment-form, #cart-summary {
    max-width: 90%;
    margin: 2rem auto;
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  h2 {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
    color: #333;
  }

  label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
    color: #495057;
  }

  input, button {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.75rem;
    font-size: 1rem;
    border: 1px solid #ced4da;
    border-radius: 4px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  input:focus, button:focus {
    border-color: #80bdff;
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  button {
    background-color: #06f;
    color: #fff;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #07f;
  }

  .error {
    color: #dc3545;
    font-size: 0.875rem;
  }

  .success {
    color: #28a745;
    font-size: 0.875rem;
  }

  .same-line {
    display: inline-flex;
    align-items: center;
  }

  .same-line input[type="checkbox"] {
    margin-left: 10px; 
    width: 25px;
    height: 25px;
  }

  #card-element {
    padding: 0.75rem;
    border-radius: 4px;
    border: 1px solid #ced4da;
    background-color: #f8f9fa;
  }

  /* Cart Summary Styles */
  #cart-summary {
    margin-bottom: 2rem;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .cart-item-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px; /* Added space between buttons */
  }

  .cart-item-actions button {
    width: 30%;
    padding: 0.5rem;
    font-size: 0.875rem;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  .cart-item-actions .btn-remove {
    background-color: #f00; /* Red for remove button */
    color: white;
  }

  .cart-item-actions .btn-remove:hover {
    background-color: #d00; /* Darker red on hover */
  }

  .cart-item-actions input {
    width: 30%;
    text-align: center;
    border: 1px solid #ced4da;
    font-size: 0.875rem;
    background-color: #f8f9fa;
    border-radius: 4px;
    padding: 0.5rem;
  }

  /* Improved Total Styling */
  .checkout-summary {
    margin-top: 1.5rem;
    font-size: 1.25rem;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .checkout-summary #cart-total {
    color: #28a745;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    #payment-form, #cart-summary {
      width: 90%;
      margin: 1rem auto;
      padding: 1rem;
    }

    .cart-item-actions button {
      width: 32%;
    }

    .cart-item-actions input {
      width: 24%;
    }
  }
</style>

<h2>Complete Your Payment</h2>

<main class="checkout-container">
  <section id="cart-summary">
    <h2>Your Cart</h2>
    <div id="cart-items">
      <!-- Cart items will be dynamically populated here -->
    </div>
    <div class="checkout-summary">
      <div id="cart-total">Total: $0.00</div>
    </div>
  </section>

  <form id="payment-form">
    <!-- Cardholder's Name -->
    <label for="name">Full Name</label>
    <input type="text" id="name" required>

    <!-- Email Address -->
    <label for="email">Email Address</label>
    <input type="email" id="email" required>

    <!-- Phone Number -->
    <label for="phone">Phone Number</label>
    <input type="tel" id="phone" required>

    <!-- Billing Address -->
    <label for="address">Billing Address</label>
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
      <label for="shipping-address">Shipping Address</label>
      <input type="text" id="shipping-address" placeholder="Street Address" required>
      <input type="text" id="shipping-city" placeholder="City" required>
      <input type="text" id="shipping-state" placeholder="State" required>
      <input type="text" id="shipping-postal-code" placeholder="Postal Code" required>
      <input type="text" id="shipping-country" placeholder="Country" required>
    </div>


        <label for="token">GitHub Personal Access Token:</label>
    <input type="password" id="token" placeholder="Enter your GitHub token" required>
    <label for="username">GitHub Username:</label>
    <input type="text" id="username" placeholder="Enter your GitHub username" required>
    <label for="repo">Repository Name:</label>
    <input type="text" id="repo" placeholder="Enter your repository name" required>
    <label for="path">File Path (e.g., orders.json):</label>
    <input type="text" id="path" placeholder="Enter the file path" value="orders.json" required>


    <!-- Stripe Card Element -->
    <label for="card-element">Credit or debit card</label>
    <div id="card-element"></div>

    <button id="submit-button">Pay Now</button>
    <div id="payment-status"></div>
  </form>
</main>


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
      },
      cartItems: cartItems
    };

    const totalInCents = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100;

    try {
      const response = await fetch('https://backend-github-io.vercel.app/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalInCents, ...orderDetails })
      });

      if (!response.ok) throw new Error('Failed to create payment intent');

      const data = await response.json();
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card: card, billing_details: orderDetails }
      });

      if (result.error) {
        paymentStatus.textContent = `Error: ${result.error.message}`;
        paymentStatus.classList.add('error');
      } else if (result.paymentIntent.status === 'succeeded') {
        const orderId = generateOrderId();
        paymentStatus.textContent = `Payment successful! Your Order ID is: ${orderId}`;
        paymentStatus.classList.add('success');

        const token = getFieldValue("token");
        const username = getFieldValue("username");
        const repo = getFieldValue("repo");
        const path = getFieldValue("path");
        const responseMessage = document.getElementById("response");

        try {
          const fileUrl = `https://api.github.com/repos/${username}/${repo}/contents/${path}`;
          const headers = { Authorization: `token ${token}`, Accept: "application/vnd.github.v3+json" };
          const fileResponse = await fetch(fileUrl, { headers });
          const fileData = await fileResponse.json();

          if (!fileResponse.ok) throw new Error(`Error fetching file: ${fileData.message || fileResponse.statusText}`);

          const currentContent = JSON.parse(atob(fileData.content));
          const updatedContent = Array.isArray(currentContent) ? [...currentContent, orderDetails] : [currentContent, orderDetails];

          const updateResponse = await fetch(fileUrl, {
            method: "PUT",
            headers,
            body: JSON.stringify({
              message: `Appending new order to ${path}`,
              content: btoa(JSON.stringify(updatedContent, null, 2)),
              sha: fileData.sha
            })
          });

          if (!updateResponse.ok) throw new Error(`Error updating file: ${updateResponse.statusText}`);

          responseMessage.textContent = "Order added successfully!";
          responseMessage.className = "success";
        } catch (error) {
          responseMessage.textContent = `Failed: ${error.message}`;
          responseMessage.className = "error";
        }

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

