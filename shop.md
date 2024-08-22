---
layout: default
title: Shop
permalink: /shop/
---

# Shop Randomerr

Randomerr is a space for creative exploration. We share ideas, thoughts, and everything in between.

<div id="products-container"></div>

<div id="products-container"></div>

<script>
    // Fetch the products from products.json
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            const productsContainer = document.getElementById('products-container');
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
                priceDiv.textContent = `$${product.price}`; // Use 'price' from your JSON data
                productDiv.appendChild(priceDiv);

                // Append the product div to the products container
                productsContainer.appendChild(productDiv);
            });
        })
        .catch(error => console.error('Error loading products:', error));
</script>
