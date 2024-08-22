---
layout: default
title: Shop
permalink: /shop/
---

# Shop Randomerr

Randomerr is a space for creative exploration. We share ideas, thoughts, and everything in between.

<div id="product-container"></div>

<script>
// Fetch the product data from the JSON file
fetch('/products.json')
    .then(response => response.json())
    .then(data => {
        // Access the product data from the JSON result
        const product = data.result[0];

        // Create a container to display the product
        const productContainer = document.getElementById('product-container');

        // Build the HTML structure for the product
        const productHTML = `
            <div class="product">
                <img src="${product.image}" alt="${product.title}" style="max-width: 300px; height: auto; margin-bottom: 15px;">
                <h2>${product.title}</h2>
                <p>${product.description}</p>
                <p><strong>Brand:</strong> ${product.brand}</p>
                <p><strong>Origin:</strong> ${product.origin_country}</p>
                <p class="price" style="font-size: 20px; color: #333; margin-top: 10px;">$${product.price} ${product.currency}</p>
            </div>
        `;

        // Insert the product HTML into the container
        productContainer.innerHTML = productHTML;
    })
    .catch(error => {
        console.error('Error fetching the product data:', error);
    });
</script>
