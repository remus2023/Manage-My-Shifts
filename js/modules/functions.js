import { getDb } from "./fetch.js";
import { date, timeStart, timeEnd, hourlyWage, workplace, shift, comments, addShift, modal, closeModal } from "./tags.js";
//import { checkShift } from "../addShits.js";
// de ce daca decomentez sus imi da eroare in index.html???

export function addRemoveClassesInvalid(input, error, img, inputValid, inputError) {
  error.classList.remove("hide");
  input.classList.remove(inputValid);
  input.classList.add(inputError);
  img.src = "./images/nok.png";
  img.classList.remove("hide");
}
export function addRemoveClassesValid(input, error, img, inputValid, inputError) {
  input.classList.add(inputValid);
  input.classList.remove(inputError);
  error.classList.add("hide");
  img.classList.remove("hide");
  img.src = "./images/ok.png";
}

export function showShifts(sortedShifts, parentTag) {
  sortedShifts.forEach((element) => renderShifts(element, parentTag));
}

function renderShifts(shiftObj, parentTag) {
  const trTag = document.createElement("tr");
  const tagObject = Object.keys(shiftObj);
  tagObject.forEach((item) => {
    if (window.location.pathname === "/index.html") {
      if (item !== "comment" && item !== "shift" && item !== "hourlyWage") {
        const tdTag = document.createElement("td");
        if (item === "hourlyWage") {
          tdTag.textContent = `${shiftObj[item]} $`;
          trTag.appendChild(tdTag);
        } else {
          tdTag.textContent = shiftObj[item];
          trTag.appendChild(tdTag);
        }
      }
    }
    if (window.location.pathname === "/myShifts.html") {
      if (item !== "username" && item !== "comment" && item !== "shift") {
        const tdTag = document.createElement("td");
        if (item === "hourlyWage") {
          tdTag.textContent = `${shiftObj[item]} $`;
          trTag.appendChild(tdTag);
        } else {
          tdTag.textContent = shiftObj[item];
          trTag.appendChild(tdTag);
        }
      }
    }
  });
  trTag.classList.add("shifts__tr");
  //daca se afla in pagina myShifts.html se randeaza butonul de edit shift
  if (window.location.pathname === "/myShifts.html") {
    const tdTagProfit = document.createElement("td");
    tdTagProfit.textContent = `${calculateProfit(shiftObj)} $`;
    trTag.appendChild(tdTagProfit);

    const tdTagBtn = document.createElement("td");
    const button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn--edit-shift");
    button.textContent = "Edit Shift";

    button.addEventListener("click", () => {
      openModal(shiftObj);
    });
    tdTagBtn.appendChild(button);
    trTag.appendChild(tdTagBtn);
  }
  parentTag.appendChild(trTag);
}

export function calculateProfit(shiftObj) {
  const startDate = shiftObj.dateCreatedShift + " " + shiftObj.startShiftTime;
  const endDate = shiftObj.dateCreatedShift + " " + shiftObj.endShiftTime;
  const startDateFormat = new Date(startDate);
  const endDateFormat = new Date(endDate);
  const timeWork = (endDateFormat.getTime() - startDateFormat.getTime()) / 3600000;
  return (timeWork * shiftObj.hourlyWage).toFixed(2);
}

function openModal(shiftObj) {
  let isValid = true;
  date.value = shiftObj.dateCreatedShift;
  timeStart.value = shiftObj.startShiftTime;
  timeEnd.value = shiftObj.endShiftTime;
  hourlyWage.value = shiftObj.hourlyWage;
  workplace.value = shiftObj.workplace;
  shift.value = shiftObj.shift;
  comments.value = shiftObj.comment;
  console.log(date, date.value, shiftObj);

  modal.classList.remove("hide");

  const shiftDb = getDb("shiftDb");
  const shiftDbTemp = [...shiftDb];
  const index = shiftDbTemp.findIndex((element) => element.shift === shift.value);
  shiftDbTemp.splice(index, 1);

  closeModal.addEventListener("click", () => modal.classList.add("hide"));

  addShift.addEventListener("click", (e) => {
    e.preventDefault();

    checkShift(shiftDbTemp);
    console.log(shiftDbTemp, isValid, "index ", index);
    if (isValid) {
      shiftDb.forEach((element) => {
        if (element.shift === shift.value) {
          element.dateCreatedShift = date.value;
          element.startShiftTime = timeStart.value;
          element.endShiftTime = timeEnd.value;
          element.workplace = workplace.value;
          element.hourlyWage = hourlyWage.value;
          element.comment = comments.value;
          element.shift = shift.value;
        }
      });
      localStorage.setItem("shiftDb", JSON.stringify(shiftDb));
      modal.classList.add("hide");
      tbody.innerHTML = "";
      showShifts(shiftDb, tbody);
    }
  });
}

//functie din addShifts.js mutata aici din cauza erori
export function checkShift(shiftDataBase, valid) {
  console.log(shift.value);
  if (shift.value !== "") {
    const findShift = shiftDataBase.find((element) => shift.value === element.shift);
    if (!findShift) {
      addRemoveClassesValid(shift, errorShift, imgErrorShift, "shift__input--valid", "shift__input--error");
      return valid;
    } else {
      addRemoveClassesInvalid(shift, errorShift, imgErrorShift, "shift__input--valid", "shift__input--error");
      errorShift.textContent = "This shift is already in database. Choose another name!";
      valid = false;
      return valid;
    }
  }
}
