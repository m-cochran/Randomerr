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
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

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
    const apiUrl = "https://script.google.com/macros/s/AKfycbw7gi9GqPCwPdFBlmpHTn12dEbLtp1Cq1z8IDJoxqYvsEgjE4HmfXKLrJExfdCz6cgQYw/exec";

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

      if (data.error) {
        displayErrorState();
        return;
      }

      const user = data[0]; // Assuming there is only one matching record for the email

      cardContainer.innerHTML = `
        <div class="card">
          <h2>User Information</h2>
          <p><strong>Email:</strong> ${user["\"Email\""] || "N/A"}</p>
          <p><strong>Full Name:</strong> ${user["Full Name"] || "N/A"}</p>
          <p><strong>Phone:</strong> ${user["Phone"] || "N/A"}</p>
          <p><strong>Address:</strong> ${user["Address"] || "N/A"}</p>
          <p><strong>City:</strong> ${user["City"] || "N/A"}</p>
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
