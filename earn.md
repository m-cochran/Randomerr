---
layout: default
title: Earn
permalink: /earn/
---

# Earn with Us



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

 

<!-- The Popup -->
<button id="generateAffiliateButton">Generate Affiliate Code</button>
<div id="affiliateMessage" style="display: none; color: green; margin-top: 1em;"></div>


<h2>Affiliate Dashboard</h2>


<p class="affiliate-description">Are you already part of our affiliate program? Visit your dashboard to track clicks, sales, and earnings from your referral link.</p>

<button onclick="window.location.href='http://localhost:4000/affiliate/'" style="margin: 20px auto;
    padding: 10px 20px; display: block; background-color: #0066ff; color: white; border: none; border-radius: 8px; cursor: pointer;     border-radius: 8px; border: none; font-size: 16px;">
  Go to Affiliate Dashboard
</button>


  <div class="faq-section">
    <h3>Frequently Asked Questions</h3>
    <details>
      <summary>How do I sign up?</summary>
      <p>Click on the "Join Now" button above and fill out the registration form to get started.</p>
    </details>
    <details>
      <summary>What is the commission rate?</summary>
      <p>Our commission rates vary based on the product category. You can earn up to 0% commission on certain products.</p>
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

    #generateAffiliateButton {
      display: block;
      margin: 20px auto;
      padding: 10px 20px;
      background-color: #06f;
      color: #fff;
      text-align: center;
      text-decoration: none;
      border-radius: 8px;
      border: none;
      font-size: 16px;
    }

    #generateAffiliateButton:hover {
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



  </style>

<script>





  document.getElementById("generateAffiliateButton").addEventListener("click", function () {
  fetch('http://localhost:3000/api/generate-affiliate', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })
    .then(response => response.json())
    .then(data => {
      const messageDiv = document.getElementById("affiliateMessage");

      if (data.code && data.link) {
        messageDiv.innerText = "✅ Check your email for your affiliate code and QR code!";
        messageDiv.style.display = "block";
        messageDiv.style.color = "green";
      } else {
        messageDiv.innerText = "❌ Error generating affiliate code.";
        messageDiv.style.display = "block";
        messageDiv.style.color = "red";
      }
    })
    .catch(error => {
      console.error("Error:", error);
      const messageDiv = document.getElementById("affiliateMessage");
      messageDiv.innerText = "❌ An error occurred while generating the affiliate code.";
      messageDiv.style.display = "block";
      messageDiv.style.color = "red";
    });
});



</script>
