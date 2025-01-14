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
//import { checkLength, checkAge, checkEmail, checkUserName } from "./modules/registerFunctions.js";
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
  console.log(isValid);
  if (isValid) {
    register();
  }
});

export function checkEmail(label, input, error, img) {
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const isValidEmail = emailPattern.test(input.value);
  console.log(isValidEmail);
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

export function checkAge(label, input, error, img) {
  if (input.value >= 18 && input.value <= 65) {
    addRemoveClassesValid(input, error, img, "login__input--valid", "login__input--error");
  } else if (input.value) {
    addRemoveClassesInvalid(input, error, img, "login__input--valid", "login__input--error");
    error.textContent = `${label.textContent} must be between 18 and 65`;
    isValid = false;
  }
}

export function checkUserName(label, input, error, img) {
  const foundUserName = usersDb.some((element) => element.username === input.value);
  if (foundUserName) {
    addRemoveClassesInvalid(input, error, img, "login__input--valid", "login__input--error");
    error.textContent = `${label.textContent} is already taken. Please choose another User Name!`;
    isValid = false;
  }
}

// function checkName(label, input, error, img) {}

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
