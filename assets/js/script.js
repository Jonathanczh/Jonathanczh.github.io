document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('loading-overlay');
    let text = '';
    for (let i = 0; i < 10000; i++) {
        text += Math.round(Math.random()) + ' ';
        if (i % 120 === 0) { // Adjust line break based on your overlay width
            text += '\n';
        }
    }
    overlay.innerText = text;

    // Remove the overlay after a delay
    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.style.display = 'none', 500); // Smooth fade out
    }, 3000); // Display loading for 3 seconds
});
