// MAIN MENU
document.addEventListener("DOMContentLoaded", function () {
  const mainMenu = document.getElementById("mainMenu");
  const autoNav = document.getElementById("autoNav");
  const autoNavMore = document.getElementById("autoNavMore");
  const autoNavMoreList = document.getElementById("autoNavMoreList");

  function autoNavMoreHandler() {
    let childNumber = 2;

    if (window.innerWidth >= 320) {
      const menuWidth = mainMenu.offsetWidth;
      const autoNavWidth = autoNav.offsetWidth;
      if (autoNavWidth > menuWidth) {
        autoNavMoreList.prepend(
          autoNav.children[autoNav.children.length - childNumber]
        );
        autoNavMoreHandler();
      } else {
        const autoNavMoreFirstWidth =
          autoNavMoreList.children[0]?.offsetWidth || 0;
        if (autoNavWidth + autoNavMoreFirstWidth < menuWidth) {
          autoNav.insertBefore(autoNavMoreList.children[0], autoNavMore);
        }
      }
      if (autoNavMoreList.children.length > 0) {
        autoNavMore.style.display = "block";
        childNumber = 2;
      } else {
        autoNavMore.style.display = "none";
        childNumber = 1;
      }
    }
  }

  autoNavMoreHandler();
  window.addEventListener("resize", autoNavMoreHandler);
});

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slide-track");

  slider.addEventListener("mouseover", function () {
    slider.style.animationPlayState = "paused";
  });

  slider.addEventListener("mouseout", function () {
    slider.style.animationPlayState = "running";
  });
});

// Global variable to store the selected variant
let selectedVariant = null;

// Function to truncate text to a specified length with ellipsis
const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

// Fetch the JSON data with error handling
const fetchProductData = async () => {
  try {
    const response = await fetch("https://m-cochran.github.io/Randomerr/products.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Product data fetched:", data); // Debugging line
    populateProducts(data);
  } catch (error) {
    console.error("Failed to fetch product data:", error);
    const productList = document.getElementById("product-list");
    if (productList) {
      productList.innerHTML =
        '<div class="error">Failed to load products. Please try again later.</div>';
    }
  }
};

// Function to update the cart UI
const updateCartUI = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  
  if (!cartItemsContainer) {
    console.error("Cart items container not found.");
    return;
  }
  
  cartItemsContainer.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {
    const itemPrice = parseFloat(item.price) || 0; // Ensure price is numeric
    total += itemPrice * item.quantity;

    const cartItemElement = document.createElement("div");
    cartItemElement.className = "cart-item";
    cartItemElement.innerHTML = `
      <img src="${item.thumbnail}" alt="${item.name}">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>SKU: ${item.sku}</p>
        <p>Price: $${itemPrice.toFixed(2)}</p>
        <p>Quantity: ${item.quantity}</p>
        <button onclick="removeFromCart(${item.id}, '${item.sku}')">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItemElement);
  });

  const cartTotal = document.getElementById("cart-total");
  if (cartTotal) {
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }

  // If the cart is empty, display a message
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty</p>";
  }
};

// Function to add a product to the cart
const addToCart = (product) => {
  if (!selectedVariant) {
    alert("Please select a variant before adding to the cart.");
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItem = {
    id: product.sync_product.id,
    name: product.sync_product.name,
    price: parseFloat(selectedVariant.price) || 0,
    thumbnail: selectedVariant.mainImageUrl || "default-thumbnail.jpg",
    sku: selectedVariant.sku || "N/A",
    color: selectedVariant.color || "N/A",
    quantity: 1,
  };

  // Check if the item with the same variant is already in the cart
  const existingItem = cart.find(
    (item) => item.id === cartItem.id && item.sku === cartItem.sku
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(cartItem);
  }

  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Update the cart UI
  updateCartUI();
};

// Function to remove a product from the cart
const removeFromCart = (id, sku) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => !(item.id === id && item.sku === sku));
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
};

// Populate products in the product list
const populateProducts = (data) => {
  const productList = document.getElementById("product-list");
  const modal = document.getElementById("product-details-modal");
  const modalBody = document.getElementById("modal-body");
  const modalClose = document.getElementById("modal-close");
  const modalTitleInfo = document.getElementById("modal-title-info");

  if (!productList || !modal || !modalBody || !modalClose || !modalTitleInfo) {
    console.error("One or more required elements are missing.");
    return;
  }

  data.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";

    const title = document.createElement("h2");
    title.className = "product-title";
    title.textContent = product.sync_product.name;
    productDiv.appendChild(title);

    const thumbnail = document.createElement("img");
    thumbnail.src = product.sync_product.thumbnail_url || "default-thumbnail.jpg";
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
        icon.setAttribute("data-main-image", variant.files[0].preview_url);
        icon.setAttribute("data-price", variant.retail_price);
        icon.setAttribute("data-color", variant.color || "N/A");
        icon.setAttribute("data-availability", variant.availability_status);
        icon.setAttribute("data-sku", variant.sku || "N/A");
        icon.addEventListener("click", handleVariantSelection); // Add click event
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
      const modalMainImage = document.getElementById("modal-main-image");
      modalMainImage.src = product.sync_product.thumbnail_url || "default-thumbnail.jpg";
      modalTitleInfo.innerHTML = `
        <div id="modal-title">${product.sync_product.name}</div>
        <div id="modal-sku">SKU: ${firstVariant.sku || "N/A"}</div>
        <div id="modal-color">Color: ${firstVariant.color || "N/A"}</div>
        <div id="modal-price">Price: $${firstVariant.retail_price || "N/A"}</div>
        <div id="modal-availability" class="${firstVariant.availability_status === "out_of_stock" ? "out-of-stock" : "in-stock"}">
          Availability: ${firstVariant.availability_status === "out_of_stock" ? "Out of Stock" : "In Stock"}
        </div>
        <div id="modal-description">Description: ${firstVariant.description || "No description available"}</div>
      `;
      modalBody.innerHTML = ""; // Clear previous content
      modalBody.appendChild(productDiv.cloneNode(true));
      modal.style.display = "block";
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

// Function to handle variant selection
const handleVariantSelection = (event) => {
  const icon = event.target;
  if (icon.classList.contains("variation-icon")) {
    selectedVariant = {
      price: icon.getAttribute("data-price"),
      mainImageUrl: icon.getAttribute("data-main-image"),
      color: icon.getAttribute("data-color"),
      availability: icon.getAttribute("data-availability"),
      sku: icon.getAttribute("data-sku"),
    };
  }
};

// Call the function to fetch product data on page load
fetchProductData();

// Update cart UI when page loads or cart is updated
updateCartUI();
