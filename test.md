---
layout: default
title: Checkout
permalink: /test/
---

# Checkout


<form id="submitForm">
  <label>Account Number: <input type="text" name="accountNumber" required /></label>
  <label>Name: <input type="text" name="name" required /></label>
  <label>Email: <input type="email" name="email" required /></label>
  <label>Order Date: <input type="date" name="orderDate" required /></label>
  <label>Order ID: <input type="text" name="orderID" required /></label>
  <label>Phone: <input type="tel" name="phone" required /></label>
  <label>Billing Street: <input type="text" name="billingStreet" required /></label>
  <label>Billing City: <input type="text" name="billingCity" required /></label>
  <label>Billing State: <input type="text" name="billingState" required /></label>
  <label>Billing Postal: <input type="text" name="billingPostal" required /></label>
  <label>Billing Country: <input type="text" name="billingCountry" required /></label>
  <label>Shipping Street: <input type="text" name="shippingStreet" required /></label>
  <label>Shipping City: <input type="text" name="shippingCity" required /></label>
  <label>Shipping State: <input type="text" name="shippingState" required /></label>
  <label>Shipping Postal: <input type="text" name="shippingPostal" required /></label>
  <label>Shipping Country: <input type="text" name="shippingCountry" required /></label>
  <label>Item Name: <input type="text" name="itemName" required /></label>
  <label>Item Quantity: <input type="number" name="itemQuantity" required /></label>
  <label>Item Price: <input type="number" name="itemPrice" step="0.01" required /></label>
  <label>Total Amount: <input type="number" name="totalAmount" step="0.01" required /></label>
  <label>Tracking Number: <input type="text" name="trackingNumber" /></label>
  <button type="submit">Submit</button>
</form>
<p id="statusMessage"></p>



<script>
  document.getElementById("submitForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const order = {
      "Account Number": formData.get("accountNumber"),
      "Name": formData.get("name"),
      "Email": formData.get("email"),
      "Order Date": formData.get("orderDate"),
      "Order ID": formData.get("orderID"),
      "Phone": formData.get("phone"),
      "Billing Street": formData.get("billingStreet"),
      "Billing City": formData.get("billingCity"),
      "Billing State": formData.get("billingState"),
      "Billing Postal": formData.get("billingPostal"),
      "Billing Country": formData.get("billingCountry"),
      "Shipping Street": formData.get("shippingStreet"),
      "Shipping City": formData.get("shippingCity"),
      "Shipping State": formData.get("shippingState"),
      "Shipping Postal": formData.get("shippingPostal"),
      "Shipping Country": formData.get("shippingCountry"),
      "Item Name": formData.get("itemName"),
      "Item Quantity": parseInt(formData.get("itemQuantity")),
      "Item Price": parseFloat(formData.get("itemPrice")),
      "Total Amount": parseFloat(formData.get("totalAmount")),
      "Tracking Number": formData.get("trackingNumber"),
    };

    const owner = "m-cochran"; // Replace with your GitHub username
    const repo = "Randomerr"; // Replace with your repository name
    const path = "orders.json"; // File path in the repository
    const branch = "main"; // Branch name
    const token = prompt("Enter your GitHub personal access token:");

    try {
      const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

      // Fetch existing orders.json
      let sha = null;
      let existingOrders = [];
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
          },
        });

        if (response.ok) {
          const fileData = await response.json();
          sha = fileData.sha;
          existingOrders = JSON.parse(atob(fileData.content)); // Decode existing JSON
        }
      } catch (error) {
        console.log("orders.json does not exist. A new file will be created.");
      }

      // Merge new order
      const updatedOrders = [...existingOrders, order];

      // Prepare the API payload
      const payload = {
        message: "Update orders.json via HTML form",
        content: btoa(unescape(encodeURIComponent(JSON.stringify(updatedOrders, null, 2)))),
        branch: branch,
        sha: sha || undefined,
      };

      // Update orders.json on GitHub
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        document.getElementById("statusMessage").textContent = "Success: orders.json has been updated!";
      } else {
        const errorData = await response.json();
        document.getElementById("statusMessage").textContent = `Error: ${errorData.message}`;
      }
    } catch (error) {
      console.error("Error submitting data to GitHub:", error);
      document.getElementById("statusMessage").textContent = "An unexpected error occurred. Check the console for details.";
    }
  });
</script>
