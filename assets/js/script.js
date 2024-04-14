// Initializing the canvas
var canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');

// Setting the width and height of the canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Matrix characters - binary 1s and 0s
var characters = '10'.split('');

// Font settings
var fontSize = 14,
    columns = canvas.width / fontSize;

// Initialize raindrops positions
var drops = Array.from({ length: columns }).fill(0);

// Text to display
const text = "Welcome to\nJonathan's Portfolio";
const textLines = text.split('\n');
var maxWidth = Math.max(...textLines.map(line => ctx.measureText(line).width));

// Prepare text positioning
var textX = (canvas.width - maxWidth) / 2;
var textY = canvas.height / 2 - (textLines.length / 2 * fontSize);

// Draw function
function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0f0';
    ctx.font = fontSize + 'px monospace';

    for (var i = 0; i < drops.length; i++) {
        var character = characters[Math.floor(Math.random() * characters.length)];
        var x = i * fontSize;
        var y = drops[i] * fontSize;

        // Draw the rain drop
        ctx.fillText(character, x, y);

        // Increment or reset
        drops[i]++;
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
    }

    // Draw the resolved text
    ctx.fillStyle = '#FFF'; // White color for the final text
    textLines.forEach((line, index) => {
        ctx.fillText(line, textX, textY + index * fontSize);
    });
}

// Loop the animation
setInterval(draw, 30);
