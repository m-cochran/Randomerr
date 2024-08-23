<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>

// MAIN MENU
const mainMenu = document.getElementById('mainMenu');
const autoNav = document.getElementById('autoNav');
const autoNavMore = document.getElementById('autoNavMore');
const autoNavMoreList = document.getElementById('autoNavMoreList');

const autoNavMoreFunction = () => {
  let childNumber = 2;

  if (window.innerWidth >= 320) {
    // GET MENU AND NAV WIDTH
    const menuWidth = mainMenu.offsetWidth;
    const autoNavWidth = autoNav.offsetWidth;

    if (autoNavWidth > menuWidth) {
      // CODE FIRES WHEN WINDOW SIZE GOES DOWN
      const lastChild = autoNav.children[autoNav.children.length - childNumber];
      autoNavMoreList.insertBefore(lastChild, autoNavMoreList.firstChild);
      autoNavMoreFunction();
    } else {
      // CODE FIRES WHEN WINDOW SIZE GOES UP
      const autoNavMoreFirst = autoNavMoreList.firstElementChild;
      const firstChildWidth = autoNavMoreFirst ? autoNavMoreFirst.offsetWidth : 0;

      // CHECK IF ITEM HAS ENOUGH SPACE TO PLACE IN MENU
      if (autoNavWidth + firstChildWidth < menuWidth) {
        autoNav.insertBefore(autoNavMoreFirst, autoNavMore);
      }
    }

    if (autoNavMoreList.children.length > 0) {
      autoNavMore.style.display = 'block';
      childNumber = 2;
    } else {
      autoNavMore.style.display = 'none';
      childNumber = 1;
    }
  }
};

// INIT
autoNavMoreFunction();
window.addEventListener('resize', autoNavMoreFunction);
// MAIN MENU END





document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slide-track");

  slider.addEventListener("mouseover", function () {
    slider.style.animationPlayState = "paused";
  });

  slider.addEventListener("mouseout", function () {
    slider.style.animationPlayState = "running";
  });
});

