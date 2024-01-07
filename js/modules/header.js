import { getUser } from "./fetch.js";
import { checkLogIn } from "./logFunction.js";

window.onload = () => {
  checkLogIn();
};
userSpan.textContent = `Buna, ${getUser().username}!!!`;
logOutBtn.addEventListener("click", () => console.log("logoutaaaa"));
