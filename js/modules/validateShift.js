import { shiftBox } from "./tags.js";
import { addRemoveClassesInvalid, addRemoveClassesValid } from "./functions.js";
import { calculateProfit } from "./functions.js";
// const shiftBox = document.querySelectorAll("[data-empty]");
let isValid = true;
export function validateShift(shiftChecked) {
  isValid = true;
  checkEmpty();
  checkTime();
  checkShift(shiftChecked);
  return isValid;
}

//functie din addShifts.js mutata aici din cauza erori
function checkTime() {
  const startDate = date.value + " " + timeStart.value;
  const endDate = date.value + " " + timeEnd.value;
  const startDateFormat = new Date(startDate);
  const endDateFormat = new Date(endDate);
  console.log(startDateFormat, endDateFormat, timeStart.value > timeEnd.value);

  //de ce imi afiseaza valoarea lui timeStart daca nu e importata din tags.js
  console.log(timeStart, timeStart.value);
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
//functie mutata din addShift.js
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
    shiftInput.addEventListener("input", () => {
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

//functie din addShifts.js mutata aici din cauza erori
function checkShift(shiftDataBase) {
  console.log(shift.value);
  if (shift.value) {
    const findShift = shiftDataBase.find((element) => shift.value === element.shift);
    if (!findShift) {
      addRemoveClassesValid(shift, errorShift, imgErrorShift, "shift__input--valid", "shift__input--error");
      console.log("1 ", isValid, "shift ", shift.value);
    } else {
      addRemoveClassesInvalid(shift, errorShift, imgErrorShift, "shift__input--valid", "shift__input--error");
      errorShift.textContent = "This shift is already in database. Choose another name!";
      isValid = false;
      console.log("2 ", isValid, "shift ", shift.value);
    }
  }
}

export function showBestMonth(userShifts) {
  const objnou = [
    {
      month: "January",
      value: 0,
    },
    {
      month: "February",
      value: 0,
    },
    {
      month: "March",
      value: 0,
    },
    {
      month: "April",
      value: 0,
    },
    {
      month: "May",
      value: 0,
    },
    {
      month: "June",
      value: 0,
    },
    {
      month: "July",
      value: 0,
    },
    {
      month: "August",
      value: 0,
    },
    {
      month: "September",
      value: 0,
    },
    {
      month: "October",
      value: 0,
    },
    {
      month: "November",
      value: 0,
    },
    {
      month: "December",
      value: 0,
    },
  ];
  userShifts.forEach((element) => {
    const date = new Date(element.dateCreatedShift);
    objnou.forEach((item, index) => {
      if (index === date.getMonth()) {
        item.value += Number(calculateProfit(element));
      }
    });
  });
  objnou.sort((a, b) => b.value - a.value);
  console.log(objnou);
  maxMonthProfit.innerHTML = `The best profitable month is ${objnou[0].month} with a total earn of ${objnou[0].value.toFixed(
    2
  )}$`;
}
