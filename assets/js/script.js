// script.js
function scrollToProjects() {
    console.log("Function called");  // This should appear in the console when you click the arrow
    const projectsSection = document.getElementById('projects');
    projectsSection.scrollIntoView({ behavior: 'smooth' });
}

function toggleMenu() {
    var dropdown = document.querySelector('.dropdown-content');
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';
    }
}
