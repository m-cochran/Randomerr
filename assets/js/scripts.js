// MAIN MENU
const $mainMenu = $("#mainMenu");
const $autoNav = $("#autoNav");
const $autoNavMore = $("#autoNavMore");
const $autoNavMoreList = $("#autoNavMoreList");
autoNavMore = () => {
  let childNumber = 2;

  if ($(window).width() >= 320) {
    // GET MENU AND NAV WIDTH
    const $menuWidth = $mainMenu.width();
    const $autoNavWidth = $autoNav.width();
    if ($autoNavWidth > $menuWidth) {
      // CODE FIRES WHEN WINDOW SIZE GOES DOWN
      $autoNav
        .children(`li:nth-last-child(${childNumber})`)
        .prependTo($autoNavMoreList);
      autoNavMore();
    } else {
      // CODE FIRES WHEN WINDOW SIZE GOES UP
      const $autoNavMoreFirst = $autoNavMoreList
      .children("li:first-child")
      .width();
      // CHECK IF ITEM HAS ENOUGH SPACE TO PLACE IN MENU
      if ($autoNavWidth + $autoNavMoreFirst < $menuWidth) {
        $autoNavMoreList.children("li:first-child").insertBefore($autoNavMore);
      }
    }
    if ($autoNavMoreList.children().length > 0) {
      $autoNavMore.show();
      childNumber = 2;
    } else {
      $autoNavMore.hide();
      childNumber = 1;
    }
  }
};
// INIT
autoNavMore();
$(window).resize(autoNavMore);
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

