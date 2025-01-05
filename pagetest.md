---
layout: default
title: Profile
permalink: /ptdd/
---

# Profile


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
        const response = await fetch(`https://script.google.com/macros/s/AKfycby8zDlkecaCKxheG6IxDygWhMdx_KFYjIhY2sQoyQPbIGKDdY-OiLpdNnMIj9MiQRsn/exec?email=${email}`);
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
