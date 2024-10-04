document.addEventListener("DOMContentLoaded", function () {
    const mainNav = document.getElementById("autoNav");
    const moreNav = document.getElementById("autoNavMoreList");
    const moreButton = document.getElementById("autoNavMore");
    const mainNavItems = Array.from(mainNav.children); // Convert HTMLCollection to array

    // Ensure the More dropdown is shown when hovering over More
    moreButton.addEventListener("mouseenter", function () {
        moreNav.classList.add("visible"); // Show dropdown
    });

    // Hide dropdown when mouse leaves the dropdown area
    moreButton.addEventListener("mouseleave", function () {
        moreNav.classList.remove("visible"); // Hide dropdown
    });

    moreNav.addEventListener("mouseenter", function () {
        moreNav.classList.add("visible"); // Keep dropdown open
    });

    moreNav.addEventListener("mouseleave", function () {
        moreNav.classList.remove("visible"); // Hide the dropdown
    });

    // Create a Donate item that is always present
    const donateItem = document.createElement('li');
    donateItem.innerHTML = '<a href="{{ site.baseurl }}/donate/">Donate</a>';
    moreNav.appendChild(donateItem); // Always add Donate to More

    // Function to manage menu items
    function manageMenuItems() {
        const windowWidth = window.innerWidth;
        const maxVisibleItems = windowWidth < 600 ? 2 : windowWidth < 800 ? 3 : 5; // Adjust these values as needed

        // Clear previous items from More, except for Donate
        while (moreNav.children.length > 1) { // Keep the Donate item
            moreNav.removeChild(moreNav.lastChild);
        }

        // Add items to the dropdown if they exceed the max visible count
        const itemsToMove = mainNavItems.slice(maxVisibleItems); // Get items to move
        itemsToMove.forEach(item => {
            // Check if the item is already in the More dropdown
            if (!Array.from(moreNav.children).some(child => child.innerHTML === item.innerHTML)) {
                mainNav.removeChild(item); // Remove from main nav
                moreNav.appendChild(item); // Move item to More dropdown
            }
        });
    }

    // Observe changes in the window size
    const resizeObserver = new ResizeObserver(() => {
        manageMenuItems(); // Call manageMenuItems when resizing
    });

    resizeObserver.observe(document.body); // Observe the body for changes

    // Initial adjustment on page load
    manageMenuItems();
});
