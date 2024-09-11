---
layout: default
title: Checkout
permalink: /checkout/
---

# Checkout

Feel free to reach out via email at [contact@randomerr.com](mailto:contact@randomerr.com).

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
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
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
    background-color: #dc3545; /* Red for remove button */
    color: white;
  }

  .cart-item-actions .btn-remove:hover {
    background-color: #c82333; /* Darker red on hover */
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
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #0056b3;
  }

  .error {
    color: #dc3545;
    font-size: 0.875rem;
  }

  .success {
    color: #28a745;
    font-size: 0.875rem;
  }

  .cart-item-actions {
    display: flex;
    align-items: center;
    gap: 0.5rem; /* Adds space between the buttons and input */
  }

  .cart-item-actions button {
    padding: 0.5rem;
    font-size: 1rem;
    border-radius: 4px;
    transition: background-color 0.3s ease;
    width: 40px; /* Fixed width for buttons */
  }

  .cart-item-actions input {
    width: 60px; /* Fixed width for input */
    text-align: center;
    font-size: 1rem;
    padding: 0.5rem;
    border-radius: 4px;
    border: 1px solid #ced4da;
    background-color: #f8f9fa;
  }

  /* Style the remove button */
  .btn-remove {
    background-color: #dc3545;
    color: #fff;
  }

  .btn-remove:hover {
    background-color: #c82333;
  }

  /* Total section styling */
  .checkout-summary {
    margin-top: 1rem;
    text-align: right;
    font-size: 1.5rem;
    font-weight: bold;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    #payment-form, #cart-summary {
      width: 90%;
      margin: 1rem auto;
      padding: 1rem;
    }

    .cart-item-actions button, .cart-item-actions input {
      width: 40px; /* Smaller buttons and input on mobile */
    }

    .checkout-summary {
      text-align: center;
    }
  }
</style>

<div id="cart-summary">
  <h2>Your Cart</h2>
  <div id="cart-items"></div>
  <div class="checkout-summary">
    <div id="cart-total">Total: $0.00</div>
  </div>
</div>

<script>
  document.addEventListener("DOMContentLoaded", () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      cartTotal.textContent = "Total: $0.00";
      return;
    }

    let total = 0;

    function renderCart() {
      cartItemsContainer.innerHTML = "";
      total = 0;

      cartItems.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";
        itemDiv.innerHTML = `
          <img src="${item.image}" alt="${item.name}" style="width: 50px;">
          <div class="cart-item-details">
            <div>${item.name}</div>
            <div>Price: $${item.price}</div>
          </div>
          <div class="cart-item-actions">
            <button class="btn-decrease" data-index="${index}">-</button>
            <input type="number" value="${item.quantity}" data-index="${index}" min="1" class="quantity-input">
            <button class="btn-increase" data-index="${index}">+</button>
            <button class="btn-remove" data-index="${index}">Remove</button>
          </div>
        `;
        cartItemsContainer.appendChild(itemDiv);

        total += item.price * item.quantity;
      });

      cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Update quantity and remove item
    cartItemsContainer.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      if (e.target.classList.contains("btn-decrease")) {
        if (cartItems[index].quantity > 1) {
          cartItems[index].quantity--;
        }
      } else if (e.target.classList.contains("btn-increase")) {
        cartItems[index].quantity++;
      } else if (e.target.classList.contains("btn-remove")) {
        cartItems.splice(index, 1);
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      renderCart();
    });

    // Allow typing in the quantity input
    cartItemsContainer.addEventListener("input", (e) => {
      if (e.target.classList.contains("quantity-input")) {
        const index = e.target.dataset.index;
        const newQuantity = parseInt(e.target.value, 10);
        if (newQuantity > 0) {
          cartItems[index].quantity = newQuantity;
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          renderCart();
        }
      }
    });

    renderCart();
  });
</script>
