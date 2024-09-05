// combined_checkout.js

document.addEventListener("DOMContentLoaded", () => {
    const stripe = Stripe('pk_test_51PulULDDaepf7cjiBCJQ4wxoptuvOfsdiJY6tvKxW3uXZsMUome7vfsIORlSEZiaG4q20ZLSqEMiBIuHi7Fsy9dP00nytmrtYb'); // Replace with your Stripe publishable key
    const elements = stripe.elements();
    const cardElement = elements.create('card');
    cardElement.mount('#card-element');

    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    function renderCart() {
        cartItemsContainer.innerHTML = "";
        let total = 0;

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

        // Reattach event listeners
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

    const form = document.getElementById('payment-form');
    const errorMessage = document.getElementById('card-errors');
    const spinner = document.getElementById('spinner');

    form.addEventListener('submit', async (event) => {
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

        spinner.classList.remove('hidden');

        const { token, error } = await stripe.createToken(cardElement);

        if (error) {
            errorMessage.textContent = error.message;
            spinner.classList.add('hidden');
        } else {
            // Send the token to your server
            fetch('/charge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token.id })
            }).then(response => {
                if (response.ok) {
                    alert('Payment successful!');
                    localStorage.removeItem("cartItems");
                    window.location.href = 'thank-you.html'; // Redirect to a thank you page or home page
                } else {
                    errorMessage.textContent = 'Payment failed.';
                }
                spinner.classList.add('hidden');
            }).catch(() => {
                errorMessage.textContent = 'Payment failed.';
                spinner.classList.add('hidden');
            });
        }
    });
});
