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
  // Function to fetch and display data
  async function fetchDataByEmail(email) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '<div class="spinner"></div>'; // Show loading spinner

    try {
      // Construct the API URL to fetch data by email
      const url = "https://script.google.com/macros/s/AKfycbw7gi9GqPCwPdFBlmpHTn12dEbLtp1Cq1z8IDJoxqYvsEgjE4HmfXKLrJExfdCz6cgQYw/exec";

      
      // Fetch the data
      const response = await fetch(url);
      const data = await response.json();

      // Remove the loading spinner
      resultsContainer.innerHTML = '';

      // Check if the API returned any errors
      if (data.error) {
        resultsContainer.innerHTML = `<p>Error: ${data.error}</p>`;
        return;
      }

      // Process and display the data
      data.forEach(entry => {
        const resultCard = document.createElement('div');
        resultCard.classList.add('result-card');

        // For user sign-up data (non-order rows)
        const isOrderRow = entry['Order ID'];  // Check if it's an order row

        if (isOrderRow) {
          // Format order data
          resultCard.innerHTML = `
            <p><strong>Email:</strong> ${entry['Email']}</p>
            <p><strong>Full Name:</strong> ${entry['Name']}</p>
            <p><strong>Phone:</strong> ${entry['Phone']}</p>
            <p><strong>Billing Address:</strong> ${entry['Billing Street']}, ${entry['Billing City']}, ${entry['Billing State']} ${entry['Billing Postal']}, ${entry['Billing Country']}</p>
            <p><strong>Shipping Address:</strong> ${entry['Shipping Street']}, ${entry['Shipping City']}, ${entry['Shipping State']} ${entry['Shipping Postal']}, ${entry['Shipping Country']}</p>
            <p><strong>Order Date:</strong> ${entry['Order Date']}</p>
            <p><strong>Order ID:</strong> ${entry['Order ID']}</p>
            <p><strong>Item Name:</strong> ${entry['Item Name']}</p>
            <p><strong>Item Quantity:</strong> ${entry['Item Quantity']}</p>
            <p><strong>Item Price:</strong> ${entry['Item Price']}</p>
            <p><strong>Total Amount:</strong> ${entry['Total Amount']}</p>
          `;
        } else {
          // Format user sign-up data (non-order rows)
          resultCard.innerHTML = `
            <p><strong>Email:</strong> ${entry['Email']}</p>
            <p><strong>Full Name:</strong> ${entry['Name']}</p>
            <p><strong>Phone:</strong> ${entry['Phone']}</p>
            <p><strong>Billing Address:</strong> ${entry['Billing Street']}, ${entry['Billing City']}, ${entry['Billing State']} ${entry['Billing Postal']}, ${entry['Billing Country']}</p>
            <p><strong>Shipping Address:</strong> ${entry['Shipping Street']}, ${entry['Shipping City']}, ${entry['Shipping State']} ${entry['Shipping Postal']}, ${entry['Shipping Country']}</p>
          `;
        }

        // Append the result card to the container
        resultsContainer.appendChild(resultCard);
      });
    } catch (error) {
      // Handle errors
      resultsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  }

  // Call the fetchDataByEmail function when the page loads with a specified email
  document.addEventListener('DOMContentLoaded', function () {
    const userEmail = 'reachmycupofearth@gmail.com'; // Replace with the email to search for
    fetchDataByEmail(userEmail);
  });
</script>
