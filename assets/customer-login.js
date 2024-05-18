const loginForm = document.querySelector(".login-section");
const recoveryForm = document.querySelector(".recovery-section");
const recoveryFormLink = document.querySelector(".login-form__forgot-pass a");
const loginFormLink = document.querySelector(".login-form__return-back a");

recoveryFormLink.addEventListener("click", showRecoveryForm);
loginFormLink.addEventListener("click", showLoginForm);

function showRecoveryForm() {
  loginForm.classList.add("inactive");
  recoveryForm.classList.add("active");
}

function showLoginForm() {
  loginForm.classList.remove("inactive");
  recoveryForm.classList.remove("active");
}
