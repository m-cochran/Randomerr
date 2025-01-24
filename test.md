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
    status.textContent = "Checking file...";

    // GitHub details
    const GITHUB_REPO = "m-cochran/Randomerr"; // Repository
    const FILE_PATH = "main/orders.json"; // File path
    const GITHUB_TOKEN = "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"; // Personal Access Token

    try {
      // GitHub API URL
      const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`;

      // Check if the file exists
      const getFileResponse = await fetch(url, {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      if (getFileResponse.ok) {
        const fileData = await getFileResponse.json();
        status.textContent = "File found!";
        console.log(fileData); // Log the file data for debugging
      } else {
        const error = await getFileResponse.json();
        status.textContent = `Error: ${error.message}`; // Error message
        console.error("Error fetching file:", error);
      }
    } catch (error) {
      console.error("Request failed:", error);
      status.textContent = `Error: ${error.message}`;
    }
  });
</script>


