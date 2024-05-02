// mobile menu

const menuOpenButton = document.querySelector(".header__burger-menu");
const menuCloseButton = document.querySelector(".mobile-menu__close-btn");
const menuDropdownLinks = document.querySelectorAll(
  ".mobile-menu__link-dropdown"
);

menuOpenButton.addEventListener("click", openMobileMenu);
menuCloseButton.addEventListener("click", closeMobileMenu);
menuDropdownLinks.forEach((item) =>
  item.addEventListener("click", toggleMenuDropDown)
);

function openMobileMenu() {
  document.body.classList.add("mobile");
}

function closeMobileMenu() {
  document.body.classList.remove("mobile");
}

function toggleMenuDropDown() {
  const linkId = this.getAttribute("linkId");
  const dropdownContainer = document.querySelector(
    ".mobile-menu__link-container"
  );
  const dropDownId = dropdownContainer.getAttribute("linkId");

  if (linkId == dropDownId) {
    dropdownContainer.classList.toggle("active");
  }
}
