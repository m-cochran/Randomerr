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
  <title>Google Sheets Data for Logged-In User</title>
  <script src="https://apis.google.com/js/api:client.js"></script>
</head>
<body>

  <h1>Data from Google Sheets</h1>

  <!-- Google Sign-In Button -->
  <div id="gSignInWrapper">
    <span>Sign in with Google:</span>
    <div class="g-signin2" data-onsuccess="onSignIn"></div>
  </div>

  <!-- Data will be shown here -->
  <div id="userData">
    <p>Loading user-specific data...</p>
  </div>

  <script>
    // Google Sign-In initialization
    var googleUser = {};

    function onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      var email = profile.getEmail(); // Get the user's email

      // Fetch data specific to the logged-in user's email
      fetchDataForUser(email);
    }

    // Function to fetch user-specific data from Google Apps Script
    function fetchDataForUser(email) {
      fetch(`https://script.google.com/macros/s/AKfycbxXllNeWDV93xHrhaBClYRqV1a0hFJ2oTtMs_NHnJZStd_lxpPtI66EXgIkO5R0q3hf/exec?email=${email}`) // Pass the email as a query parameter
        .then(response => response.json())
        .then(data => {
          displayUserData(data); // Display user-specific data
        })
        .catch(error => console.error('Error fetching data:', error));
    }

    // Function to display data in HTML
    function displayUserData(data) {
      const userDataDiv = document.getElementById('userData');
      if (data && data.length > 0) {
        let htmlContent = '<table border="1"><tr>';
        // Add headers
        Object.keys(data[0]).forEach(key => {
          htmlContent += `<th>${key}</th>`;
        });
        htmlContent += '</tr>';
        
        // Add data rows
        data.forEach(row => {
          htmlContent += '<tr>';
          Object.values(row).forEach(value => {
            htmlContent += `<td>${value}</td>`;
          });
          htmlContent += '</tr>';
        });
        htmlContent += '</table>';
        userDataDiv.innerHTML = htmlContent;
      } else {
        userDataDiv.innerHTML = '<p>No data available for this user.</p>';
      }
    }
  </script>

</body>
</html>
