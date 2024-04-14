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

// Animation variables
var fadingOut = false;
var fadeOpacity = 1;

// Setting up the draw function
function draw() {
    ctx.fillStyle = `rgba(0, 0, 0, ${fadingOut ? 0.1 : 0.1})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `rgba(0, 255, 0, ${fadeOpacity})`; // Apply fade to text color
    ctx.font = fontSize + 'px monospace'; // setting font size and type

    if (!fadingOut) {
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
            fadingOut = true; // Start fading out
        }
    } else {
        fadeOpacity -= 0.05; // Controls the rate of fade out
        if (fadeOpacity <= 0) {
            clearInterval(interval); // Stop the interval when fully faded
            typeText(); // Start typing the text
        }
    }
}

// Loop the animation
var interval = setInterval(draw, 33);

function typeText() {
    var text = "Chiu Zheng Hao Jonathan\nYear 2\nSingapore Institute of Technology";
    var index = 0;
    ctx.fillStyle = '#0f0'; // Green text color
    ctx.font = 'bold ' + fontSize + 'px monospace';
    var x = canvas.width / 2;
    var y = canvas.height / 2;

    function typeChar() {
        if (index < text.length) {
            ctx.fillText(text[index], x, y);
            x += ctx.measureText(text[index]).width; // Move x for the next character
            if (text[index] === '\n') {
                y += fontSize * 1.5; // Move y to the next line
                x = canvas.width / 2 - ctx.measureText(text.slice(index + 1)).width / 2;
            }
            index++;
            setTimeout(typeChar, 100); // Adjust typing speed
        }
    }

    x -= ctx.measureText(text).width / 2; // Center the text
    typeChar(); // Start typing
}
