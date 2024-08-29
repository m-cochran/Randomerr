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

  const slider = document.querySelector(".slide-track");

  slider.addEventListener("mouseover", function () {
    slider.style.animationPlayState = "paused";
  });

  slider.addEventListener("mouseout", function () {
    slider.style.animationPlayState = "running";
  });

  // Fetch the JSON data with error handling
  const fetchProductData = async () => {
  try {
    const response = await fetch("https://m-cochran.github.io/Randomerr/products.json");
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("Fetched data is not an array");
    }
    populateProducts(data);
  } catch (error) {
    console.error("Failed to fetch product data:", error);
    const productList = document.getElementById("product-list");
    if (productList) {
      productList.innerHTML = '<div class="error">Failed to load products. Please try again later.</div>';
    }
  }
};


  // Populate products in the product list
const populateProducts = (data) => {
  const productList = document.getElementById("product-list");
  if (!productList) {
    console.error("Product list element not found");
    return;
  }

  const modal = document.getElementById("product-details-modal");
  const modalBody = document.getElementById("modal-body");
  const modalClose = document.getElementById("modal-close");
  const modalMainImage = document.getElementById("modal-main-image");
  const modalTitleInfo = document.getElementById("modal-title-info");

  if (!modal || !modalBody || !modalClose || !modalMainImage || !modalTitleInfo) {
    console.error("One or more modal elements not found");
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
    description.textContent = product.sync_product.description || "No description available";
    productDiv.appendChild(description);

    productDiv.addEventListener("click", () => {
      modalMainImage.src = product.sync_product.thumbnail_url || "default-thumbnail.jpg";
      modalTitleInfo.innerHTML = `
        <div id="modal-title">${product.sync_product.name}</div>
        <div id="modal-sku">SKU: ${firstVariant.sku || "N/A"}</div>
        <div id="modal-color">Color: ${firstVariant.color || "N/A"}</div>
        <div id="modal-price">Price: $${firstVariant.retail_price || "N/A"}</div>
        <div id="modal-availability" class="${firstVariant.availability_status === "active" ? "in-stock" : "out-of-stock"}">
          Availability: ${firstVariant.availability_status === "active" ? "In Stock" : "Out of Stock"}
        </div>
        <div id="modal-description">Description: ${product.sync_product.description || "No description available"}</div>
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
      modalBody.innerHTML = modalContent;

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

          document.querySelectorAll(".variant-gallery img").forEach((el) => el.classList.remove("active"));
          event.target.classList.add("active");
        });
      });

      modal.style.display = "flex";
    });

    productList.appendChild(productDiv);
  });

  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
  });
};


  // Call fetchProductData when DOM content is loaded
  fetchProductData();
});
