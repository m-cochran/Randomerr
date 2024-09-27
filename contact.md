---
layout: default
title: Contact
permalink: /contact/
---

# Contact Us



<main>

  <div class="form-container">
    <h2>Get in Touch</h2>
    <p class="form-description">We'd love to hear from you! Fill out the form below, and we'll get back to you shortly.</p>

<!-- Google Form Embed -->
<div class="google-form-container">
    <iframe class="google-form" id="google-form" 
        src="https://docs.google.com/forms/d/e/1FAIpQLScjRTlq41Ca-Tizns-XS5b8ZffB26ux1gd63zPCvcY1J-7a9Q/viewform?embedded=true"
        frameborder="0" scrolling="no">
        Loading…
    </iframe>
</div>


  <div class="google-map-container">
    <h3>Our Location</h3>
    <iframe id="google-map" class="google-map" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCNCmAGyN4bJYu5qeLgbASzZafm-M5TA_o&amp;language=en&amp;zoom=16&amp;q=942%20Meldon%20Ave%20Donora%2C%20PA%2015033" allowfullscreen="" title="Location on map"></iframe>
  </div>

  <div class="contact-email">
    <p>If you have any questions, feel free to email us at <a href="mailto:contact@randomerr.com">contact@randomerr.com</a>.</p>
  </div>



  <style>
 /* Container for the Google Form iframe */
.google-form-container {
    width: 100%; /* Full width */
    max-width: 900px; /* Max width for the form container */
    margin: 0 auto; /* Center the container */
    padding: 20px; /* Add padding around the iframe */
    box-sizing: border-box; /* Ensure padding doesn't affect width calculation */
}

/* Iframe Styling */
.google-form {
    width: 100%; /* Full width */
    height: 850px; /* Set height based on the form content */
    border: none; /* Remove border */
    overflow: hidden; /* Ensure no scrollbars */
    display: block; /* Ensure the iframe takes up block-level space */
}

  

    /* Form heading */
    .form-container h2 {
      font-family: 'Arial', sans-serif;
      font-size: 2rem;
      color: #333;
      text-align: center;
      margin-bottom: 10px;
    }

    /* Description text */
    .form-description {
      font-size: 1.2rem;
      color: #666;
      text-align: center;
      margin-bottom: 20px;
    }

    /* Styling for the map */
    .google-map-container {
      margin-top: 20px;
    }

    .google-map {
      width: 100%;
      height: 400px;
      border: none;
      border-radius: 10px;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .form-container {
        padding: 15px;
      }

      .form-container h2 {
        font-size: 1.5rem;
      }

      .form-description {
        font-size: 1rem;
      }

      .google-form {
        height: calc(100vh - 250px); /* Adjust height for smaller screens */
      }
    }
  </style>

  <script>
    // Adjust iframe height dynamically
    function adjustIframeHeight() {
      const iframe = document.getElementById('google-form');
      const formContainer = document.querySelector('.form-container');
      const headerHeight = document.getElementById('contact-us').offsetHeight;
      const availableHeight = window.innerHeight - formContainer.offsetTop - headerHeight - 20; // 20px for margin

      iframe.style.height = `${availableHeight}px`;
    }

    window.addEventListener('resize', adjustIframeHeight);
    window.addEventListener('load', adjustIframeHeight);
  </script>
</main>
