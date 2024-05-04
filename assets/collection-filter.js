const filterOpenButton = document.querySelector(
  ".collection-filter__sort-button"
);
const filterForm = document.querySelector(".collection-filter__form");

filterOpenButton.addEventListener("click", toggleMenu);

function toggleMenu() {
  filterForm.classList.toggle("active");
}
