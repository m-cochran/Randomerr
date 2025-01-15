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
  const apiUrl = "https://script.google.com/macros/s/AKfycbw7gi9GqPCwPdFBlmpHTn12dEbLtp1Cq1z8IDJoxqYvsEgjE4HmfXKLrJExfdCz6cgQYw/exec";

// Display loading state
function displayLoadingState() {
  const resultsContainer = document.getElementById("results-container");
  if (resultsContainer) {
    resultsContainer.innerHTML = '<div class="spinner"></div><p>Loading...</p>';
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

    const response = await fetch(`${apiUrl}?email=${encodeURIComponent(email)}`);
    if (!response.ok) {
      console.error(`HTTP Error: ${response.status}`);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const rawData = await response.json();
    console.log("Raw API Response:", rawData);

    if (rawData.error) {
      console.error("API Error:", rawData.error);
      displayErrorState();
      return;
    }

    displayResults(rawData);
  } catch (error) {
    console.error("Fetch Error:", error);
    displayErrorState();
  }
}

// Display results
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

  results.forEach((result) => {
    const resultCard = document.createElement("div");
    resultCard.className = "result-card";

    resultCard.innerHTML = `
      <p><strong>Email:</strong> ${escapeHTML(result.Email)}</p>
      <p><strong>Full Name:</strong> ${escapeHTML(result.FullName)}</p>
      <p><strong>Phone:</strong> ${escapeHTML(result.Phone)}</p>
      <p><strong>Billing Address:</strong> ${escapeHTML(result.BillingAddress)}</p>
      <p><strong>Shipping Address:</strong> ${escapeHTML(result.ShippingAddress)}</p>
    `;

    resultsContainer.appendChild(resultCard);
  });
}

// Escape HTML to prevent injection
function escapeHTML(str) {
  const element = document.createElement("div");
  if (str) element.innerText = str;
  return element.innerHTML;
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
