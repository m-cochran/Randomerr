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
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        if (data.result && data.result.sync_variants && Array.isArray(data.result.sync_variants) && data.result.sync_variants.length > 0) {
          productsContainer.innerHTML = ''; // Clear the loading text
          data.result.sync_variants.forEach(variant => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            // Use the product image from sync_variants
            const productImage = document.createElement('img');
            productImage.src = variant.product.image || 'default-image.png';
            productImage.alt = variant.product.name || 'Product Image';
            productDiv.appendChild(productImage);
            const productTitle = document.createElement('div');
            productTitle.className = 'product-title';
            productTitle.textContent = variant.product.name || 'Product Title';
            productDiv.appendChild(productTitle);
            // Use description from sync_product, if available
            const productDescription = document.createElement('div');
            productDescription.className = 'product-description';
            productDescription.textContent = 'Description not available'; // JSON does not provide a description in the given structure
            productDiv.appendChild(productDescription);
            const productPrice = document.createElement('div');
            productPrice.className = 'product-price';
            productPrice.textContent = `$${variant.retail_price || 'N/A'}`;
            productDiv.appendChild(productPrice);
            productsContainer.appendChild(productDiv);
          });
        } else {
          productsContainer.innerHTML = 'No products found.';
        }
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        productsContainer.innerHTML = 'Sorry, we are unable to load products at the moment.';
      });
  });
</script>


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Product Listings</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }

    #products-container {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      padding: 20px;
      justify-content: center;
    }

    .product {
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      width: 300px;
      text-align: center;
      padding: 10px;
    }

    .product img {
      max-width: 100%;
      height: auto;
      border-bottom: 1px solid #ddd;
    }

    .product-title {
      font-size: 1.2em;
      margin: 10px 0;
      font-weight: bold;
    }

    .product-description {
      font-size: 0.9em;
      color: #555;
      margin-bottom: 10px;
    }

    .product-price {
      font-size: 1.1em;
      color: #333;
    }
  </style>
</head>

<body>
  <div id="products-container">Loading products...</div>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const productsContainer = document.getElementById('products-container');
      fetch('https://m-cochran.github.io/Randomerr/products.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then(data => {
          if (data.result && data.result.sync_variants && Array.isArray(data.result.sync_variants) && data.result.sync_variants.length > 0) {
            productsContainer.innerHTML = ''; // Clear the loading text
            data.result.sync_variants.forEach(variant => {
              const productDiv = document.createElement('div');
              productDiv.className = 'product';
              // Use the product image from sync_variants
              const productImage = document.createElement('img');
              productImage.src = variant.product.image || 'default-image.png';
              productImage.alt = variant.product.name || 'Product Image';
              productDiv.appendChild(productImage);
              const productTitle = document.createElement('div');
              productTitle.className = 'product-title';
              productTitle.textContent = variant.product.name || 'Product Title';
              productDiv.appendChild(productTitle);
              // Use description from sync_product, if available
              const productDescription = document.createElement('div');
              productDescription.className = 'product-description';
              productDescription.textContent = 'Description not available'; // JSON does not provide a description in the given structure
              productDiv.appendChild(productDescription);
              const productPrice = document.createElement('div');
              productPrice.className = 'product-price';
              productPrice.textContent = `$${variant.retail_price || 'N/A'}`;
              productDiv.appendChild(productPrice);
              productsContainer.appendChild(productDiv);
            });
          } else {
            productsContainer.innerHTML = 'No products found.';
          }
        })
        .catch(error => {
          console.error('Error fetching products:', error);
          productsContainer.innerHTML = 'Sorry, we are unable to load products at the moment.';
        });
    });
  </script>
</body>

</html>
