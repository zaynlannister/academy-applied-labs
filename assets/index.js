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

// drawer cart

class Cart {
  constructor() {
    this.items = [];

    this.initializeFormProductAdd();
  }

  async add(variant, quantity, properties = {}) {
    let formData = {
      items: [
        {
          id: variant,
          quantity: quantity,
        },
      ],
    };

    await fetch("/cart/add", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  initializeFormProductAdd() {
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
        this.updateCartIconCount(cart.item_count);

        const cartType = localStorage.getItem("cart_type");

        if (cartType == "drawer") {
          this.updateCartDrawer();
          this.openDrawer();
        }
      });
    });
  }

  addCartDrawerListeners() {
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
        this.updateCartIconCount(cart.item_count);

        // update cart
        this.updateCartDrawer();
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
        this.updateCartIconCount(cart.item_count);

        this.updateCartDrawer();
      });
    });

    cartIcon.addEventListener("click", this.openDrawer);
    document
      .querySelector(".overlay")
      .addEventListener("click", this.closeDrawer);
    cartCloseIcon.addEventListener("click", this.closeDrawer);
  }

  async updateCartDrawer() {
    const res = await fetch("/?section_id=cart-drawer");
    const text = await res.text();
    const html = document.createElement("div");
    html.innerHTML = text;

    const newCartProductsWrapper = html.querySelector(
      ".cart-drawer .cart-drawer__product-wrapper"
    ).innerHTML;
    const newCheckout = html.querySelector(
      ".cart-drawer .cart-drawer__checkout"
    ).innerHTML;

    document.querySelector(
      ".cart-drawer .cart-drawer__product-wrapper"
    ).innerHTML = newCartProductsWrapper;
    document.querySelector(".cart-drawer .cart-drawer__checkout").innerHTML =
      newCheckout;

    this.addCartDrawerListeners();
  }

  updateCartIconCount(count) {
    document.querySelector(".cart-count").textContent = count;
  }

  openDrawer() {
    document.querySelector(".cart-drawer").classList.add("active");
    document.querySelector(".overlay").classList.add("active");
  }

  closeDrawer() {
    document.querySelector(".cart-drawer").classList.remove("active");
    document.querySelector(".overlay").classList.remove("active");
  }
}

window.Cart = new Cart();
