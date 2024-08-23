// MAIN MENU
const mainMenu = document.getElementById("mainMenu");
const autoNav = document.getElementById("autoNav");
const autoNavMore = document.getElementById("autoNavMore");
const autoNavMoreList = document.getElementById("autoNavMoreList");

function autoNavMoreHandler() {
  let childNumber = 2;

  if (window.innerWidth >= 320) {
    // GET MENU AND NAV WIDTH
    const menuWidth = mainMenu.offsetWidth;
    const autoNavWidth = autoNav.offsetWidth;
    if (autoNavWidth > menuWidth) {
      // CODE FIRES WHEN WINDOW SIZE GOES DOWN
      autoNavMoreList.prepend(
        autoNav.children[autoNav.children.length - childNumber]
      );
      autoNavMoreHandler();
    } else {
      // CODE FIRES WHEN WINDOW SIZE GOES UP
      const autoNavMoreFirst = autoNavMoreList.children[0].offsetWidth;
      // CHECK IF ITEM HAS ENOUGH SPACE TO PLACE IN MENU
      if (autoNavWidth + autoNavMoreFirst < menuWidth) {
        autoNav.insertBefore(autoNavMoreList.children[0], autoNavMore);
      }
    }
    if (autoNavMoreList.children.length > 0) {
      autoNavMore.style.display = "block";
      childNumber = 2;
    } else {
      autoNavMore.style.display = "none";
      childNumber = 1;
    }
  }
}
// INIT
autoNavMoreHandler();
window.addEventListener("resize", autoNavMoreHandler);
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

