---
layout: default
title: Market
permalink: /market/
---

# Market

Randomerr is a space for creative exploration. We share ideas, thoughts, and everything in between.

<script src="https://js.stripe.com/v3/"></script>
<style>
  body { font-family: Arial, sans-serif; }
  #payment-form { max-width: 600px; margin: auto; }
  input, button { display: block; width: 100%; margin: 10px 0; padding: 10px; }
  #card-element { border: 1px solid #ccc; padding: 10px; border-radius: 4px; }
  .error { color: red; }
  .success { color: green; }
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
<label>
  <input type="checkbox" id="same-address"> Shipping address is the same as billing address
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
  const stripe = Stripe('pk_test_51PulULDDaepf7cjiBCJQ4wxoptuvOfsdiJY6tvKxW3uXZsMUome7vfsIORlSEZiaG4q20ZLSqEMiBIuHi7Fsy9dP00nytmrtYb'); // Use your publishable key
  const form = document.getElementById("payment-form");
  const submitButton = document.getElementById("submit-button");
  const paymentStatus = document.getElementById("payment-status");
  const sameAddressCheckbox = document.getElementById("same-address");
  const shippingAddressContainer = document.getElementById("shipping-address-container");

  if (!form || !submitButton || !paymentStatus || !sameAddressCheckbox || !shippingAddressContainer) {
    console.error("Required elements are missing from the DOM.");
    return;
  }

  const elements = stripe.elements();
  const card = elements.create("card");
  card.mount("#card-element");

  sameAddressCheckbox.addEventListener("change", () => {
    const isChecked = sameAddressCheckbox.checked;
    shippingAddressContainer.style.display = isChecked ? "none" : "block";
    if (isChecked) {
      document.getElementById("shipping-address").value = document.getElementById("address").value;
      document.getElementById("shipping-city").value = document.getElementById("city").value;
      document.getElementById("shipping-state").value = document.getElementById("state").value;
      document.getElementById("shipping-postal-code").value = document.getElementById("postal-code").value;
      document.getElementById("shipping-country").value = document.getElementById("country").value;
    }
  });

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let total = 0;

// Handle payment submission
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  submitButton.disabled = true;
  paymentStatus.textContent = "";

  // Extract total from the cart-total div
  const cartTotalElement = document.getElementById('cart-total');
  const totalText = cartTotalElement.textContent;
  const totalMatch = totalText.match(/Total:\s*\$([\d,\.]+)/);
  
  let total = 0;
  if (totalMatch) {
    // Remove commas and parse the total amount
    total = parseFloat(totalMatch[1].replace(/,/g, ''));
  } else {
    throw new Error("Could not extract total value");
  }

  // Ensure total is parsed as a floating-point number
  if (isNaN(total)) {
    throw new Error("Invalid total value");
  }

  // Calculate total in cents (Stripe expects amount in cents)
  const totalInCents = Math.round(total * 100); // Ensure 'total' is in dollars

  // Logging values for diagnostic purposes
  console.log('Total (in dollars):', total);      // Log total in dollars
  console.log('Total (in cents):', totalInCents); // Log total in cents

  try {
    const response = await fetch('https://backend-github-io.vercel.app/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: totalInCents, // Stripe expects the amount in cents
        email: email,
        phone: phone,
        name: name,
        address: address,
        shippingAddress: shippingAddress,
        cartItems: cartItems // Include cart items in the payload
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    const data = await response.json();
    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: card,
        billing_details: { name: name, email: email, phone: phone, address: address }
      },
    });

    if (result.error) {
      paymentStatus.textContent = `Error: ${result.error.message}`;
      paymentStatus.classList.add('error');
    } else if (result.paymentIntent.status === 'succeeded') {
      localStorage.setItem("purchasedItems", JSON.stringify(cartItems));
      localStorage.removeItem("cartItems");
      window.location.href = "https://m-cochran.github.io/Randomerr/thank-you/";
    }
  } catch (error) {
    paymentStatus.textContent = `Error: ${error.message}`;
    paymentStatus.classList.add('error');
  } finally {
    submitButton.disabled = false;
  }
});


    const totalInCents = Math.round(total * 100);
    const name = nameInput.value;
    const email = emailInput.value;
    const phone = phoneInput.value;
    const address = {
      line1: addressInput.line1.value,
      city: addressInput.city.value,
      state: addressInput.state.value,
      postal_code: addressInput.postal_code.value,
      country: addressInput.country.value
    };
    const shippingAddress = sameAddressCheckbox.checked ? address : {
      line1: shippingAddressInputs.line1.value,
      city: shippingAddressInputs.city.value,
      state: shippingAddressInputs.state.value,
      postal_code: shippingAddressInputs.postal_code.value,
      country: shippingAddressInputs.country.value
    };

    try {
      const response = await fetch('https://backend-github-io.vercel.app/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalInCents,
          email: email,
          phone: phone,
          name: name,
          address: address,
          shippingAddress: shippingAddress,
          cartItems: cartItems
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const data = await response.json();
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: card,
          billing_details: { name: name, email: email, phone: phone, address: address }
        },
      });

      if (result.error) {
        paymentStatus.textContent = `Error: ${result.error.message}`;
        paymentStatus.classList.add('error');
      } else if (result.paymentIntent.status === 'succeeded') {
        localStorage.setItem("purchasedItems", JSON.stringify(cartItems));
        localStorage.removeItem("cartItems");
        window.location.href = "https://m-cochran.github.io/Randomerr/thank-you/";
      }
    } catch (error) {
      paymentStatus.textContent = `Error: ${error.message}`;
      paymentStatus.classList.add('error');
    } finally {
      submitButton.disabled = false;
    }
  });

  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItemsContainer || !cartTotal) {
    console.error("Cart elements are missing from the DOM.");
    return;
  }

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    cartTotal.textContent = "Total: $0.00";
    return;
  }

  function renderCart() {
    cartItemsContainer.innerHTML = "";
    total = 0;
    cartItems.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <div>${item.name}</div>
          <div>Price: $${item.price}</div>
        </div>
        <div class="cart-item-actions">
          <button class="btn-decrease" data-index="${index}">-</button>
          <input type="text" value="${item.quantity}" class="item-quantity" readonly>
          <button class="btn-increase" data-index="${index}">+</button>
          <button class="btn-remove" data-index="${index}">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(itemDiv);

      total += item.price * item.quantity;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }

  renderCart();

  cartItemsContainer.addEventListener("click", (event) => {
    const index = event.target.dataset.index;
    if (event.target.classList.contains("btn-decrease")) {
      cartItems[index].quantity = Math.max(cartItems[index].quantity - 1, 1);
    } else if (event.target.classList.contains("btn-increase")) {
      cartItems[index].quantity += 1;
    } else if (event.target.classList.contains("btn-remove")) {
      cartItems.splice(index, 1);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCart();
  });
});
</script>
