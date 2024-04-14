document.addEventListener("DOMContentLoaded", function () {
  const matrix = document.getElementById("matrix");
  const intro = document.getElementById("intro"); // Get the intro div for fading in
  const fontSize = 20;
  let columns = getColumnCount();
  let rows = getRowCount();
  let trailingInterval;

  window.addEventListener('resize', handleResize);
  fillMatrix();

  function getColumnCount() {
    return Math.floor(window.innerWidth / fontSize);
  }

  function getRowCount() {
    return Math.floor(window.innerHeight / fontSize);
  }

  function handleResize() {
    const newColumns = getColumnCount();
    const columnDiff = newColumns - columns;
    adjustColumns(columnDiff);
    columns = newColumns;
  }

  function adjustColumns(diff) {
    if (diff > 0) {
      addColumnsAtEnd(diff);
    } else if (diff < 0) {
      removeColumnsFromEnd(-diff);
    }
  }

  function addColumnsAtEnd(count) {
    Array.from(matrix.children).forEach(row => {
      addCharactersToRow(row, count, columns);
    });
    columns += count; // Update total columns count after addition
  }

  function addCharactersToRow(row, count, startColumn) {
    for (let i = 0; i < count; i++) {
      const char = createCharacter(startColumn + i);
      row.appendChild(char);
    }
  }

  function createCharacter(columnIndex) {
    const char = document.createElement("span");
    char.className = "character";
    char.textContent = String.fromCharCode(33 + Math.random() * 94);
    char.style.cssText = `position: absolute; left: ${columnIndex * fontSize}px;`;
    return char;
  }

  function removeColumnsFromEnd(count) {
    Array.from(matrix.children).forEach(row => {
      removeCharactersFromRow(row, count);
    });
  }

  function removeCharactersFromRow(row, count) {
    while (count-- > 0 && row.lastChild) {
      row.removeChild(row.lastChild);
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

    // Start trailing columns and intro fade-in after the last row is created
    setTimeout(trailingColumn, delay);
    setTimeout(introFadeIn, delay + 2000); // Delay the intro visibility by 5 seconds after trailing starts
  }

  function introFadeIn() {
    intro.style.transition = 'opacity 2s ease-in-out, transform 2s ease';
    intro.style.opacity = 1; // Make the intro visible
    intro.style.transform = 'translate(-50%, -50%) scale(1)'; // Scale to normal size from the scaled-down state
  }

  function createAndFadeRow(rowIndex) {
    const row = document.createElement("div");
    row.className = "row";
    row.style.top = `${rowIndex * fontSize}px`;
    matrix.appendChild(row);
    addCharactersToRow(row, columns, 0);
    fadeRow(row);
  }

  function fadeRow(row) {
    setTimeout(() => {
      row.style.opacity = 0.1;
      row.style.transition = "opacity 0.5s ease-in-out";
    }, 500);
  }

  function trailingColumn() {
    trailingInterval = setInterval(() => {
      for (let i = 0; i < 5; i++) {
        createAndFadeColumn(Math.floor(Math.random() * columns));
      }
    }, 200);
  }

  function createAndFadeColumn(columnIndex) {
    let yPos = 0;
    function addAndFadeCharacter() {
      if (yPos < window.innerHeight) {
        const char = createCharacter(columnIndex);
        char.style.top = `${yPos}px`;
        matrix.appendChild(char);
        fadeCharacter(char);
        yPos += fontSize;
        setTimeout(addAndFadeCharacter, 30);
      }
    }
    addAndFadeCharacter();
  }

  function fadeCharacter(char) {
    setTimeout(() => {
      char.style.opacity = 0.05;
      char.style.transition = "opacity 0.2s ease-in-out";
      setTimeout(() => matrix.removeChild(char), 500);
    }, 100);
  }
});
