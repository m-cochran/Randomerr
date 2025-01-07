---
layout: default
title: Profile
permalink: /pro/
---

# Profile

<title>Profile Page</title>

<div id="profilePage">
  <div class="profile-container">
    <img id="profilePicture" src="default-avatar.png" alt="Profile Picture">
    <h1 id="profileName">Loading...</h1>
    <p id="profileEmail">Loading...</p>
  </div>

  <div id="results-container">
    <!-- Results will be dynamically added here -->
  </div>



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

  /* Style for the results container */
  #results-container {
    padding: 20px;
    margin: 0 auto;
    max-width: 1200px;
    /* Limit the width of the container */
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  /* Style for each result card */
  .result-card {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }

  /* Style for headings (order info) */
  .result-card p {
    margin: 5px 0;
    font-size: 14px;
    color: #333;
  }

  /* Style for item details */
  .result-card p:first-of-type {
    font-weight: bold;
    color: #007BFF;
    /* Highlight item names */
  }

  /* Style for the total amount */
  .result-card p:last-of-type {
    font-weight: bold;
    color: #e74c3c;
    font-size: 16px;
  }

  /* Style for the order details */
  .result-card p {
    line-height: 1.5;
  }

  /* Style for a more readable total amount */
  .result-card p:last-of-type {
    margin-top: 10px;
    font-size: 16px;
    color: #28a745;
    /* Green for total amount */
  }

  /* Style for the header of the results */
  h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
  }

  /* Style for the "No results found" message */
  #results-container p {
    font-size: 18px;
    text-align: center;
    color: #888;
    padding: 40px;
  }
</style>




<script>
  const apiUrl = "https://script.google.com/macros/s/AKfycbyY9UyIOjwuLlJ0YK_KleuXXiEfkr1rnivBtbW-x1Ptn9YB4fS9ypBeCZPUECMsdpxt/exec"; // Replace with your Web App URL

  // Fetch data by email
  async function fetchDataByEmail(email) {
    try {
      console.log("Fetching data for email:", email);
      const response = await fetch(`${apiUrl}?email=${encodeURIComponent(email)}`);

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.error || !data.length) {
        console.warn("No data found or API error:", data.error || "No records found");
        displayResults([]);
        return;
      }

      console.log("Data fetched successfully:", data);
      displayResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      displayResults([]);
    }
  }

  // Format address
  function formatAddress(street, city, state, postal, country) {
    return [street, city, state, postal, country]
      .map(part => part || "N/A")
      .join(", ");
  }

  // Display results
  function displayResults(results) {
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.innerHTML = ""; // Clear previous results

    if (results.length === 0) {
      resultsContainer.innerHTML = "<p>No results found.</p>";
      return;
    }

    const groupedResults = results.reduce((acc, result) => {
      const { orderId } = result;

      if (!acc[orderId]) {
        acc[orderId] = {
          ...result,
          items: [],
          totalAmount: 0
        };
      }

      const itemTotal = parseFloat(result.itemPrice || 0) * parseInt(result.itemQuantity || 0, 10);
      acc[orderId].items.push({
        itemName: result.itemName,
        itemQuantity: result.itemQuantity,
        itemPrice: result.itemPrice,
        itemTotal: itemTotal
      });

      acc[orderId].totalAmount += itemTotal;
      return acc;
    }, {});

    Object.values(groupedResults).forEach(order => {
      const resultCard = document.createElement("div");
      resultCard.className = "result-card";

      let itemsHTML = order.items
        .map(
          item => `
          <p>Item Name: ${item.itemName || "N/A"}</p>
          <p>Item Quantity: ${item.itemQuantity || "N/A"}</p>
          <p>Item Price: $${parseFloat(item.itemPrice || 0).toFixed(2)}</p>
          <p>Item Total: $${item.itemTotal.toFixed(2)}</p>
          <hr>`
        )
        .join("");

      resultCard.innerHTML = `
        <p><strong>Account Number:</strong> ${order.accountNumber || "N/A"}</p>
        <p><strong>Name:</strong> ${order.name || "N/A"}</p>
        <p><strong>Email:</strong> ${order.email || "N/A"}</p>
        <p><strong>Order ID:</strong> ${order.orderId || "N/A"}</p>
        <p><strong>Phone:</strong> ${order.phone || "N/A"}</p>
        <p><strong>Billing Address:</strong> ${formatAddress(
          order.billingStreet,
          order.billingCity,
          order.billingState,
          order.billingPostal,
          order.billingCountry
        )}</p>
        <p><strong>Shipping Address:</strong> ${formatAddress(
          order.shippingStreet,
          order.shippingCity,
          order.shippingState,
          order.shippingPostal,
          order.shippingCountry
        )}</p>
        <div>${itemsHTML}</div>
        <p><strong>Total Amount:</strong> $${parseFloat(order.totalAmount).toFixed(2)}</p>
      `;

      resultsContainer.appendChild(resultCard);
    });
  }

  // Get logged-in user's email
  function getLoggedInUserEmail() {
    return localStorage.getItem("userEmail") || null;
  }

  // Fetch data on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", () => {
    const userEmail = getLoggedInUserEmail();
    if (userEmail) {
      console.log("User email found:", userEmail);
      fetchDataByEmail(userEmail);
    } else {
      console.warn("No user email found in localStorage.");
    }
  });
</script>
