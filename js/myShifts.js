import { getDb, getUser } from "./modules/fetch.js"; // de ce merge daca nu e importat userSpan???
import { tbody, searchShift, searchDate } from "./modules/tags.js";
import { showShifts, searchWorkplace, searchByDate } from "./modules/functions.js";
import { showBestMonth } from "./modules/validateShift.js";

let userShifts = getDb("shiftDb").filter((element) => element.username === getUser().username);

searchWorkplace(searchShift, userShifts);
searchByDate(searchDate, userShifts);
showShifts(userShifts, tbody);
showBestMonth(userShifts);
