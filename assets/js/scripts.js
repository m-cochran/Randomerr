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

fetch("https://m-cochran.github.io/Randomerr/products.json")
  .then((response) => response.json())
  .then((data) => {
    const container = document.getElementById("product-container");
    const modal = document.getElementById("product-modal");
    const modalBody = document.getElementById("modal-body");
    const modalClose = document.getElementById("modal-close");
    const modalMainImage = document.getElementById("modal-main-image");
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
      thumbnail.src = product.sync_product.thumbnail_url;
      thumbnail.alt = product.sync_product.name;
      productDiv.appendChild(thumbnail);
      // Add click event to open modal with product details
      thumbnail.addEventListener("click", () => {
        // Set the main image in the modal
        modalMainImage.src = product.sync_product.thumbnail_url;
        let modalContent = `
                            <h2>${product.sync_product.name}</h2>
                            <div class="variant-gallery">
                        `;
        // Add variants to modal
        product.sync_variants.forEach((variant) => {
          modalContent += `
                                ${variant.files
                                  .map((file) =>
                                    file.preview_url
                                      ? `<img src="${file.preview_url}" alt="${variant.name}" data-main-image="${file.preview_url}">`
                                      : ""
                                  )
                                  .join("")}
                            `;
        });
        modalContent += `</div><div class="variant-info">`;
        // Add variant info
        product.sync_variants.forEach((variant) => {
          modalContent += `
                                <div>
                                    <strong>Price:</strong> $${variant.retail_price} <br>
                                    <strong>Color:</strong> ${variant.color} <br>
                                    <strong>Size:</strong> ${variant.size}
                                </div>
                            `;
        });
        modalContent += `</div>`;
        modalBody.innerHTML = modalContent;
        // Add click event to variant images
        document.querySelectorAll(".variant-gallery img").forEach((img) => {
          img.addEventListener("click", (event) => {
            const mainImageUrl = event.target.getAttribute("data-main-image");
            modalMainImage.src = mainImageUrl;
            document
              .querySelectorAll(".variant-gallery img")
              .forEach((el) => el.classList.remove("active"));
            event.target.classList.add("active");
          });
        });
        modal.style.display = "flex";
      });
      container.appendChild(productDiv);
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
