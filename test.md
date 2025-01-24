---
layout: default
title: Checkout
permalink: /test/
---

# Checkout


  <title>GitHub Write Test</title>
  <style>
    h1 {
      color: #333;
    }

    button {
      background-color: #007bff;
      color: #fff;
      padding: 10px 20px;
      font-size: 16px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #0056b3;
    }

    button:active {
      background-color: #003f7f;
    }

    #status {
      margin-top: 20px;
      font-size: 14px;
      color: #666;
    }
  </style>

  <h1>GitHub Write Test</h1>
  <button id="write-button">Write to GitHub</button>
  <p id="status">Click the button to start writing to GitHub.</p>

<script>
  document.getElementById("write-button").addEventListener("click", async () => {
    const status = document.getElementById("status");
    status.textContent = "Writing to GitHub...";

    const GITHUB_REPO = "m-cochran/Randomerr"; // Your repo
    const FILE_PATH = "main/orders.json"; // Path to your file
    const GITHUB_TOKEN = "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"; // Your GitHub token

    const dataToWrite = {
      message: "Hello, GitHub!",
      timestamp: new Date().toISOString(),
    };

    try {
      const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`;

      const getFileResponse = await fetch(url, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      // Check the status code and capture more information
      if (!getFileResponse.ok) {
        const error = await getFileResponse.json();
        console.error("Error getting file:", error);
        status.textContent = `Error: ${error.message}`;
        return;
      }

      const fileData = await getFileResponse.json();
      const sha = fileData.sha; // SHA from the file data (if it exists)

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          message: "Write test file",
          content: btoa(JSON.stringify(dataToWrite, null, 2)), // Base64 encode the content
          sha: sha, // Include the SHA if the file exists
        }),
      });

      if (response.ok) {
        status.textContent = "File written successfully!";
      } else {
        const error = await response.json();
        console.error("Error writing to file:", error);
        status.textContent = `Error: ${error.message}`;
      }
    } catch (error) {
      console.error("Request failed:", error);
      status.textContent = `Error: ${error.message}`;
    }
  });
</script>

