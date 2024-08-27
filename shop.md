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


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Display</title>
</head>
<body>
    <div id="product-container">
        <p>Loading products...</p>
    </div>

    <script>
        // Simulate fetching JSON data from an API
        const jsonData = {
            "code": 200,
            "result": [
                {
                    "id": 357884220,
                    "external_id": "66cd708d4cbca6",
                    "name": "MY CUP OF EARTH Waffle beanie",
                    "variants": 7,
                    "synced": 7,
                    "thumbnail_url": "https://files.cdn.printful.com/files/7d1/7d12ce5171e51de891654fa3cd6e611a_preview.png",
                    "is_ignored": false
                },
                {
                    "id": 357347527,
                    "external_id": "66c6c661d5af47",
                    "name": "Cork-back coaster",
                    "variants": 1,
                    "synced": 1,
                    "thumbnail_url": "https://files.cdn.printful.com/files/968/9681c7ae821e4c1b1e7bd8a030b80186_preview.png",
                    "is_ignored": false
                }
            ],
            "extra": []
        };

        function displayProducts(data) {
            const container = document.getElementById('product-container');
            container.innerHTML = '';  // Clear loading message

            if (data.result && data.result.length > 0) {
                data.result.forEach(product => {
                    const productElement = document.createElement('div');
                    productElement.innerHTML = `
                        <h2>${product.name}</h2>
                        <img src="${product.thumbnail_url}" alt="${product.name}">
                        <p>Variants: ${product.variants}</p>
                        <p>Synced: ${product.synced}</p>
                    `;
                    container.appendChild(productElement);
                });
            } else {
                container.innerHTML = '<p>No products found.</p>';
            }
        }

        function handleError() {
            const container = document.getElementById('product-container');
            container.innerHTML = '<p>Sorry, we are unable to load products at the moment.</p>';
        }

        // Simulating a function to fetch and display products
        function fetchProducts() {
            // Simulate success response
            if (jsonData.code === 200) {
                displayProducts(jsonData);
            } else {
                handleError();
            }
        }

        // Call the function to load products
        fetchProducts();
    </script>
</body>
</html>

