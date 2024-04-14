// Initialising the canvas
var canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');

// Setting the width and height of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Setting up the letters
var letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZ';
letters = letters.split('');

// Setting up the columns
var fontSize = 20,
    columns = canvas.width / fontSize;

// Setting up the drops
var drops = [];
var cycleCounts = []; // Track how many times each column has cycled
for (var i = 0; i < columns; i++) {
    drops[i] = 1;
    cycleCounts[i] = 0;
}

// Setting up the draw function
function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, .1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0f0'; // green text
    ctx.font = fontSize + 'px monospace'; // setting font size and type
    for (var i = 0; i < drops.length; i++) {
        var text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
            drops[i] = 0;
            cycleCounts[i]++;
        }
    }

    // Check if all columns have cycled at least twice
    if (cycleCounts.every(count => count >= 2)) {
        clearInterval(interval); // Stop the interval and thereby the animation
        clearCanvas(); // Clear the canvas for a final time to end with a black screen
    }
}

// Function to clear the canvas
function clearCanvas() {
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Loop the animation
var interval = setInterval(draw, 33);
