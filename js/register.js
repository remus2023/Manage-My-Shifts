import {
  userName,
  userNameLabel,
  userNameError,
  userNameImg,
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
import { addRemoveClassesInvalid, addRemoveClassesValid, checkLength } from "./modules/functions.js";
import { preventBack } from "./modules/logFunction.js";
window.onload = () => {
  preventBack();
};

let usersDb = JSON.parse(localStorage.getItem("usersDb")) || [];
let isValid = true;

createAccount.addEventListener("click", (e) => {
  isValid = true;
  e.preventDefault();
  // emptyCheck();
  checkLength(isValid);
  checkAge(ageLabel, age, ageError, ageImg);
  checkEmail(emailLabel, email, emailError, emailImg);
  checkUserName(userNameLabel, userName, userNameError, userNameImg);
  if (isValid) {
    register();
  }
});

function checkEmail(label, input, error, img) {
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const isValidEmail = emailPattern.test(input.value);
  if (input.value) {
    if (!isValidEmail) {
      addRemoveClassesInvalid(input, error, img, "login__input--valid", "login__input--error");
      error.textContent = `${label.textContent} is not a valid email format`;
      isValid = false;
    } else {
      addRemoveClassesValid(input, error, img, "login__input--valid", "login__input--error");
    }
    const foundEmail = usersDb.some((element) => element.email === input.value);
    if (foundEmail && isValidEmail) {
      addRemoveClassesInvalid(input, error, img, "login__input--valid", "login__input--error");
      error.textContent = `${label.textContent} is already in our database. Please choose another mail!`;
      isValid = false;
    }
  } else {
    isValid = false;
  }
}

function checkAge(label, input, error, img) {
  if (input.value >= 18 && input.value <= 65) {
    addRemoveClassesValid(input, error, img, "login__input--valid", "login__input--error");
  } else if (input.value) {
    addRemoveClassesInvalid(input, error, img, "login__input--valid", "login__input--error");
    error.textContent = `${label.textContent} must be between 18 and 65`;
    isValid = false;
  }
}

function checkUserName(label, input, error, img) {
  const foundUserName = usersDb.some((element) => element.username === input.value);
  if (foundUserName) {
    addRemoveClassesInvalid(input, error, img, "login__input--valid", "login__input--error");
    error.textContent = `${label.textContent} is already taken. Please choose another User Name!`;
    isValid = false;
  }
  const patternSpecialChar = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%* #+=\(\)\^?&])[A-Za-z\d$@$!%* #+=\(\)\^?&]{3,}$/;
  const isValidUser = patternSpecialChar.test(input.value);
  if (!isValidUser) {
    addRemoveClassesInvalid(input, error, img, "login__input--valid", "login__input--error");
    error.textContent = `${label.textContent} must contains letters, number and a character`;
    isValid = false;
  }
  console.log(isValidUser);
}

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
