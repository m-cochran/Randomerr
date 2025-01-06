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
        // Populate fields with the fetched data or default to "N/A" if data is missing
        displayResult(
          data["Account Number"] || "N/A",
          data["Name"] || "N/A",
          data["Email"] || "N/A",
          data["OrderID"] || "N/A",
          data["Phone"] || "N/A",
          formatAddress(
            data["Billing Street"], 
            data["Billing City"], 
            data["Billing State"], 
            data["Billing Postal"], 
            data["Billing Country"]
          ),
          formatAddress(
            data["Shipping Street"], 
            data["Shipping City"], 
            data["Shipping State"], 
            data["Shipping Postal"], 
            data["Shipping Country"]
          ),
          data["Item Name"] || "N/A",
          data["Item Quantity"] || "N/A",
          `$${parseFloat(data["Item Price"] || 0).toFixed(2)}`,
          `$${parseFloat(data["Total Amount"] || 0).toFixed(2)}`
        );
      }
    })
    .catch(error => {
      console.error("Fetch Error:", error); // Log any errors that occur
      displayResult("N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "N/A", "$0.00", "$0.00");
    });
}

// Utility function to format addresses
function formatAddress(street, city, state, postal, country) {
  console.log("Formatting address with:", { street, city, state, postal, country }); // Debug address formatting
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
