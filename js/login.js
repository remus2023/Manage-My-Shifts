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
      addRemoveClassesInvalid(password, passwordError, passwordImg);
      passwordError.textContent = `Incorrect password`;
    } else {
      addRemoveClassesValid(password, passwordError, passwordImg);
      localStorage.setItem("loggedUser", JSON.stringify(userCheck));
      window.location.href = "index.html";
    }
  } else {
    addRemoveClassesInvalid(userName, userNameError, userNameImg);
    userNameError.textContent = `User ${userName.value} doesn't exist in database`;
    addRemoveClassesInvalid(password, passwordError, passwordImg);
    passwordError.textContent = `Incorrect password`;
  }
}
