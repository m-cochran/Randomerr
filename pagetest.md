---
layout: default
title: Profile
permalink: /pro/
---

# Profile

  <title>Google Sheets Data</title>
  
  <style>
        /* Add some basic styling for the cards */
        .card {
            border: 1px solid #ddd;
            padding: 20px;
            margin: 10px;
            border-radius: 5px;
            width: 200px;
            display: inline-block;
            vertical-align: top;
        }
        #cardContainer {
            display: flex;
            flex-wrap: wrap;
        }
  </style>

   <h1>Welcome</h1>
    <div id="cardContainer"></div>

  <script>
        // Function to check if the user is logged in and fetch data
        function fetchData() {
            const userEmail = localStorage.getItem('userEmail'); // Get the logged-in user's email from localStorage
            
            if (!userEmail) {
                alert("No user logged in.");
                return;
            }
            
            const url = `https://script.google.com/macros/s/AKfycbwjeC0RupOcsZIbhyNJ8ABGtTgKFde35ZhBXfDVWXDpuuW_87Hq-QJfr9s1pXVeAfDwXQ/exec?userEmail=${encodeURIComponent(userEmail)}`;
            
            // Fetch data from Google Apps Script with the user's email
            fetch(url)
                .then(response => response.json())  // Parse JSON response
                .then(data => {
                    if (data.length === 0) {
                        document.getElementById('cardContainer').innerHTML = "<p>No data found for the logged-in user.</p>";
                    } else {
                        displayCards(data);  // Function to display the data in cards
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    document.getElementById('cardContainer').innerHTML = "<p>Error loading data. Please try again later.</p>";
                });
        }

        // Function to display the data in cards
        function displayCards(data) {
            const cardContainer = document.getElementById('cardContainer');
            cardContainer.innerHTML = ''; // Clear previous content
            data.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <h3>${item[1]}</h3>
                    <p>${item[2]}</p>
                    <p>Email: ${item[0]}</p>
                `;
                cardContainer.appendChild(card);
            });
        }

        // Call the fetchData function on page load
        window.onload = fetchData;
    </script>
</body>
</html>

