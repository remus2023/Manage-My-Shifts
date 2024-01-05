import { getDb } from "./modules/fetch.js";
import { checkLogIn, showShifts } from "./modules/functions.js";
import { tbody } from "./modules/tags.js";

window.onload = () => {
  checkLogIn();
};
console.log(getDb("shiftDb"));
showShifts(getDb("shiftDb"), tbody);
