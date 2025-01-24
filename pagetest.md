---
layout: default
title: Profile
permalink: /pro/
---

# Profile




<div id="ordersContainer" class="orders-container">
  <h2>My Orders</h2>
  <div id="ordersList" class="orders-list"></div>
</div>




<style>
  .orders-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.orders-container h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.orders-list {
  max-height: 400px; /* Limits the height of the box */
  overflow-y: auto; /* Enables vertical scrolling */
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #06f;
}

.order-item {
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  background-color: #fff;
  overflow: hidden;
}

.order-header {
  background-color: #4caf50;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
}

.order-header:hover {
  background-color: #45a049;
}

.order-header .toggle-icon {
  font-size: 18px;
}

.order-details {
  display: none; /* Initially hidden */
  padding: 15px;
  font-size: 14px;
  line-height: 1.6;
  background-color: #f7f7f7;
  border-top: 1px solid #ddd;
}

.order-details p {
  margin: 5px 0;
}

.order-details strong {
  font-weight: bold;
}

</style>


<script>
  document.addEventListener("DOMContentLoaded", () => {
    const ordersJsonUrl =
      "https://raw.githubusercontent.com/m-cochran/Randomerr/main/orders.json"; // URL to the JSON file

    // Retrieve the logged-in user's email from localStorage
    const loggedInUserEmail = localStorage.getItem("userEmail");
    const ordersList = document.getElementById("ordersList");

    // Check if the user is logged in
    if (!loggedInUserEmail) {
      // Display a message prompting the user to log in
      ordersList.innerHTML = `<p>Please log in to view your orders.</p>`;
      return;
    }

    // Display a loading message
    ordersList.innerHTML = `<p>Loading your orders...</p>`;

    // Fetch orders.json
    fetch(ordersJsonUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load orders.json: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Filter orders based on the logged-in user's email
        const userOrders = data.filter(
          (order) => order.Email.trim().toLowerCase() === loggedInUserEmail.trim().toLowerCase()
        );

        // Handle cases where no orders match the user's email
        if (userOrders.length === 0) {
          ordersList.innerHTML = `<p>No orders found for ${loggedInUserEmail}.</p>`;
          return;
        }

        // Populate the collapsible list with filtered orders
        ordersList.innerHTML = ""; // Clear existing content
        userOrders.forEach((order, index) => {
          const listItem = document.createElement("div");
          listItem.classList.add("order-item");
          listItem.innerHTML = `
            <div class="order-header" onclick="toggleOrderDetails(${index})">
              <span>Order ID: ${order["Order ID"]}</span>
              <span class="toggle-icon">+</span>
            </div>
            <div class="order-details" id="orderDetails-${index}" style="display: none;">
              <p><strong>Name:</strong> ${order.Name}</p>
              <p><strong>Email:</strong> ${order.Email}</p>
              <p><strong>Order Date:</strong> ${order["Order Date"]}</p>
              <p><strong>Total Amount:</strong> $${order["Total Amount"]}</p>
              <p><strong>Item Name:</strong> ${order["Item Name"]}</p>
              <p><strong>Quantity:</strong> ${order["Item Quantity"]}</p>
              <p><strong>Shipping Address:</strong><br>
                ${order["Shipping Street"]}, ${order["Shipping City"]}, ${order["Shipping State"]} ${order["Shipping Postal"]}, ${order["Shipping Country"]}
              </p>
              <p><strong>Billing Address:</strong><br>
                ${order["Billing Street"]}, ${order["Billing City"]}, ${order["Billing State"]} ${order["Billing Postal"]}, ${order["Billing Country"]}
              </p>
              <p><strong>Tracking Number:</strong> ${order["Tracking Number"]}</p>
            </div>
          `;
          ordersList.appendChild(listItem);
        });
      })
      .catch((error) => {
        console.error("Error fetching orders.json:", error);
        ordersList.innerHTML = `<p>Failed to load order data. Please try again later.</p>`;
      });
  });

  // Function to toggle order details visibility
  function toggleOrderDetails(index) {
    const details = document.getElementById(`orderDetails-${index}`);
    const icon = details.previousElementSibling.querySelector(".toggle-icon");
    const isVisible = details.style.display === "block";
    details.style.display = isVisible ? "none" : "block";
    icon.textContent = isVisible ? "+" : "-";
  }
</script>
