document.addEventListener("DOMContentLoaded", function () {
    const mainNav = document.getElementById("autoNav");
    const moreNav = document.getElementById("autoNavMoreList");
    const moreButton = document.getElementById("autoNavMore");
    
    // Always keep the Donate item in the More dropdown
    const donateItem = moreNav.querySelector('li'); // This is the Donate item
    const navItems = Array.from(mainNav.children).filter(item => item !== moreButton); // All items excluding More
    
    function manageMenuItems() {
        const navWidth = mainNav.clientWidth; // Get width of the main nav
        const moreButtonWidth = moreButton.offsetWidth; // Get width of the More button
        const availableSpace = navWidth - moreButtonWidth; // Calculate available space
        let usedSpace = 0;

        // Reset the More dropdown except for the Donate item
        moreNav.innerHTML = ''; // Clear the dropdown
        moreNav.appendChild(donateItem.cloneNode(true)); // Keep Donate in dropdown

        // Move items to More if there's not enough space
        navItems.forEach(item => {
            usedSpace += item.offsetWidth; // Add item's width to used space

            if (usedSpace > availableSpace) {
                moreNav.appendChild(item.cloneNode(true)); // Move item to More dropdown
                mainNav.removeChild(item); // Remove from main nav
            }
        });

        // Move items back to main nav if there's enough space
        usedSpace = 0; // Reset used space
        const moreItems = Array.from(moreNav.children).slice(1); // Get items in More except for Donate
        
        moreItems.forEach(item => {
            if (usedSpace + item.offsetWidth <= availableSpace) {
                mainNav.appendChild(item.cloneNode(true)); // Move item back to main nav
                usedSpace += item.offsetWidth; // Update used space
                moreNav.removeChild(item); // Remove from More dropdown
            }
        });
    }

    // Initial adjustment on page load
    manageMenuItems();

    // Observe changes in the window size
    window.addEventListener('resize', () => {
        manageMenuItems(); // Call manageMenuItems on resizing
    });
});
