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
        if (data.result && Array.isArray(data.result)) {
          data.result.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            const productImage = document.createElement('img');
            productImage.src = product.thumbnail_url || 'default-image.png'; // Default image if none provided
            productImage.alt = product.name || 'Product Image';
            productDiv.appendChild(productImage);
            const productTitle = document.createElement('div');
            productTitle.className = 'product-title';
            productTitle.textContent = product.name || 'Product Title';
            productDiv.appendChild(productTitle);
            const productDescription = document.createElement('div');
            productDescription.className = 'product-description';
            productDescription.textContent = (product.description || '').substring(0, 150) + '...';
            productDiv.appendChild(productDescription);
            const productPrice = document.createElement('div');
            productPrice.className = 'product-price';
            productPrice.textContent = `$${product.retail_pricing || 'N/A'}`;
            productDiv.appendChild(productPrice);
            productsContainer.appendChild(productDiv);
          });
        } else {
          productsContainer.textContent = 'No products found.';
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        productsContainer.textContent = 'Sorry, we are unable to load products at the moment.';
      });
  });
</script>
