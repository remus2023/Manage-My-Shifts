import {
  userName,
  userNameLabel,
  userNameError,
  firstName,
  firstNameLabel,
  firstNameError,
  lastName,
  lastNameLabel,
  lastNameError,
  age,
  ageLabel,
  ageError,
  ageImg,
  password,
  passwordLabel,
  passwordError,
  email,
  emailLabel,
  emailError,
  emailImg,
  createAccount,
  dataLength,
} from "./modules/tags.js";
import { addRemoveClassesInvalid, addRemoveClassesValid, preventBack } from "./modules/functions.js";
window.onload = () => {
  preventBack();
};

let usersDb = JSON.parse(localStorage.getItem("usersDb")) || [];
let isValid = true;

createAccount.addEventListener("click", (e) => {
  isValid = true;
  e.preventDefault();
  // emptyCheck();
  checkLength();
  checkAge(ageLabel, age, ageError, ageImg);
  checkEmail(emailLabel, email, emailError, emailImg);
  if (isValid) {
    register();
    // header();
    // footer();
    // getUser();
  }
});

// function emptyCheck() {
//   loginBox.forEach((element) => {
//     const loginInput = element.querySelector(".login__input");
//     const loginError = element.querySelector(".login__error");
//     const loginLabel = element.querySelector(".login__label");
//     //When I have an error and i want to edit input, must eliminate error style
//     loginInput.addEventListener("input", () => {
//       loginError.classList.add("hide");
//       loginInput.classList.remove("login__input--error");
//     });

//     if (!loginInput.value) {
//       loginError.textContent = `${loginLabel.textContent} can't be empty`;
//       loginError.classList.remove("hide");
//       loginInput.classList.add("login__input--error");
//     }
//   });
// }
function checkLength() {
  dataLength.forEach((element) => {
    const loginInput = element.querySelector(".login__input");
    const loginError = element.querySelector(".login__error");
    const loginLabel = element.querySelector(".login__label");
    const loginImg = element.querySelector(".login__img");
    console.log(loginInput, loginError, loginLabel, Number(element.dataset.length));
    //When I have an error and i want to edit input, must eliminate error style
    loginInput.addEventListener("input", () => {
      loginError.classList.add("hide");
      loginInput.classList.remove("login__input--error");
      loginImg.classList.add("hide");
    });

    if (!loginInput.value) {
      addRemoveClassesInvalid(loginInput, loginError, loginImg, "login__input--valid", "login__input--error");
      loginError.textContent = `${loginLabel.textContent} can't be empty`;
      isValid = false;
    } else if (loginInput.value.length < element.dataset.length && loginInput.value.length > 0) {
      addRemoveClassesInvalid(loginInput, loginError, loginImg, "login__input--valid", "login__input--error");
      loginError.textContent = `${loginLabel.textContent} must have at least ${element.dataset.length} characters long`;
      isValid = false;
    } else {
      addRemoveClassesValid(loginInput, loginError, loginImg, "login__input--valid", "login__input--error");
    }
  });
}
function checkEmail(label, input, error, img) {
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const isValidEmail = emailPattern.test(input.value);
  console.log(isValidEmail);
  if (!isValidEmail) {
    addRemoveClassesInvalid(input, error, img, "login__input--valid", "login__input--error");
    error.textContent = `${label.textContent} is not a valid email format`;
    isValid = false;
  } else {
    addRemoveClassesValid(input, error, img, "login__input--valid", "login__input--error");
  }
  console.log("verif email: ", isValid);
}
function checkAge(label, input, error, img) {
  if (input.value >= 18 && input.value <= 65) {
    addRemoveClassesValid(input, error, img, "login__input--valid", "login__input--error");
  } else {
    addRemoveClassesInvalid(input, error, img, "login__input--valid", "login__input--error");
    isValid = false;
    error.textContent = `${label.textContent} must be between 18 and 65`;
  }
}
// function checkUserName(label, input, error, img) {}

// function checkName(label, input, error, img) {}

function register() {
  let newUser = {
    username: userName.value,
    firstname: firstName.value,
    lastname: lastName.value,
    age: age.value,
    password: password.value,
    email: email.value,
  };
  usersDb.push(newUser);
  localStorage.setItem("usersDb", JSON.stringify(usersDb));
  window.location.href = "login.html";
}
