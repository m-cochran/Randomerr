document.addEventListener("DOMContentLoaded", function () {
    const mainNav = document.getElementById("autoNav");
    const moreNav = document.getElementById("autoNavMoreList");
    
    // List of nav items to manage
    const navItems = Array.from(mainNav.children).slice(0, -1); // Exclude the More button
    
    // Items to move to the More dropdown
    const itemsToMove = ["hub", "arcade", "shop", "contact", "about"];

    // Function to manage nav items
    function manageNavItems() {
        const mainNavWidth = mainNav.clientWidth;
        let usedSpace = 0;
        const moreDropdown = moreNav;

        // Clear the More dropdown except for the Donate item
        moreDropdown.innerHTML = '<li><a href="{{ site.baseurl }}/donate/">Donate</a></li>';

        // Check each item and determine if it can fit
        navItems.forEach(item => {
            const itemWidth = item.offsetWidth;

            // Check if the item fits in the available space
            if (usedSpace + itemWidth > mainNavWidth) {
                // If it doesn't fit, move to More
                if (!moreDropdown.contains(item)) {
                    moreDropdown.appendChild(item); // Move item to More dropdown
                }
            } else {
                // If it fits, add to used space
                usedSpace += itemWidth;
            }
        });
    }

    // Initial adjustment on page load
    manageNavItems();

    // Observe changes in the window size
    window.addEventListener('resize', manageNavItems);
});
