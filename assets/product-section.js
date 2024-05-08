const productFormInput = document.querySelector("#product-form-input");
const datasetUrl = document.querySelector("#dataset-url");
const productPrice = document.querySelector(".product__price");

const productVariants = document.querySelectorAll(".product-variant");

function setDefaultVariant() {
  const defaultId = productFormInput.value;

  if (defaultId) {
    const currentUrl = datasetUrl.getAttribute("data-url");

    urlReplace(currentUrl, productFormInput.value);

    // searching active variant by using url address
    productVariants.forEach((item) => {
      const variantId = item.getAttribute("data-id");
      const urlParams = new URLSearchParams(window.location.search);
      const currentVariantId = urlParams.get("variant");

      setListenersToAllVariants(item);

      if (currentVariantId == variantId) {
        setActiveVariant(item);
      }
    });
  }
}

// setting class active on choosen variant
function setActiveVariant(activeVariant) {
  productVariants.forEach((item) => {
    item.classList.remove("active");
  });

  updatePrice(activeVariant);
  activeVariant.classList.add("active");
}

function priceFormatter(priceInCents) {
  let priceInDollars = priceInCents / 100;
  let formattedPrice = priceInDollars.toFixed(2);

  formattedPrice = "$" + formattedPrice;

  return formattedPrice;
}

function updatePrice(activeVariant) {
  const newPrice = activeVariant.getAttribute("data-price");

  productPrice.innerHTML = priceFormatter(newPrice);
}

// url replacing function
function urlReplace(currentUrl, value) {
  window.history.replaceState({}, "", `${currentUrl}?variant=${value}`);
}

function setListenersToAllVariants(item) {
  item.addEventListener("click", () => {
    const currentUrl = datasetUrl.getAttribute("data-url");
    const itemId = item.getAttribute("data-id");
    urlReplace(currentUrl, itemId);

    setActiveVariant(item);
    productFormInput.value = itemId;
  });
}

setDefaultVariant();

// description dropdown
const dropdownButton = document.querySelector(
  ".product-section__description-button"
);
const dropdownDescription = document.querySelector(
  ".product-section__description"
);
const dropdownIcon = document.querySelector(
  ".product-section__description-button svg"
);

dropdownButton.addEventListener("click", toggleDescription);

function toggleDescription() {
  dropdownDescription.classList.toggle("active");
}

// product image modal
const productImages = document.querySelectorAll(".product-section__image");
const productModals = document.querySelectorAll(".product-section__modal");

productImages.forEach((item) => {
  item.addEventListener("click", showModal);
});

function showModal() {
  const imageId = this.getAttribute("data-id");
  const modal = document.querySelector(`#image-modal-${imageId}`);
  const closeModalButton = document.querySelector(`#modal-close-${imageId}`);

  closeAllModals();
  modal.classList.add("active");

  closeModalButton.addEventListener("click", () => {
    closeModal(modal);
  });
}

function closeModal(modal) {
  modal.classList.remove("active");
}

function closeAllModals() {
  productModals.forEach((item) => {
    item.classList.remove("active");
  });
}
