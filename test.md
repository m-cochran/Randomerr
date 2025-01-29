---
layout: default
title: Checkout
permalink: /test/
---

# Checkout


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Append to Orders on GitHub</title>
  <style>
  <body>
  <h1>Append Orders to GitHub File</h1>
  <form id="updateForm">
    <label for="orders">New Order Data (JSON Format):</label>
    <textarea id="orders" rows="10" required>
{
  "order_id": "67890",
  "customer": "Jane Smith",
  "items": [
    {"item": "Orange", "quantity": 5},
    {"item": "Grapes", "quantity": 1}
  ],
  "total": 15.75
}
    </textarea>
    <label for="token">GitHub Personal Access Token:</label>
    <input type="password" id="token" placeholder="Enter your GitHub token" required>
    <label for="username">GitHub Username:</label>
    <input type="text" id="username" placeholder="Enter your GitHub username" required>
    <label for="repo">Repository Name:</label>
    <input type="text" id="repo" placeholder="Enter your repository name" required>
    <label for="path">File Path (e.g., orders.json):</label>
    <input type="text" id="path" placeholder="Enter the file path" value="orders.json" required>
    
    <!-- Payment Form -->
    <h2>Payment Information</h2>
    <label for="name">Full Name</label>
    <input type="text" id="name" required>

    <label for="email">Email Address</label>
    <input type="email" id="email" required>

    <label for="phone">Phone Number</label>
    <input type="tel" id="phone" required>

    <h3>Billing Address</h3>
    <label for="address">Street Address</label>
    <input type="text" id="address" placeholder="Street Address" required>
    <input type="text" id="city" placeholder="City" required>
    <input type="text" id="state" placeholder="State" required>
    <input type="text" id="postal-code" placeholder="Postal Code" required>
    <input type="text" id="country" placeholder="Country" required>

    <!-- Shipping Address Checkbox -->
    <label for="same-address" class="same-line">
      Shipping address is the same as billing address
      <input type="checkbox" id="same-address">
    </label>

    <!-- Shipping Address -->
    <div id="shipping-address-container">
      <h3>Shipping Address</h3>
      <label for="shipping-address">Street Address</label>
      <input type="text" id="shipping-address" placeholder="Street Address" required>
      <input type="text" id="shipping-city" placeholder="City" required>
      <input type="text" id="shipping-state" placeholder="State" required>
      <input type="text" id="shipping-postal-code" placeholder="Postal Code" required>
      <input type="text" id="shipping-country" placeholder="Country" required>
    </div>

    <button type="submit">Update File</button>
  </form>
  <p id="response" class=""></p>

  <script>
    document.getElementById("updateForm").addEventListener("submit", async (e) => {
      e.preventDefault();

      // Parse the order details from the textarea
      const newOrder = JSON.parse(document.getElementById("orders").value);

      // Collect the additional payment and shipping details
      const paymentDetails = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        billingAddress: {
          address: document.getElementById("address").value,
          city: document.getElementById("city").value,
          state: document.getElementById("state").value,
          postalCode: document.getElementById("postal-code").value,
          country: document.getElementById("country").value
        },
        shippingAddress: document.getElementById("same-address").checked
          ? null
          : {
              address: document.getElementById("shipping-address").value,
              city: document.getElementById("shipping-city").value,
              state: document.getElementById("shipping-state").value,
              postalCode: document.getElementById("shipping-postal-code").value,
              country: document.getElementById("shipping-country").value
          }
      };

      // Attach payment details to the new order
      newOrder.paymentDetails = paymentDetails;

      // Collect GitHub credentials
      const token = document.getElementById("token").value;
      const username = document.getElementById("username").value;
      const repo = document.getElementById("repo").value;
      const path = document.getElementById("path").value;
      const responseMessage = document.getElementById("response");

      responseMessage.textContent = ""; // Clear previous messages
      responseMessage.className = "";

      try {
        // Step 1: Get the current file's contents and SHA
        const fileUrl = `https://api.github.com/repos/${username}/${repo}/contents/${path}`;
        const headers = {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json"
        };

        const fileResponse = await fetch(fileUrl, { headers });
        const fileData = await fileResponse.json();

        if (!fileResponse.ok) {
          throw new Error(
            `Error fetching file: ${fileData.message || fileResponse.statusText}`
          );
        }

        const currentContent = JSON.parse(
          decodeURIComponent(escape(atob(fileData.content))) // Decode Base64 content
        );

        // Step 2: Append the new order to the existing orders
        const updatedContent = Array.isArray(currentContent)
          ? [...currentContent, newOrder] // If the file is an array, append
          : [currentContent, newOrder]; // If it's an object, make it an array

        // Step 3: Update the file on GitHub
        const updateResponse = await fetch(fileUrl, {
          method: "PUT",
          headers,
          body: JSON.stringify({
            message: `Appending new order to ${path}`,
            content: btoa(unescape(encodeURIComponent(JSON.stringify(updatedContent, null, 2)))), // Encode updated content to Base64
            sha: fileData.sha // Include current file SHA
          })
        });

        const updateData = await updateResponse.json();

        if (!updateResponse.ok) {
          throw new Error(
            `Error updating file: ${updateData.message || updateResponse.statusText}`
          );
        }

        responseMessage.textContent = "Order added successfully!";
        responseMessage.className = "success";
      } catch (error) {
        responseMessage.textContent = `Failed: ${error.message}`;
        responseMessage.className = "error";
      }
    });
  </script>
</body>
</html>

   
