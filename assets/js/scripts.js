document.addEventListener("DOMContentLoaded", function () {
    const mainNav = document.getElementById("autoNav");
    const moreNav = document.getElementById("autoNavMoreList");
    const moreButton = document.getElementById("autoNavMore");

    // Always keep the Donate item in the More dropdown
    const donateItem = document.createElement('li');
    donateItem.innerHTML = '<a href="{{ site.baseurl }}/donate/">Donate</a>';
    moreNav.appendChild(donateItem); // Always add Donate to More

    function manageMenuItems() {
        // Get the width of the window
        const windowWidth = window.innerWidth;

        // List of menu items in order of priority to move to More
        const items = Array.from(mainNav.children).slice(0, -1); // Exclude More button

        // Remove all items from the dropdown except for Donate
        while (moreNav.children.length > 1) {
            moreNav.removeChild(moreNav.lastChild);
        }

        // Add items to the dropdown based on window width
        if (windowWidth <= 200) {
            // If the width is 200px or less, move all items to More
            items.forEach(item => moreNav.appendChild(item));
        } else if (windowWidth <= 300) {
            // Move About, Contact, Shop, Arcade, and Hub to More
            moreNav.appendChild(items[items.length - 1]); // Move Hub
            moreNav.appendChild(items[items.length - 2]); // Move Arcade
            moreNav.appendChild(items[items.length - 3]); // Move Shop
            moreNav.appendChild(items[items.length - 4]); // Move Contact
            moreNav.appendChild(items[items.length - 5]); // Move About
        } else if (windowWidth <= 400) {
            moreNav.appendChild(items[items.length - 1]); // Move Hub
            moreNav.appendChild(items[items.length - 2]); // Move Arcade
            moreNav.appendChild(items[items.length - 3]); // Move Shop
            // Keep About and Contact
        } else if (windowWidth <= 500) {
            moreNav.appendChild(items[items.length - 1]); // Move Hub
            moreNav.appendChild(items[items.length - 2]); // Move Arcade
            // Keep Shop, Contact, and About
        } else if (windowWidth <= 599) {
            moreNav.appendChild(items[items.length - 1]); // Move Hub
            // Keep Arcade, Shop, Contact, and About
        } else {
            // If the width is greater than 599px, all items should be in the main nav
            items.forEach(item => mainNav.appendChild(item));
        }
    }

    // Initial adjustment on page load
    manageMenuItems();

    // Observe changes in the window size
    window.addEventListener('resize', manageMenuItems); // Call manageMenuItems on resizing
});
