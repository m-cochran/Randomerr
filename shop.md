---
layout: default
title: Shop
permalink: /shop/
---

# Shop Randomerr

Randomerr is a space for creative exploration. We share ideas, thoughts, and everything in between.


<div class="container" id="product-container">
  <h1>Product List</h1>
</div>

<script>
  // Fetch the JSON data
  fetch('https://m-cochran.github.io/Randomerr/products.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('product-container');
      data.forEach(product => {
        // Create product container
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        // Add product title
        const title = document.createElement('h2');
        title.className = 'product-title';
        title.textContent = product.sync_product.name;
        productDiv.appendChild(title);
        // Add product thumbnail
        const thumbnail = document.createElement('img');
        thumbnail.src = product.sync_product.thumbnail_url;
        thumbnail.alt = product.sync_product.name;
        productDiv.appendChild(thumbnail);
        // Add variants
        product.sync_variants.forEach(variant => {
          const variantDiv = document.createElement('div');
          variantDiv.className = 'variant';
          // Variant title
          const variantTitle = document.createElement('h3');
          variantTitle.textContent = variant.name;
          variantDiv.appendChild(variantTitle);
          // Variant preview images
          variant.files.forEach(file => {
            if (file.preview_url) {
              const img = document.createElement('img');
              img.src = file.preview_url;
              img.alt = variant.name;
              variantDiv.appendChild(img);
            }
          });
          productDiv.appendChild(variantDiv);
        });
        container.appendChild(productDiv);
      });
    })
    .catch(error => {
      console.error('Error fetching product data:', error);
    });
</script>
