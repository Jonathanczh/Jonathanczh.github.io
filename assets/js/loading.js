document.addEventListener("DOMContentLoaded", function () {
  const matrix = document.getElementById("matrix");
  const fontSize = 20; // Font size for characters
  let columns = Math.floor(window.innerWidth / fontSize);
  let rows = Math.floor(window.innerHeight / fontSize);
  let trailingInterval; // Store interval ID for clearing

  window.addEventListener('resize', handleResize);

  function handleResize() {
      // Recalculate columns and rows based on new window dimensions
      columns = Math.floor(window.innerWidth / fontSize);
      rows = Math.floor(window.innerHeight / fontSize);

      // Clear existing matrix and intervals
      matrix.innerHTML = '';
      clearInterval(trailingInterval);

      // Refill matrix and restart column animation
      fillMatrix();
  }

  function fillMatrix() {
      for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
          createAndFadeRow(rowIndex);
      }

      // Start trailing columns after matrix is filled
      trailingColumn();
  }

  function createAndFadeRow(rowIndex) {
      const row = document.createElement("div");
      row.className = "row";
      matrix.appendChild(row);

      for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
          const char = document.createElement("span");
          char.className = "character";
          char.textContent = String.fromCharCode(33 + Math.random() * 94);
          char.style.position = "absolute";
          char.style.left = `${columnIndex * fontSize}px`;
          row.appendChild(char);
      }

      row.style.top = `${rowIndex * fontSize}px`;
      fadeRow(row);
  }

  function fadeRow(row) {
      row.style.transition = "opacity 0.3s ease-in-out";
      row.style.opacity = 0.05;
  }

  function trailingColumn() {
      trailingInterval = setInterval(() => {
          for (let i = 0; i < 5; i++) {
              const randomColumnIndex = Math.floor(Math.random() * columns);
              createAndFadeColumn(randomColumnIndex);
          }
      }, 200);
  }

  function createAndFadeColumn(columnIndex) {
      let yPos = 0;
      function addAndFadeCharacter() {
          if (yPos < window.innerHeight) {
              const char = document.createElement("span");
              char.className = "character";
              char.textContent = String.fromCharCode(33 + Math.random() * 94);
              char.style.position = "absolute";
              char.style.left = `${columnIndex * fontSize}px`;
              char.style.top = `${yPos}px`;
              matrix.appendChild(char);

              setTimeout(() => {
                  fadeCharacter(char);
              }, 100);

              yPos += fontSize;
              setTimeout(addAndFadeCharacter, 30);
          }
      }

      addAndFadeCharacter();
  }

  function fadeCharacter(char) {
      char.style.transition = "opacity 0.2s ease-in-out";
      char.style.opacity = 0.05;
      setTimeout(() => {
          matrix.removeChild(char);
      }, 500);
  }

  fillMatrix(); // Start filling the matrix on page load
});
