document.addEventListener("DOMContentLoaded", function () {
  const mainNav = document.getElementById("autoNav");
  const moreNav = document.getElementById("autoNavMoreList");
  const moreButton = document.getElementById("autoNavMore");

  let resizeTimeout;

  function moveItemsToMore() {
    const navItems = Array.from(mainNav.children);
    const moreItems = Array.from(moreNav.children);

    // Ensure that the "More" button is the last item
    mainNav.appendChild(moreButton);

    // Move overflowing items to the "More" dropdown
    navItems.forEach(item => {
      if (item !== moreButton && mainNav.scrollWidth > mainNav.clientWidth) {
        moreNav.appendChild(item);
      }
    });

    // Move items back to the main menu when there's space
    while (moreNav.children.length > 0 && mainNav.scrollWidth <= mainNav.clientWidth) {
      const firstMoreItem = moreNav.children[0];
      mainNav.insertBefore(firstMoreItem, moreButton);
    }

    // Show or hide the "More" button based on whether there are items in the dropdown
    moreButton.style.display = moreNav.children.length > 0 ? "inline-block" : "none";
  }

  // Throttle function to reduce the frequency of calls during resizing
  function throttleResize() {
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(() => {
        resizeTimeout = null;
        requestAnimationFrame(moveItemsToMore);
      }, 100); // Adjust timeout for smoother performance
    }
  }

  // Attach event listener for window resizing
  window.addEventListener("resize", throttleResize);

  // Initial call on page load to place items correctly
  moveItemsToMore();
});
