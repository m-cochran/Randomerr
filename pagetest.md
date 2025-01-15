---
layout: default
title: Profile
permalink: /pro/
---

# Profile




<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Filtered Data by User</title>
  <style>

    .card-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .card {
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .card h2 {
      font-size: 18px;
      margin-bottom: 10px;
    }

    .card p {
      font-size: 16px;
      margin: 5px 0;
    }

    .no-data {
      font-size: 18px;
      color: #666;
      text-align: center;
      margin-top: 50px;
    }

  </style>
</head>
<body>

  <h1>Your Filtered Data</h1>

  <div class="card-container" id="cardContainer">
    <!-- Cards will be inserted here -->
  </div>

  <div class="no-data" id="noData" style="display: none;">No data available for this user.</div>

<script>
  document.addEventListener('DOMContentLoaded', () => {
  // Fetch user details from localStorage
  const userLoggedIn = localStorage.getItem('userLoggedIn');
  const userEmail = localStorage.getItem('userEmail');

  if (userLoggedIn === 'true') {
    // Fetch data from the Google Apps Script web app URL
    fetch('https://script.google.com/macros/s/AKfycbwGUhSttkDP3B8bUie3h_zHvoUHfZgohHofiL_EonGAyV6TNXhPbFmXiGD78DFXwzBKAA/exec') // Replace with your web app URL
      .then(response => response.json())
      .then(data => {
        // Filter the data based on the logged-in user's email
        const userData = data.filter(row => row.email === userEmail);

        // Display filtered data in cards
        displayCards(userData);
      })
      .catch(error => console.error('Error fetching data:', error));
  } else {
    console.log('User is not logged in.');
  }
});

// Function to display cards
function displayCards(data) {
  const cardContainer = document.getElementById('cardContainer');
  cardContainer.innerHTML = ''; // Clear existing cards

  if (data.length === 0) {
    cardContainer.innerHTML = '<p>No data available for this user.</p>';
    return;
  }

  data.forEach(row => {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    cardHeader.textContent = row.name; // Example: Display 'name' as the card header

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    Object.keys(row).forEach(key => {
      if (key !== 'name') { // Skip the 'name' field if used as the header
        const p = document.createElement('p');
        p.innerHTML = `<strong>${key}:</strong> ${row[key]}`;
        cardBody.appendChild(p);
      }
    });

    card.appendChild(cardHeader);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);
  });
}

</script>
