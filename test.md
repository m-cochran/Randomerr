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
  <title>Write to GitHub orders.json</title>
</head>
<body>
  <h1>Submit Data to GitHub orders.json</h1>
  <form id="submitForm">
    <label for="orderData">Enter JSON Data:</label><br>
    <textarea id="orderData" rows="10" cols="50" placeholder='{"order_id": 1, "item": "example"}'></textarea><br><br>
    <button type="submit">Submit to GitHub</button>
  </form>

  <div id="statusMessage" style="margin-top: 20px;"></div>

  <script>
    document.getElementById("submitForm").addEventListener("submit", async (event) => {
      event.preventDefault();

      // GitHub configuration
      const owner = "m-cochran"; // Replace with your GitHub username
      const repo = "Randomerr"; // Replace with your repository name
      const path = "orders.json"; // File path in the repository
      const branch = "main"; // Branch name (e.g., main or master)
      const token = prompt("Enter your GitHub personal access token:");

      // Get JSON data from the textarea
      const orderData = document.getElementById("orderData").value;
      if (!orderData.trim()) {
        document.getElementById("statusMessage").textContent = "Error: JSON data is required.";
        return;
      }

      try {
        const content = btoa(unescape(encodeURIComponent(orderData))); // Encode content in Base64
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

        // Fetch existing file information (to get SHA if file exists)
        let sha = null;
        try {
          const fileResponse = await fetch(url, {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/vnd.github+json",
            },
          });
          if (fileResponse.ok) {
            const fileData = await fileResponse.json();
            sha = fileData.sha; // Get SHA of the existing file
          }
        } catch (error) {
          console.log("File does not exist or cannot fetch SHA. Proceeding to create it.");
        }

        // Prepare the API request payload
        const payload = {
          message: "Update orders.json via HTML form",
          content: content,
          branch: branch,
          sha: sha || undefined, // Include SHA for updates, exclude for new files
        };

        // Send the request to create/update the file
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
        document.getElementById("statusMessage").textContent = "An unexpected error occurred.";
      }
    });
  </script>
</body>
</html>
