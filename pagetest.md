---
layout: default
title: Profile
permalink: /pro/
---

# Profile



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
<body>
  <div id="profilePage">
    <div class="profile-container">
      <img id="profilePicture" src="default-avatar.png" alt="Profile Picture">
      <h1 id="profileName">Loading...</h1>
      <p id="profileEmail">Loading...</p>
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

  // Group items by orderId
  const groupedResults = results.reduce((acc, result) => {
    const { orderId } = result;

    // If orderId already exists, add the item to the existing order group
    if (!acc[orderId]) {
      acc[orderId] = {
        accountNumber: result.accountNumber,
        name: result.name,
        email: result.email,
        phone: result.phone,
        billingStreet: result.billingStreet,
        billingCity: result.billingCity,
        billingState: result.billingState,
        billingPostal: result.billingPostal,
        billingCountry: result.billingCountry,
        shippingStreet: result.shippingStreet,
        shippingCity: result.shippingCity,
        shippingState: result.shippingState,
        shippingPostal: result.shippingPostal,
        shippingCountry: result.shippingCountry,
        orderId: result.orderId,
        items: [],
        totalAmount: 0
      };
    }

    // Add item to the group and accumulate the total amount
    acc[orderId].items.push({
      itemName: result.itemName,
      itemQuantity: result.itemQuantity,
      itemPrice: result.itemPrice
    });
    acc[orderId].totalAmount += parseFloat(result.totalAmount);

    return acc;
  }, {});

  // Loop through grouped results and create the HTML structure
  Object.values(groupedResults).forEach(order => {
    const resultCard = document.createElement("div");
    resultCard.className = "result-card";

    // Build the order display
    let itemsHTML = "";
    order.items.forEach(item => {
      itemsHTML += `
        <p>Item Name: ${item.itemName || "N/A"}</p>
        <p>Item Quantity: ${item.itemQuantity || "N/A"}</p>
        <p>Item Price: $${parseFloat(item.itemPrice || 0).toFixed(2)}</p>
      `;
    });

    resultCard.innerHTML = `
      <p>Account Number: ${order.accountNumber || "N/A"}</p>
      <p>Name: ${order.name || "N/A"}</p>
      <p>Email: ${order.email || "N/A"}</p>
      <p>Order ID: ${order.orderId || "N/A"}</p>
      <p>Phone: ${order.phone || "N/A"}</p>
      <p>Billing Address: ${formatAddress(
        order.billingStreet,
        order.billingCity,
        order.billingState,
        order.billingPostal,
        order.billingCountry
      )}</p>
      <p>Shipping Address: ${formatAddress(
        order.shippingStreet,
        order.shippingCity,
        order.shippingState,
        order.shippingPostal,
        order.shippingCountry
      )}</p>
      ${itemsHTML} <!-- Display all items -->
      <p>Total Amount: $${parseFloat(order.totalAmount).toFixed(2)}</p>
      <hr>
    `;

    resultsContainer.appendChild(resultCard);
  });
}


// Function to get the logged-in user's email from localStorage
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
}); 
</script>



