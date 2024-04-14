document.addEventListener("DOMContentLoaded", function () {
  const matrix = document.getElementById("matrix");
  const fontSize = 20; // Font size for characters
  let columns = Math.floor(window.innerWidth / fontSize);
  let rows = Math.floor(window.innerHeight / fontSize);
  let trailingInterval; // Store interval ID for clearing

  window.addEventListener("resize", handleResize);

  function handleResize() {
    const newColumns = Math.floor(window.innerWidth / fontSize);
    const columnDiff = newColumns - columns;
    
    if (columnDiff > 0) {
      // Add new columns at the end
      addColumnsAtEnd(columnDiff);
    } else if (columnDiff < 0) {
      // Remove columns from the end
      removeColumnsFromEnd(-columnDiff);
    }
    
    columns = newColumns; // Update the columns count after resizing
  }
  
  function addColumnsAtEnd(count) {
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      const row = matrix.children[rowIndex];
      for (let i = 0; i < count; i++) {
        const char = document.createElement("span");
        char.className = "character";
        char.textContent = String.fromCharCode(33 + Math.random() * 94);
        char.style.position = "absolute";
        char.style.left = `${(columns + i) * fontSize}px`;
        row.appendChild(char);
      }
    }
  }
  
  function removeColumnsFromEnd(count) {
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      const row = matrix.children[rowIndex];
      for (let i = 0; i < count; i++) {
        if (row.children.length > 0) {
          row.removeChild(row.lastChild);
        }
      }
    }
  }
  

  function fillMatrix() {
    let delay = 0; // Initial delay
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      setTimeout(() => {
        createAndFadeRow(rowIndex);
      }, delay);
      delay += 50; // Increment delay for each row
    }

    // Start trailing columns after the last row is created
    setTimeout(trailingColumn, delay);
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
    setTimeout(() => {
        row.style.transition = "opacity 0.5s ease-in-out";
        row.style.opacity = 0.1; // Slightly visible, adjust as needed
    }, 500); // Start fading after 500ms
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
