---
layout: default
title: Profile
permalink: /pro/
---

# Profile

<script src="https://apis.google.com/js/platform.js" async defer></script>

<!-- Add this to your HTML where you want the Google Sign-In button -->
<div class="g-signin2" data-onsuccess="onSignIn"></div>

<script>
  // Called when a user successfully signs in
  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var userInfo = {
      name: profile.getName(),
      email: profile.getEmail(),
      id: profile.getId(),
      imageUrl: profile.getImageUrl()
    };

    // Send the user info to the server (Google Apps Script)
    fetch('https://script.google.com/macros/s/AKfycbyO3OEgeln7Jrvg13O-Vzyj9u9H4fg-obFbeucdZ6s_QH1FizRwwMrzrgzJV0k-o8p5Tg/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo)
    })
    .then(response => response.json())
    .then(data => {
      // Display data returned from the server (Google Apps Script)
      console.log(data);
    })
    .catch(error => console.error('Error sending user info:', error));
  }
</script>
