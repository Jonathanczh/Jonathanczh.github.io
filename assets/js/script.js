// script.js
function scrollToProjects() {
    console.log("Function called");  // This should appear in the console when you click the arrow
    const projectsSection = document.getElementById('projects');
    projectsSection.scrollIntoView({ behavior: 'smooth' });
}

// This function toggles the visibility of the dropdown menu
function toggleMenu() {
    var dropdown = document.querySelector('.dropdown-content');
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';
        // Listen for clicks outside of the dropdown to close it
        document.addEventListener('click', function(event) {
            var isClickInside = dropdown.contains(event.target) || event.target.matches('.hamburger-menu');

            if (!isClickInside) {
                dropdown.style.display = 'none';
                // Remove the event listener once the dropdown is closed
                document.removeEventListener('click', arguments.callee);
            }
        });
    }
}
