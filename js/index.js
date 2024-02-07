import { getDb } from "./modules/fetch.js";
import { showShifts, searchWorkplace, searchByDate } from "./modules/functions.js";
import { tbody, searchShift, searchDate } from "./modules/tags.js";

showShifts(getDb("shiftDb"), tbody);
searchWorkplace(searchShift, getDb("shiftDb"));
searchByDate(searchDate, getDb("shiftDb"));
