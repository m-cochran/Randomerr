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

const mockData = [
  {
    "\"Email\"": "reachmycupofearth@gmail.com",
    "\"Name\"": "Andre Cochran",
    "\"Phone\"": "123-456-7890",
    "\"Billing Street\"": "123 Elm St.",
    "\"Billing City\"": "Somewhere",
    "\"Billing State\"": "CA",
    "\"Billing Postal\"": "12345",
    "\"Billing Country\"": "USA",
    "\"Shipping Street\"": "456 Oak St.",
    "\"Shipping City\"": "Elsewhere",
    "\"Shipping State\"": "NY",
    "\"Shipping Postal\"": "67890",
    "\"Shipping Country\"": "USA",
    "\"Order Date\"": "2024-01-10",
    "\"Order ID\"": "987654",
    "\"Item Name\"": "Coffee Maker",
    "\"Item Quantity\"": "1",
    "\"Item Price\"": "$100",
    "\"Total Amount\"": "$100",
    "\"Tracking Number\"": "ABC123456789"
  }
];

displayUserData(mockData);



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
