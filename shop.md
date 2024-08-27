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
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
</body>
</html>
