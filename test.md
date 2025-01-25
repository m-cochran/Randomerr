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
  <title>GitHub Orders JSON Writer</title>
</head>
<body>
  <h1>Write to GitHub orders.json</h1>
  <button id="writeButton">Write to GitHub</button>

  <script>
    document.getElementById("writeButton").addEventListener("click", async () => {
      const token = "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"; // Replace with your GitHub token
      const owner = "m-cochran"; // Replace with your GitHub username
      const repo = "Randomerr"; // Replace with your GitHub repo name
      const path = "orders.json"; // Path to the file in the repository

      // JSON data to write
      const orders = [
        {
          "Account Number": "123456",
          "Name": "John Doe",
          "Email": "reachmycupofearth@gmail.com",
          "Order Date": "2025-01-24",
          "Order ID": "ORD001",
          "Phone": "123-456-7890",
          "Billing Street": "123 Main St",
          "Billing City": "New York",
          "Billing State": "NY",
          "Billing Postal": "10001",
          "Billing Country": "USA",
          "Shipping Street": "456 Elm St",
          "Shipping City": "Los Angeles",
          "Shipping State": "CA",
          "Shipping Postal": "90001",
          "Shipping Country": "USA",
          "Item Name": "Laptop",
          "Item Quantity": 1,
          "Item Price": 1000,
          "Total Amount": 1000,
          "Tracking Number": "TRK12345"
        },
        {
          "Account Number": "cvdvsdvvdv",
          "Name": "Marlin Cochran",
          "Email": "chilarue@msn.com",
          "Order Date": "1111-11-11",
          "Order ID": "111111",
          "Phone": "7248106009",
          "Billing Street": "942 Meldon Ave",
          "Billing City": "Donora",
          "Billing State": "PA",
          "Billing Postal": "15033",
          "Billing Country": "United States",
          "Shipping Street": "942 Meldon Ave",
          "Shipping City": "Donora",
          "Shipping State": "PA",
          "Shipping Postal": "15033",
          "Shipping Country": "United States",
          "Item Name": "wvwvwv",
          "Item Quantity": 8,
          "Item Price": 11,
          "Total Amount": 11,
          "Tracking Number": "111111"
        }
      ];

      try {
        // Fetch the current file to get its SHA
        const getFileResponse = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );

        const fileData = await getFileResponse.json();
        const fileSha = fileData.sha;

        // Commit the new data
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
          {
            method: "PUT",
            headers: {
              Authorization: `token ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              message: "Update orders.json",
              content: btoa(JSON.stringify(orders, null, 2)), // Encode file content in base64
              sha: fileSha, // Required to update an existing file
            }),
          }
        );

        if (response.ok) {
          alert("orders.json updated successfully on GitHub!");
        } else {
          alert("Failed to update orders.json: " + response.statusText);
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred: " + error.message);
      }
    });
  </script>
</body>
</html>

