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
  <title>Update Orders on GitHub</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 20px;
      padding: 20px;
      max-width: 600px;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    textarea, input {
      width: 100%;
      padding: 10px;
      font-size: 16px;
    }
    button {
      padding: 10px;
      font-size: 16px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    .success {
      color: green;
    }
    .error {
      color: red;
    }
  </style>
</head>
<body>
  <h1>Update Orders File on GitHub</h1>
  <form id="updateForm">
    <label for="orders">Enter Order Data (JSON Format):</label>
    <textarea id="orders" rows="10" required>
{
  "order_id": "12345",
  "customer": "John Doe",
  "items": [
    {"item": "Apple", "quantity": 3},
    {"item": "Banana", "quantity": 2}
  ],
  "total": 25.50
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

      const orders = document.getElementById("orders").value;
      const token = document.getElementById("token").value;
      const username = document.getElementById("username").value;
      const repo = document.getElementById("repo").value;
      const path = document.getElementById("path").value;
      const responseMessage = document.getElementById("response");

      responseMessage.textContent = ""; // Clear previous messages
      responseMessage.className = "";

      try {
        // Step 1: Get the current file's SHA
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

        const sha = fileData.sha; // File's current SHA

        // Step 2: Update the file
        const updateResponse = await fetch(fileUrl, {
          method: "PUT",
          headers,
          body: JSON.stringify({
            message: `Updating ${path}`,
            content: btoa(unescape(encodeURIComponent(orders))), // Encode content to Base64
            sha: sha // Required to update the file
          })
        });

        const updateData = await updateResponse.json();

        if (!updateResponse.ok) {
          throw new Error(
            `Error updating file: ${updateData.message || updateResponse.statusText}`
          );
        }

        responseMessage.textContent = "File updated successfully!";
        responseMessage.className = "success";
      } catch (error) {
        responseMessage.textContent = `Failed: ${error.message}`;
        responseMessage.className = "error";
      }
    });
  </script>
</body>
</html>

