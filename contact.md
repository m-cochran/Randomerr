---
layout: default
title: Contact
permalink: /contact/
---

# Contact Us

<div class="form-container">
  <h2>Get in Touch</h2>
  <p class="form-description">We'd love to hear from you! Fill out the form below, and we'll get back to you shortly.</p>

  <div class="google-map-container">
    <h3>Our Location</h3>
    <iframe 
      id="google-map" 
      class="google-map" 
      src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCNCmAGyN4bJYu5qeLgbASzZafm-M5TA_o&amp;language=en&amp;zoom=16&amp;q=942%20Meldon%20Ave%20Donora%2C%20PA%2015033" 
      allowfullscreen 
      title="Location on map">
    </iframe>
  </div>

  <!-- Google Form Embed -->
  <div class="google-form-container">
    <iframe 
      class="google-form" 
      width="100%" 
      height="100%" 
      frameborder="0" 
      src="https://docs.google.com/forms/d/e/1FAIpQLScjRTlq41Ca-Tizns-XS5b8ZffB26ux1gd63zPCvcY1J-7a9Q/viewform?embedded=true">
    </iframe>
  </div>
</div>

<style>
    .form-container {
        position: relative; /* Set position relative for proper stacking */
    }

    .google-map-container {
        margin-bottom: 20px; /* Add some space between map and form */
    }

    .google-map {
        width: 100%;
        height: 400px; /* Set height for the map */
        border: none;
        border-radius: 10px;
    }

    .google-form-container {
        position: relative; /* Make sure the form container stays below the map */
        height: 900px; /* Set a specific height for the form container */
        overflow: hidden; /* Hide overflow */
    }

    .google-form {
        width: 100%; 
        height: 100%; 
        border: none;
        overflow: hidden;
        position: absolute; /* Position it absolutely within the form container */
        top: 0;
        left: 0;
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
</style>
