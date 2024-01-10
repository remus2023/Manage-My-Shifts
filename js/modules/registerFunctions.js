import { dataLength } from "./tags.js";
import { addRemoveClassesValid, addRemoveClassesInvalid } from "./functions.js";
import { getDb } from "./fetch.js";
let isValid = true;
const usersDb = getDb("usersDb");
export function checkLength() {
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
      return (isValid = false);
    } else if (loginInput.value.length < element.dataset.length && loginInput.value.length > 0) {
      addRemoveClassesInvalid(loginInput, loginError, loginImg, "login__input--valid", "login__input--error");
      loginError.textContent = `${loginLabel.textContent} must have at least ${element.dataset.length} characters long`;
      return (isValid = false);
    } else {
      addRemoveClassesValid(loginInput, loginError, loginImg, "login__input--valid", "login__input--error");
    }
  });
}

export function checkEmail(label, input, error, img, usersDb) {
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
  const foundEmail = usersDb.some((element) => element.email === input.value);
  if (foundEmail && isValidEmail) {
    addRemoveClassesInvalid(input, error, img, "login__input--valid", "login__input--error");
    error.textContent = `${label.textContent} is already in our database. Please choose another mail!`;
    isValid = false;
  }
  console.log("verif email: ", isValid);
}

export function checkAge(label, input, error, img) {
  if (input.value >= 18 && input.value <= 65) {
    addRemoveClassesValid(input, error, img, "login__input--valid", "login__input--error");
  } else if (input.value) {
    addRemoveClassesInvalid(input, error, img, "login__input--valid", "login__input--error");
    error.textContent = `${label.textContent} must be between 18 and 65`;
    isValid = false;
  }
}

export function checkUserName(label, input, error, img, usersDb) {
  const foundUserName = usersDb.some((element) => element.username === input.value);
  if (foundUserName) {
    addRemoveClassesInvalid(input, error, img, "login__input--valid", "login__input--error");
    error.textContent = `${label.textContent} is already in our database. Please choose another User Name!`;
    isValid = false;
  }
}

// function checkName(label, input, error, img) {}
