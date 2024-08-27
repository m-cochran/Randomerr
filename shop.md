---
layout: default
title: Shop
permalink: /shop/
---

# Shop Randomerr

Randomerr is a space for creative exploration. We share ideas, thoughts, and everything in between.


<div id="product-container"></div>

<script>
  // Function to fetch and display product data
  async function fetchProducts() {
    try {
      const response = await fetch('https://m-cochran.github.io/Randomerr/products.json'); // Adjust the path as necessary
      // Check if the response is OK
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const data = await response.json();
      // Debugging: Log the fetched data
      console.log('Fetched data:', data);
      // Ensure data.result is defined and is an array
      if (Array.isArray(data.result)) {
        const container = document.getElementById('product-container');
        container.innerHTML = '';
        data.result.forEach(product => {
          const productDiv = document.createElement('div');
          productDiv.classList.add('product');
          productDiv.innerHTML = `
                            <h2>${product.sync_product.name}</h2>
                            <img src="${product.sync_product.thumbnail_url}" alt="${product.sync_product.name}">
                            <div>Variants:</div>
                        `;
          product.sync_variants.forEach(variant => {
            const variantDiv = document.createElement('div');
            variantDiv.classList.add('variant');
            variantDiv.innerHTML = `
                                <h3>${variant.name}</h3>
                                <img src="${variant.product.image}" alt="${variant.name}">
                                <p>Price: ${variant.retail_price} ${variant.currency}</p>
                                <p>Size: ${variant.size}</p>
                                <p>Color: ${variant.color || 'N/A'}</p>
                                <p>Status: ${variant.availability_status}</p>
                            `;
            productDiv.appendChild(variantDiv);
          });
          container.appendChild(productDiv);
        });
      } else {
        throw new Error('Result is not an array or is undefined');
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  }
  // Fetch and display products when the page loads
  window.onload = fetchProducts;
</script>
