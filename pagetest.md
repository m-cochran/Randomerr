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
    <!-- Placeholder while data loads -->
    <div class="result-card">
      <p><strong>Order ID:</strong> Loading...</p>
      <p><strong>Total Amount:</strong> Loading...</p>
      <p><strong>Billing Address:</strong> Loading...</p>
      <p><strong>Shipping Address:</strong> Loading...</p>
      <p><strong>Phone:</strong> Loading...</p>
      <p><strong>Email:</strong> Loading...</p>
      <div>
        <p>Item Name: Widget A</p>
        <p>Item Quantity: 2</p>
        <p>Item Price: $25.00</p>
      </div>
      <p><strong>Total Amount:</strong> $50.00</p>
      <p><strong>Tracking:</strong> Pending...</p>
    </div>
  </div>
</div>

<style>
  .profile-container {
    text-align: center;
  }

  .profile-container img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  #results-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    justify-content: center;
    background-color: #f4f4f4;
  }

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

  .result-card p {
    margin: 10px 0;
    font-size: 14px;
  }

  .result-card div {
    margin-top: 20px;
    border-top: 1px solid #ddd;
    padding-top: 10px;
  }

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
  const apiUrl =
    "https://script.google.com/macros/s/AKfycbw7gi9GqPCwPdFBlmpHTn12dEbLtp1Cq1z8IDJoxqYvsEgjE4HmfXKLrJExfdCz6cgQYw/exec";

  function displayLoadingState() {
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.innerHTML = "<p>Loading...</p>";
  }

  async function fetchDataByEmail(email) {
    try {
      displayLoadingState();
      const response = await fetch(`${apiUrl}?email=${encodeURIComponent(email)}`);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      const filteredData = data.filter(
        (record) => record.Email?.toLowerCase() === email.toLowerCase()
      );
      displayResults(filteredData.length ? filteredData : []);
    } catch (error) {
      console.error("Fetch Error:", error);
      displayResults([]);
    }
  }

  function formatAddress(...parts) {
    return parts.map((part) => part || "N/A").join(", ");
  }

  function displayResults(results) {
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.innerHTML = results.length
      ? results.map(createResultCard).join("")
      : "<p>No results found.</p>";
  }

  function createResultCard(order) {
    const itemsHTML = order.items
      .map(
        (item) =>
          `<p>Item Name: ${item.itemName || "N/A"}</p>
           <p>Item Quantity: ${item.itemQuantity || "N/A"}</p>
           <p>Item Price: $${item.itemPrice || 0}</p>`
      )
      .join("");
    return `
      <div class="result-card">
        <p><strong>Order ID:</strong> ${order.OrderID || "N/A"}</p>
        <p><strong>Total Amount:</strong> $${order.totalAmount || 0}</p>
        <div>${itemsHTML}</div>
        <p><strong>Billing Address:</strong> ${formatAddress(order.BillingStreet, order.BillingCity)}</p>
        <p><strong>Email:</strong> ${order.Email || "N/A"}</p>
      </div>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const userEmail = localStorage.getItem("userEmail");
    if (userEmail) fetchDataByEmail(userEmail);
  });
</script>
