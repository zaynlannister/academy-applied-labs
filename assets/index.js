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
  const dropdownContainers = document.querySelectorAll(
    ".mobile-menu__link-container"
  );

  dropdownContainers.forEach((item) => {
    const dropdownId = item.getAttribute("linkId");

    if (linkId == dropdownId) {
      item.classList.toggle("active");
    }
  });
}

// search bar
const searchButton = document.querySelector(".header__links-search");
const searchBar = document.querySelector(".header-search");
const searchBarCloseButton = document.querySelector(
  ".header-search__close-button"
);

searchButton.addEventListener("click", openSearchBar);
searchBarCloseButton.addEventListener("click", closeSearchBar);

function openSearchBar() {
  searchBar.classList.add("active");
}

function closeSearchBar() {
  searchBar.classList.remove("active");
}
