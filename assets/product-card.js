const dropdownCardButtons = document.querySelectorAll(
  ".product-card__form-dropdown"
);
const productCardVariants = document.querySelectorAll(
  ".product-card__form-wrapper"
);

dropdownCardButtons.forEach((item) => {
  item.addEventListener("click", toggleVariant);
});

function toggleVariant() {
  const dataId = this.getAttribute("data-id");
  const variantWrapper = document.querySelector(
    `#product-card__form-wrapper-${dataId}`
  );

  this.classList.toggle("active");
  variantWrapper.classList.toggle("active");
}

const allVariants = document.querySelectorAll(".product-card__form-variant");

allVariants.forEach((variant) => {
  variant.addEventListener("click", () => {
    const id = variant.getAttribute("custom-id");
    const clickedWrapper = document.querySelectorAll(
      `#product-card__form-wrapper-${id} .product-card__form-variant`
    );

    const input = document.querySelector(`#product-card__form-input-${id}`);

    removeActiveVariants(clickedWrapper);

    variant.classList.add("active");
    input.value = variant.getAttribute("data-id");
  });
});

function removeActiveVariants(variants) {
  variants.forEach((item) => {
    item.classList.remove("active");
  });
}

const allAtcButtons = document.querySelectorAll(".product-form__submit-button");

allAtcButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    const rootElement = button.parentElement;
    const variant = rootElement.querySelector("input[name='id']");

    window.Cart.add(variant.value, 1);
  });
});
