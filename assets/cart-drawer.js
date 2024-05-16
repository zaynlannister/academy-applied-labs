// open & close drawer
const cartDrawer = document.querySelector(".cart-drawer");
const cartOverlay = document.querySelector(".overlay");

function openDrawer() {
  cartDrawer.classList.add("active");
  cartOverlay.classList.add("active");
}

function closeDrawer() {
  cartDrawer.classList.remove("active");
  cartOverlay.classList.remove("active");
}

// cart update

async function updateCartDrawer() {
  const res = await fetch("/?section_id=cart-drawer");
  const text = await res.text();
  const html = document.createElement("div");
  html.innerHTML = text;

  const newBox = html.querySelector(".cart-drawer").innerHTML;

  document.querySelector(".cart-drawer").innerHTML = newBox;

  addCartDrawerListeners();
}

function updateCartIconCount(count) {
  document.querySelector(".cart-count").textContent = count;
}

function addCartDrawerListeners() {
  // quantity update
  const cartIcon = document.querySelector(".header__links-drawer");
  const cartCloseIcon = document.querySelector(".cart-drawer__close");

  const quantityButtons = document.querySelectorAll(
    ".cart-drawer__quantity button"
  );

  quantityButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      // get line item key
      const rootItem = button.parentElement.parentElement;
      const key = rootItem.getAttribute("data-line-item-key");

      // get new quantity
      const currentQuantity = parseInt(
        button.parentElement.querySelector("input").value
      );
      const isUp = button.classList.contains("cart-drawer__quantity-plus");
      const newQuantity = isUp ? currentQuantity + 1 : currentQuantity - 1;

      // ajax update
      const res = await fetch("/cart/update.js", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updates: { [key]: newQuantity } }),
      });

      const cart = await res.json();

      updateCartIconCount(cart.item_count);

      // update cart
      updateCartDrawer();
    });
  });

  // remove product
  const removeButton = document.querySelectorAll(".cart-drawer__remove svg");

  removeButton.forEach((item) => {
    item.addEventListener("click", async () => {
      const key =
        item.parentElement.parentElement.getAttribute("data-line-item-key");

      const res = await fetch("/cart/update.js", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updates: { [key]: 0 } }),
      });

      const cart = await res.json();
      updateCartIconCount(cart.item_count);

      updateCartDrawer();
    });
  });

  cartIcon.addEventListener("click", openDrawer);
  cartOverlay.addEventListener("click", closeDrawer);
  cartCloseIcon.addEventListener("click", closeDrawer);
}

addCartDrawerListeners();

// add to cart using ajax

document.querySelectorAll('form[action="/cart/add"]').forEach((form) => {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    await fetch("/cart/add", {
      method: "post",
      body: new FormData(form),
    });

    // update cart count
    const res = await fetch("/cart.js");
    const cart = await res.json();
    updateCartIconCount(cart.item_count);

    const cartType = localStorage.getItem("cart_type");

    if (cartType == "drawer") {
      updateCartDrawer();
      openDrawer();
    }
  });
});
