document.addEventListener("DOMContentLoaded", function () {
  const mainNav = document.getElementById("autoNav");
  const moreNav = document.getElementById("autoNavMoreList");
  const moreButton = document.getElementById("autoNavMore");

  function adjustMenu() {
    const availableSpace = mainNav.offsetWidth - moreButton.offsetWidth;
    let totalItemWidth = 0;
    
    // Move items to "More" dropdown if there is no space
    Array.from(mainNav.children).forEach(item => {
      if (item !== moreButton) {
        totalItemWidth += item.offsetWidth;
        if (totalItemWidth > availableSpace) {
          moreNav.appendChild(item);
        }
      }
    });

    // Move items back to the main menu if space allows
    let moreItems = Array.from(moreNav.children);
    moreItems.forEach(item => {
      if (totalItemWidth + item.offsetWidth <= availableSpace) {
        mainNav.insertBefore(item, moreButton);
        totalItemWidth += item.offsetWidth;
      }
    });

    // Toggle "More" button visibility
    moreButton.style.display = moreNav.children.length > 0 ? "inline-block" : "none";
  }

  // Adjust menu on page load
  adjustMenu();

  // Adjust menu on window resize
  window.addEventListener("resize", adjustMenu);
});
