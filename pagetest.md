---
layout: default
title: Profile
permalink: /pro/
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
    <div id="account-number"></div>
    <div id="accountInfo" class="account-info">
      <!-- Account details will be displayed here -->
    </div>
  </div>



<div id="data-display">
  <p>Account Number: <span id="account-number"></span></p>
  <p>Name: <span id="name"></span></p>
  <p>Email: <span id="email"></span></p>
  <p>Order ID: <span id="order-id"></span></p>
  <p>Phone: <span id="phone"></span></p>
  <p>Billing Address: <span id="billing-address"></span></p>
  <p>Shipping Address: <span id="shipping-address"></span></p>
  <p>Item Name: <span id="item-name"></span></p>
  <p>Item Quantity: <span id="item-quantity"></span></p>
  <p>Item Price: <span id="item-price"></span></p>
  <p>Total Amount: <span id="total-amount"></span></p>
</div>



<script>
const apiUrl = "https://script.google.com/macros/s/AKfycbyY9UyIOjwuLlJ0YK_KleuXXiEfkr1rnivBtbW-x1Ptn9YB4fS9ypBeCZPUECMsdpxt/exec"; // Replace with your Web App URL

// Function to fetch data based on email
function fetchDataByEmail(email) {
  console.log("Fetching data for email:", email); // Debug email input

  fetch(`${apiUrl}?email=${encodeURIComponent(email)}`)
    .then(response => {
      console.log("Response received:", response); // Debug raw response
      if (!response.ok) {
        console.error(`HTTP Error: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Fetched Data:", data); // Debug API response data

      if (data.error || data.length === 0) {
        console.error("Error or no data from API:", data.error || "No records found");
        displayResult("N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "$0.00", "$0.00");
      } else {
        // Loop through all results if needed
        const result = data[0]; // Display the first record as an example
        displayResult(
          result.accountNumber || "N/A",
          result.name || "N/A",
          result.email || "N/A",
          result.orderId || "N/A",
          result.phone || "N/A",
          formatAddress(
            result.billingStreet,
            result.billingCity,
            result.billingState,
            result.billingPostal,
            result.billingCountry
          ),
          formatAddress(
            result.shippingStreet,
            result.shippingCity,
            result.shippingState,
            result.shippingPostal,
            result.shippingCountry
          ),
          result.itemName || "N/A",
          result.itemQuantity || "N/A",
          `$${parseFloat(result.itemPrice || 0).toFixed(2)}`,
          `$${parseFloat(result.totalAmount || 0).toFixed(2)}`
        );
      }
    })
    .catch(error => {
      console.error("Fetch Error:", error);
      displayResult("N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "$0.00", "$0.00");
    });
}

// Utility function to format addresses
function formatAddress(street, city, state, postal, country) {
  return `${street || "N/A"}, ${city || "N/A"}, ${state || "N/A"}, ${postal || "N/A"}, ${country || "N/A"}`;
}

// Function to display the fetched result on the page
function displayResult(account, name, email, orderID, phone, billingAddress, shippingAddress, itemName, itemQty, itemPrice, totalAmount) {
  const updateField = (id, value) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    } else {
      console.warn(`Element with ID '${id}' not found.`);
    }
  };

  updateField("account-number", account);
  updateField("name", name);
  updateField("email", email);
  updateField("order-id", orderID);
  updateField("phone", phone);
  updateField("billing-address", billingAddress);
  updateField("shipping-address", shippingAddress);
  updateField("item-name", itemName);
  updateField("item-quantity", itemQty);
  updateField("item-price", itemPrice);
  updateField("total-amount", totalAmount);
}

// Example usage: Call the function with a test email (replace with actual user input)
document.addEventListener("DOMContentLoaded", () => {
  const testEmail = "mycupofearth@gmail.com"; // Replace with user-provided email
  fetchDataByEmail(testEmail);
});
</script>
