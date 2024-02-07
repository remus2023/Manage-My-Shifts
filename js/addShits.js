import { getUser, getDb } from "./modules/fetch.js";
import {
  addShift,
  shiftBox,
  startDate,
  endDate,
  timeStart,
  timeEnd,
  imgErrorStartDate,
  imgErrorEndDate,
  imgErrorTimeStart,
  imgErrorTimeEnd,
  errorStartDate,
  errorEndDate,
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

startDate.addEventListener("input", () => {
  timeStart.disabled = false;
  if (!startDate.value) {
    timeStart.disabled = true;
    timeStart.value = "";
    timeStart.classList.remove("shift__input--error");
    imgErrorTimeStart.classList.add("hide");
    errorTimeStart.classList.add("hide");
  }
});

endDate.addEventListener("input", () => {
  timeEnd.disabled = false;
  if (!endDate.value) {
    timeEnd.disabled = true;
    timeEnd.value = "";
    timeEnd.classList.remove("shift__input--error");
    imgErrorTimeEnd.classList.add("hide");
    errorTimeEnd.classList.add("hide");
  }
});

function registerShift() {
  const newShift = {
    dateStartShift: startDate.value,
    timeStartShift: timeStart.value,
    dateEndShift: endDate.value,
    timeEndShift: timeEnd.value,
    hourlyWage: hourlyWage.value,
    workplace: workplace.value,
    shift: shift.value,
    comment: comments.value,
    username: getUser().username,
  };
  shiftDb.push(newShift);
  localStorage.setItem("shiftDb", JSON.stringify(shiftDb));
  alert("Your shift was successfully add into our database");
  startDate.value = "";
  timeStart.value = "";
  endDate.value = "";
  timeEnd.value = "";
  hourlyWage.value = "";
  workplace.value = "Paint Shop";
  shift.value = "";
  comments.value = "";
  // window.location.href = "addShifts.html";
}
