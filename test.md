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
  <title>Write to GitHub</title>
</head>
<body>
  <h1>Write Orders to GitHub</h1>
  <button id="writeButton">Write to GitHub</button>

  <script>
    const ordersData = [
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

    document.getElementById('writeButton').addEventListener('click', async () => {
      const token = prompt('Enter your GitHub Personal Access Token'); // Securely store this in a real application // Securely store this in a real application
      const repo = "Randomerr"; // Replace with your GitHub username and repository name
      const filePath = "orders.json"; // File path in the repository

      try {
        // Fetch the current file content to get the SHA (if the file exists)
        const response = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const fileData = await response.json();
        const sha = fileData.sha || null;

        // Write the new file content
        const writeResponse = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: "Update orders.json",
            content: btoa(JSON.stringify(ordersData, null, 2)),
            sha: sha
          })
        });

        if (writeResponse.ok) {
          alert('File written successfully!');
        } else {
          throw new Error('Failed to write file.');
        }
      } catch (error) {
        console.error(error);
        alert('Error writing file to GitHub.');
      }
    });
  </script>
</body>
</html>

