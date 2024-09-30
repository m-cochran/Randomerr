// Handle cart icon click
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("cart-icon").addEventListener("click", () => {
    const cart = document.getElementById("cart");
    cart.style.display = cart.style.display === "none" ? "block" : "none";
  });
});


// Array to store cart items
const cartItems = [];

// Function to trigger the cart icon animation
const animateCartIcon = () => {
  const cartIcon = document.getElementById("cart-icon");
  cartIcon.classList.add("cart-icon-bounce");
  
  // Remove the class after the animation ends to allow for future animations
  setTimeout(() => {
    cartIcon.classList.remove("cart-icon-bounce");
  }, 600); // Duration should match the animation duration in CSS
};

// Function to add item to cart
const addToCart = (product) => {
  const existingItemIndex = cartItems.findIndex(
    (item) => item.sku === product.sku
  );

  if (existingItemIndex > -1) {
    cartItems[existingItemIndex].quantity += 1;
  } else {
    // Add new item to cart
    cartItems.push({
      name: product.name,
      price: product.retail_price,
      image: product.thumbnail_url,
      sku: product.sku,
      quantity: 1
    });
  }

  // Update cart icon visibility based on the number of items
  if (cartItems.length > 0) {
    document.getElementById("cart-icon").style.display = "block";
  }

  updateCart();
  
  // Trigger the cart icon animation
  animateCartIcon();
};

// Function to update cart display and save to localStorage
const updateCart = () => {
  const cart = document.getElementById("cart");
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = "<div class='empty-cart'>Your cart is empty.</div>";
    document.getElementById("cart-icon").style.display = "none";
    // Hide the cart when it's empty
    cart.style.display = "none";
    // Clear cart from localStorage when it's empty
    localStorage.removeItem("cartItems");
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
  totalDiv.textContent = `Total: $${total.toFixed(2)}`;

  // Show the cart
  cart.style.display = "block";

  // Save cart to localStorage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

// Add event listener for the checkout button
document.addEventListener("DOMContentLoaded", () => {
  const checkoutButton = document.getElementById("checkout-button"); // Access the button by ID

  checkoutButton.addEventListener("click", () => {
    // Check if there are items in the cart
    if (cartItems.length === 0) {
      alert("Your cart is empty. Add items to the cart before proceeding.");
    } else {
      // Redirect to the checkout page
      window.location.href = "https://m-cochran.github.io/Randomerr/checkout"; // Update the URL based on your site's structure
    }
  });

  // Load cart items from localStorage and fetch product data on page load
  window.addEventListener("load", () => {
    loadCartFromLocalStorage();
  });
  
// Load cart items from localStorage
const loadCartFromLocalStorage = () => {
  const savedCartItems = localStorage.getItem("cartItems");
  if (savedCartItems) {
    cartItems.push(...JSON.parse(savedCartItems));
    document.getElementById("cart-icon").style.display = "block";
    updateCart();
  }
};

// Function to remove item from cart
const removeCartItem = (index) => {
  cartItems.splice(index, 1);
  updateCart();
};
