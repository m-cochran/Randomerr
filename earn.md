---
layout: default
title: Earn
permalink: /earn/
---

# Earn with Us

<link rel="stylesheet" href="{{ site.baseurl }}/assets/css/earn-page.css">

<main>

  <div class="affiliate-container">
    <h2>Become an Affiliate</h2>
    <p class="affiliate-description">Join our affiliate program and start earning today! Promote our products and earn a commission for every sale made through your referral link.</p>

    <h3>How It Works</h3>
    <ul class="affiliate-steps">
      <li><strong>Step 1:</strong> Sign up for our affiliate program.</li>
      <li><strong>Step 2:</strong> Share your unique referral link with your audience.</li>
      <li><strong>Step 3:</strong> Earn a commission for every sale made through your link.</li>
    </ul>

    <h3>Why Join?</h3>
    <ul class="affiliate-benefits">
      <li>Generous commission rates.</li>
      <li>Access to exclusive marketing resources.</li>
      <li>Easy-to-use affiliate dashboard to track your earnings.</li>
    </ul>

    <a href="javascript:void(0)" class="affiliate-signup-btn" id="signupBtn">Join Now</a>

<!-- The Popup -->
<div id="signupPopup" class="popup-overlay">
    <div class="popup-content">
        <span class="close-btn" id="closeBtn">&times;</span>
        <form id="affiliate-signup">
            <input type="text" id="name" name="name" placeholder="Name" required>
            <input type="email" id="email" name="email" placeholder="Email" required>
            <button type="submit">Sign Up</button>
        </form>
    </div>
</div>


  <div class="faq-section">
    <h3>Frequently Asked Questions</h3>
    <details>
      <summary>How do I sign up?</summary>
      <p>Click on the "Join Now" button above and fill out the registration form to get started.</p>
    </details>
    <details>
      <summary>What is the commission rate?</summary>
      <p>Our commission rates vary based on the product category. You can earn up to 20% commission on certain products.</p>
    </details>
    <details>
      <summary>When will I get paid?</summary>
      <p>Payments are made monthly through PayPal or bank transfer, depending on your preference.</p>
    </details>
  </div>

  <style>
    .affiliate-container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 10px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .affiliate-container h2, .faq-section h3 {
      font-family: 'Arial', sans-serif;
      font-size: 2rem;
      color: #333;
      text-align: center;
    }

    .affiliate-description {
      text-align: center;
      font-size: 1.2rem;
      color: #666;
      margin-bottom: 20px;
    }

    .affiliate-steps, .affiliate-benefits {
      margin: 20px 0;
      padding-left: 20px;
      list-style-type: disc;
    }

    .affiliate-signup-btn {
      display: block;
      margin: 20px auto;
      padding: 10px 20px;
      background-color: #06f;
      color: #fff;
      text-align: center;
      text-decoration: none;
      border-radius: 5px;
      font-size: 1.2rem;
    }

    .affiliate-signup-btn:hover {
      background-color: #07f;
    }

    .faq-section details {
      margin: 10px 0;
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 10px;
      background-color: #fff;
    }

    .faq-section details summary {
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
    }

    .faq-section details p {
      margin-top: 5px;
      font-size: 0.9rem;
    }

    /* Basic styling for the popup overlay and content */
.popup-overlay {
    display: none;  /* Hidden by default */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);  /* Semi-transparent background */
    z-index: 1000;  /* Ensures the popup appears on top */
}

.popup-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 300px;
    text-align: center;
}

.popup-content input,
.popup-content button {
    width: 100%;
    margin: 10px 0;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.popup-content button {
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
}

.popup-content button:hover {
    background-color: #45a049;
}

/* Close button styling */
.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 30px;
    cursor: pointer;
}

  </style>

</main>
<script>
  // Get the elements
const signupBtn = document.getElementById('signupBtn');
const signupPopup = document.getElementById('signupPopup');
const closeBtn = document.getElementById('closeBtn');

// Show the popup when the "Join Now" link is clicked
signupBtn.onclick = function() {
    signupPopup.style.display = 'block';
}

// Close the popup when the "X" button is clicked
closeBtn.onclick = function() {
    signupPopup.style.display = 'none';
}

// Close the popup if the user clicks outside of the popup content
window.onclick = function(event) {
    if (event.target === signupPopup) {
        signupPopup.style.display = 'none';
    }
}

</script>
