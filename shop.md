---
layout: default
title: Shop
permalink: /shop/
---

# Shop Randomerr

Randomerr is a space for creative exploration. We share ideas, thoughts, and everything in between.

<div id="cart-container">
  <h2>Your Cart</h2>
  <ul id="cart-items"></ul>
  <div id="cart-total"></div>
  <button id="checkout-button">Checkout</button>
</div>

<div id="product-list" class="product-list"></div>

<!-- Product Details Modal -->
<div id="product-details-modal" class="product-details-modal">
  <div class="modal-content">
    <span id="modal-close" class="close">&times;</span>

    <div class="modal-header">
      <img id="modal-main-image" alt="Product Image">
    </div>

    <div id="modal-title-info">
      <div id="modal-title">MY CUP OF EARTH Waffle Beanie</div>
      <div id="modal-sku">SKU: N/A</div>
      <div id="modal-color">Color: N/A</div>
      <div id="modal-price">Price: $N/A</div>
      <div id="modal-availability" class="out-of-stock">Availability: Out of Stock</div>
      <div id="modal-description">Description: No description available</div>
    </div>

    <div id="modal-body"></div>
  </div>
</div>
