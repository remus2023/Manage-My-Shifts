import {} from "./modules/fetch.js";
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
import { addRemoveClassesInvalid, addRemoveClassesValid } from "./modules/functions.js";
const ora = document.querySelector("#timeStart");
const ora2 = document.querySelector("#timeEnd");
const data = document.querySelector("#date");
const submit = document.querySelector("#submit");
let shiftDb = JSON.parse(localStorage.getItem("shiftDb")) || [];
let isValid = true;

addShift.addEventListener("click", function (e) {
  isValid = true;
  e.preventDefault();
  checkEmpty();
  checkTime();
  checkShift();
  if (isValid) registerShift();
});

date.addEventListener("input", () => {
  timeStart.disabled = false;
  timeEnd.disabled = false;
  if (!date.value) {
    timeStart.disabled = true;
    timeEnd.disabled = true;
    timeStart.value = "";
    timeEnd.value = "";
  }
});
function checkEmpty() {
  shiftBox.forEach((element) => {
    const shiftLabel = element.querySelector(".shift__label");
    const shiftInput = element.querySelector(".shift__input");
    let shiftImg = "";
    let shiftError = "";
    if (element.dataset.empty === "no") {
      // de ce nu merge daca declar aici cu const???
      shiftImg = element.querySelector(".shift__img");
      shiftError = element.querySelector(".shift__error");
      //   console.log(shiftImg, shiftError, typeof element.dataset.empty);
    }
    shiftInput.addEventListener("input", function (e) {
      shiftInput.classList.remove("shift__input--error");
      if (element.dataset.empty === "no") {
        shiftImg.classList.add("hide");
        shiftError.classList.add("hide");
      }
    });
    if (element.dataset.empty === "no" && !shiftInput.disabled) {
      if (shiftInput.value) {
        addRemoveClassesValid(shiftInput, shiftError, shiftImg, "shift__input--valid", "shift__input--error");
        console.log("checkempty ", shiftInput.value);
      } else {
        addRemoveClassesInvalid(shiftInput, shiftError, shiftImg, "shift__input--valid", "shift__input--error");
        shiftError.textContent = `${shiftLabel.textContent} can't be empty!`;
        isValid = false;
      }
    }
  });
}
function checkTime() {
  const startDate = date.value + " " + timeStart.value;
  const endDate = date.value + " " + timeEnd.value;
  const startDateFormat = new Date(startDate);
  const endDateFormat = new Date(endDate);
  console.log(startDateFormat, endDateFormat, timeStart.value > timeEnd.value);
  if (!timeStart.disabled && !timeEnd.disabled && timeStart.value && timeEnd.value) {
    if (startDateFormat.getTime() > endDateFormat.getTime()) {
      addRemoveClassesInvalid(timeStart, errorTimeStart, imgErrorTimeStart, "shift__input--valid", "shift__input--error");
      addRemoveClassesInvalid(timeEnd, errorTimeEnd, imgErrorTimeEnd, "shift__input--valid", "shift__input--error");
      errorTimeStart.textContent = `Start time must be lower thar End time!`;
      errorTimeEnd.textContent = `End time must be higher thar Start time!`;

      isValid = false;
    } else {
      addRemoveClassesValid(timeStart, errorTimeStart, imgErrorTimeStart, "shift__input--valid", "shift__input--error");
      addRemoveClassesValid(timeEnd, errorTimeEnd, imgErrorTimeEnd, "shift__input--valid", "shift__input--error");
      console.log("checktime ", timeStart.value, timeEnd.value);
    }
  }
}
function checkShift() {
  const shiftToCheck = JSON.parse(localStorage.getItem("shiftDb"));
  const findShift = shiftToCheck.find((element) => shift.value === element.shift);
  if (!findShift) {
    addRemoveClassesValid(shift, errorShift, imgErrorShift, "shift__input--valid", "shift__input--error");
  } else {
    addRemoveClassesInvalid(shift, errorShift, imgErrorShift, "shift__input--valid", "shift__input--error");
    errorShift.textContent = "This shift is already in database. Choose another name!";
    isValid = false;
  }
}
function registerShift() {
  const newShift = {
    dateCreatedShift: date.value,
    startShiftTime: timeStart.value,
    endShiftTime: timeEnd.value,
    hourlyWage: hourlyWage.value,
    workplace: workplace.value,
    shift: shift.value,
    comment: comments.value,
  };
  shiftDb.push(newShift);
  localStorage.setItem("shiftDb", JSON.stringify(shiftDb));
  alert("Your shift was successfully add into database");
  window.location.href = "addShifts.html";
}
// submit.addEventListener("click", (e) => {
//   e.preventDefault();
//   console.log(ora.value < ora2.value);
//   let oraToDate = data.value + " " + ora.value;
//   let oraFormat = new Date(oraToDate);
//   let dataMili = new Date(data.value);
//   let oraDif = ora2.value - ora.value;
//   console.log(ora.value, " >>> ", oraFormat, "   ", data.value, " >>> ", dataMili);
//   console.log(ora2.value, ora.value, oraDif);
// });
