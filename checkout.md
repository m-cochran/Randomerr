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
  const stripe = Stripe('pk_test_51PulULDDaepf7cjiBCJQ4wxoptuvOfsdiJY6tvKxW3uXZsMUome7vfsIORlSEZiaG4q20ZLSqEMiBIuHi7Fsy9dP00nytmrtYb'); // Use your publishable key
  const form = document.getElementById("payment-form");
  const submitButton = document.getElementById("submit-button");
  const paymentStatus = document.getElementById("payment-status");
  const sameAddressCheckbox = document.getElementById("same-address");
  const shippingAddressContainer = document.getElementById("shipping-address-container");

  const generateOrderId = () => `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  // Mount the Stripe Elements card UI
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

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    paymentStatus.textContent = "";

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = {
      line1: document.getElementById("address").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      postal_code: document.getElementById("postal-code").value,
      country: document.getElementById("country").value
    };
    const shippingAddress = sameAddressCheckbox.checked ? address : {
      line1: document.getElementById("shipping-address").value,
      city: document.getElementById("shipping-city").value,
      state: document.getElementById("shipping-state").value,
      postal_code: document.getElementById("shipping-postal-code").value,
      country: document.getElementById("shipping-country").value
    };

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    let total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalInCents = total * 100;

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
            const orderId = generateOrderId();
            paymentStatus.textContent = `Payment successful! Your Order ID is: ${orderId}`;
            paymentStatus.classList.add('success');

            // Prepare CSV data
            let csvContent = `Order ID, Full Name, Email, Phone, Billing Street, Billing City, Billing State, Billing Postal, Billing Country, Shipping Street, Shipping City, Shipping State, Shipping Postal, Shipping Country, Total Amount\n`;
            csvContent += `${orderId}, ${name}, ${email}, ${phone}, ${address.line1}, ${address.city}, ${address.state}, ${address.postal_code}, ${address.country}, ${shippingAddress.line1}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.postal_code}, ${shippingAddress.country}, ${total.toFixed(2)}\n`;

            // Adding purchased items to CSV
            csvContent += `\nPurchased Items\nName, Quantity, Price\n`;
            cartItems.forEach(item => {
                csvContent += `${item.name}, ${item.quantity}, ${item.price}\n`;
            });

            // Send CSV data to server and check if upload is successful
            const csvUploadResponse = await fetch('[/upload-csv](https://backend-github-io.vercel.app/api/save-order)', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/csv'
                },
                body: csvContent
            });

            if (!csvUploadResponse.ok) {
                throw new Error('CSV upload failed');
            }

            // Clear cart and redirect only if CSV is successfully uploaded
            localStorage.setItem("orderId", orderId);
            localStorage.setItem("purchasedItems", JSON.stringify(cartItems));
            localStorage.removeItem("cartItems");
            window.location.href = `https://m-cochran.github.io/Randomerr/thank-you/?orderId=${orderId}`;
        }
    } catch (error) {
        paymentStatus.textContent = `Error: ${error.message}`;
        paymentStatus.classList.add('error');
        submitButton.disabled = false; // Re-enable the submit button on error
    }
});


  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

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
          <input type="text" value="${item.quantity}" oninput="updateQuantity(this, ${item.id})">
          <button class="btn-increase" data-index="${index}">+</button>
          <button class="btn-remove" data-index="${index}">Remove</button>
        </div>
      `;
      cartItemsContainer.appendChild(itemDiv);
      total += item.price * item.quantity;
    });
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;

    document.querySelectorAll(".btn-decrease").forEach(button => {
      button.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        if (cartItems[index].quantity > 1) {
          cartItems[index].quantity--;
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          renderCart();
        }
      });
    });

    document.querySelectorAll(".btn-increase").forEach(button => {
      button.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        cartItems[index].quantity++;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        renderCart();
      });
    });

    document.querySelectorAll(".btn-remove").forEach(button => {
      button.addEventListener("click", (event) => {
        const index = event.target.dataset.index;
        cartItems.splice(index, 1);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        renderCart();
      });
    });
  }

  renderCart();
});
</script>

