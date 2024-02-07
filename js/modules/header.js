import { getUser } from "./fetch.js";
import { checkLogIn, logOut } from "./logFunction.js";
import { hamburgerOpen, hamburgerClose, navbarMobileLinks, logOutBtn } from "./tags.js";

hamburgerOpen.addEventListener("click", () => {
  hamburgerOpen.classList.toggle("hide");
  hamburgerClose.classList.toggle("hide");
  navbarMobileLinks.classList.add("active");
});
hamburgerClose.addEventListener("click", () => {
  hamburgerOpen.classList.toggle("hide");
  hamburgerClose.classList.toggle("hide");
  navbarMobileLinks.classList.remove("active");
});
window.addEventListener("resize", function (e) {
  if (window.innerWidth > 768) {
    hamburgerOpen.classList.remove("hide");
    hamburgerClose.classList.add("hide");
    navbarMobileLinks.classList.remove("active");
  }
});
window.onload = () => {
  checkLogIn();
};
userSpan.textContent = `Welcome, ${getUser().username}!`;
logOutBtn.addEventListener("click", logOut);
