// Array to store cart items
const cartItems = [];

// Function to update cart display and save to localStorage
const updateCart = () => {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = "";

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = "<div class='empty-cart'>Your cart is empty.</div>";
        const cartIcon = document.getElementById("cart-icon");
        if (cartIcon) {
            cartIcon.style.display = "none";
        }
        const cartContainer = document.getElementById("cart");
        if (cartContainer) {
            cartContainer.style.display = "none"; // Hide cart container if empty
        }
        localStorage.removeItem("cartItems");

        // Update the cart text to reflect the empty cart
        if (cartText) {
            cartText.textContent = "No items in cart";
        }
        return;
    }

    const ul = document.createElement("ul");
    cartItems.forEach((item, index) => {
        const li = document.createElement("li");
        li.className = "cart-item";

        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.name;
        image.className = "cart-item-image";
        li.appendChild(image);

        const name = document.createElement("div");
        name.className = "cart-item-name";
        name.textContent = item.name;
        li.appendChild(name);

        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.value = item.quantity;
        quantityInput.min = 1;
        quantityInput.className = "cart-item-quantity";
        quantityInput.addEventListener("change", (event) => {
            const newQuantity = parseInt(event.target.value, 10);
            if (newQuantity > 0) {
                cartItems[index].quantity = newQuantity;
                updateCart();
            } else {
                removeCartItem(index);
            }
        });
        li.appendChild(quantityInput);

        const price = document.createElement("div");
        price.className = "cart-item-price";
        price.textContent = `$${item.price}`;
        li.appendChild(price);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "cart-item-remove";
        removeButton.addEventListener("click", () => {
            removeCartItem(index);
        });
        li.appendChild(removeButton);

        ul.appendChild(li);
    });

    cartItemsContainer.appendChild(ul);

    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const totalDiv = document.getElementById("cart-total");
    if (totalDiv) {
        totalDiv.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Update the cart text based on the number of items
    const itemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
    if (cartText) {
        cartText.textContent = `${itemCount} item${itemCount > 1 ? "s" : ""} in cart - click to view cart`;
    }

    // Save cart to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// Load cart items from localStorage
const loadCartFromLocalStorage = () => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
        cartItems.push(...JSON.parse(savedCartItems));
        const cartIcon = document.getElementById("cart-icon");
        if (cartIcon) {
            cartIcon.style.display = "block";
        }
        updateCart();
    } else {
        const cartContainer = document.getElementById("cart");
        if (cartContainer) {
            cartContainer.style.display = "none"; // Hide cart container if there are no items
        }
    }
};

// Function to remove item from cart
const removeCartItem = (index) => {
    cartItems.splice(index, 1);
    updateCart();
};

// Function to add item to cart
const addToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(
        (item) => item.sku === product.sku
    );

    if (existingItemIndex > -1) {
        cartItems[existingItemIndex].quantity += 1;
    } else {
        cartItems.push({
            name: product.name,
            price: product.retail_price,
            image: product.thumbnail_url,
            sku: product.sku,
            quantity: 1,
        });
    }

    const cartIcon = document.getElementById("cart-icon");
    if (cartItems.length > 0 && cartIcon) {
        cartIcon.style.display = "block";
    }

    updateCart();
    animateCartIcon();
};

// Function to trigger the cart icon animation
const animateCartIcon = () => {
    const cartIcon = document.getElementById("cart-icon");
    if (cartIcon) {
        cartIcon.classList.add("cart-icon-bounce");
        setTimeout(() => {
            cartIcon.classList.remove("cart-icon-bounce");
        }, 600);
    }
};

// Initialize event listeners and load cart items on DOM content load
document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.getElementById("cart-icon");
    const cartContainer = document.getElementById("cart");
    const checkoutButton = document.getElementById("checkout-button");
    const cartText = document.getElementById("cart-text"); // New reference for cart text

    // Load cart items from localStorage on page load
    loadCartFromLocalStorage();

    // Check cart toggle state in localStorage
    const cartVisible = localStorage.getItem("cartVisible") === "true";

    if (cartContainer && cartVisible && cartItems.length > 0) {
        cartContainer.style.display = "block";
    } else if (cartContainer) {
        cartContainer.style.display = "none"; // Hide if no items in cart or not toggled
    }

    // Handle cart icon click to toggle cart visibility
    if (cartIcon) {
        cartIcon.addEventListener("click", () => {
            const isCartVisible = cartContainer.style.display === "block";
            cartContainer.style.display = isCartVisible ? "none" : "block";
            localStorage.setItem("cartVisible", !isCartVisible);
        });
    }

    // Handle checkout button click
    if (checkoutButton) {
        checkoutButton.addEventListener("click", () => {
            if (cartItems.length === 0) {
                alert("Your cart is empty. Add items to the cart before proceeding.");
            } else {
                // Redirect to the checkout page
                window.location.href = "https://m-cochran.github.io/Randomerr/checkout/";
            }
        });
    }
});
