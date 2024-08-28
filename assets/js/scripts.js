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








// Fetch the JSON data
fetch("https://m-cochran.github.io/Randomerr/products.json")
  .then((response) => response.json())
  .then((data) => {
    const productList = document.getElementById("product-list");
    const modal = document.getElementById("product-details-modal");
    const modalBody = document.getElementById("modal-body");
    const modalClose = document.getElementById("modal-close");
    const modalMainImage = document.getElementById("modal-main-image");
    const modalTitleInfo = document.getElementById("modal-title-info");

    data.forEach((product) => {
      // Create product container
      const productDiv = document.createElement("div");
      productDiv.className = "product";

      // Add product title
      const title = document.createElement("h2");
      title.className = "product-title";
      title.textContent = product.sync_product.name;
      productDiv.appendChild(title);

      // Add product thumbnail
      const thumbnail = document.createElement("img");
      thumbnail.src =
        product.sync_product.thumbnail_url || "default-thumbnail.jpg"; // Fallback image
      thumbnail.alt = product.sync_product.name;
      productDiv.appendChild(thumbnail);

      // Add click event to open modal with product details
      thumbnail.addEventListener("click", () => {
        // Set the main image and initial title, color, and price in the modal
        modalMainImage.src =
          product.sync_product.thumbnail_url || "default-thumbnail.jpg"; // Fallback image
        const firstVariant = product.sync_variants[0];
        modalTitleInfo.innerHTML = `
          <div id="modal-title">${product.sync_product.name}</div>
          <div id="modal-color">Color: ${firstVariant.color || "N/A"}</div>
          <div id="modal-price">Price: $${
            firstVariant.retail_price || "N/A"
          }</div>
        `;

        let modalContent = `
                            <div class="variant-gallery">
                        `;

        // Add variants to modal
        product.sync_variants.forEach((variant) => {
          variant.files.forEach((file) => {
            if (file.preview_url) {
              modalContent += `
                                  <img src="${file.preview_url}" alt="${variant.name}" data-main-image="${file.preview_url}" data-price="${variant.retail_price}" data-color="${variant.color}" data-size="${variant.size}">
                              `;
            }
          });
        });

        modalContent += `</div>`;
        modalBody.innerHTML = modalContent;

        // Add click event to variant images
        document.querySelectorAll(".variant-gallery img").forEach((img) => {
          img.addEventListener("click", (event) => {
            const mainImageUrl = event.target.getAttribute("data-main-image");
            const price = event.target.getAttribute("data-price");
            const color = event.target.getAttribute("data-color");

            modalMainImage.src = mainImageUrl;
            document.getElementById(
              "modal-price"
            ).textContent = `Price: $${price}`;
            document.getElementById(
              "modal-color"
            ).textContent = `Color: ${color}`;

            document
              .querySelectorAll(".variant-gallery img")
              .forEach((el) => el.classList.remove("active"));
            event.target.classList.add("active");
          });
        });

        modal.style.display = "flex";
      });

      productList.appendChild(productDiv);
    });

    // Close modal on clicking 'X'
    modalClose.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close modal on clicking outside the modal content
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  })
  .catch((error) => {
    console.error("Error fetching product data:", error);
  });
