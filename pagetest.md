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
  <!-- Placeholder content while data is being fetched -->
  <div class="result-card loading">
    <p><strong>Loading...:</strong> Loading...</p>
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
    <p><strong>Tracking:</strong> $50.00</p>
  </div>
</div>


<div id="raw-response-container">
  <h3>Raw API Response:</h3>
  <pre>[{ "Account Number": "ACC123", "Name": "John Doe" }]</pre>
</div>

<div id="results-container">
  <div class="result-card">
    <p><strong>Order ID:</strong> ORD-12345</p>
    <p><strong>Total Amount:</strong> $99.99</p>
    <hr>
    <p><strong>Billing Address:</strong> 123 Main St, City, State, ZIP, Country</p>
    <p><strong>Shipping Address:</strong> 456 Elm St, City, State, ZIP, Country</p>
    <p><strong>Phone:</strong> 123-456-7890</p>
    <p><strong>Email:</strong> email@example.com</p>
    <a href="#">View Details</a>
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



<style>
  /* Container Styles */
  #results-container, #raw-response-container {
    margin: 20px auto;
    padding: 10px;
    max-width: 800px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  #results-container h3, #raw-response-container h3 {
    margin-top: 0;
    font-size: 1.5em;
    color: #333;
  }

  /* Raw API Response Styling */
  #raw-response-container pre {
    background-color: #272822; /* Dark background for raw JSON */
    color: #f8f8f2;           /* Light text for contrast */
    padding: 15px;
    border-radius: 6px;
    overflow-x: auto;
    font-family: monospace;
    font-size: 0.95em;
  }

  /* Result Card Styling */
  .result-card {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .result-card p {
    margin: 5px 0;
    line-height: 1.5;
    color: #444;
  }

  .result-card p strong {
    color: #222;
    font-weight: 600;
  }

  .result-card hr {
    margin: 15px 0;
    border: none;
    border-top: 1px solid #eee;
  }

  /* Button and Link Styles */
  .result-card a {
    display: inline-block;
    margin-top: 10px;
    padding: 8px 12px;
    background-color: #007BFF;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    font-size: 0.9em;
    transition: background-color 0.3s;
  }

  .result-card a:hover {
    background-color: #0056b3;
  }
</style>




<script>
  const apiUrl =
  "https://script.google.com/macros/s/AKfycbw7gi9GqPCwPdFBlmpHTn12dEbLtp1Cq1z8IDJoxqYvsEgjE4HmfXKLrJExfdCz6cgQYw/exec";

// Display loading state
function displayLoadingState() {
  const resultsContainer = document.getElementById("results-container");
  resultsContainer.innerHTML = "<p>Loading...</p>";
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

    const data = await response.json();
    console.log("Raw API Response:", data);

    // Log each record to check the structure and verify the Email field
    data.forEach((record, index) => {
      // Inspecting the raw email field
      console.log(`Record ${index}:`, record);
      console.log(`Email field raw value:`, `'${record["Email"]}'`); // Show email with quotes to check for spaces
    });

    // Filter data for the given email (case-insensitive, clean the field names)
    const filteredData = data.filter((record) => {
      const emailFromData = (record["Email"]?.trim() || "").toLowerCase(); // Clean and trim
      const emailToCompare = email.trim().toLowerCase(); // Trim and make case-insensitive
      console.log(`Comparing: Data Email = "${emailFromData}", Provided Email = "${emailToCompare}"`); // Log comparison
      return emailFromData === emailToCompare; // Compare after trimming and converting to lowercase
    });

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




// Format address with fallback values
function formatAddress(street, city, state, postal, country) {
  return [street, city, state, postal, country]
    .map((part) => escapeHTML(part || "N/A"))
    .join(", ");
}

// Escape HTML to prevent injection
function escapeHTML(str) {
  const element = document.createElement("div");
  if (str) element.innerText = str;
  return element.innerHTML;
}

// Display results in the container
function displayResults(results) {
  const resultsContainer = document.getElementById("results-container");
  resultsContainer.innerHTML = ""; // Clear previous results

  if (results.length === 0) {
    resultsContainer.innerHTML = "<p>No results found.</p>";
    return;
  }

  // Group results by orderId
  const groupedResults = results.reduce((acc, result) => {
    const { OrderID: orderId } = result;

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
      itemName: result.ItemName,
      itemQuantity: result.ItemQuantity,
      itemPrice: result.ItemPrice,
      itemTotal: itemTotal,
    });

    acc[orderId].totalAmount += itemTotal;
    return acc;
  }, {});

  // Create and append result cards
  Object.values(groupedResults).forEach((order) => {
    const resultCard = document.createElement("div");
    resultCard.className = "result-card";

    let itemsHTML = order.items
      .map(
        (item) => `
        <p>Item Name: ${item.itemName || "N/A"}</p>
        <p>Item Quantity: ${item.itemQuantity || "N/A"}</p>
        <p>Item Price: $${parseFloat(item.itemPrice || 0).toFixed(2)}</p>
        <p>Item Total: $${item.itemTotal.toFixed(2)}</p>
        <hr>`
      )
      .join("");

    resultCard.innerHTML = `
      <p><strong>Order ID:</strong> ${order.OrderID || "N/A"}</p>
      <p><strong>Total Amount:</strong> $${parseFloat(order.totalAmount).toFixed(2)}</p>
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
      <p><strong>Phone:</strong> ${order.Phone || "N/A"}</p>
      <p><strong>Email:</strong> ${order.Email || "N/A"}</p>
    `;

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

    const data = await response.json();
    console.log("Raw API Response:", data);

    // Display raw API response
    displayRawResponse(data);

    // Log each record to check the structure and verify the Email field
    data.forEach((record, index) => {
      console.log(`Record ${index}:`, record);
    });

    // Filter data for the given email (case-insensitive, clean the field names)
    const filteredData = data.filter((record) => {
      const emailFromData = (record["Email"]?.trim() || "").toLowerCase();
      const emailToCompare = email.trim().toLowerCase();
      console.log(`Comparing: Data Email = "${emailFromData}", Provided Email = "${emailToCompare}"`);
      return emailFromData === emailToCompare;
    });

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

// Function to display raw API response
function displayRawResponse(data) {
  const rawResponseContainer = document.getElementById("raw-response-container");
  rawResponseContainer.innerHTML = `
    <h3>Raw API Response:</h3>
    <pre>${escapeHTML(JSON.stringify(data, null, 2))}</pre>
  `;
}

// Escape HTML to prevent injection
function escapeHTML(str) {
  const element = document.createElement("div");
  if (str) element.innerText = str;
  return element.innerHTML;
}
















  
</script>
