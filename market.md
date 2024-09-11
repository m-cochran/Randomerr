<script>
document.addEventListener("DOMContentLoaded", async () => {
  // Stripe API setup
  const stripe = Stripe('pk_test_51PulULDDaepf7cjiBCJQ4wxoptuvOfsdiJY6tvKxW3uXZsMUome7vfsIORlSEZiaG4q20ZLSqEMiBIuHi7Fsy9dP00nytmrtYb'); // Use your publishable key
  const form = document.getElementById("payment-form");
  const submitButton = document.getElementById("submit-button");
  const paymentStatus = document.getElementById("payment-status");
  const sameAddressCheckbox = document.getElementById("same-address");
  const shippingAddressContainer = document.getElementById("shipping-address-container");

  // Mount the Stripe Elements card UI
  const elements = stripe.elements();
  const card = elements.create("card");
  card.mount("#card-element");

  // Handle shipping address same as billing
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

  // Handle payment submission
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

    try {
      const response = await fetch('https://backend-github-io.vercel.app/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 2000, // Example amount in cents
          email: email,
          phone: phone,
          name: name,
          address: address,
          shippingAddress: shippingAddress
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
        paymentStatus.textContent = 'Payment successful!';
        paymentStatus.classList.add('success');
      }
    } catch (error) {
      paymentStatus.textContent = `Error: ${error.message}`;
      paymentStatus.classList.add('error');
    } finally {
      submitButton.disabled = false;
    }
  });

  // Cart functionality
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
          <div>$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
      `;
      cartItemsContainer.appendChild(itemDiv);
      total += item.price * item.quantity;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;

    // Attach event listeners to cart item buttons
    document.querySelectorAll(".btn-increase").forEach(button => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        cartItems[index].quantity += 1;
        updateCart();
      });
    });

    document.querySelectorAll(".btn-decrease").forEach(button => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        if (cartItems[index].quantity > 1) {
          cartItems[index].quantity -= 1;
          updateCart();
        }
      });
    });

    document.querySelectorAll(".btn-remove").forEach(button => {
      button.addEventListener("click", (event) => {
        const index = event.target.getAttribute("data-index");
        cartItems.splice(index, 1);
        updateCart();
      });
    });
  }

  function updateCart() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCart();
  }

  renderCart();

  // Shipping form handling
  document.getElementById("shipping-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").value.trim();
    const zip = document.getElementById("zip").value.trim();

    if (!name || !address || !city || !state || !zip) {
      alert("Please fill in all required fields.");
      return;
    }

    alert(`Thank you for your purchase, ${name}!`);

    localStorage.removeItem("cartItems");
    window.location.href = "thank-you.html";
  });
});
</script>
