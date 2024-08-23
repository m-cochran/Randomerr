// MAIN MENU
document.addEventListener('DOMContentLoaded', function() {
    const mainMenu = document.getElementById('mainMenu');
    const autoNav = document.getElementById('autoNav');
    const autoNavMore = document.getElementById('autoNavMore');
    const autoNavMoreList = document.getElementById('autoNavMoreList');

    function autoNavMoreHandler() {
        let childNumber = 2;

        if (window.innerWidth >= 320) {
            const menuWidth = mainMenu.offsetWidth;
            const autoNavWidth = autoNav.offsetWidth;
            if (autoNavWidth > menuWidth) {
                autoNavMoreList.prepend(autoNav.children[autoNav.children.length - childNumber]);
                autoNavMoreHandler();
            } else {
                const autoNavMoreFirstWidth = autoNavMoreList.children[0]?.offsetWidth || 0;
                if (autoNavWidth + autoNavMoreFirstWidth < menuWidth) {
                    autoNav.insertBefore(autoNavMoreList.children[0], autoNavMore);
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
    }

    autoNavMoreHandler();
    window.addEventListener('resize', autoNavMoreHandler);
});








document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".slide-track");

  slider.addEventListener("mouseover", function () {
    slider.style.animationPlayState = "paused";
  });

  slider.addEventListener("mouseout", function () {
    slider.style.animationPlayState = "running";
  });
});

