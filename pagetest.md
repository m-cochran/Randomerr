---
layout: default
title: Profile
permalink: /ptdd/
---

# Profile

<div class="profile-container">
  <img id="profilePicture" src="default-avatar.png" alt="Profile Picture" class="profile-picture">
  <h1 id="profileName">Name</h1>
  <p id="profileEmail">Email</p>
  <div id="profileData"></div>
</div>

<script>
  async function fetchProfileData(email) {
    const apiUrl = "https://script.google.com/macros/s/AKfycbyY9UyIOjwuLlJ0YK_KleuXXiEfkr1rnivBtbW-x1Ptn9YB4fS9ypBeCZPUECMsdpxt/exec"; // Replace with your Web App URL
    try {
      const response = await fetch(`${apiUrl}?email=${encodeURIComponent(email)}`);
      const data = await response.json();

      if (data.error) {
        document.getElementById("profileData").innerHTML = `<p class="error">${data.error}</p>`;
        return;
      }

      displayProfileData(data);
    } catch (error) {
      console.error("Error fetching profile data:", error);
      document.getElementById("profileData").innerHTML = `<p class="error">Failed to load profile data.</p>`;
    }
  }

  function displayProfileData(data) {
    const profileDataDiv = document.getElementById("profileData");
    profileDataDiv.innerHTML = `
      <p><strong>Account Number:</strong> ${data["Account Number"] || "N/A"}</p>
      <p><strong>Name:</strong> ${data["Name"] || "N/A"}</p>
      <p><strong>Email:</strong> ${data["Email"] || "N/A"}</p>
      <p><strong>OrderID:</strong> ${data["OrderID"] || "N/A"}</p>
      <p><strong>Phone:</strong> ${data["Phone"] || "N/A"}</p>
      <p><strong>Billing Address:</strong> ${formatAddress(data, "Billing")}</p>
      <p><strong>Shipping Address:</strong> ${formatAddress(data, "Shipping")}</p>
      <p><strong>Item Name:</strong> ${data["Item Name"] || "N/A"}</p>
      <p><strong>Item Quantity:</strong> ${data["Item Quantity"] || "N/A"}</p>
      <p><strong>Item Price:</strong> $${data["Item Price"] || "0.00"}</p>
      <p><strong>Total Amount:</strong> $${data["Total Amount"] || "0.00"}</p>
    `;
  }

  function formatAddress(data, type) {
    return `
      ${data[`${type} Street`] || "N/A"}, 
      ${data[`${type} City`] || "N/A"}, 
      ${data[`${type} State`] || "N/A"}, 
      ${data[`${type} Postal`] || "N/A"}, 
      ${data[`${type} Country`] || "N/A"}
    `;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const userEmail = localStorage.getItem("userEmail"); // Get logged-in user's email from localStorage
    if (userEmail) {
      document.getElementById("profileEmail").textContent = userEmail;
      fetchProfileData(userEmail);
    } else {
      document.getElementById("profileData").innerHTML = `<p class="error">No email found. Please log in.</p>`;
    }
  });
</script>
