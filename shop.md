---
layout: default
title: Shop
permalink: /shop/
---

# Shop Randomerr

Randomerr is a space for creative exploration. We share ideas, thoughts, and everything in between.


<!-- Product List -->
<script src="{{ site.baseurl }}/assets/js/shop.js"></script>
<div id="product-list" class="product-list"></div>

<!-- Product Details Modal -->
<div id="product-details-modal" class="product-details-modal">
  <div class="modal-content">
    <span id="modal-close" class="close">&times;</span>
    <div class="modal-header">
      <img id="modal-main-image" alt="Product Image" />
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



<script src="{{ site.baseurl }}/assets/js/cart.js"></script>
<!-- Cart Icon -->
<div id="cart-icon" class="cart-icon" style="display: none;">
  🛒
</div><!-- Add this inside your cart-icon element in the HTML -->
<div id="cart-badge" class="cart-badge"></div>

<!-- Cart Container -->
<div id="cart" class="cart-container" style="display: none;">
  <h2>Your Cart</h2>
  <div id="cart-items">
    <!-- Cart items will be dynamically populated here -->
  </div>
  <div id="cart-summary" class="cart-summary">
    <div id="cart-total">Total: $0.00</div>
    <div id="cart-actions">
      <button id="checkout-button" class="checkout-button">Checkout</button>
    </div>
  </div>
</div>
