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


  <button id="trigger-action">Trigger GitHub Action</button>


<script>
document.getElementById('trigger-action').addEventListener('click', function() {
  // Replace with your repository details
  const owner = 'm-cochran';
  const repo = 'Randomerr';
  const workflowFile = 'write-file.yml'; // The name of the workflow file

  // Replace with your personal access token
  const token = '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';

  fetch(`https://api.github.com/repos/${owner}/${repo}/actions/workflows/${workflowFile}/dispatches`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ref: 'main' // Trigger the workflow on the main branch
    })
  })
  .then(response => {
    if (response.ok) {
      alert('GitHub Action triggered successfully!');
    } else {
      alert('Failed to trigger GitHub Action');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error triggering GitHub Action');
  });
});
</script>
