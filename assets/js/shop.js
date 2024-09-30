// Function to truncate text to a specific length
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength) + "...";
};

// Fetch the JSON data with error handling
const fetchProductData = async () => {
  try {
    const response = await fetch(
      "https://m-cochran.github.io/Randomerr/products.json"
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    populateProducts(data);
  } catch (error) {
    console.error("Failed to fetch product data:", error);
    document.getElementById("product-list").innerHTML =
      '<div class="error">Failed to load products. Please try again later.</div>';
  }
};

// Variable to store currently selected variant
let selectedVariant = null;

// Populate products in the product list
const populateProducts = (data) => {
  const productList = document.getElementById("product-list");
  const modal = document.getElementById("product-details-modal");
  const modalBody = document.getElementById("modal-body");
  const modalClose = document.getElementById("modal-close");
  const modalMainImage = document.getElementById("modal-main-image");
  const modalTitleInfo = document.getElementById("modal-title-info");
  
   // Clear the existing products before populating new ones
  productList.innerHTML = "";

  data.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";

    const title = document.createElement("h2");
    title.className = "product-title";
    title.textContent = product.sync_product.name;
    productDiv.appendChild(title);

    const thumbnail = document.createElement("img");
    thumbnail.src =
      product.sync_product.thumbnail_url || "default-thumbnail.jpg";
    thumbnail.alt = product.sync_product.name;
    productDiv.appendChild(thumbnail);

    const price = document.createElement("div");
    price.className = "product-price";
    const firstVariant = product.sync_variants[0];
    price.textContent = `$${firstVariant.retail_price || "N/A"}`;
    productDiv.appendChild(price);

    const description = document.createElement("div");
    description.className = "product-description";
    const shortDescription = truncateText(
      firstVariant.description || "No description available",
      45
    );
    description.textContent = shortDescription;
    productDiv.appendChild(description);

    const variationIcons = document.createElement("div");
    variationIcons.className = "variation-icons";
    const variants = product.sync_variants.slice(0, 5);
    variants.forEach((variant) => {
      if (variant.files[0].preview_url) {
        const icon = document.createElement("img");
        icon.src = variant.files[0].preview_url;
        icon.alt = variant.name;
        icon.className = "variation-icon";
        variationIcons.appendChild(icon);
      }
    });
    if (product.sync_variants.length > 5) {
      const moreIcon = document.createElement("div");
      moreIcon.className = "more-icon";
      moreIcon.textContent = `+${product.sync_variants.length - 5}`;
      variationIcons.appendChild(moreIcon);
    }
    productDiv.appendChild(variationIcons);

    productDiv.addEventListener("click", () => {
      // Reset the selected variant
  selectedVariant = null;
      modalMainImage.src =
        product.sync_product.thumbnail_url || "default-thumbnail.jpg";
      modalTitleInfo.innerHTML = `
        <div id="modal-title">${product.sync_product.name}</div>
        <div id="modal-sku">SKU: ${firstVariant.sku || "N/A"}</div>
        <div id="modal-color">Color: ${firstVariant.color || "N/A"}</div>
        <div id="modal-price">Price: $${
          firstVariant.retail_price || "N/A"
        }</div>
        <div id="modal-availability" class="${
          firstVariant.availability_status === "active"
            ? "in-stock"
            : "out-of-stock"
        }">
          Availability: ${
            firstVariant.availability_status === "active"
              ? "In Stock"
              : "Out of Stock"
          }
        </div>
        <div id="modal-description">Description: ${
          firstVariant.description || "No description available"
        }</div>
      `;

      let modalContent = `<div class="variant-gallery">`;
      product.sync_variants.forEach((variant) => {
        variant.files.forEach((file) => {
          if (file.preview_url) {
            modalContent += `
              <img src="${file.preview_url}" alt="${variant.name}" data-main-image="${file.preview_url}" data-price="${variant.retail_price}" data-color="${variant.color}" data-availability="${variant.availability_status}" data-sku="${variant.sku}">
            `;
          }
        });
      });
      modalContent += `</div>`;
      modalContent += `
        <div class="modal-buttons">
          <button id="add-to-cart">Add to Cart</button>
          <button id="buy-now">Buy Now</button>
        </div>
      `;

      // Clear existing modal content
      modalBody.innerHTML = "";
      modalBody.innerHTML = modalContent;

      // Set click events on variant images
      document.querySelectorAll(".variant-gallery img").forEach((img) => {
        img.addEventListener("click", (event) => {
          const mainImageUrl = event.target.getAttribute("data-main-image");
          const price = event.target.getAttribute("data-price");
          const color = event.target.getAttribute("data-color");
          const availabilityStatus = event.target.getAttribute(
            "data-availability"
          );
          const sku = event.target.getAttribute("data-sku");

          modalMainImage.src = mainImageUrl;
          document.getElementById(
            "modal-price"
          ).textContent = `Price: $${price}`;
          document.getElementById(
            "modal-color"
          ).textContent = `Color: ${color}`;
          document.getElementById(
            "modal-availability"
          ).textContent = `Availability: ${
            availabilityStatus === "active" ? "In Stock" : "Out of Stock"
          }`;
          document.getElementById("modal-availability").className =
            availabilityStatus === "active" ? "in-stock" : "out-of-stock";
          document.getElementById("modal-sku").textContent = `SKU: ${sku}`;

          // Remove active class from all variant images
          document
            .querySelectorAll(".variant-gallery img")
            .forEach((el) => el.classList.remove("active"));

          // Add active class to clicked variant
          event.target.classList.add("active");

          // Update selected variant
          selectedVariant = {
            mainImageUrl,
            price,
            color,
            availabilityStatus,
            sku
          };
        });
      });

      // Handle button clicks
      const addToCartButton = document.getElementById("add-to-cart");
      const buyNowButton = document.getElementById("buy-now");

      if (addToCartButton) {
        addToCartButton.addEventListener("click", () => {
          if (selectedVariant) {
            addToCart({
              name: product.sync_product.name,
              retail_price: selectedVariant.price,
              thumbnail_url: selectedVariant.mainImageUrl,
              sku: selectedVariant.sku
            });
            document.getElementById("cart-icon").style.display = "block";
          } else {
            alert("Please select a variant.");
          }
        });
      }

      if (buyNowButton) {
        buyNowButton.addEventListener("click", () => {
          if (selectedVariant) {
            addToCart({
              name: product.sync_product.name,
              retail_price: selectedVariant.price,
              thumbnail_url: selectedVariant.mainImageUrl,
              sku: selectedVariant.sku
            });
            document.getElementById("cart-icon").style.display = "block";
            alert("Proceeding to buy now!");
          } else {
            alert("Please select a variant.");
          }
        });
      }

      modal.style.display = "flex";
    });

    productList.appendChild(productDiv);
  });

  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
};

// Initialize the product list on page load
window.addEventListener("load", () => {
  fetchProductData();
});

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
    fetchProductData();
    loadCartFromLocalStorage();
  });
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