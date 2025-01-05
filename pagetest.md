---
layout: default
title: Profile
permalink: /ptdd/
---

# Profile


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Profile Page</title>
  <style>
    /* Add some basic styles */
    .profile-container {
      text-align: center;
    }
    .profile-container img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
    .account-info {
      margin-top: 20px;
    }
    .account-info p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
  <div id="profilePage">
    <div class="profile-container">
      <img id="profilePicture" src="default-avatar.png" alt="Profile Picture">
      <h1 id="profileName">Loading...</h1>
      <p id="profileEmail">Loading...</p>
    </div>
    <div id="accountInfo" class="account-info">
      <!-- Account details will be displayed here -->
    </div>
  </div>

  <script>
async function getAccountData(email) {
  const response = await fetch(`https://script.google.com/macros/s/AKfycby8zDlkecaCKxheG6IxDygWhMdx_KFYjIhY2sQoyQPbIGKDdY-OiLpdNnMIj9MiQRsn/exec?email=${email}`);
  const data = await response.json();
  
  if (data.message) {
    // No data found, handle appropriately
    alert(data.message);
  } else {
    // Use the account data (e.g., Account Number, Name, etc.)
    console.log(data);
    // Update your profile page with the retrieved data
    document.getElementById("accountNumber").textContent = data[0]; // Adjust based on data structure
    document.getElementById("userName").textContent = data[1];
    document.getElementById("userEmail").textContent = data[2];
    // ...populate other fields similarly
  }
}

  </script>

