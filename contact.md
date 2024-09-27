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
        <iframe id="google-map" class="google-map" 
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCNCmAGyN4bJYu5qeLgbASzZafm-M5TA_o&amp;language=en&amp;zoom=16&amp;q=942%20Meldon%20Ave%20Donora%2C%20PA%2015033" 
                allowfullscreen 
                title="Location on map"></iframe>
    </div>

    <!-- Google Form Embed -->
    <div class="google-form-container">
        <iframe class="google-form" id="google-form" 
                src="https://docs.google.com/forms/d/e/1FAIpQLScjRTlq41Ca-Tizns-XS5b8ZffB26ux1gd63zPCvcY1J-7a9Q/viewform?embedded=true" 
                frameborder="0" scrolling="no" title="Google Form">Loading…</iframe>
    </div>
</div>

<style>
    /* Ensure the body takes up the full height of the viewport */
    html, body {
        margin: 0;
        padding: 0;
        height: 100%;
    }

    /* Parent container for the iframe */
    .google-form-container {
        width: 100%;
        max-width: 900px; /* Max width for form */
        margin: 20px auto; /* Center the form */
        overflow: hidden; /* Prevent scrollbars */
        position: relative; /* For absolute positioning of iframe */
    }

    /* Iframe Styling */
    .google-form {
        width: 100%; /* Full width */
        height: 600px; /* Fixed height */
        border: 0; /* Remove border */
        overflow: hidden; /* Prevent scrollbars */
        position: relative; /* Positioning within the container */
    }

    /* Responsive adjustments */
    @media (max-width: 900px) {
        .google-form {
            height: auto; /* Allow height to adjust automatically */
        }
    }

    @media (max-width: 318px) {
        .google-form {
            height: 400px; /* Set a smaller height for very narrow screens */
        }
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
        height: 400px; /* Set height for the map */
        border: none;
        border-radius: 10px;
    }
</style>
