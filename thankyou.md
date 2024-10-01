---
layout: default
title: Thank You
permalink: /thank-you/
---

<div class="container">
  <h1>Thank You for Your Purchase!</h1>

  <h2>Your Purchased Items:</h2>
  <div id="purchased-items">
    <!-- Items will be dynamically populated here -->
  </div>

  <p>We hope you enjoy your purchase. If you have any questions, feel free to <a href="/contact/">contact us</a>.</p>
</div>

<style>
  /* General Styles for the Thank You Page */
  
  .purchased-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }



  #purchased-items {
    margin: 0;
    padding: 0;
  }

  .purchased-item {
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #ddd;
    background-color: #f9f9f9;
    border-radius: 8px;
    margin-bottom: 15px;
  }

  .purchased-item:last-child {
    border-bottom: none;
  }

  .item-image {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .item-details {
    flex: 1;
  }

  .item-details strong {
    font-size: 1.2em;
    color: #34495e;
  }

  .item-details p {
    margin: 5px 0;
    font-size: 1em;
    color: #555;
  }

  #receipt-link a {
    color: #2980b9;
    text-decoration: none;
    font-weight: bold;
  }

  #receipt-link a:hover {
    text-decoration: underline;
  }


  a:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    .container {
      padding: 15px;
    }

    .purchased-item {
      flex-direction: column;
      align-items: flex-start;
    }

    .item-image {
      margin-bottom: 10px;
      width: 100%;
      max-width: 150px;
    }
  }
</style>

<script>
  // Retrieve purchased items and receipt URL from localStorage
  var purchasedItems = JSON.parse(localStorage.getItem('purchasedItems'));

  // Reference to the HTML containers
  var purchasedItemsContainer = document.getElementById('purchased-items');

  // Display purchased items
  if (purchasedItems && purchasedItems.length > 0) {
    purchasedItems.forEach(function(item) {
      var itemElement = document.createElement('div');
      itemElement.className = 'purchased-item';

      var itemImage = document.createElement('img');
      itemImage.src = item.image;
      itemImage.alt = item.name;
      itemImage.className = 'item-image';

      var itemDetails = document.createElement('div');
      itemDetails.className = 'item-details';
      itemDetails.innerHTML = `<strong>${item.name}</strong><br>
                               Price: $${item.price}<br>
                               Quantity: ${item.quantity}`;

      itemElement.appendChild(itemImage);
      itemElement.appendChild(itemDetails);
      purchasedItemsContainer.appendChild(itemElement);
    });
  } else {
    purchasedItemsContainer.textContent = 'No items found.';
  }


  // Clear localStorage after displaying
  localStorage.removeItem('purchasedItems');
  localStorage.removeItem('receiptUrl');
</script>



<h2>While You’re Here...</h2>
<p>Check out these exclusive deals just for you:</p>

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








<!-- Slider -->
<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/slider.css">
<script src="{{ site.baseurl }}/assets/js/slider.js"></script>

<div class="slider">
  <div class="slide-track">
    <div class="slide">
      <span>
        <a href="https://www.anrdoezrs.net/click-100820740-11428765" target="_blank" title="Buy China Wholesale Products Online Shopping From China Suppliers.">
          <img src="https://i.postimg.cc/k50nwS8q/Dh-Gate-Logo.png" height="100" width="250" alt="">
        </a>
      </span>
    </div>
    <div class="slide">
      <span>
        <a href="https://www.dpbolvw.net/click-100820740-13125549" target="_blank" title="Dell Outlet Coupon Codes: Refurbished Computer PCs | Dell USA">
          <img src="https://i.postimg.cc/sfq6HQZ4/dell-outlet.png" height="100" width="250" alt="">
        </a>
      </span>
    </div>
    <div class="slide">
      <span>
        <a href="https://www.anrdoezrs.net/click-100820740-10495782" target="_blank" title="Video game rental service">
          <img src="https://i.postimg.cc/J4B4Hm29/gamefly-logo.png" height="100" width="250" alt="">
        </a>
      </span>
    </div>
    <div class="slide">
      <span>
        <a href="https://www.jdoqocy.com/click-100820740-15494946" target="_blank" title="NordVPN: The best online VPN service for speed and security">
          <img src="https://i.postimg.cc/0jX8zYhs/nord-vpn-logo.png" height="100" width="250" alt="">
        </a>
      </span>
    </div>
    <div class="slide">
      <span>
        <a href="https://www.tkqlhce.com/click-100820740-14516475" target="_blank" title="Shop Girls &amp; Tweens Clothing // Girls Fashion // Justice™">
          <img src="https://i.postimg.cc/157j0V5S/justice.png" height="100" width="250" alt="">
        </a>
      </span>
    </div>
    <div class="slide">
      <span>
        <a href="https://www.dpbolvw.net/click-100820740-15084154" target="_blank" title="Buy a domain name - Register cheap domain names from $0.99 - Namecheap - namecheap.com">
          <img src="https://i.postimg.cc/gjNfJM9z/namecheap-logo.png" height="100" width="250" alt="">
        </a>
      </span>
    </div>
    <div class="slide">
      <span>
        <a href="https://www.kqzyfj.com/click-100820740-12731974" target="_blank" title="Cheap Flights, Airline tickets and Hotels - JustFly">
          <img src="https://i.postimg.cc/4NhWb4MG/justfly-com-logo.png" height="100" width="250" alt="">
        </a>
      </span>
    </div>
    <div class="slide">
      <span>
        <a href="https://www.kqzyfj.com/click-100820740-13171327" target="_blank" title="The Sightseeing Pass | City &amp; Leisure Passes | Sightseeing Pass Company">
          <img src="https://i.postimg.cc/2SHx1Z2p/sightseeing-logo.png" height="100" width="250" alt="">
        </a>
      </span>
    </div>
    <div class="slide">
      <span>
        <a href="https://www.kqzyfj.com/click-100820740-14310597" target="_blank" title="Snapfish | Personalized Gifts, Cards, Home Decor, Photo Books &amp; More">
          <img src="https://i.postimg.cc/sX0FKxVb/snap-fish.png" height="100" width="250" alt="">
        </a>
      </span>
    </div>
    <div class="slide">
      <span>
        <a href="https://www.tkqlhce.com/click-100820740-11779777" target="_blank" title="Quick &amp; Confidential STD Testing - STDcheck.com!">
          <img src="https://i.postimg.cc/DZR9cWcm/std-check.png" height="100" width="250" alt="">
        </a>
      </span>
    </div>
    <div class="slide">
      <span>
        <a href="https://bulletproof.fdf2.net/c/3085755/1138919/9221" target="_blank" title="Bulletproof Coffee: The Original Keto Coffee with Butter &amp; MCT Oil">
          <img src="https://i.postimg.cc/vmwCWXY5/bulletproof-logo.png" height="100" width="250" alt="">
        </a>
      </span>
    </div>
    <div class="slide">
      <span>
        <a href="https://www.anrdoezrs.net/click-100820740-11428765" target="_blank" title="Buy China Wholesale Products Online Shopping From China Suppliers.">
          <img src="https://i.postimg.cc/k50nwS8q/Dh-Gate-Logo.png" height="100" width="250" alt="">
        </a>
      </span>
    </div>
    <div class="slide">
      <span>
        <a href="https://www.dpbolvw.net/click-100820740-13125549" target="_blank" title="Dell Outlet Coupon Codes: Refurbished Computer PCs | Dell USA">
          <img src="https://i.postimg.cc/sfq6HQZ4/dell-outlet.png" height="100" width="250" alt="">
        </a>
      </span>
    </div>
    <div class="slide">
      <span>
        <a href="https://www.anrdoezrs.net/click-100820740-10495782" target="_blank" title="Video game rental service">
          <img src="https://i.postimg.cc/J4B4Hm29/gamefly-logo.png" height="100" width="250" alt="">
        </a>
      </span>
    </div>
    <div class="slide">
      <span>
        <a href="https://www.jdoqocy.com/click-100820740-15494946" target="_blank" title="NordVPN: The best online VPN service for speed and security">
          <img src="https://i.postimg.cc/0jX8zYhs/nord-vpn-logo.png" height="100" width="250" alt="">
        </a>
      </span>
    </div>
    <div class="slide">
      <span>
        <a href="https://www.tkqlhce.com/click-100820740-14516475" target="_blank" title="Shop Girls &amp; Tweens Clothing // Girls Fashion // Justice™">
          <img src="https://i.postimg.cc/157j0V5S/justice.png" height="100" width="250" alt="">
        </a>
      </span>
    </div>
    <div class="slide">
      <span>
        <a href="https://www.dpbolvw.net/click-100820740-15084154" target="_blank" title="Buy a domain name - Register cheap domain names from $0.99 - Namecheap - namecheap.com">
          <img src="https://i.postimg.cc/gjNfJM9z/namecheap-logo.png" height="100" width="250" alt="">
        </a>
      </span>
    </div>
    <div class="slide">
      <span>
        <a href="https://www.kqzyfj.com/click-100820740-12731974" target="_blank" title="Cheap Flights, Airline tickets and Hotels - JustFly">
          <img src="https://i.postimg.cc/4NhWb4MG/justfly-com-logo.png" height="100" width="250" alt="">
        </a>
      </span>
    </div>
    <div class="slide">
      <span>
        <a href="https://www.kqzyfj.com/click-100820740-13171327" target="_blank" title="The Sightseeing Pass | City &amp; Leisure Passes | Sightseeing Pass Company">
          <img src="https://i.postimg.cc/2SHx1Z2p/sightseeing-logo.png" height="100" width="250" alt="">
        </a>
      </span>
    </div>
    <div class="slide">
      <span>
        <a href="https://www.kqzyfj.com/click-100820740-14310597" target="_blank" title="Snapfish | Personalized Gifts, Cards, Home Decor, Photo Books &amp; More">
          <img src="https://i.postimg.cc/sX0FKxVb/snap-fish.png" height="100" width="250" alt="">
        </a>
      </span>
    </div>
    <div class="slide">
      <span>
        <a href="https://www.tkqlhce.com/click-100820740-11779777" target="_blank" title="Quick &amp; Confidential STD Testing - STDcheck.com!">
          <img src="https://i.postimg.cc/DZR9cWcm/std-check.png" height="100" width="250" alt="">
        </a>
      </span>
    </div>
    <div class="slide">
      <span>
        <a href="https://bulletproof.fdf2.net/c/3085755/1138919/9221" target="_blank" title="Bulletproof Coffee: The Original Keto Coffee with Butter &amp; MCT Oil">
          <img src="https://i.postimg.cc/vmwCWXY5/bulletproof-logo.png" height="100" width="250" alt="">
        </a>
      </span>
    </div>
  </div>
</div>
