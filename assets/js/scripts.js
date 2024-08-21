document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slide-track");

  slider.addEventListener("mouseover", function () {
    slider.style.animationPlayState = "paused";
  });

  slider.addEventListener("mouseout", function () {
    slider.style.animationPlayState = "running";
  });
});


fetch('products.json')
    .then(response => response.json())
    .then(data => {
        // Display the product data on your site
        console.log(data);
    })
    .catch(error => console.error('Error:', error));
