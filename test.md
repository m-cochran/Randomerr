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
    <title>Test Order Save</title>
</head>
<body>
    <h1>Place an Order</h1>
    <form id="orderForm">
        <label for="orderId">Order ID:</label>
        <input type="text" id="orderId" name="orderId" required><br><br>
        
        <label for="customerName">Customer Name:</label>
        <input type="text" id="customerName" name="customerName" required><br><br>

        <label for="items">Items (comma separated):</label>
        <input type="text" id="items" name="items" required><br><br>

        <label for="totalAmount">Total Amount:</label>
        <input type="number" id="totalAmount" name="totalAmount" required><br><br>

        <button type="submit">Place Order</button>
    </form>

    <p id="statusMessage"></p>

    <script>
        // Function to save order to GitHub
        async function saveOrderToGitHub(orderDetails) {
            const token = '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'; // Replace with your token
            const owner = 'm-cochran';  // Replace with your GitHub username
            const repo = 'Randomerr';  // Replace with your repository name
            const filePath = 'orders.json';  // Path to the orders file in your repo

            // Get the current content of orders.json
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                }
            });
            const data = await response.json();

            let currentOrders = [];
            if (data.content) {
                // Decode base64 content and parse as JSON
                currentOrders = JSON.parse(atob(data.content));
            }

            // Add the new order to the list of orders
            currentOrders.push(orderDetails);

            // Prepare the payload to update the file
            const payload = {
                message: 'Adding new order',
                content: btoa(JSON.stringify(currentOrders)),  // Encode the updated JSON
                sha: data.sha,  // Get the file's current SHA
            };

            // Send a PUT request to update the file
            const updateResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json',
                },
                body: JSON.stringify(payload),
            });

            const updateData = await updateResponse.json();
            if (updateData.content) {
                document.getElementById('statusMessage').textContent = 'Order saved successfully!';
            } else {
                document.getElementById('statusMessage').textContent = 'Failed to save order.';
            }
        }

        // Handle form submission
        document.getElementById('orderForm').addEventListener('submit', function(event) {
            event.preventDefault();  // Prevent form submission from refreshing the page

            const orderId = document.getElementById('orderId').value;
            const customerName = document.getElementById('customerName').value;
            const items = document.getElementById('items').value.split(',').map(item => item.trim());
            const totalAmount = parseFloat(document.getElementById('totalAmount').value);

            const newOrder = {
                orderId: orderId,
                customerName: customerName,
                items: items.map(item => ({ itemName: item, quantity: 1, price: totalAmount / items.length })),
                totalAmount: totalAmount,
                date: new Date().toISOString(),
            };

            // Call the function to save the order
            saveOrderToGitHub(newOrder);
        });
    </script>
</body>
</html>
