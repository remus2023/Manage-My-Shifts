//import { getDb } from "./fetch.js";
import { date, timeStart, timeEnd, hourlyWage, workplace, shift, comments, addShift, modal } from "./tags.js";

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
export function checkLogIn() {
  if (!localStorage.getItem("loggedUser")) window.location.href = "login.html";
}
export function logOut() {
  localStorage.removeItem("loggedUser");
  window.location.href = "login.html";
}
export function preventBack() {
  if (localStorage.getItem("loggedUser")) window.location.href = "index.html";
}

export function showShifts(sortedShifts, parentTag) {
  sortedShifts.forEach((element) => renderShifts(element, parentTag));
}

function renderShifts(shiftObj, parentTag) {
  const trTag = document.createElement("tr");
  const tagObject = Object.keys(shiftObj);
  tagObject.forEach((item) => {
    if (item !== "email" && item !== "comment" && item !== "shift") {
      const tdTag = document.createElement("td");
      if (item === "hourlyWage") {
        tdTag.textContent = `${shiftObj[item]} $`;
        trTag.appendChild(tdTag);
      } else {
        tdTag.textContent = shiftObj[item];
        trTag.appendChild(tdTag);
      }
    }
  });
  trTag.classList.add("shifts__tr");
  const tdTagProfit = document.createElement("td");
  tdTagProfit.textContent = `${calculateProfit(shiftObj)} $`;
  trTag.appendChild(tdTagProfit);
  if (window.location.pathname === "/myShifts.html") {
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

function calculateProfit(shiftObj) {
  const startDate = shiftObj.dateCreatedShift + " " + shiftObj.startShiftTime;
  const endDate = shiftObj.dateCreatedShift + " " + shiftObj.endShiftTime;
  const startDateFormat = new Date(startDate);
  const endDateFormat = new Date(endDate);
  const timeWork = (endDateFormat.getTime() - startDateFormat.getTime()) / 3600000;
  return (timeWork * shiftObj.hourlyWage).toFixed(2);
}

function openModal(shiftObj) {
  date.value = shiftObj.dateCreatedShift;
  timeStart.value = shiftObj.startShiftTime;
  timeEnd.value = shiftObj.endShiftTime;
  hourlyWage.value = shiftObj.hourlyWage;
  workplace.value = shiftObj.workplace;
  shift.value = shiftObj.shift;
  comments.value = shiftObj.comment;
  console.log(date, date.value, shiftObj);

  modal.classList.remove("hide");

  addShift.addEventListener("click", (e) => {
    e.preventDefault();
    const shiftDb = getDb("shiftDb");
    const shiftDbTemp = [...shiftDb];
    const index = shiftDbTemp.findIndex((element) => element.shift === shift.value);
    shiftDbTemp.splice(index, 1);
    shiftDb.forEach((element) => {
      if (element.shift === shift.value) {
        element.hourlyWage = hourlyWage.value;
      }
    });
    modal.classList.add("hide");
    tbody.innerHTML = "";
    showShifts(shiftDb, tbody);
  });
}
