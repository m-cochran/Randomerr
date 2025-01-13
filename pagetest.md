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

<div id="raw-response-container" style="border: 1px solid #ddd; padding: 10px; margin: 10px 0; background: #f9f9f9;">
  <h3>Raw API Response</h3>
  <pre id="raw-response" style="overflow-x: auto; white-space: pre-wrap; word-wrap: break-word; background: #fff; padding: 10px; border-radius: 5px;"></pre>
</div>






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

  function displayLoadingState() {
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.innerHTML = "<p>Loading...</p>";
    document.getElementById("raw-response").textContent = "Fetching data...";
  }

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

      // Display raw response in the designated container
      document.getElementById("raw-response").textContent = JSON.stringify(data, null, 2);

      const filteredData = data.filter((record) => {
        const emailFromData = (record["Email"]?.trim() || "").toLowerCase();
        const emailToCompare = email.trim().toLowerCase();
        return emailFromData === emailToCompare;
      });

      if (filteredData.length === 0) {
        displayResults([]);
        return;
      }

      displayResults(filteredData);
    } catch (error) {
      console.error("Fetch Error:", error);
      document.getElementById("raw-response").textContent = "Error fetching data.";
      displayResults([]);
    }
  }

  function displayResults(results) {
    const resultsContainer = document.getElementById("results-container");
    resultsContainer.innerHTML = "";

    if (results.length === 0) {
      resultsContainer.innerHTML = "<p>No results found.</p>";
      return;
    }

    results.forEach((result) => {
      const resultCard = document.createElement("div");
      resultCard.className = "result-card";
      resultCard.innerHTML = `
        <p><strong>Order ID:</strong> ${result.OrderID || "N/A"}</p>
        <p><strong>Name:</strong> ${result.Name || "N/A"}</p>
        <p><strong>Email:</strong> ${result.Email || "N/A"}</p>
      `;
      resultsContainer.appendChild(resultCard);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const userEmail = localStorage.getItem("userEmail") || null;
    if (userEmail) {
      fetchDataByEmail(userEmail);
    } else {
      document.getElementById("raw-response").textContent = "No user email found in localStorage.";
    }
  });
</script>
