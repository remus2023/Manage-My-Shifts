import { getUser } from "./fetch.js";
import { checkLogIn, logOut } from "./logFunction.js";
import { hamburgerOpen, hamburgerClose, navbarLinks, navbarMobileLinks } from "./tags.js";

hamburgerOpen.addEventListener("click", () => {
  hamburgerOpen.classList.toggle("hide");
  hamburgerClose.classList.toggle("hide");
  navbarMobileLinks.classList.remove("hide");
});
hamburgerClose.addEventListener("click", () => {
  hamburgerOpen.classList.toggle("hide");
  hamburgerClose.classList.toggle("hide");
  navbarMobileLinks.classList.add("hide");
});
window.addEventListener("resize", function (e) {
  if (window.innerWidth > 768) {
    hamburgerOpen.classList.remove("hide");
    hamburgerClose.classList.add("hide");
    navbarMobileLinks.classList.add("hide");
    console.log("ok");
    // e.stopPropagation();
  }
});
window.onload = () => {
  checkLogIn();
};
userSpan.textContent = `Welcome, ${getUser().username}!`;
logOutBtn.addEventListener("click", logOut);
