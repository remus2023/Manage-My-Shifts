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
import { addRemoveClassesInvalid, addRemoveClassesValid, checkShift } from "./modules/functions.js";
let shiftDb = getDb("shiftDb");
let isValid = true;
console.log(addShift);
addShift.addEventListener("click", function (e) {
  isValid = true;
  e.preventDefault();
  checkEmpty();
  checkTime();

  console.log(checkShift(shiftDb, isValid));
  isValid = checkShift(shiftDb, isValid);
  console.log(isValid, checkShift(shiftDb, isValid));
  if (isValid) {
    console.log("inregistrare");
    //registerShift();
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
    }
    //editez inputurile ca sa pot scoate mesajele de eroare
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

// function checkShift(shiftDataBase) {
//   if (shift.value) {
//     const findShift = shiftDataBase.find((element) => shift.value === element.shift);
//     if (!findShift) {
//       addRemoveClassesValid(shift, errorShift, imgErrorShift, "shift__input--valid", "shift__input--error");
//     } else {
//       addRemoveClassesInvalid(shift, errorShift, imgErrorShift, "shift__input--valid", "shift__input--error");
//       errorShift.textContent = "This shift is already in database. Choose another name!";
//       isValid = false;
//     }
//   }
// }

function registerShift() {
  const newShift = {
    dateCreatedShift: date.value,
    startShiftTime: timeStart.value,
    endShiftTime: timeEnd.value,
    hourlyWage: hourlyWage.value,
    workplace: workplace.value,
    shift: shift.value,
    comment: comments.value,
    email: getUser().email,
  };
  shiftDb.push(newShift);
  localStorage.setItem("shiftDb", JSON.stringify(shiftDb));
  alert("Your shift was successfully add into database");
  window.location.href = "addShifts.html";
}
