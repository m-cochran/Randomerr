document.addEventListener("DOMContentLoaded", () => {
    // Initialize Stripe
    const stripe = Stripe('pk_test_51PulULDDaepf7cjiBCJQ4wxoptuvOfsdiJY6tvKxW3uXZsMUome7vfsIORlSEZiaG4q20ZLSqEMiBIuHi7Fsy9dP00nytmrtYb'); // Replace with your Stripe publishable key
    const elements = stripe.elements();

    // Style customization for the card element
    const style = {
        base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4"
            }
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
        }
    };

    // Create an instance of the card element and mount it
    const card = elements.create('card', { style });
    card.mount('#card-element');

    // Handle real-time validation errors from the card element
    card.on('change', (event) => {
        const displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    });

    // Handle form submission
    const form = document.getElementById('payment-form');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const { token, error } = await stripe.createToken(card);

        if (error) {
            // Show error in #card-errors element
            const errorElement = document.getElementById('card-errors');
            errorElement.textContent = error.message;
        } else {
            // Send token to the server
            fetch('/charge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: token.id })
            }).then(response => {
                if (response.ok) {
                    alert('Payment successful!');
                    window.location.href = 'thank-you.html'; // Redirect to a thank you page or home page
                } else {
                    return response.json().then(data => {
                        const errorElement = document.getElementById('card-errors');
                        errorElement.textContent = data.error || 'Payment failed.';
                    });
                }
            }).catch(error => {
                const errorElement = document.getElementById('card-errors');
                errorElement.textContent = 'Payment failed. Please try again.';
            });
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

    document.getElementById("shipping-form").addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const address = document.getElementById("address").value.trim();
        const city = document.getElementById("city").value.trim();
        const state = document.getElementById("state").value.trim();
        const zip = document.getElementById("zip").value.trim();
        const paymentMethod = document.getElementById("payment").value;

        if (!name || !address || !city || !state || !zip) {
            alert("Please fill in all required fields.");
            return;
        }

        alert(`Thank you for your purchase, ${name}!`);

        localStorage.removeItem("cartItems");
        window.location.href = "thank-you.html"; // Redirect to a thank you page or home page
    });
});
