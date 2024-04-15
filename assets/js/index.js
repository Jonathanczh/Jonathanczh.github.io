document.addEventListener('DOMContentLoaded', () => {
    const text1 = "Fetching Information Vault...";
    const text2 = "Vault Fetched!";
    const message = document.getElementById('message');
    const loadingBox = document.querySelector('.loading-box');

    function typeText(text, onComplete) {
        let index = 0;
        function type() {
            if (index < text.length) {
                message.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, 150);
            } else if (onComplete) {
                setTimeout(onComplete, 500); // Pause to allow reading before proceeding
            }
        }
        type();
    }

    function eraseText(onComplete) {
        function erase() {
            if (message.innerHTML.length > 0) {
                message.innerHTML = message.innerHTML.slice(0, -1);
                setTimeout(erase, 100); // Speed of backspace
            } else if (onComplete) {
                onComplete();
            }
        }
        erase();
    }

    function loadBoxes() {
        const boxes = document.querySelectorAll('.loader-box');
        let currentBox = 0;
        const interval = setInterval(() => {
            if (currentBox >= boxes.length) {
                clearInterval(interval);
                // Now correctly move from first text directly to erase, then second text
                eraseText(() => typeText(text2, fadeOutThenRedirect));
            } else {
                boxes[currentBox].style.opacity = 1;
                currentBox++;
            }
        }, 200);
    }

    function fadeOutThenRedirect() {
        fadeOutElements(redirectToHomepage); // Fade out elements and then redirect
    }

    function fadeOutElements(onComplete) {
        message.style.opacity = 0;
        loadingBox.style.opacity = 0;
        setTimeout(onComplete, 500); // Adjusted to match the transition time
    }

    function redirectToHomepage() {
        setTimeout(() => {
            window.location.replace("homepage.html"); // Redirect after the fade-out and additional text display
        }, 750); // Delay this to give time for reading 'Vault Fetched!'
    }

    typeText(text1, loadBoxes); // Start typing the first text, then initiate the loading boxes
});
