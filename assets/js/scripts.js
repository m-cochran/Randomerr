document.addEventListener("DOMContentLoaded", function () {
    const mainNav = document.getElementById("autoNav");
    const moreNav = document.getElementById("autoNavMoreList");
    const moreButton = document.getElementById("autoNavMore");

    // Always keep the Donate item in the More dropdown
    const donateItem = document.createElement('li');
    donateItem.innerHTML = '<a href="{{ site.baseurl }}/donate/">Donate</a>';
    moreNav.appendChild(donateItem); // Always add Donate to More

    // Track all items except the More button
    const items = Array.from(mainNav.children).slice(0, -1); // Exclude More button

    function getAdjustedWindowWidth() {
        return window.innerWidth * window.devicePixelRatio;
    }

    function manageMenuItems() {
        const windowWidth = window.innerWidth;      // Get browser window width
        const screenWidth = screen.width;           // Get total screen resolution
        const devicePixelRatio = window.devicePixelRatio;  // Get pixel density

        const adjustedWindowWidth = getAdjustedWindowWidth(); // Adjust width based on pixel ratio
        console.log(`Window width: ${windowWidth}, Screen width: ${screenWidth}, Pixel Ratio: ${devicePixelRatio}`);
        console.log(`Adjusted Window width: ${adjustedWindowWidth}`);

        // Clear the dropdown except for Donate
        while (moreNav.children.length > 1) {
            moreNav.removeChild(moreNav.lastChild);
        }

        // Reset mainNav to its original state
        items.forEach(item => {
            if (!isInMore(item)) {
                mainNav.appendChild(item);
            }
        });

        // Adjust logic based on screen resolution and viewport width
        if (screenWidth <= 360 || adjustedWindowWidth <= 200) {
            // Move all items to More for very small devices or very narrow windows
            items.forEach(moveToMore);
        } else if (screenWidth <= 768 || adjustedWindowWidth <= 300) {
            moveToMore(items[items.length - 1]); // Move Hub
            moveToMore(items[items.length - 2]); // Move Arcade
            moveToMore(items[items.length - 3]); // Move Shop
            moveToMore(items[items.length - 4]); // Move Contact
            moveToMore(items[items.length - 5]); // Move About
        } else if (screenWidth <= 1024 || adjustedWindowWidth <= 400) {
            moveToMore(items[items.length - 1]); // Move Hub
            moveToMore(items[items.length - 2]); // Move Arcade
            moveToMore(items[items.length - 3]); // Move Shop
            // Keep About and Contact
        } else if (screenWidth <= 1366 || adjustedWindowWidth <= 500) {
            moveToMore(items[items.length - 1]); // Move Hub
            moveToMore(items[items.length - 2]); // Move Arcade
            // Keep Shop, Contact, and About
        } else {
            // For larger screens, keep all items in the main navigation
            items.forEach(item => mainNav.appendChild(item));
        }

        // Ensure the More button remains last
        if (mainNav.lastChild !== moreButton) {
            mainNav.appendChild(moreButton);
        }
    }

    function moveToMore(item) {
        if (!isInMore(item)) {
            moreNav.appendChild(item);
        }
    }

    function isInMore(item) {
        return Array.from(moreNav.children).some(child => child.innerHTML === item.innerHTML);
    }

    // Initial adjustment on page load
    manageMenuItems();

    // Observe changes in the window size
    window.addEventListener('resize', manageMenuItems); // Call manageMenuItems on resizing
});
