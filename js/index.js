import { getDb } from "./modules/fetch.js";
import { showShifts } from "./modules/functions.js";
import { tbody } from "./modules/tags.js";

console.log(getDb("shiftDb"));

showShifts(getDb("shiftDb"), tbody);
