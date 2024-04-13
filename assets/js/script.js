document.addEventListener("DOMContentLoaded", function() {
    // Function for smooth scrolling to a specific element
    function smoothScrollTo(element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }

    // Select the projects section and arrow
    const projectsSection = document.getElementById('projects');
    const arrow = document.querySelector('.arrow a');

    // Event listener for the arrow
    arrow.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default anchor click behavior
        smoothScrollTo(projectsSection);
    });

    // Optional: Scroll when the user scrolls down manually, uncomment if needed
    window.addEventListener('scroll', function() {
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
            smoothScrollTo(projectsSection);
        }
    });
});
