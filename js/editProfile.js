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
  createAccountX,
  dataLength,
} from "./modules/tags.js";
import { getUser, getDb } from "./modules/fetch.js";
import { checkLength } from "./modules/functions.js";

let usersDb = getDb("usersDb");

function getUserInfo(user) {
  userName.value = user.username;
  firstName.value = user.firstname;
  lastName.value = user.lastname;
  age.value = user.age;
  password.value = user.password;
  email.value = user.email;
}
getUserInfo(getUser());

createAccountX.addEventListener("click", (e) => {
  let isValid = true;
  e.preventDefault();
  isValid = checkLength(isValid);
  console.log(isValid);
  if (isValid) {
    //actualizeaza in usersDB campurile modificate
    usersDb.forEach((element) => {
      if (element.email === getUser().email) {
        element.username = userName.value;
        element.firstname = firstName.value;
        element.lastname = lastName.value;
        element.age = age.value;
        element.password = password.value;
      }
    });
    //obiect folosit pentru a actualiza in localstorage usersDB in timp real
    let newUser = {
      username: userName.value,
      firstname: firstName.value,
      lastname: lastName.value,
      age: age.value,
      password: password.value,
      email: email.value,
    };
    localStorage.setItem("loggedUser", JSON.stringify(newUser));
    console.log(getUser(), usersDb);
    localStorage.setItem("usersDb", JSON.stringify(usersDb));
    //window.location.href = "index.html";
  }
});
