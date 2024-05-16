const cartDrawer = document.querySelector(".cart-drawer");
const cartOverlay = document.querySelector(".overlay");
const cartIcon = document.querySelector(".header__links-drawer");
const cartCloseIcon = document.querySelector(".cart-drawer__close");

cartIcon.addEventListener("click", openDrawer);
cartOverlay.addEventListener("click", closeDrawer);
cartCloseIcon.addEventListener("click", closeDrawer);

function openDrawer() {
  cartDrawer.classList.add("active");
  cartOverlay.classList.add("active");
}

function closeDrawer() {
  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");
}
