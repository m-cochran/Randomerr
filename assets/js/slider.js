document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slide-track");

  slider.addEventListener("mouseover", function () {
    slider.style.animationPlayState = "paused";
  });

  slider.addEventListener("mouseout", function () {
    slider.style.animationPlayState = "running";
  });
});

  // Ensure anchor tags work properly
  const anchors = slider.querySelectorAll("a");
  anchors.forEach(anchor => {
    anchor.addEventListener("click", function(event) {
      // Ensure the default action is taken (i.e., opening the link)
      event.stopPropagation(); // Stop event from bubbling up
    });
  });
});
