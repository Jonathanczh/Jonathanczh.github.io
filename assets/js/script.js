document.addEventListener("DOMContentLoaded", function() {
    // Function for smooth scrolling to a specific element
    function smoothScrollTo(element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }

    // Select the projects section and arrow
    const projectsSection = document.getElementById('projects');
    const arrow = document.querySelector('.bounce'); // Changed from .arrow a to .bounce

    // Event listener for the arrow
    arrow.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default click behavior
        smoothScrollTo(projectsSection);
    });

    // Optional: Handle auto-scrolling when user reaches bottom of the viewport
    window.addEventListener('scroll', function() {
        if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
            smoothScrollTo(projectsSection);
        }
    });
});
