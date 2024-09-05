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
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div>${item.name}</div>
                    <div>Price: $${item.price}</div>
                </div>
                <div class="cart-item-actions">
                    <button class="btn-decrease" data-index="${index}">-</button>
                    <input type="number" class="item-quantity" data-index="${index}" value="${item.quantity}">
                    <button class="btn-increase" data-index="${index}">+</button>
                    <button class="btn-remove" data-index="${index}">Remove</button>
                    <div>$${(item.price * item.quantity).toFixed(2)}</div>
                </div>
            `;

            cartItemsContainer.appendChild(itemDiv);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        attachEventListeners();
    }

    function attachEventListeners() {
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

        document.querySelectorAll(".item-quantity").forEach(input => {
            input.addEventListener("change", (event) => {
                const index = event.target.getAttribute("data-index");
                const newQuantity = parseInt(event.target.value);
                if (newQuantity > 0) {
                    cartItems[index].quantity = newQuantity;
                    updateCart();
                }
            });
        });
    }

    function updateCart() {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        renderCart();
    }

    renderCart();

    // Stripe Payment Integration
    const stripe = Stripe('pk_test_51PulULDDaepf7cjiBCJQ4wxoptuvOfsdiJY6tvKxW3uXZsMUome7vfsIORlSEZiaG4q20ZLSqEMiBIuHi7Fsy9dP00nytmrtYb'); // Replace with your Stripe publishable key
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');

    const form = document.getElementById('payment-form');
    const errorMessage = document.getElementById('card-errors');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Validate shipping form inputs
        const name = document.getElementById("name").value.trim();
        const address = document.getElementById("address").value.trim();
        const city = document.getElementById("city").value.trim();
        const state = document.getElementById("state").value.trim();
        const zip = document.getElementById("zip").value.trim();

        if (!name || !address || !city || !state || !zip) {
            alert("Please fill in all required shipping details.");
            return;
        }

        const { token, error } = await stripe.createToken(cardElement);

        if (error) {
            errorMessage.textContent = error.message;
        } else {
            // Send the token to your server along with cart and shipping details
            fetch('/charge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token.id,
                    cartItems: cartItems,
                    total: total,
                    shipping: {
                        name: name,
                        address: address,
                        city: city,
                        state: state,
                        zip: zip
                    }
                })
            }).then(response => {
                if (response.ok) {
                    alert('Payment successful!');
                    localStorage.removeItem("cartItems");
                    window.location.href = 'thank-you.html'; // Redirect to a thank you page
                } else {
                    errorMessage.textContent = 'Payment failed.';
                }
            });
        }
    });
});