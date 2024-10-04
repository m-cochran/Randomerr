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

    function manageMenuItems() {
        const windowWidth = window.innerWidth;

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

        // Move items based on window width
        if (windowWidth <= 200) {
            // Move all items to More
            items.forEach(moveToMore);
        } else if (windowWidth <= 300) {
            moveToMore(items[items.length - 1]); // Move Hub
            moveToMore(items[items.length - 2]); // Move Arcade
            moveToMore(items[items.length - 3]); // Move Shop
            moveToMore(items[items.length - 4]); // Move Contact
            moveToMore(items[items.length - 5]); // Move About
        } else if (windowWidth <= 400) {
            moveToMore(items[items.length - 1]); // Move Hub
            moveToMore(items[items.length - 2]); // Move Arcade
            moveToMore(items[items.length - 3]); // Move Shop
            // Keep About and Contact
        } else if (windowWidth <= 500) {
            moveToMore(items[items.length - 1]); // Move Hub
            moveToMore(items[items.length - 2]); // Move Arcade
            // Keep Shop, Contact, and About
        } else if (windowWidth <= 599) {
            moveToMore(items[items.length - 1]); // Move Hub
            // Keep Arcade, Shop, Contact, and About
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
