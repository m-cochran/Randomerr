document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.getElementById("cart-icon");
  const cartContainer = document.getElementById("cart");
  
  // Function to show/hide cart based on localStorage toggle state
  const setCartVisibility = (visible) => {
    if (cartContainer) {
      cartContainer.style.display = visible ? "block" : "none";
    }
    localStorage.setItem("cartVisible", visible ? "true" : "false");
  };

  // Load cart toggle state from localStorage
  const cartVisible = localStorage.getItem("cartVisible") === "true";
  setCartVisibility(cartVisible);

  // Event listener for cart toggle click
  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      const isCartVisible = cartContainer.style.display === "block";
      setCartVisibility(!isCartVisible); // Toggle visibility
    });
  }

  // Add item to cart and only show the cart icon
  const addToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    const existingItemIndex = cartItems.findIndex(item => item.sku === product.sku);
    if (existingItemIndex > -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({
        name: product.name,
        price: product.retail_price,
        image: product.thumbnail_url,
        sku: product.sku,
        quantity: 1
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Only show the cart icon after an item is added
    if (cartIcon) {
      cartIcon.style.display = "block";
    }

    // Update cart and do not automatically show the cart container
    updateCart(false);
  };

  // Update cart display
  const updateCart = (showCart) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartItemsContainer = document.getElementById("cart-items");

    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = ""; // Clear the cart items container

      if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = "<div class='empty-cart'>Your cart is empty.</div>";
        cartIcon.style.display = "none"; // Hide the cart icon if no items
        setCartVisibility(false); // Ensure cart is hidden when empty
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
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            updateCart(false);
          }
        });
        li.appendChild(quantityInput);

        const price = document.createElement("div");
        price.className = "cart-item-price";
        price.textContent = `$${item.price}`;
        li.appendChild(price);

        ul.appendChild(li);
      });

      cartItemsContainer.appendChild(ul);

      const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const totalDiv = document.getElementById("cart-total");
      if (totalDiv) {
        totalDiv.textContent = `Total: $${total.toFixed(2)}`;
      }

      // Optionally show or hide the cart container if specified
      if (showCart) {
        setCartVisibility(true);
      }
    }
  };

  // Load the cart items and the toggle state when the page loads
  updateCart(false);
});
