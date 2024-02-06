import {
  userName,
  userNameError,
  userNameImg,
  password,
  passwordError,
  passwordImg,
  signIn,
  dataLength,
  login,
  forgot,
  forgotEmail,
  resetPassword,
  btnCheckEmail,
  btnResetPassword,
  forgotInputEmail,
  forgotInputPassword,
  forgotInputConfirm,
  btnForgotPassword,
  forgotErrorEmail,
  forgotErrorPassword,
  forgotInputUser,
  forgotLabelUser,
} from "./modules/tags.js";
import { addRemoveClassesInvalid, addRemoveClassesValid } from "./modules/functions.js";
import { preventBack } from "./modules/logFunction.js";
import { getDb } from "./modules/fetch.js";

window.onload = () => {
  preventBack();
};
let usersDb = JSON.parse(localStorage.getItem("usersDb")) || [];

signIn.addEventListener("click", (e) => {
  e.preventDefault();
  checkUser();
});

function checkUser() {
  let userCheck = usersDb.find((element) => element.username === userName.value);
  //first check if user exist in db
  if (userCheck) {
    addRemoveClassesValid(userName, userNameError, userNameImg, "login__input--valid", "login__input--error");
    //then check if user password in correct
    if (userCheck.password !== password.value) {
      addRemoveClassesInvalid(password, passwordError, passwordImg, "login__input--valid", "login__input--error");
      passwordError.textContent = `Incorrect password`;
    } else {
      addRemoveClassesValid(password, passwordError, passwordImg, "login__input--valid", "login__input--error");
      localStorage.setItem("loggedUser", JSON.stringify(userCheck));
      window.location.href = "index.html";
    }
  } else {
    addRemoveClassesInvalid(userName, userNameError, userNameImg, "login__input--valid", "login__input--error");
    userNameError.textContent = `User ${userName.value} doesn't exist in database`;
    addRemoveClassesInvalid(password, passwordError, passwordImg, "login__input--valid", "login__input--error");
    passwordError.textContent = `Incorrect password`;
  }
}

btnForgotPassword.addEventListener("click", (e) => {
  e.preventDefault();
  login.classList.add("hide");
  forgot.classList.remove("hide");

  btnCheckEmail.addEventListener("click", (e) => {
    e.preventDefault();
    const usersDb = getDb("usersDb");
    const isValidEmail = usersDb.find((element) => element.email === forgotInputEmail.value);
    if (isValidEmail) {
      forgotEmail.classList.add("hide");
      resetPassword.classList.remove("hide");
      forgotErrorEmail.classList.add("hide");
      forgotLabelUser.textContent = `User Name for email: ${forgotInputEmail.value}`;
      forgotInputUser.value = isValidEmail.username;
      console.log(isValidEmail.username);
      btnResetPassword.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("in event", isValidEmail);
        if (
          forgotInputPassword.value === forgotInputConfirm.value &&
          forgotInputPassword.value &&
          forgotInputPassword.value.length >= 6
        ) {
          usersDb.forEach((element) => {
            if (element.email === isValidEmail.email) {
              element.password = forgotInputPassword.value;
            }
          });
          localStorage.setItem("usersDb", JSON.stringify(usersDb));
          window.location.href = "index.html";
        } else {
          forgotErrorPassword.textContent = "Your password does not match or it's too short!";
          forgotErrorPassword.classList.remove("hide");
        }
      });
    } else {
      forgotErrorEmail.classList.remove("hide");
      forgotErrorEmail.textContent = "Your email isn't in our database. Please Sign Up!";
    }
  });
});
