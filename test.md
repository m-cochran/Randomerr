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
    // Stripe initialization
    const stripe = Stripe('pk_test_51PulULDDaepf7cjiBCJQ4wxoptuvOfsdiJY6tvKxW3uXZsMUome7vfsIORlSEZiaG4q20ZLSqEMiBIuHi7Fsy9dP00nytmrtYb');
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
                const errorData = await response.json();
                console.error('Response failed:', errorData);
                throw new Error(`Error: ${errorData.message || response.statusText}`);
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

                const formData = new FormData();
                formData.append("orderid", orderId);
                formData.append("fullName", name);
                formData.append("email", email);
                formData.append("phone", phone);
                formData.append("billingStreet", address.line1);
                formData.append("billingCity", address.city);
                formData.append("billingState", address.state);
                formData.append("billingPostal", address.postal_code);
                formData.append("billingCountry", address.country);
                formData.append("shippingStreet", shippingAddress.line1);
                formData.append("shippingCity", shippingAddress.city);
                formData.append("shippingState", shippingAddress.state);
                formData.append("shippingPostal", shippingAddress.postal_code);
                formData.append("shippingCountry", shippingAddress.country);

                const items = cartItems.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                }));
                formData.append("purchasedItems", JSON.stringify(items));

                const totalAmount = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
                formData.append("totalAmount", totalAmount);

                // Send order details
                await fetch("https://script.google.com/macros/s/AKfycbz0dP_oaZo-zg_B4ljgP2F8VEfXJW2gRSSD6BX7Nt4RsNqbTwIr_SkqI9nyWWDf8TDJYg/exec", {
                    method: "POST",
                    body: formData
                });

                // Clear cart and redirect
                localStorage.setItem("orderId", orderId);
                localStorage.removeItem("cartItems");
                window.location.href = `https://m-cochran.github.io/Randomerr/thank-you/?orderId=${orderId}`;
            }
        } catch (error) {
            console.error('Fetch error:', error);
            paymentStatus.textContent = `Error: ${error.message}`;
            paymentStatus.classList.add('error');
        } finally {
            submitButton.disabled = false;
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
                <img src="${item.image}" alt="${item.name}" />
                <div class="cart-item-details">
                    <div>${item.name}</div>
                    <div>Price: $${item.price}</div>
                </div>
                <div class="cart-item-actions">
                    <button class="btn-decrease" data-index="${index}">-</button>
                    <input type="text" value="${item.quantity}" oninput="updateQuantity(this, ${item.id})" />
                    <button class="btn-increase" data-index="${index}">+</button>
                    <button class="btn-remove" data-index="${index}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(itemDiv);
            total += item.price * item.quantity;
        });
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;

        // Attach event listeners to buttons for min/max quantity handling
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
</body>
</html>

