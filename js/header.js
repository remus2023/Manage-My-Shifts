//import { logOutBtn, userSpan } from "./modules/tags.js";
import { logOut } from "./modules/functions.js";
import { getUser } from "./modules/fetch.js";
console.log(logOutBtn, getUser());
if (logOutBtn) {
  console.log("logout");
  logOutBtn.addEventListener("click", logOut);
}

userSpan.textContent = `Buna, ${getUser().username}!!!`;
