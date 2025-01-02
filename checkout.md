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

  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  let total = 0;

  const generateOrderId = () => `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const elements = stripe.elements();
  const card = elements.create("card");
  card.mount("#card-element");

  sameAddressCheckbox.addEventListener("change", () => {
    const isChecked = sameAddressCheckbox.checked;
    shippingAddressContainer.style.display = isChecked ? "none" : "block";

    if (isChecked) {
      ["address", "city", "state", "postal-code", "country"].forEach((field) => {
        document.getElementById(`shipping-${field}`).value = document.getElementById(field).value;
      });
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    submitButton.textContent = "Processing...";
    paymentStatus.textContent = "";
    paymentStatus.className = ""; // Reset classes

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = {
      line1: document.getElementById("address").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      postal_code: document.getElementById("postal-code").value,
      country: document.getElementById("country").value,
    };
    const shippingAddress = sameAddressCheckbox.checked
      ? address
      : {
          line1: document.getElementById("shipping-address").value,
          city: document.getElementById("shipping-city").value,
          state: document.getElementById("shipping-state").value,
          postal_code: document.getElementById("shipping-postal-code").value,
          country: document.getElementById("shipping-country").value,
        };

    const totalInCents = Math.round(total * 100);

    try {
      const response = await fetch('https://backend-github-io.vercel.app/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalInCents,
          email,
          phone,
          name,
          address,
          shippingAddress,
          cartItems,
        }),
      });

      if (!response.ok) throw new Error(`Failed to create payment intent: ${response.statusText}`);

      const { clientSecret } = await response.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: { name, email, phone, address },
        },
      });

      if (result.error) {
        paymentStatus.textContent = `Error: ${result.error.message}`;
        paymentStatus.classList.add("error");
      } else if (result.paymentIntent.status === "succeeded") {
        const orderId = generateOrderId();
        localStorage.setItem("orderId", orderId);
        localStorage.setItem("purchasedItems", JSON.stringify(cartItems));
        localStorage.removeItem("cartItems");

        paymentStatus.textContent = `Payment successful! Your Order ID is: ${orderId}`;
        paymentStatus.classList.add("success");

        window.location.href = `https://m-cochran.github.io/Randomerr/thank-you/?orderId=${orderId}`;
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      paymentStatus.textContent = `Error: ${error.message}`;
      paymentStatus.classList.add("error");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Submit Payment";
    }
  });

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    total = 0;

    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      cartTotalElement.textContent = "Total: $0.00";
      return;
    }

    const cartHTML = cartItems.map((item, index) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <div>${item.name}</div>
          <div>Price: $${item.price}</div>
        </div>
        <div class="cart-item-actions">
          <button class="btn-decrease" data-index="${index}">-</button>
          <input type="text" value="${item.quantity}" readonly>
          <button class="btn-increase" data-index="${index}">+</button>
          <button class="btn-remove" data-index="${index}">Remove</button>
        </div>
      </div>`).join("");

    cartItemsContainer.innerHTML = cartHTML;
    cartItems.forEach(item => (total += item.price * item.quantity));
    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;

    document.querySelectorAll(".btn-decrease").forEach(button => {
      button.addEventListener("click", () => updateCartItem(button.dataset.index, -1));
    });

    document.querySelectorAll(".btn-increase").forEach(button => {
      button.addEventListener("click", () => updateCartItem(button.dataset.index, 1));
    });

    document.querySelectorAll(".btn-remove").forEach(button => {
      button.addEventListener("click", () => removeCartItem(button.dataset.index));
    });
  }

  function updateCartItem(index, delta) {
    cartItems[index].quantity += delta;
    if (cartItems[index].quantity < 1) cartItems[index].quantity = 1;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCart();
  }

  function removeCartItem(index) {
    cartItems.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCart();
  }

  renderCart();
});

</script>

