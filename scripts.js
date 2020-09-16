const createAccountF  = document.getElementById("create-account-form");
const username        = document.getElementById("input-username");
const email           = document.getElementById("input-email");
const password        = document.getElementById("input-password");
const confirmPassword = document.getElementById("input-confirm-password");

createAccountF.addEventListener("submit", event => {
  event.preventDefault();
  checkInputs();
});

username.addEventListener("focus", event => {
  event.preventDefault();
  removeErrorFor(username);
});

username.addEventListener("blur", event => {
  event.preventDefault();
  checkUsername();
});

email.addEventListener("focus", event => {
  event.preventDefault();
  removeErrorFor(email);
});

email.addEventListener("blur", event => {
  event.preventDefault();
  checkEmail();
});

password.addEventListener("focus", event => {
  event.preventDefault();
  removeErrorFor(password);
});

password.addEventListener("blur", event => {
  event.preventDefault();
  checkPassword();
});

confirmPassword.addEventListener("focus", event => {
  event.preventDefault();
  removeErrorFor(confirmPassword);
});

confirmPassword.addEventListener("blur", event => {
  event.preventDefault();
  checkConfirmPassword();
});

function checkInputs() {
  checkUsername();
  checkEmail();
  checkPassword();
  checkConfirmPassword()
}

function checkUsername() {
  const usernameValue = username.value.trim();

  if (usernameValue === "") {
    setErrorFor(username, "Username cannot be blank");
  } else {
    setSuccessFor(username);
  }
}

function checkEmail() {
  const emailValue = email.value.trim();

  if (emailValue === "") {
    setErrorFor(email, "Email cannot be blank");
  } else if (!validateEmail(emailValue)) {
    setErrorFor(email, "Email is not valid");
  } else {
    setSuccessFor(email);
  }
}

function checkPassword() {
  const passwordValue = password.value.trim();

  if (passwordValue === "") {
    setErrorFor(password, "Password cannot be blank");
  } else {
    setSuccessFor(password);
  }
}

function checkConfirmPassword() {
  const confirmPasswordValue = confirmPassword.value.trim();
  const passwordValue = password.value.trim();

  if (confirmPasswordValue === "") {
    setErrorFor(confirmPassword, "Confirm Password cannot be blank");
  } else if (confirmPasswordValue !== passwordValue) {
    setErrorFor(confirmPassword, "Passwords does not match");
  } else {
    setSuccessFor(confirmPassword);
  }
}

function setErrorFor(input, msg) {
  const formField = input.parentElement;
  const formMessage = formField.getElementsByClassName("form__message")[0];

  formMessage.innerText = msg;

  formField.classList.remove("form__field--success");
  formField.classList.add("form__field--error");
}

function removeErrorFor(input) {
  const formField = input.parentElement;
  formField.classList.remove("form__field--error");
}

function setSuccessFor(input) {
  const formField = input.parentElement;
  const formMessage = formField.getElementsByClassName("form__message")[0];

  formMessage.innerText = "";

  formField.classList.remove("form__field--error");
  formField.classList.add("form__field--success");
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}