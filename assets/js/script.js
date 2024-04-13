document.addEventListener("DOMContentLoaded", function () {
    const arrow = document.querySelector(".arrow a");
    const projectsSection = document.getElementById("projects");

    arrow.addEventListener("click", function (event) {
        event.preventDefault();

        projectsSection.scrollIntoView({
            behavior: "smooth"
        });
    });
});
