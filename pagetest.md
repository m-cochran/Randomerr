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
  <title>Retrieve Account Data</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
    }
    .form-container {
      max-width: 600px;
      margin: auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 10px;
    }
    .form-container input, .form-container button {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    .result-container {
      margin-top: 20px;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 10px;
      background-color: #f9f9f9;
    }
  </style>
</head>
<body>
  <div class="form-container">
    <h2>Retrieve Account Data</h2>
    <input type="email" id="email" placeholder="Enter your email" required>
    <button onclick="getAccountData()">Get Data</button>
  </div>

  <div class="result-container" id="result" style="display: none;">
    <h3>Account Details</h3>
    <p><strong>Account Number:</strong> <span id="accountNumber"></span></p>
    <p><strong>Name:</strong> <span id="name"></span></p>
    <p><strong>Email:</strong> <span id="emailDisplay"></span></p>
    <p><strong>Order ID:</strong> <span id="orderId"></span></p>
    <p><strong>Phone:</strong> <span id="phone"></span></p>
    <p><strong>Billing Address:</strong> 
      <span id="billingStreet"></span>, 
      <span id="billingCity"></span>, 
      <span id="billingState"></span>, 
      <span id="billingPostal"></span>, 
      <span id="billingCountry"></span>
    </p>
    <p><strong>Shipping Address:</strong> 
      <span id="shippingStreet"></span>, 
      <span id="shippingCity"></span>, 
      <span id="shippingState"></span>, 
      <span id="shippingPostal"></span>, 
      <span id="shippingCountry"></span>
    </p>
    <p><strong>Item Name:</strong> <span id="itemName"></span></p>
    <p><strong>Item Quantity:</strong> <span id="itemQuantity"></span></p>
    <p><strong>Item Price:</strong> <span id="itemPrice"></span></p>
    <p><strong>Total Amount:</strong> <span id="totalAmount"></span></p>
  </div>

  <script>
    async function getAccountData() {
      const email = document.getElementById('email').value;
      const resultContainer = document.getElementById('result');
      resultContainer.style.display = 'none'; // Hide result container initially

      if (!email) {
        alert("Please enter an email!");
        return;
      }

      const response = fetch('https://script.google.com/macros/s/AKfycbwQSmWf9K-Jei00NBj_g4_TToubBsi53Jh7HcEJrlHh4duHh3Odtuz1tWsbCFysWjtx/exec', {
    method: 'GET',  // or POST if you are sending data
    headers: {
        'Content-Type': 'application/json',
    },
    mode: 'cors' // Important for cross-origin requests
})
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error('Error:', error);
});


      if (data.message) {
        alert(data.message);
      } else {
        // Update the HTML with the retrieved data
        document.getElementById('accountNumber').textContent = data[0]; // Account Number
        document.getElementById('name').textContent = data[1]; // Name
        document.getElementById('emailDisplay').textContent = data[2]; // Email
        document.getElementById('orderId').textContent = data[3]; // Order ID
        document.getElementById('phone').textContent = data[4]; // Phone
        document.getElementById('billingStreet').textContent = data[5]; // Billing Street
        document.getElementById('billingCity').textContent = data[6]; // Billing City
        document.getElementById('billingState').textContent = data[7]; // Billing State
        document.getElementById('billingPostal').textContent = data[8]; // Billing Postal
        document.getElementById('billingCountry').textContent = data[9]; // Billing Country
        document.getElementById('shippingStreet').textContent = data[10]; // Shipping Street
        document.getElementById('shippingCity').textContent = data[11]; // Shipping City
        document.getElementById('shippingState').textContent = data[12]; // Shipping State
        document.getElementById('shippingPostal').textContent = data[13]; // Shipping Postal
        document.getElementById('shippingCountry').textContent = data[14]; // Shipping Country
        document.getElementById('itemName').textContent = data[15]; // Item Name
        document.getElementById('itemQuantity').textContent = data[16]; // Item Quantity
        document.getElementById('itemPrice').textContent = data[17]; // Item Price
        document.getElementById('totalAmount').textContent = data[18]; // Total Amount

        resultContainer.style.display = 'block'; // Show the result container
      }
    }
  </script>
</body>
</html>


