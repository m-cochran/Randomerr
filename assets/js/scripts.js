document.addEventListener("DOMContentLoaded", function () {
    const mainNav = document.getElementById("autoNav");
    const moreNav = document.getElementById("autoNavMoreList");
    const moreButton = document.getElementById("autoNavMore");
    
    // Always keep the Donate item in the More dropdown
    const donateItem = document.createElement('li');
    donateItem.innerHTML = '<a href="{{ site.baseurl }}/donate/">Donate</a>';
    moreNav.appendChild(donateItem); // Always add Donate to More

    // Define the order in which items should be moved to the More dropdown
    const itemOrder = [
        "{{ site.baseurl }}/hub/",
        "{{ site.baseurl }}/arcade/",
        "{{ site.baseurl }}/shop/",
        "{{ site.baseurl }}/contact/",
        "{{ site.baseurl }}/about/"
    ];

    function manageMenuItems() {
        const navWidth = mainNav.clientWidth; // Width of the main nav
        const itemWidths = Array.from(mainNav.children).map(item => item.offsetWidth); // Widths of each item
        const moreButtonWidth = moreButton.offsetWidth; // Width of the More button
        const availableSpace = navWidth - moreButtonWidth; // Space left for nav items
        let usedSpace = 0;

        // Reset the More dropdown (except for the Donate item)
        while (moreNav.children.length > 1) { // Keep only the Donate item
            moreNav.removeChild(moreNav.lastChild);
        }

        // Move items to the More dropdown based on available space
        for (let i = 0; i < mainNav.children.length; i++) {
            const item = mainNav.children[i];

            // Check if the item should be moved to More based on the defined order
            if (itemOrder.includes(item.querySelector('a').getAttribute('href'))) {
                usedSpace += itemWidths[i];

                // If used space exceeds available space, move item to More
                if (usedSpace > availableSpace) {
                    if (!moreNav.contains(item)) {
                        moreNav.appendChild(item); // Move item to More dropdown
                    }
                }
            }
        }

        // Move items back to main nav if there is available space
        usedSpace = 0; // Reset used space
        const moreItems = Array.from(moreNav.children).slice(1); // Get items in More except for Donate

        moreItems.forEach(item => {
            if (usedSpace + item.offsetWidth <= availableSpace) {
                mainNav.appendChild(item); // Move item back to main nav
                usedSpace += item.offsetWidth; // Update used space
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
