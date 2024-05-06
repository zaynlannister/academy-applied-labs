const productFormInput = document.querySelector("#product-form-input");
const datasetUrl = document.querySelector("#dataset-url");

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
        setVariantClass(item);
      }
    });
  }
}

// setting class active on choosen variant
function setVariantClass(activeVariant) {
  productVariants.forEach((item) => {
    item.classList.remove("active");
  });
  activeVariant.classList.add("active");
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

    setVariantClass(item);
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
