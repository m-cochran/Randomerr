---
layout: default
title: Shop
permalink: /shop/
---

# Shop Randomerr

Randomerr is a space for creative exploration. We share ideas, thoughts, and everything in between.

<div id="products-container"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('products-container');

    fetch('https://m-cochran.github.io/Randomerr/products.json')
        .then(response => response.json())
        .then(data => {
            data.result.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';

                const productImage = document.createElement('img');
                productImage.src = product.image;
                productImage.alt = product.title;
                productDiv.appendChild(productImage);

                const productTitle = document.createElement('div');
                productTitle.className = 'product-title';
                productTitle.textContent = product.title;
                productDiv.appendChild(productTitle);

                const productDescription = document.createElement('div');
                productDescription.className = 'product-description';
                productDescription.textContent = product.description.substring(0, 150) + '...';
                productDiv.appendChild(productDescription);

                const productPrice = document.createElement('div');
                productPrice.className = 'product-price';
                productPrice.textContent = `$${product.price}`;
                productDiv.appendChild(productPrice);

                productsContainer.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            productsContainer.textContent = 'Sorry, we are unable to load products at the moment.';
        });
});
</script>



<script>
document.addEventListener('DOMContentLoaded', function() {
    const productsContainer = document.getElementById('products-container');

    fetch('https://m-cochran.github.io/Randomerr/products.json')
        .then(response => response.json())
        .then(data => {
            // Check if the JSON structure matches what you're expecting
            if (Array.isArray(data)) {
                data.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.className = 'product';

                    // Accessing the product image (make sure this key exists in your JSON)
                    const productImage = document.createElement('img');
                    productImage.src = product.thumbnail_url; // Change to actual property name in your JSON
                    productImage.alt = product.name; // Change to actual property name in your JSON
                    productDiv.appendChild(productImage);

                    // Accessing the product title
                    const productTitle = document.createElement('div');
                    productTitle.className = 'product-title';
                    productTitle.textContent = product.name; // Change to actual property name in your JSON
                    productDiv.appendChild(productTitle);

                    // Accessing the product description (if available)
                    const productDescription = document.createElement('div');
                    productDescription.className = 'product-description';
                    productDescription.textContent = 'Description unavailable.'; // Default text in case description is missing
                    if (product.description) {
                        productDescription.textContent = product.description.substring(0, 150) + '...'; // Change to actual property name in your JSON
                    }
                    productDiv.appendChild(productDescription);

                    // Accessing the product price (if available)
                    const productPrice = document.createElement('div');
                    productPrice.className = 'product-price';
                    productPrice.textContent = 'Price unavailable.'; // Default text in case price is missing
                    if (product.variants && product.variants[0] && product.variants[0].price) {
                        productPrice.textContent = `$${product.variants[0].price}`; // Change to actual property name in your JSON
                    }
                    productDiv.appendChild(productPrice);

                    productsContainer.appendChild(productDiv);
                });
            } else {
                console.error('Unexpected JSON structure:', data);
                productsContainer.textContent = 'Sorry, we are unable to load products at the moment.';
            }
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            productsContainer.textContent = 'Sorry, we are unable to load products at the moment.';
        });
});
</script>
