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
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 900px;
      margin: 20px auto;
      padding: 20px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .profile-header {
      display: flex;
      align-items: center;
      margin-bottom: 30px;
    }
    .profile-header img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-right: 20px;
    }
    .profile-header h1 {
      margin: 0;
      font-size: 24px;
      color: #333;
    }
    .profile-info {
      font-size: 18px;
      color: #666;
    }
    .profile-info p {
      margin: 5px 0;
    }
    .btn-logout {
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #f44336;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
    }
    .btn-logout:hover {
      background-color: #d32f2f;
    }
  </style>
</head>
<body>

  <div class="container">
    <div class="profile-header">
      <img id="profilePicture" src="default-avatar.png" alt="Profile Picture">
      <div>
        <h1 id="userName">Loading...</h1>
        <p id="userEmail">Loading...</p>
      </div>
    </div>

    <div class="profile-info">
      <p><strong>Account Number:</strong> <span id="accountNumber">Loading...</span></p>
      <p><strong>Phone:</strong> <span id="userPhone">Loading...</span></p>
      <p><strong>Billing Address:</strong></p>
      <p><strong>Street:</strong> <span id="billingStreet">Loading...</span></p>
      <p><strong>City:</strong> <span id="billingCity">Loading...</span></p>
      <p><strong>State:</strong> <span id="billingState">Loading...</span></p>
      <p><strong>Postal:</strong> <span id="billingPostal">Loading...</span></p>
      <p><strong>Country:</strong> <span id="billingCountry">Loading...</span></p>
      
      <p><strong>Shipping Address:</strong></p>
      <p><strong>Street:</strong> <span id="shippingStreet">Loading...</span></p>
      <p><strong>City:</strong> <span id="shippingCity">Loading...</span></p>
      <p><strong>State:</strong> <span id="shippingState">Loading...</span></p>
      <p><strong>Postal:</strong> <span id="shippingPostal">Loading...</span></p>
      <p><strong>Country:</strong> <span id="shippingCountry">Loading...</span></p>

      <p><strong>Items:</strong></p>
      <div id="itemsList">Loading...</div>
    </div>

    <button class="btn-logout" id="logoutBtn">Logout</button>
  </div>

  <script>
    // Simulating the data fetch and update of the profile page
    async function fetchAndUpdateProfile(email) {
      const response = await fetch(`https://script.google.com/macros/s/AKfycby8zDlkecaCKxheG6IxDygWhMdx_KFYjIhY2sQoyQPbIGKDdY-OiLpdNnMIj9MiQRsn/exec?email=${email}`);
      const data = await response.json();
      
      if (data.message) {
        alert(data.message);
      } else {
        // Assuming data array has this structure
        document.getElementById("accountNumber").textContent = data[0];
        document.getElementById("userName").textContent = data[1];
        document.getElementById("userEmail").textContent = data[2];
        document.getElementById("userPhone").textContent = data[3];
        document.getElementById("billingStreet").textContent = data[4];
        document.getElementById("billingCity").textContent = data[5];
        document.getElementById("billingState").textContent = data[6];
        document.getElementById("billingPostal").textContent = data[7];
        document.getElementById("billingCountry").textContent = data[8];
        document.getElementById("shippingStreet").textContent = data[9];
        document.getElementById("shippingCity").textContent = data[10];
        document.getElementById("shippingState").textContent = data[11];
        document.getElementById("shippingPostal").textContent = data[12];
        document.getElementById("shippingCountry").textContent = data[13];
        
        // Items list (example)
        const itemsList = document.getElementById("itemsList");
        itemsList.innerHTML = '';
        for (let i = 14; i < data.length; i += 3) {
          const item = document.createElement("div");
          item.textContent = `Item: ${data[i]}, Quantity: ${data[i+1]}, Price: ${data[i+2]}`;
          itemsList.appendChild(item);
        }
      }
    }

  </script>

