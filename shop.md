---
layout: default
title: Shop
permalink: /shop/
---

# Shop Randomerr

Randomerr is a space for creative exploration. We share ideas, thoughts, and everything in between.

<div id="products-container"></div>

<script>
    // Fetch the products from products.json
    fetch('products.json')
        .then(response => response.json())
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
                    priceDiv.textContent = `$${product.price}`; // Use 'price' from your JSON data
                    productDiv.appendChild(priceDiv);

                    // Append the product div to the products container
                    productsContainer.appendChild(productDiv);
                });
            } else {
                console.error('No products found in the response.');
            }
        })
        .catch(error => console.error('Error loading products:', error));
</script>

<style>
    #products-container {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        padding: 16px;
    }
    .product {
        border: 1px solid #ddd;
        padding: 16px;
        border-radius: 8px;
        width: 250px;
        text-align: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        background-color: #fff;
    }
    .product img {
        max-width: 100%;
        height: auto;
        border-bottom: 1px solid #ddd;
        margin-bottom: 8px;
    }
    .product-title {
        font-weight: bold;
        margin-bottom: 8px;
    }
    .product-description {
        font-size: 14px;
        margin-bottom: 8px;
        color: #555;
    }
    .product-price {
        color: #333;
        font-size: 16px;
        font-weight: bold;
    }
</style>
