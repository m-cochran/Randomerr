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

<div id="results-container"></div>









<style>
  #results-container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #f9f9f9;
  }

  .result-card {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .result-card p {
    margin: 5px 0;
    font-size: 14px;
    color: #333;
  }

  .result-card hr {
    border: none;
    border-top: 1px solid #eee;
    margin: 10px 0;
  }

  .result-card strong {
    color: #000;
  }

  .loading-state {
    text-align: center;
    font-size: 16px;
    color: #666;
  }
</style>






<script>
  const apiUrl =
    "https://script.google.com/macros/s/AKfycbw7gi9GqPCwPdFBlmpHTn12dEbLtp1Cq1z8IDJoxqYvsEgjE4HmfXKLrJExfdCz6cgQYw/exec";

  // Display loading state
  function displayLoadingState() {
    const resultsContainer = document.getElementById("results-container");
    if (resultsContainer) {
      resultsContainer.innerHTML = "<p>Loading...</p>";
    } else {
      console.error("results-container not found.");
    }
  }

  // Fetch data by email
  async function fetchDataByEmail(email) {
    try {
      displayLoadingState();
      console.log("Fetching data for email:", email);

      const response = await fetch(`${apiUrl}?email=${encodeURIComponent(email)}`);
      if (!response.ok) {
        console.error(`HTTP Error: ${response.status}`);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Raw API Response:", data);

      // Filter data for the given email (case-insensitive)
      const filteredData = data.filter(
        (record) => record.Email?.toLowerCase() === email.toLowerCase()
      );
      console.log("Filtered Data:", filteredData);

      displayResults(filteredData);
    } catch (error) {
      console.error("Fetch Error:", error);
      displayErrorState();
    }
  }

  // Display error state
  function displayErrorState() {
    const resultsContainer = document.getElementById("results-container");
    if (resultsContainer) {
      resultsContainer.innerHTML = "<p>An error occurred while fetching data. Please try again later.</p>";
    } else {
      console.error("results-container not found to display error state.");
    }
  }

  // Format address with fallback values
  function formatAddress(street, city, state, postal, country) {
    return [street, city, state, postal, country]
      .map((part) => escapeHTML(part || "N/A"))
      .join(", ");
  }

  // Escape HTML to prevent injection
  function escapeHTML(str) {
    const element = document.createElement("div");
    if (str) element.innerText = str;
    return element.innerHTML;
  }

  // Display results in the container
  function displayResults(results) {
    const resultsContainer = document.getElementById("results-container");
    if (!resultsContainer) {
      console.error("results-container not found. Cannot display results.");
      return;
    }

    resultsContainer.innerHTML = ""; // Clear previous results

    if (results.length === 0) {
      resultsContainer.innerHTML = "<p>No results found.</p>";
      return;
    }

    // Group results by orderId
    const groupedResults = results.reduce((acc, result) => {
      const { OrderID: orderId } = result;

      if (!acc[orderId]) {
        acc[orderId] = {
          ...result,
          items: [],
          totalAmount: 0,
        };
      }

      const itemTotal =
        parseFloat(result.ItemPrice || 0) * parseInt(result.ItemQuantity || 0, 10);
      acc[orderId].items.push({
        itemName: result.ItemName,
        itemQuantity: result.ItemQuantity,
        itemPrice: result.ItemPrice,
        itemTotal: itemTotal,
      });

      acc[orderId].totalAmount += itemTotal;
      return acc;
    }, {});

    // Create and append result cards
    Object.values(groupedResults).forEach((order) => {
      const resultCard = document.createElement("div");
      resultCard.className = "result-card";

      const itemsHTML = order.items
        .map(
          (item) => `
          <p>Item Name: ${item.itemName || "N/A"}</p>
          <p>Item Quantity: ${item.itemQuantity || "N/A"}</p>
          <p>Item Price: $${parseFloat(item.itemPrice || 0).toFixed(2)}</p>
          <p>Item Total: $${item.itemTotal.toFixed(2)}</p>
          <hr>`
        )
        .join("");

      resultCard.innerHTML = `
        <p><strong>Order ID:</strong> ${order.OrderID || "N/A"}</p>
        <p><strong>Total Amount:</strong> $${parseFloat(order.totalAmount).toFixed(2)}</p>
        <div>${itemsHTML}</div>
        <p><strong>Billing Address:</strong> ${formatAddress(
          order.BillingStreet,
          order.BillingCity,
          order.BillingState,
          order.BillingPostal,
          order.BillingCountry
        )}</p>
        <p><strong>Shipping Address:</strong> ${formatAddress(
          order.ShippingStreet,
          order.ShippingCity,
          order.ShippingState,
          order.ShippingPostal,
          order.ShippingCountry
        )}</p>
        <p><strong>Phone:</strong> ${order.Phone || "N/A"}</p>
        <p><strong>Email:</strong> ${order.Email || "N/A"}</p>
      `;

      resultsContainer.appendChild(resultCard);
    });
  }

  // Get logged-in user's email from localStorage
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


