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

<div id="results" class="results-container"></div>

<div id="results-container"></div>









<style>
.results-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  padding: 1rem;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  max-width: 300px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.card h2 {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  color: #333;
}

.card p {
  margin: 0.5rem 0;
  font-size: 0.9rem;
  color: #555;
}

.card p strong {
  color: #333;
}

.no-data {
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  margin-top: 2rem;
}


.result-card {
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin: 10px 0;
  background: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.result-card p {
  margin: 5px 0;
}

.result-card strong {
  font-weight: bold;
}

</style>



<style>
  .spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
    margin: 10px auto;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>







<h1>Order Details</h1>
  <div id="results-container">
    <!-- This is where the order details will be displayed -->
  </div>



<script>
  const apiUrl =
    "https://script.google.com/macros/s/AKfycbw7gi9GqPCwPdFBlmpHTn12dEbLtp1Cq1z8IDJoxqYvsEgjE4HmfXKLrJExfdCz6cgQYw/exec";

  // Display loading state
  function displayLoadingState() {
  const resultsContainer = document.getElementById("results-container");
  if (resultsContainer) {
    resultsContainer.innerHTML =
      '<div class="spinner"></div><p>Loading...</p>';
  } else {
    console.error("results-container not found.");
  }
}


  // Display error state
  function displayErrorState() {
    const resultsContainer = document.getElementById("results-container");
    if (resultsContainer) {
      resultsContainer.innerHTML = "<p>An error occurred. Please try again later.</p>";
    } else {
      console.error("results-container not found.");
    }
  }

  // Fetch data by email
async function fetchDataByEmail(email) {
  try {
    displayLoadingState();
    console.log("Fetching data for email:", email);

    const response = await fetch(${apiUrl}?email=${encodeURIComponent(email)});
    if (!response.ok) {
      console.error(HTTP Error: ${response.status});
      throw new Error(HTTP error! Status: ${response.status});
    }

    const rawData = await response.json();
    console.log("Raw API Response:", rawData);

    const results = Array.isArray(rawData) ? rawData : rawData.data || [];
    console.log("Processed Results:", results);

    if (!results || results.length === 0) {
      displayResults([]);
      return;
    }

    displayResults(results);
  } catch (error) {
    console.error("Fetch Error:", error);
    displayErrorState();
  }
}

function displayResults(results) {
  const resultsContainer = document.getElementById("results-container");
  if (!resultsContainer) {
    console.error("results-container not found. Cannot display results.");
    return;
  }

  resultsContainer.innerHTML = ""; // Clear previous results

  if (!results || results.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
    return;
  }

  // Group results by OrderID
  const groupedResults = results.reduce((acc, result) => {
    const orderId = getField(result.OrderID, "N/A");

    if (!acc[orderId]) {
      acc[orderId] = {
        ...result,
        items: [],
        totalAmount: 0,
      };
    }

    const itemTotal =
      (parseFloat(getField(result.ItemPrice, 0)) || 0) *
      (parseInt(getField(result.ItemQuantity, 0), 10) || 0);

    acc[orderId].items.push({
      itemName: getField(result.ItemName),
      itemQuantity: getField(result.ItemQuantity),
      itemPrice: parseFloat(getField(result.ItemPrice, 0)).toFixed(2),
      itemTotal: itemTotal.toFixed(2),
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
        (item) => 
          <p><strong>Item Name:</strong> ${escapeHTML(item.itemName)}</p>
          <p><strong>Item Quantity:</strong> ${escapeHTML(item.itemQuantity)}</p>
          <p><strong>Item Price:</strong> $${escapeHTML(item.itemPrice)}</p>
          <p><strong>Item Total:</strong> $${escapeHTML(item.itemTotal)}</p>
          <hr>
      )
      .join("");

    resultCard.innerHTML = 
      <p><strong>Order ID:</strong> ${escapeHTML(getField(order.OrderID))}</p>
      <p><strong>Total Amount:</strong> $${parseFloat(
        getField(order.totalAmount, 0)
      ).toFixed(2)}</p>
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
      <p><strong>Phone:</strong> ${escapeHTML(getField(order.Phone))}</p>
      <p><strong>Email:</strong> ${escapeHTML(getField(order.Email))}</p>
    ;

    resultsContainer.appendChild(resultCard);
  });
}





  // Escape HTML to prevent injection
  function escapeHTML(str) {
    const element = document.createElement("div");
    if (str) element.innerText = str;
    return element.innerHTML;
  }

  // Format address with fallback values
  function formatAddress(street, city, state, postal, country) {
    return [street, city, state, postal, country]
      .map((part) => escapeHTML(part || "N/A"))
      .join(", ");
  }

  // Display results in the container
  function displayResults(results) {
    const resultsContainer = document.getElementById("results-container");
    if (!resultsContainer) {
      console.error("results-container not found. Cannot display results.");
      return;
    }

    resultsContainer.innerHTML = ""; // Clear previous results

    if (!results || results.length === 0) {
      resultsContainer.innerHTML = "<p>No results found.</p>";
      return;
    }

    // Group results by orderId
    const groupedResults = results.reduce((acc, result) => {
      const orderId = result.OrderID || "N/A";

      if (!acc[orderId]) {
        acc[orderId] = {
          ...result,
          items: [],
          totalAmount: 0,
        };
      }

      const itemTotal =
        parseFloat(result.ItemPrice || 0) *
        parseInt(result.ItemQuantity || 0, 10);
      acc[orderId].items.push({
        itemName: result.ItemName || "N/A",
        itemQuantity: result.ItemQuantity || "N/A",
        itemPrice: parseFloat(result.ItemPrice || 0).toFixed(2),
        itemTotal: itemTotal.toFixed(2),
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
          (item) => 
            <p><strong>Item Name:</strong> ${escapeHTML(item.itemName)}</p>
            <p><strong>Item Quantity:</strong> ${escapeHTML(item.itemQuantity)}</p>
            <p><strong>Item Price:</strong> $${escapeHTML(item.itemPrice)}</p>
            <p><strong>Item Total:</strong> $${escapeHTML(item.itemTotal)}</p>
            <hr>
        )
        .join("");

      resultCard.innerHTML = 
        <p><strong>Order ID:</strong> ${escapeHTML(order.OrderID || "N/A")}</p>
        <p><strong>Total Amount:</strong> $${parseFloat(
          order.totalAmount || 0
        ).toFixed(2)}</p>
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
        <p><strong>Phone:</strong> ${escapeHTML(order.Phone || "N/A")}</p>
        <p><strong>Email:</strong> ${escapeHTML(order.Email || "N/A")}</p>
      ;

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
