---
layout: default
title: Profile
permalink: /ptdd/
---

# Profile

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
  const email = document.getElementById('email').value; // Get the email from input field
  const resultContainer = document.getElementById('result');
  resultContainer.style.display = 'none'; // Hide result container initially

  if (!email) {
    alert("Please enter an email!");
    return;
  }

  try {
    // Send the GET request with the email as a query parameter
    const response = await fetch(`https://script.google.com/macros/s/AKfycbyY9UyIOjwuLlJ0YK_KleuXXiEfkr1rnivBtbW-x1Ptn9YB4fS9ypBeCZPUECMsdpxt/exec?email=${email}`);
    
    // Parse the JSON response
    const data = await response.json();
    
    if (data.message) {
      alert(data.message);
    } else {
      // Update the HTML with the retrieved data
      document.getElementById('accountNumber').textContent = data.accountNumber;
      document.getElementById('name').textContent = data.name;
      document.getElementById('emailDisplay').textContent = data.email;
      document.getElementById('orderId').textContent = data.orderId;
      document.getElementById('phone').textContent = data.phone;
      document.getElementById('billingStreet').textContent = data.billingStreet;
      document.getElementById('billingCity').textContent = data.billingCity;
      document.getElementById('billingState').textContent = data.billingState;
      document.getElementById('billingPostal').textContent = data.billingPostal;
      document.getElementById('billingCountry').textContent = data.billingCountry;
      document.getElementById('shippingStreet').textContent = data.shippingStreet;
      document.getElementById('shippingCity').textContent = data.shippingCity;
      document.getElementById('shippingState').textContent = data.shippingState;
      document.getElementById('shippingPostal').textContent = data.shippingPostal;
      document.getElementById('shippingCountry').textContent = data.shippingCountry;
      document.getElementById('itemName').textContent = data.itemName;
      document.getElementById('itemQuantity').textContent = data.itemQuantity;
      document.getElementById('itemPrice').textContent = data.itemPrice;
      document.getElementById('totalAmount').textContent = data.totalAmount;

      resultContainer.style.display = 'block'; // Show the result container
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    alert('Failed to fetch data. Please check the console for more information.');
  }
}


  </script>
