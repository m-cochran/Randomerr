---
layout: default
title: Affiliate Dashboard
permalink: /products/
---

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Printful Product Info</title>
</head>
<body>
  <h1>Printful Product Viewer</h1>
  <input type="text" id="productIdInput" placeholder="Enter Product ID (e.g., 403)" />
  <button onclick="fetchProduct()">Get Product</button>

  <pre id="output" style="background:#f0f0f0;padding:1em;margin-top:1em;"></pre>

<script>
fetch('http://localhost:3000/product/403,19,678,474,585,382,637')
  .then(res => res.json())
  .then(data => {
    console.log('Product Data:', data);
  })
  .catch(err => {
    console.error('Error:', err);
  });















</script>

</body>
</html>
