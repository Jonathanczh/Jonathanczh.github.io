document.addEventListener("DOMContentLoaded", function() {
    // Elements
    const header = document.querySelector('header');
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerText = 'Scroll to Top';
    scrollToTopBtn.style.position = 'fixed';
    scrollToTopBtn.style.bottom = '20px';
    scrollToTopBtn.style.right = '20px';
    scrollToTopBtn.style.display = 'none';
    document.body.appendChild(scrollToTopBtn);

    // Smooth scrolling for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');
    for (let anchor of anchors) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Scroll events for dynamic UI changes
    window.addEventListener('scroll', function() {
        // Toggle header style based on scroll position
        if (window.scrollY > 100) {
            header.style.backgroundColor = '#555';
            scrollToTopBtn.style.display = 'block';
        } else {
            header.style.backgroundColor = '#333';
            scrollToTopBtn.style.display = 'none';
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
