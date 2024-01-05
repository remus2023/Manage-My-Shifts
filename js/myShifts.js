import { logOutBtn, getDb, getUser } from "./modules/fetch.js"; // de ce merge daca nu e importat userSpan???
import { date, timeStart, timeEnd, hourlyWage, shift, totalWage, editShift, table, tr, tbody } from "./modules/tags.js";
import { showShifts } from "./modules/functions.js";
let userShifts = getDb("shiftDb").filter((element) => element.email === getUser().email);
console.log(userShifts);

showShifts(userShifts, tbody);
