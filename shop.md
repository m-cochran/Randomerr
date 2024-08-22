---
layout: default
title: Shop
permalink: /shop/
---

# Shop Randomerr

Randomerr is a space for creative exploration. We share ideas, thoughts, and everything in between.



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

<div id="products-container"></div>
