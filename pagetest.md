---
layout: default
title: Profile
permalink: /pro/
---

# Profile

<div id="profilePage">
  <!-- Profile Section -->
  <div class="profile-container">
    <img id="profilePicture" src="default-avatar.png" alt="Profile Picture">
    <h1 id="profileName">Loading...</h1>
    <p id="profileEmail">Loading...</p>
  </div>

<div id="results-container">

<div id="user-info-container">
  <h2>User Information</h2>
  <p id="email">Email: N/A</p>
  <p id="name">Full Name: N/A</p>
  <p id="phone">Phone: N/A</p>
  <p id="billing-street">Billing Street: N/A</p>
  <p id="billing-city">Billing City: N/A</p>
  <p id="billing-state">Billing State: N/A</p>
  <p id="billing-postal">Billing Postal: N/A</p>
  <p id="billing-country">Billing Country: N/A</p>
  <p id="shipping-street">Shipping Street: N/A</p>
  <p id="shipping-city">Shipping City: N/A</p>
  <p id="shipping-state">Shipping State: N/A</p>
  <p id="shipping-postal">Shipping Postal: N/A</p>
  <p id="shipping-country">Shipping Country: N/A</p>
  <p id="order-date">Order Date: N/A</p>
  <p id="order-id">Order ID: N/A</p>
  <p id="item-name">Item Name: N/A</p>
  <p id="item-quantity">Item Quantity: N/A</p>
  <p id="item-price">Item Price: N/A</p>
  <p id="total-amount">Total Amount: N/A</p>
  <p id="tracking-number">Tracking Number: N/A</p>
</div>









  <style>

    .card {
      background-color: white;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      width: 400px;
      padding: 20px;
      border-radius: 8px;
    }

    .card h2 {
      margin-top: 0;
      color: #333;
    }

    .card p {
      margin: 8px 0;
      color: #555;
    }

    .loading,
    .error {
      text-align: center;
      color: #888;
    }

    .spinner {
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top: 4px solid #333;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>






  <div id="card-container">















<script>
  // Google Apps Script API URL
  const apiUrl = "https://script.google.com/macros/s/AKfycbwGUhSttkDP3B8bUie3h_zHvoUHfZgohHofiL_EonGAyV6TNXhPbFmXiGD78DFXwzBKAA/exec";

  // Function to display loading state
  function displayLoadingState() {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
        <p>Loading...</p>
      </div>
    `;
  }

  // Function to display error state
  function displayErrorState() {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = `
      <div class="error">
        <p>Sorry, something went wrong. Please try again later.</p>
      </div>
    `;
  }

  // Function to display user data in a card format
  function displayUserData(data) {
    const cardContainer = document.getElementById("card-container");

    if (!data || data.error) {
      cardContainer.innerHTML = `<div class="card"><h2>User Information</h2><p>No data found.</p></div>`;
      return;
    }

    // Assuming you're working with the first element in the array
    const user = data[0];

    // Function to sanitize the field names
    function sanitizeHeader(header) {
      return header.replace(/["\s]/g, '').trim(); // Remove quotes and spaces
    }

    // Log the sanitized keys and values for debugging
    console.log('Sanitized Data:', user);

    cardContainer.innerHTML = `
      <div class="card">
        <h2>User Information</h2>
        <p><strong>Email:</strong> ${user[sanitizeHeader("Email")] || "N/A"}</p>
        <p><strong>Full Name:</strong> ${user[sanitizeHeader("Name")] || "N/A"}</p>
        <p><strong>Phone:</strong> ${user[sanitizeHeader("Phone")] || "N/A"}</p>
        <p><strong>Billing Street:</strong> ${user[sanitizeHeader("Billing Street")] || "N/A"}</p>
        <p><strong>Billing City:</strong> ${user[sanitizeHeader("Billing City")] || "N/A"}</p>
        <p><strong>Billing State:</strong> ${user[sanitizeHeader("Billing State")] || "N/A"}</p>
        <p><strong>Billing Postal:</strong> ${user[sanitizeHeader("Billing Postal")] || "N/A"}</p>
        <p><strong>Billing Country:</strong> ${user[sanitizeHeader("Billing Country")] || "N/A"}</p>
        <p><strong>Shipping Street:</strong> ${user[sanitizeHeader("Shipping Street")] || "N/A"}</p>
        <p><strong>Shipping City:</strong> ${user[sanitizeHeader("Shipping City")] || "N/A"}</p>
        <p><strong>Shipping State:</strong> ${user[sanitizeHeader("Shipping State")] || "N/A"}</p>
        <p><strong>Shipping Postal:</strong> ${user[sanitizeHeader("Shipping Postal")] || "N/A"}</p>
        <p><strong>Shipping Country:</strong> ${user[sanitizeHeader("Shipping Country")] || "N/A"}</p>
        <p><strong>Order Date:</strong> ${user[sanitizeHeader("Order Date")] || "N/A"}</p>
        <p><strong>Order ID:</strong> ${user[sanitizeHeader("Order ID")] || "N/A"}</p>
        <p><strong>Item Name:</strong> ${user[sanitizeHeader("Item Name")] || "N/A"}</p>
        <p><strong>Item Quantity:</strong> ${user[sanitizeHeader("Item Quantity")] || "N/A"}</p>
        <p><strong>Item Price:</strong> ${user[sanitizeHeader("Item Price")] || "N/A"}</p>
        <p><strong>Total Amount:</strong> ${user[sanitizeHeader("Total Amount")] || "N/A"}</p>
        <p><strong>Tracking Number:</strong> ${user[sanitizeHeader("Tracking Number")] || "N/A"}</p>
      </div>
    `;
  }

  // Function to fetch data by email
  async function fetchUserData(email) {
    displayLoadingState();

    try {
      const response = await fetch(`${apiUrl}?email=${encodeURIComponent(email)}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      
      const data = await response.json();
      displayUserData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      displayErrorState();
    }
  }

 // Function to display user data
function displayUserData(data) {
  // Select all elements by ID where we want to insert the data
  document.getElementById("email").textContent = `Email: ${data["\"Email\""] || "N/A"}`;
  document.getElementById("name").textContent = `Full Name: ${data["\"Name\""] || "N/A"}`;
  document.getElementById("phone").textContent = `Phone: ${data["\"Phone\""] || "N/A"}`;
  document.getElementById("billing-street").textContent = `Billing Street: ${data["\"Billing Street\""] || "N/A"}`;
  document.getElementById("billing-city").textContent = `Billing City: ${data["\"Billing City\""] || "N/A"}`;
  document.getElementById("billing-state").textContent = `Billing State: ${data["\"Billing State\""] || "N/A"}`;
  document.getElementById("billing-postal").textContent = `Billing Postal: ${data["\"Billing Postal\""] || "N/A"}`;
  document.getElementById("billing-country").textContent = `Billing Country: ${data["\"Billing Country\""] || "N/A"}`;
  document.getElementById("shipping-street").textContent = `Shipping Street: ${data["\"Shipping Street\""] || "N/A"}`;
  document.getElementById("shipping-city").textContent = `Shipping City: ${data["\"Shipping City\""] || "N/A"}`;
  document.getElementById("shipping-state").textContent = `Shipping State: ${data["\"Shipping State\""] || "N/A"}`;
  document.getElementById("shipping-postal").textContent = `Shipping Postal: ${data["\"Shipping Postal\""] || "N/A"}`;
  document.getElementById("shipping-country").textContent = `Shipping Country: ${data["\"Shipping Country\""] || "N/A"}`;
  document.getElementById("order-date").textContent = `Order Date: ${data["\"Order Date\""] || "N/A"}`;
  document.getElementById("order-id").textContent = `Order ID: ${data["\"Order ID\""] || "N/A"}`;
  document.getElementById("item-name").textContent = `Item Name: ${data["\"Item Name\""] || "N/A"}`;
  document.getElementById("item-quantity").textContent = `Item Quantity: ${data["\"Item Quantity\""] || "N/A"}`;
  document.getElementById("item-price").textContent = `Item Price: ${data["\"Item Price\""] || "N/A"}`;
  document.getElementById("total-amount").textContent = `Total Amount: ${data["\"Total Amount\""] || "N/A"}`;
  document.getElementById("tracking-number").textContent = `Tracking Number: ${data["\"Tracking Number\""] || "N/A"}`;
}

// Fetch and display user data when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const email = localStorage.getItem("userEmail"); // Get email from localStorage

  if (!email) {
    displayErrorState();
    return;
  }

  fetchUserData(email);
});

</script>
