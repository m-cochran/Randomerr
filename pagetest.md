---
layout: default
title: Profile
permalink: /pro/
---

# Profile


  <title>Google Sheets Data</title>
  <style>
    /* Your CSS styles here */
  </style>


  <h1>Data from Google Sheets</h1>

  <div class="card-container" id="cardContainer">
    <!-- Cards will be inserted here -->
  </div>

  <script>
    // Check if user is logged in and get user information from localStorage
    if (localStorage.getItem('userLoggedIn') === 'true') {
      var userEmail = localStorage.getItem('userEmail'); // Get the logged-in user's email

      // Fetch data from Google Apps Script, passing the user's email as a query parameter
      fetch(`https://script.google.com/macros/s/AKfycbwGUhSttkDP3B8bUie3h_zHvoUHfZgohHofiL_EonGAyV6TNXhPbFmXiGD78DFXwzBKAA/exec?userEmail=${encodeURIComponent(userEmail)}`)
        .then(response => response.json())
        .then(data => {
          const cardContainer = document.getElementById('cardContainer');
          
          // Create a card for each row of data
          data.forEach(row => {
            const card = document.createElement('div');
            card.classList.add('card');
            
            const cardHeader = document.createElement('div');
            cardHeader.classList.add('card-header');
            cardHeader.textContent = row['Name']; // Assuming 'Name' is a column header in your sheet
            
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            
            Object.keys(row).forEach(header => {
              if (header !== 'Name') { // Skip the header if it's already used as the title
                const p = document.createElement('p');
                p.innerHTML = `<strong>${header}:</strong> ${row[header]}`;
                cardBody.appendChild(p);
              }
            });

            card.appendChild(cardHeader);
            card.appendChild(cardBody);

            cardContainer.appendChild(card);
          });
        })
        .catch(error => console.error('Error fetching data:', error));
    } else {
      alert('You must be logged in to view your data.');
    }
  </script>
