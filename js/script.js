document.addEventListener("DOMContentLoaded", function () {
  var links = document.querySelectorAll('a[href^="#"]');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (event) {
      event.preventDefault();
      var target = document.querySelector(this.getAttribute("href"));
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: "smooth",
        });
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const openModalButtons = document.querySelectorAll(".project");
  const closeModalButton = document.querySelector("[data-close-button]");
  const overlay = document.getElementById("overlay");
  const modal = document.getElementById("modal");
  const modalTitle = modal.querySelector(".title");
  const modalBody = modal.querySelector(".modal-body");

  openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal-target");
      fetch(`content/${modalId.replace("#", "")}.html`) // Path to your modal content files
        .then((response) => response.text())
        .then((html) => {
          modalTitle.textContent = button.textContent + " Details"; // Dynamic title based on project name
          modalBody.innerHTML = html;
          openModal();
        })
        .catch((err) => console.error("Failed to load modal content", err));
    });
  });

  closeModalButton.addEventListener("click", () => {
    closeModal();
  });

  overlay.addEventListener("click", () => {
    closeModal();
  });

  function openModal() {
    modal.classList.add("active");
    overlay.classList.add("active");
  }

  function closeModal() {
    modal.classList.remove("active");
    overlay.classList.remove("active");
  }
});
