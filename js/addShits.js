import { getUser, getDb } from "./modules/fetch.js";
import {
  addShift,
  shiftBox,
  date,
  timeStart,
  timeEnd,
  imgErrorDate,
  imgErrorTimeStart,
  imgErrorTimeEnd,
  errorDate,
  errorTimeStart,
  errorTimeEnd,
  hourlyWage,
  workplace,
  shift,
  imgErrorShift,
  errorShift,
  comments,
} from "./modules/tags.js";
import { addRemoveClassesInvalid, addRemoveClassesValid, resetInput } from "./modules/functions.js";
import { validateShift } from "./modules/validateShift.js";
let shiftDb = getDb("shiftDb");
let isValid = true;
addShift.addEventListener("click", function (e) {
  isValid = true;
  e.preventDefault();

  if (validateShift(shiftDb)) {
    resetInput("shift__input--valid", "shift__input--error");
    registerShift();
  }
});

date.addEventListener("input", () => {
  timeStart.disabled = false;
  timeEnd.disabled = false;
  if (!date.value) {
    timeStart.disabled = true;
    timeEnd.disabled = true;
    timeStart.value = "";
    timeEnd.value = "";
    timeStart.classList.remove("shift__input--error");
    imgErrorTimeStart.classList.add("hide");
    errorTimeStart.classList.add("hide");
    timeEnd.classList.remove("shift__input--error");
    imgErrorTimeEnd.classList.add("hide");
    errorTimeEnd.classList.add("hide");
  }
});

function registerShift() {
  const newShift = {
    dateCreatedShift: date.value,
    startShiftTime: timeStart.value,
    endShiftTime: timeEnd.value,
    hourlyWage: hourlyWage.value,
    workplace: workplace.value,
    shift: shift.value,
    comment: comments.value,
    username: getUser().username,
  };
  shiftDb.push(newShift);
  localStorage.setItem("shiftDb", JSON.stringify(shiftDb));
  alert("Your shift was successfully add into our database");
  date.value = "";
  timeStart.value = "";
  timeEnd.value = "";
  hourlyWage.value = "";
  workplace.value = "Paint Shop";
  shift.value = "";
  comments.value = "";
  // window.location.href = "addShifts.html";
}
