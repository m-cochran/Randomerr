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
    <button type="submit">Update File</button>
  </form>
  <p id="response" class=""></p>

  <script>
    document.getElementById("updateForm").addEventListener("submit", async (e) => {
      e.preventDefault();

      const newOrder = JSON.parse(document.getElementById("orders").value);
      const token = document.getElementById("token").value;
      const username = document.getElementById("username").value;
      const repo = document.getElementById("repo").value;
      const path = document.getElementById("path").value;
      const responseMessage = document.getElementById("response");

      responseMessage.textContent = ""; // Clear previous messages
      responseMessage.className = "";

      try {
        // Step 1: Get the current file's contents and SHA
        const fileUrl = https://api.github.com/repos/${username}/${repo}/contents/${path};
        const headers = {
          Authorization: token ${token},
          Accept: "application/vnd.github.v3+json"
        };

        const fileResponse = await fetch(fileUrl, { headers });
        const fileData = await fileResponse.json();

        if (!fileResponse.ok) {
          throw new Error(
            Error fetching file: ${fileData.message || fileResponse.statusText}
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
            message: Appending new order to ${path},
            content: btoa(unescape(encodeURIComponent(JSON.stringify(updatedContent, null, 2)))), // Encode updated content to Base64
            sha: fileData.sha // Include current file SHA
          })
        });

        const updateData = await updateResponse.json();

        if (!updateResponse.ok) {
          throw new Error(
            Error updating file: ${updateData.message || updateResponse.statusText}
          );
        }

        responseMessage.textContent = "Order added successfully!";
        responseMessage.className = "success";
      } catch (error) {
        responseMessage.textContent = Failed: ${error.message};
        responseMessage.className = "error";
      }
    });
  </script>
</body>
</html>
