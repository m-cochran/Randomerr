document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slide-track");

  slider.addEventListener("mouseover", function () {
    slider.style.animationPlayState = "paused";
  });

  slider.addEventListener("mouseout", function () {
    slider.style.animationPlayState = "running";
  });
});


fetch('products.json')
    .then(response => response.json())
    .then(data => {
        // Display the product data on your site
        console.log(data);
    })
    .catch(error => console.error('Error:', error));



document.addEventListener('DOMContentLoaded', () => {
    // Fetch the products from assets/data/products.json
    fetch('/assets/data/products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const productsContainer = document.getElementById('products-container');

            // Check if the result array exists
            if (data.result && Array.isArray(data.result)) {
                data.result.forEach(product => {
                    // Create a div element for each product
                    const productDiv = document.createElement('div');
                    productDiv.className = 'product';

                    // Create an img element for the product image
                    const img = document.createElement('img');
                    img.src = product.image; // Use 'image' from your JSON data
                    img.alt = product.title; // Use 'title' from your JSON data
                    productDiv.appendChild(img);

                    // Create a div element for the product title
                    const titleDiv = document.createElement('div');
                    titleDiv.className = 'product-title';
                    titleDiv.textContent = product.title; // Use 'title' from your JSON data
                    productDiv.appendChild(titleDiv);

                    // Create a div element for the product description
                    const descriptionDiv = document.createElement('div');
                    descriptionDiv.className = 'product-description';
                    descriptionDiv.textContent = product.description; // Use 'description' from your JSON data
                    productDiv.appendChild(descriptionDiv);

                    // Create a div element for the product price
                    const priceDiv = document.createElement('div');
                    priceDiv.className = 'product-price';
                    priceDiv.textContent = `$${product.price || 'N/A'}`; // Use 'price' from your JSON data
                    productDiv.appendChild(priceDiv);

                    // Append the product div to the products container
                    productsContainer.appendChild(productDiv);
                });
            } else {
                console.error('No products found in the response.');
                productsContainer.textContent = 'No products available at the moment.';
            }
        })
        .catch(error => {
            console.error('Error loading products:', error);
            const productsContainer = document.getElementById('products-container');
            productsContainer.textContent = 'Failed to load products. Please try again later.';
        });
});
