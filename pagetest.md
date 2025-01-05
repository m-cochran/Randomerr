---
layout: default
title: Profile
permalink: /profile/
---

# Profile



<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Profile Page</title>
  <link rel="stylesheet" href="styles.css">
  <script src="https://accounts.google.com/gsi/client" async defer></script>
  <script>
    document.addEventListener("DOMContentLoaded", initializeProfilePage);
  </script>
</head>
<body>
  <header>
    <nav class="access-bar">
      <!-- Login or Profile buttons will be updated dynamically -->
    </nav>
  </header>

  <main>
    <section class="profile-section">
      <div class="profile-header">
        <img id="profilePicture" src="default-avatar.png" alt="Profile Picture" class="profile-picture">
        <h1 id="profileName">Name</h1>
        <p id="profileEmail">Email</p>
      </div>

      <table class="profile-table">
        <thead>
          <tr>
            <th>Field</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody id="profileDetails">
          <tr>
            <td>Account Number</td>
            <td id="accountNumber">Loading...</td>
          </tr>
          <tr>
            <td>Phone</td>
            <td id="phone">Loading...</td>
          </tr>
          <tr>
            <td>Billing Address</td>
            <td id="billingAddress">Loading...</td>
          </tr>
          <tr>
            <td>Shipping Address</td>
            <td id="shippingAddress">Loading...</td>
          </tr>
          <tr>
            <td>Order ID</td>
            <td id="orderId">Loading...</td>
          </tr>
          <tr>
            <td>Item Name</td>
            <td id="itemName">Loading...</td>
          </tr>
          <tr>
            <td>Item Quantity</td>
            <td id="itemQuantity">Loading...</td>
          </tr>
          <tr>
            <td>Item Price</td>
            <td id="itemPrice">Loading...</td>
          </tr>
          <tr>
            <td>Total Amount</td>
            <td id="totalAmount">Loading...</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>

  <script>
    async function fetchAccountDetails(email) {
      try {
        const response = await fetch(`https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_ID/exec?email=${email}`);
        if (response.ok) {
          const data = await response.json();
          updateProfileDetails(data);
        } else {
          console.error("Failed to fetch account details");
        }
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    }

    function updateProfileDetails(details) {
      document.getElementById("accountNumber").textContent = details.accountNumber || "N/A";
      document.getElementById("phone").textContent = details.phone || "N/A";
      document.getElementById("billingAddress").textContent = `${details.billingStreet}, ${details.billingCity}, ${details.billingState}, ${details.billingPostal}, ${details.billingCountry}`;
      document.getElementById("shippingAddress").textContent = `${details.shippingStreet}, ${details.shippingCity}, ${details.shippingState}, ${details.shippingPostal}, ${details.shippingCountry}`;
      document.getElementById("orderId").textContent = details.orderId || "N/A";
      document.getElementById("itemName").textContent = details.itemName || "N/A";
      document.getElementById("itemQuantity").textContent = details.itemQuantity || "N/A";
      document.getElementById("itemPrice").textContent = details.itemPrice || "N/A";
      document.getElementById("totalAmount").textContent = details.totalAmount || "N/A";
    }

    function initializeProfilePage() {
      const userLoggedIn = localStorage.getItem("userLoggedIn") === "true";
      if (userLoggedIn) {
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail) {
          fetchAccountDetails(userEmail);
        }
      } else {
        // Redirect to login page or display a login message
        alert("Please log in to view your profile.");
        window.location.href = "login.html";
      }
    }
  </script>
</body>
</html>
