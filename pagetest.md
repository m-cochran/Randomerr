---
layout: default
title: Profile
permalink: /ptdd/
---

# Profile


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Profile Page</title>
  <style>
    /* Add some basic styles */
    .profile-container {
      text-align: center;
    }
    .profile-container img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
    .account-info {
      margin-top: 20px;
    }
    .account-info p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div id="profilePage">
    <div class="profile-container">
      <img id="profilePicture" src="default-avatar.png" alt="Profile Picture">
      <h1 id="profileName">Loading...</h1>
      <p id="profileEmail">Loading...</p>
    </div>
    <div id="accountInfo" class="account-info">
      <!-- Account details will be displayed here -->
    </div>
  </div>

  <script>
    const profileEmail = localStorage.getItem("userEmail");

    async function fetchAccountData() {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycby8zDlkecaCKxheG6IxDygWhMdx_KFYjIhY2sQoyQPbIGKDdY-OiLpdNnMIj9MiQRsn/exec'); // Your Google Apps Script URL
        const data = await response.json();
        const account = data.find(account => account.email === profileEmail);
        
        if (account) {
          // Update profile page with data from Google Sheets
          document.getElementById('profileName').textContent = account.name;
          document.getElementById('profileEmail').textContent = account.email;
          document.getElementById('profilePicture').src = account.picture || 'default-avatar.png';

          const accountInfo = `
            <p><strong>Account Number:</strong> ${account.accountNumber}</p>
            <p><strong>Phone:</strong> ${account.phone}</p>
            <p><strong>Billing Address:</strong> ${account.billingStreet}, ${account.billingCity}, ${account.billingState}, ${account.billingPostal}, ${account.billingCountry}</p>
            <p><strong>Shipping Address:</strong> ${account.shippingStreet}, ${account.shippingCity}, ${account.shippingState}, ${account.shippingPostal}, ${account.shippingCountry}</p>
            <p><strong>Order ID:</strong> ${account.orderId}</p>
            <p><strong>Item:</strong> ${account.itemName} x ${account.itemQuantity}</p>
            <p><strong>Total Amount:</strong> $${account.totalAmount}</p>
          `;
          document.getElementById('accountInfo').innerHTML = accountInfo;
        } else {
          document.getElementById('accountInfo').innerHTML = '<p>No account data found for this email.</p>';
        }
      } catch (error) {
        console.error('Error fetching account data:', error);
        document.getElementById('accountInfo').innerHTML = '<p>Failed to retrieve account data.</p>';
      }
    }

    document.addEventListener("DOMContentLoaded", fetchAccountData);
  </script>
</body>
</html>
