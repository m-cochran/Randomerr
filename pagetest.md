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
<div id="name"></div>
<div id="email"></div>
<div id="order-id"></div>
<div id="phone"></div>
<div id="billing-address"></div>
<div id="shipping-address"></div>
<div id="item-name"></div>
<div id="item-quantity"></div>
<div id="item-price"></div>
<div id="total-amount"></div>

    <div id="accountInfo" class="account-info">
      <!-- Account details will be displayed here -->
    </div>
  </div>



<script>
const apiUrl = "https://script.google.com/macros/s/AKfycbyY9UyIOjwuLlJ0YK_KleuXXiEfkr1rnivBtbW-x1Ptn9YB4fS9ypBeCZPUECMsdpxt/exec"; // Replace with your Web App URL

// Function to fetch data based on email
function fetchDataByEmail(email) {
  console.log("Fetching data for email:", email); // Log email input for debugging

  fetch(`${apiUrl}?email=${encodeURIComponent(email)}`)
    .then(response => {
      console.log("Response received:", response); // Log the raw response object
      if (!response.ok) {
        console.error(`HTTP Error: ${response.status}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Fetched Data:", data); // Log the fetched data for inspection

      if (data.error) {
        console.error("Error from API:", data.error);
        displayResult("N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "$0.00", "$0.00");
      } else {
        // Display account information from the first entry (index 0)
        const accountData = data[0] || {};
        displayAccountInfo(accountData);

        // Display all purchase data (subsequent entries)
        displayPurchaseData(data);
      }
    })
    .catch(error => {
      console.error("Fetch Error:", error); // Log any errors that occur
      displayResult("N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "$0.00", "$0.00");
    });
}

// Function to display account info
function displayAccountInfo(data) {
  updateField("account-number", data["Account Number"] || "N/A");
  updateField("name", data["Name"] || "N/A");
  updateField("email", data["Email"] || "N/A");
  updateField("phone", data["Phone"] || "N/A");
}

// Function to display purchase data
function displayPurchaseData(data) {
  const purchaseContainer = document.getElementById("purchase-data-container");
  purchaseContainer.innerHTML = ''; // Clear existing purchase data

  data.forEach((entry, index) => {
    if (index !== 0) {  // Skip the first entry (account info)
      const orderID = entry["OrderID"] || "N/A";
      const itemName = entry["Item Name"] || "N/A";
      const itemQuantity = entry["Item Quantity"] || "N/A";
      const itemPrice = `$${parseFloat(entry["Item Price"] || 0).toFixed(2)}`;
      const totalAmount = `$${parseFloat(entry["Total Amount"] || 0).toFixed(2)}`;

      const billingAddress = formatAddress(
        entry["Billing Street"], 
        entry["Billing City"], 
        entry["Billing State"], 
        entry["Billing Postal"], 
        entry["Billing Country"]
      );
      const shippingAddress = formatAddress(
        entry["Shipping Street"], 
        entry["Shipping City"], 
        entry["Shipping State"], 
        entry["Shipping Postal"], 
        entry["Shipping Country"]
      );

      // Create and append a new div for each purchase entry
      const purchaseEntry = document.createElement("div");
      purchaseEntry.classList.add("purchase-entry");
      purchaseEntry.innerHTML = `
        <h3>Order ID: ${orderID}</h3>
        <p>Item: ${itemName}</p>
        <p>Quantity: ${itemQuantity}</p>
        <p>Price: ${itemPrice}</p>
        <p>Total Amount: ${totalAmount}</p>
        <h4>Billing Address:</h4>
        <p>${billingAddress}</p>
        <h4>Shipping Address:</h4>
        <p>${shippingAddress}</p>
      `;
      purchaseContainer.appendChild(purchaseEntry);
    }
  });
}

// Utility function to format addresses
function formatAddress(street, city, state, postal, country) {
  return `${street || "N/A"}, ${city || "N/A"}, ${state || "N/A"}, ${postal || "N/A"}, ${country || "N/A"}`;
}

// Function to update fields on the page
function updateField(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  } else {
    console.warn(`Element with ID '${id}' not found.`);
  }
}

// Example usage: Call the function with a test email (replace with actual user input)
document.addEventListener("DOMContentLoaded", () => {
  const testEmail = "mycupofearth@gmail.com"; // Replace with user-provided email
  fetchDataByEmail(testEmail);
});
</script>

<!-- HTML Structure Example -->
<div id="account-info">
  <h2>Account Information</h2>
  <p><strong>Account Number:</strong> <span id="account-number">Loading...</span></p>
  <p><strong>Name:</strong> <span id="name">Loading...</span></p>
  <p><strong>Email:</strong> <span id="email">Loading...</span></p>
  <p><strong>Phone:</strong> <span id="phone">Loading...</span></p>
</div>

<div id="purchase-data-container"></div> <!-- Container for displaying purchase data -->
