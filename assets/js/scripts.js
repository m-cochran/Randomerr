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









// Function to truncate text to a specified length with ellipsis
const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
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
    populateProducts(data);
  } catch (error) {
    console.error("Failed to fetch product data:", error);
    document.getElementById("product-list").innerHTML =
      '<div class="error">Failed to load products. Please try again later.</div>';
  }
};

// Function to add product to cart
const addToCart = (product) => {
  // Add product to local storage cart
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const variant = product.sync_variants[0];
  
  const cartItem = {
    id: product.sync_product.id,
    name: product.sync_product.name,
    price: variant.retail_price || "N/A",
    thumbnail: product.sync_product.thumbnail_url || "default-thumbnail.jpg",
    sku: variant.sku || "N/A",
    quantity: 1,
  };

  const existingItem = cart.find(item => item.id === cartItem.id && item.sku === cartItem.sku);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
};

// Function to update the cart UI
const updateCartUI = () => {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');

  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${item.thumbnail}" alt="${item.name}" class="cart-item-thumbnail">
      <span class="cart-item-name">${item.name}</span>
      <span class="cart-item-quantity">Qty: ${item.quantity}</span>
      <span class="cart-item-price">$${item.price}</span>
      <button class="remove-item" data-id="${item.id}" data-sku="${item.sku}">Remove</button>
    `;
    cartItems.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;

  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', (event) => {
      const id = event.target.getAttribute('data-id');
      const sku = event.target.getAttribute('data-sku');
      removeFromCart(id, sku);
    });
  });
};

// Function to remove item from cart
const removeFromCart = (id, sku) => {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => !(item.id === id && item.sku === sku));
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
};

// Initialize the cart UI on page load
document.addEventListener('DOMContentLoaded', updateCartUI);

// Buy now (mock function for demonstration)
const buyNow = (product) => {
  console.log(`Buy now: ${product.sync_product.name}`);
  // Add your checkout functionality here
};

// Populate products in the product list
const populateProducts = (data) => {
  const productList = document.getElementById("product-list");
  const modal = document.getElementById("product-details-modal");
  const modalBody = document.getElementById("modal-body");
  const modalClose = document.getElementById("modal-close");
  const modalMainImage = document.getElementById("modal-main-image");
  const modalTitleInfo = document.getElementById("modal-title-info");

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
      modalMainImage.src =
        product.sync_product.thumbnail_url || "default-thumbnail.jpg";
      modalTitleInfo.innerHTML = `
        <div id="modal-title">${product.sync_product.name}</div>
        <div id="modal-sku">SKU: ${firstVariant.sku || "N/A"}</div>
        <div id="modal-color">Color: ${firstVariant.color || "N/A"}</div>
        <div id="modal-price">Price: $${firstVariant.retail_price || "N/A"}</div>
        <div id="modal-availability" class="${firstVariant.availability_status === "active" ? "in-stock" : "out-of-stock"}">
          Availability: ${firstVariant.availability_status === "active" ? "In Stock" : "Out of Stock"}
        </div>
        <div id="modal-description">Description: ${firstVariant.description || "No description available"}</div>
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
      modalBody.innerHTML = '';
      modalBody.innerHTML = modalContent;

      // Set click events on variant images
      document.querySelectorAll(".variant-gallery img").forEach((img) => {
        img.addEventListener("click", (event) => {
          const mainImageUrl = event.target.getAttribute("data-main-image");
          const price = event.target.getAttribute("data-price");
          const color = event.target.getAttribute("data-color");
          const availabilityStatus = event.target.getAttribute("data-availability");
          const sku = event.target.getAttribute("data-sku");

          modalMainImage.src = mainImageUrl;
          document.getElementById("modal-price").textContent = `Price: $${price}`;
          document.getElementById("modal-color").textContent = `Color: ${color}`;
          document.getElementById("modal-availability").textContent = `Availability: ${availabilityStatus === "active" ? "In Stock" : "Out of Stock"}`;
          document.getElementById("modal-availability").className = availabilityStatus === "active" ? "in-stock" : "out-of-stock";
          document.getElementById("modal-sku").textContent = `SKU: ${sku}`;

          // Remove active class from all variant images
          document.querySelectorAll(".variant-gallery img").forEach((el) => el.classList.remove("active"));

          // Add active class to clicked variant
          event.target.classList.add("active");
        });
      });

      // Handle button clicks
      const addToCartButton = document.getElementById("add-to-cart");
      const buyNowButton = document.getElementById("buy-now");

      if (addToCartButton) {
        addToCartButton.addEventListener("click", () => addToCart(product));
      }

      if (buyNowButton) {
        buyNowButton.addEventListener("click", () => buyNow(product));
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

// Initialize
fetchProductData();




