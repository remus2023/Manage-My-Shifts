import {
  userName,
  userNameError,
  userNameImg,
  password,
  passwordError,
  passwordImg,
  signIn,
  dataLength,
} from "./modules/tags.js";
import { addRemoveClassesInvalid, addRemoveClassesValid } from "./modules/functions.js";
let usersDb = JSON.parse(localStorage.getItem("usersDb")) || [];

signIn.addEventListener("click", (e) => {
  e.preventDefault();
  checkUser();
});

function checkUser() {
  let userCheck = usersDb.find((element) => element.username === userName.value);
  //first check if user exist in db
  if (userCheck) {
    addRemoveClassesValid(userName, userNameError, userNameImg);
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
