import { getUser } from "./fetch.js";
import { checkLogIn, logOut } from "./logFunction.js";

window.onload = () => {
  checkLogIn();
};
userSpan.textContent = `Buna, ${getUser().username}!!!`;
logOutBtn.addEventListener("click", logOut);
