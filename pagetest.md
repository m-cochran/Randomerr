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
    .result-card {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
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

  </div>


  <div id="results-container">
  <!-- Results will be dynamically added here -->
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
        displayResults([]);
      } else {
        // Display all results
        displayResults(data);
      }
    })
    .catch(error => {
      console.error("Fetch Error:", error);
      displayResults([]);
    });
}

// Utility function to format addresses
function formatAddress(street, city, state, postal, country) {
  return `${street || "N/A"}, ${city || "N/A"}, ${state || "N/A"}, ${postal || "N/A"}, ${country || "N/A"}`;
}

// Function to display all results
function displayResults(results) {
  const resultsContainer = document.getElementById("results-container");
  resultsContainer.innerHTML = ""; // Clear previous results

  if (results.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
    return;
  }

  results.forEach(result => {
    const resultCard = document.createElement("div");
    resultCard.className = "result-card";

    resultCard.innerHTML = `
      <p>Account Number: ${result.accountNumber || "N/A"}</p>
      <p>Name: ${result.name || "N/A"}</p>
      <p>Email: ${result.email || "N/A"}</p>
      <p>Order ID: ${result.orderId || "N/A"}</p>
      <p>Phone: ${result.phone || "N/A"}</p>
      <p>Billing Address: ${formatAddress(
        result.billingStreet,
        result.billingCity,
        result.billingState,
        result.billingPostal,
        result.billingCountry
      )}</p>
      <p>Shipping Address: ${formatAddress(
        result.shippingStreet,
        result.shippingCity,
        result.shippingState,
        result.shippingPostal,
        result.shippingCountry
      )}</p>
      <p>Item Name: ${result.itemName || "N/A"}</p>
      <p>Item Quantity: ${result.itemQuantity || "N/A"}</p>
      <p>Item Price: $${parseFloat(result.itemPrice || 0).toFixed(2)}</p>
      <p>Total Amount: $${parseFloat(result.totalAmount || 0).toFixed(2)}</p>
      <hr>
    `;

    resultsContainer.appendChild(resultCard);
  });
}



  function getLoggedInUserEmail() {
  const email = localStorage.getItem('userEmail');
  return email ? email : null;
}

// DOMContentLoaded listener to fetch data based on the logged-in user's email
document.addEventListener("DOMContentLoaded", () => {
  // Example: Replace with your authentication method
  const userEmail = getLoggedInUserEmail(); // Custom function to retrieve email

  if (userEmail) {
    console.log("User is logged in, fetching data...");
    fetchDataByEmail(userEmail);
}


</script>


