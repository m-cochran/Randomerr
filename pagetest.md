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
  <div class="result-card">
    <p><strong>Loading...:</strong> Loading...</p>
    <p><strong>Loading...:</strong> Loading...</p>
    <p><strong>Loading...:</strong> Loading...</p>
    <p><strong>Loading...:</strong> Loading...</p>
    <p><strong>Loading...:</strong> Loading...</p>
    <p><strong>Loading...:</strong> Loading...</p>
    <p><strong>Loading...:</strong> Loading...</p>
    <div>
      <p>Item Name: Widget A</p>
      <p>Item Quantity: 2</p>
      <p>Item Price: $25.00</p>
    </div>
    <p><strong>Total Amount:</strong> $50.00</p>
  </div>
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

/* Results Container */
#results-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  justify-content: center;
  background-color: #f4f4f4;
}

/* Individual Result Card */
.result-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.result-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

/* Result Card Content */
.result-card p {
  margin: 10px 0;
  font-size: 14px;
}

.result-card strong {
  color: #555;
}

/* Items Section */
.result-card div {
  margin-top: 20px;
  border-top: 1px solid #ddd;
  padding-top: 10px;
}

.result-card div p {
  margin: 5px 0;
  font-size: 13px;
  color: #666;
}

.result-card div p:nth-child(odd) {
  background-color: #f8f8f8;
  padding: 5px;
  border-radius: 5px;
}

/* Total Amount */
.result-card p:last-of-type {
  font-size: 16px;
  font-weight: bold;
  color: #444;
  margin-top: 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
  #results-container {
    flex-direction: column;
    align-items: center;
  }

  .result-card {
    max-width: 90%;
  }
}
</style>




<script>
  const apiUrl = "https://script.google.com/macros/s/AKfycbyY9UyIOjwuLlJ0YK_KleuXXiEfkr1rnivBtbW-x1Ptn9YB4fS9ypBeCZPUECMsdpxt/exec"; // Replace with your Web App URL

  // Fetch data by email
  async function fetchDataByEmail(email) {
  try {
    console.log("Fetching data for email:", email);

    const response = await fetch(`${apiUrl}?email=${encodeURIComponent(email)}`);
    console.log("Response received:", response);

    if (!response.ok) {
      console.error(`HTTP Error: ${response.status}`);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Raw API Response:", data);

    // Validate and filter data for the given email
    const filteredData = data.filter(record => record.email === email);
    console.log("Filtered Data:", filteredData);

    if (filteredData.length === 0) {
      console.warn("No data found for the provided email.");
      displayResults([]);
      return;
    }

    displayResults(filteredData);
  } catch (error) {
    console.error("Fetch Error:", error);
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
