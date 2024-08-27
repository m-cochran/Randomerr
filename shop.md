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
        // Fetch the JSON data
        fetch('printful_products_details.json')
            .then(response => response.json())
            .then(data => {
                const productsContainer = document.getElementById('products');

                // Loop through each product and add to the HTML
                data.forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.classList.add('product');

                    // Extract product information
                    const thumbnail = product.result.thumbnail_url;
                    const name = product.result.name;
                    const variants = product.result.variants;

                    // Create HTML structure for product
                    productElement.innerHTML = `
                        <img src="${thumbnail}" alt="${name}">
                        <div class="product-details">
                            <h2>${name}</h2>
                            ${variants.map(variant => `
                                <p>Variant ID: ${variant.id}</p>
                                <p>Retail Price: <span class="price">$${variant.retail_pricing}</span></p>
                            `).join('')}
                        </div>
                    `;

                    // Append the product element to the container
                    productsContainer.appendChild(productElement);
                });
            })
            .catch(error => console.error('Error fetching product data:', error));
    </script>
