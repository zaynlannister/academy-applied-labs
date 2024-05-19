// create modal

const closeModalButton = document.querySelector(
  ".addresses-form__header-button"
);
const openModalButton = document.querySelector(
  ".addresses-header__create-button"
);
const createAddressForm = document.querySelector(".addressess-form");

openModalButton.addEventListener("click", openModal);
closeModalButton.addEventListener("click", closeModal);

function openModal() {
  createAddressForm.classList.add("active");
}

function closeModal() {
  createAddressForm.classList.remove("active");
}

// edit modal open
const editForms = document.querySelectorAll(".addresses-edit");
const addressWrapper = document.querySelector(".addresses-wrapper");

addressWrapper.addEventListener("click", (ev) => {
  const isButton = ev.target.classList.contains("address-buttons__edit");

  if (isButton) {
    console.log("hello");
    const formId = ev.target.getAttribute("data-id");
    const form = document.querySelector(`#edit-form-${formId}`);

    form.classList.add("active");
  }
});

// close edit modal
editForms.forEach((form) => {
  const closeButton = form.querySelector(".addresses-edit__header-button");

  closeButton.addEventListener("click", () => {
    form.classList.remove("active");
  });
});

class CustomerAddress {
  constructor() {
    this.initCustomerAddress();
    this.customerAddressesSelector();
    this.initDeleteAddressButtons();
  }

  initDeleteAddressButtons() {
    const deleteButtons = document.querySelectorAll(
      "button[data-delete-address]"
    );

    if (deleteButtons.length < 1) return;

    deleteButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const url = e.target.dataset.url;
        const deleteForm = document.querySelector(`form[action="${url}"]`);

        const confirmation = window.confirm(
          "Are you sure you want to delete this ?"
        );

        if (confirmation) {
          deleteForm.submit();
        }
      });
    });
  }

  initCustomerAddress() {
    const allAddressesSelector = document.querySelectorAll(
      "select[data-country-selector]"
    );
    if (allAddressesSelector.length < 1) return;

    allAddressesSelector.forEach((select) => {
      var selectedCountry = this.getSelectedCountry(select);
      if (!selectedCountry) return;
      var provinces = selectedCountry.dataset.provinces;
      var arrayOfProvince = JSON.parse(provinces);
      var provinceSelector = document.querySelector(
        `#address_province_${select.dataset.id}`
      );
      if (arrayOfProvince.length < 1) {
        provinceSelector.setAttribute("disabled", "disabled");
      } else {
        provinceSelector.removeAttribute("disabled");
      }
      provinceSelector.innerHTML = "";
      var options = "";
      for (var index = 0; index < arrayOfProvince.length; index++) {
        if (
          arrayOfProvince[index][0] === provinceSelector.getAttribute("value")
        ) {
          options += `<option value="${arrayOfProvince[index][0]}" selected>${arrayOfProvince[index][0]}</option>`;
        } else {
          options += `<option value="${arrayOfProvince[index][0]}">${arrayOfProvince[index][0]}</option>`;
        }
      }
      provinceSelector.innerHTML = options;
    });
  }

  getSelectedCountry(select) {
    var option, selectedOption;
    for (var index = 0; index < select.options.length; index++) {
      option = select.options[index];
      if (option.value === select.getAttribute("value")) {
        selectedOption = option;
        selectedOption.setAttribute("selected", "selected");
        break;
      }
    }
    return selectedOption;
  }

  customerAddressesSelector() {
    const addressesSelector = document.querySelectorAll(
      "select[data-country-selector]"
    );
    if (addressesSelector.length < 1) return;
    addressesSelector.forEach((select) => {
      select.addEventListener("change", function (e) {
        var provinces = this.options[this.selectedIndex].dataset.provinces;
        var arrayOfProvince = JSON.parse(provinces);
        var provinceSelector = document.querySelector(
          `#address_province_${this.dataset.id}`
        );
        if (arrayOfProvince.length < 1) {
          provinceSelector.setAttribute("disabled", "disabled");
        } else {
          provinceSelector.removeAttribute("disabled");
        }
        provinceSelector.innerHTML = "";
        var options = "";
        for (var index = 0; index < arrayOfProvince.length; index++) {
          options += `<option value="${arrayOfProvince[index][0]}">${arrayOfProvince[index][0]}</option>`;
        }
        provinceSelector.innerHTML = options;
      });
    });
  }
}

const customerAddress = new CustomerAddress();
