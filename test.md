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
  <title>Write to GitHub JSON</title>
</head>
<body>
  <h1>Write to GitHub order.json</h1>
  <form id="githubForm">
    <label for="content">Order JSON Content:</label><br>
    <textarea id="content" rows="10" cols="50" placeholder='{"order_id": 1, "item": "example"}'></textarea><br><br>
    <button type="submit">Submit</button>
  </form>

  <div id="response" style="margin-top: 20px; color: green;"></div>

  <script>
    document.getElementById("githubForm").addEventListener("submit", async (event) => {
      event.preventDefault();

      const token = prompt("Enter your GitHub personal access token:");
      const owner = "'m-cochran"; // Replace with your GitHub username
      const repo = "Randomerr"; // Replace with your repository name
      const path = "orders.json"; // File path in the repository
      const branch = "main"; // Replace with your branch name (e.g., main or master)
      const content = btoa(unescape(encodeURIComponent(document.getElementById("content").value)));

      const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

      // Fetch the existing file's SHA (if it exists)
      let sha;
      try {
        const existingFile = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
          },
        });
        if (existingFile.ok) {
          const data = await existingFile.json();
          sha = data.sha;
        }
      } catch (error) {
        console.error("Error fetching file SHA:", error);
      }

      // Create or update the file
      const payload = {
        message: "Update order.json",
        content: content,
        branch: branch,
        sha: sha || undefined, // Include sha if file exists, otherwise undefined
      };

      try {
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          document.getElementById("response").textContent = "File updated successfully!";
        } else {
          const errorData = await response.json();
          document.getElementById("response").textContent = `Error: ${errorData.message}`;
        }
      } catch (error) {
        console.error("Error updating file:", error);
        document.getElementById("response").textContent = "An error occurred.";
      }
    });
  </script>
</body>
</html>
