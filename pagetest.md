---
layout: default
title: Profile
permalink: /pro/
---

# Profile




<div id="ordersList" class="orders-list"></div>



<style>
  .orders-list {
  padding: 20px;
  font-family: Arial, sans-serif;
  color: #333;
  line-height: 1.6;
}

.order-item {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.order-item h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: #4caf50;
}

.order-item p {
  margin: 5px 0;
}

.order-item p strong {
  font-weight: bold;
}

</style>


<script>
  document.addEventListener("DOMContentLoaded", () => {
  const ordersJsonUrl =
    "https://raw.githubusercontent.com/m-cochran/Randomerr/main/orders.json"; // URL to the JSON file

  // Retrieve the logged-in user's email from localStorage
  const loggedInUserEmail = localStorage.getItem("userEmail") || "johndoe@example.com"; // Replace with fallback if needed
  const ordersList = document.getElementById("ordersList");

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
      const userOrders = data.filter((order) => order.Email.trim().toLowerCase() === loggedInUserEmail.trim().toLowerCase());

      // Check if the user has matching orders
      if (userOrders.length === 0) {
        ordersList.innerHTML = `<p>No orders found for ${loggedInUserEmail}.</p>`;
      } else {
        // Populate the list with filtered orders
        ordersList.innerHTML = ""; // Clear existing content
        userOrders.forEach((order) => {
          const listItem = document.createElement("div");
          listItem.classList.add("order-item");
          listItem.innerHTML = `
            <h3>Order ID: ${order["Order ID"]}</h3>
            <p><strong>Name:</strong> ${order.Name}</p>
            <p><strong>Email:</strong> ${order.Email}</p>
            <p><strong>Order Date:</strong> ${order["Order Date"]}</p>
            <p><strong>Total Amount:</strong> $${order["Total Amount"]}</p>
            <p><strong>Item Name:</strong> ${order["Item Name"]}</p>
            <p><strong>Quantity:</strong> ${order["Item Quantity"]}</p>
            <p><strong>Shipping Address:</strong><br>
               ${order["Shipping Street"]}, ${order["Shipping City"]}, ${order["Shipping State"]} ${order["Shipping Postal"]}, ${order["Shipping Country"]}
            </p>
            <p><strong>Tracking Number:</strong> ${order["Tracking Number"]}</p>
          `;
          ordersList.appendChild(listItem);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching orders.json:", error);
      ordersList.innerHTML = `<p>Failed to load order data. Please try again later.</p>`;
    });
});

</script>
