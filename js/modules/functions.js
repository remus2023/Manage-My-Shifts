import { getDb } from "./fetch.js";
// import {
//   date,
//   // timeStart,
//   timeEnd,
//   // hourlyWage,
//   workplace,
//   shift,
//   comments,
//   addShift,
//   modal,
//   closeModal,
//   dataLength,
//   deleteModal,
//   confirmDelete,
//   cancelDelete,
//   shiftBox,
//   errorTimeEnd,
//   errorTimeStart,
//   imgErrorTimeStart,
//   imgErrorTimeEnd,
// } from "./tags.js";
import { validateShift } from "./validateShift.js";
import { showBestMonth } from "./validateShift.js";

//import { checkShift } from "../addShits.js";
//import { shiftBox } from "./tags.js";
// de ce daca decomentez sus imi da eroare in index.html???
const shiftBox = document.querySelectorAll("[data-empty]");

let shiftDb = getDb("shiftDb");

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

export function resetInput(inputValid, inputError) {
  shiftBox.forEach((element) => {
    if (element.dataset.empty === "no") {
      const input = element.querySelector(".shift__input");
      const error = element.querySelector(".shift__error");
      const img = element.querySelector(".shift__img");
      input.classList.remove(inputValid);
      input.classList.remove(inputError);
      error.classList.add("hide");
      img.classList.add("hide");
    }
  });
}

export function showShifts(sortedShifts, parentTag) {
  sortedShifts.forEach((element, index) => renderShifts(sortedShifts, element, parentTag, index));
}

function renderShifts(sortedShifts, shiftObj, parentTag, index) {
  const trTag = document.createElement("tr");
  // if (index === 0) index++;
  // trTag.setAttribute("data-page", Math.ceil(index / 3));
  // console.log(trTag.dataset);
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
    tdTagBtn.classList.add("shifts__edit");
    const buttonEdit = document.createElement("button");
    buttonEdit.classList.add("btn");
    buttonEdit.classList.add("btn--edit-shift");
    buttonEdit.textContent = "Edit Shift";
    const buttonDelete = document.createElement("button");
    buttonDelete.classList.add("btn");
    buttonDelete.classList.add("btn--delete-shift");
    buttonDelete.textContent = "Delete Shift";

    buttonEdit.addEventListener("click", () => {
      openEditModal(sortedShifts, shiftObj);
    });
    buttonDelete.addEventListener("click", () => {
      openDeleteModal(shiftObj);
    });
    tdTagBtn.append(buttonEdit, buttonDelete);
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

function openEditModal(sortedShifts, shiftObj) {
  // let isValid = true;
  date.value = shiftObj.dateCreatedShift;

  console.log(timeStart.value);
  timeStart.value = shiftObj.startShiftTime;
  console.log(timeStart.value);

  timeEnd.value = shiftObj.endShiftTime;
  hourlyWage.value = shiftObj.hourlyWage;
  workplace.value = shiftObj.workplace;
  shift.value = shiftObj.shift;
  comments.value = shiftObj.comment;
  console.log(date, shift.value, shiftObj);

  modal.classList.remove("hide");

  const shiftDb = getDb("shiftDb");
  const shiftDbTemp = [...shiftDb];
  const index = shiftDbTemp.findIndex((element) => element.shift === shift.value);
  shiftDbTemp.splice(index, 1);
  let shiftTemp = shift.value;
  closeModal.addEventListener("click", () => modal.classList.add("hide"));

  // addShift.addEventListener("click", (e) => {
  //   e.preventDefault();

  //   // isValid = checkShift(shiftDbTemp, isValid);
  //   // console.log(shiftDbTemp, isValid, "index ", index);
  //   if (validateShift(shiftDbTemp)) {
  //     shiftDb.forEach((element) => {
  //       if (element.shift === shift.value) {
  //         element.dateCreatedShift = date.value;
  //         element.startShiftTime = timeStart.value;
  //         element.endShiftTime = timeEnd.value;
  //         element.workplace = workplace.value;
  //         element.hourlyWage = hourlyWage.value;
  //         element.comment = comments.value;
  //         element.shift = shift.value;
  //       }
  //       // console.log(">>> ", isValid, shift.value);
  //     });
  //     localStorage.setItem("shiftDb", JSON.stringify(shiftDb));
  //     modal.classList.add("hide");
  //     tbody.innerHTML = "";
  //     showShifts(shiftDb, tbody);
  //   }
  // });

  const clickHandler = (e) => {
    e.preventDefault();
    if (validateShift(shiftDbTemp)) {
      sortedShifts.forEach((element) => {
        if (element.shift === shiftTemp) {
          element.dateCreatedShift = date.value;
          element.startShiftTime = timeStart.value;
          element.endShiftTime = timeEnd.value;
          element.workplace = workplace.value;
          element.hourlyWage = hourlyWage.value;
          element.comment = comments.value;
          element.shift = shift.value;
        }
      });
      resetInput("shift__input--valid", "shift__input--error");
      localStorage.setItem("shiftDb", JSON.stringify(sortedShifts));
      //daca am comentat linia de jos si dau update de 2 ori dispare. de ce?
      modal.classList.add("hide");
      tbody.innerHTML = "";
      showShifts(sortedShifts, tbody);
      showBestMonth(sortedShifts);
      addShift.removeEventListener("click", clickHandler);
    }
  };
  addShift.addEventListener("click", clickHandler);
}

function openDeleteModal(shiftObj) {
  deleteModal.classList.remove("hide");
  confirmDelete.addEventListener("click", () => {
    //let shiftDb = getDb("shiftDb");
    console.log(shiftDb[0].username, shiftObj.username);
    sortedShifts = sortedShifts.filter((element) => element.shift !== shiftObj.shift);
    console.log(shiftDb);
    localStorage.setItem("shiftDb", JSON.stringify(sortedShifts));
    deleteModal.classList.add("hide");
    tbody.innerHTML = "";
    showShifts(sortedShifts, tbody);
  });
  cancelDelete.addEventListener("click", () => {
    deleteModal.classList.add("hide");
  });
}

// functie mutata din register.js din cauza erorilor
export function checkLength(isValidCheck) {
  dataLength.forEach((element) => {
    const loginInput = element.querySelector(".login__input");
    const loginError = element.querySelector(".login__error");
    const loginLabel = element.querySelector(".login__label");
    const loginImg = element.querySelector(".login__img");
    console.log(loginInput, loginError, loginLabel, Number(element.dataset.length));
    //When I have an error and i want to edit input, must eliminate error style
    loginInput.addEventListener("input", () => {
      loginError.classList.add("hide");
      loginInput.classList.remove("login__input--error");
      loginImg.classList.add("hide");
    });
    console.log("intrare");
    if (!loginInput.value) {
      addRemoveClassesInvalid(loginInput, loginError, loginImg, "login__input--valid", "login__input--error");
      loginError.textContent = `${loginLabel.textContent} can't be empty`;
      isValidCheck = false;
      return isValidCheck;
    } else if (loginInput.value.length < element.dataset.length && loginInput.value.length > 0) {
      addRemoveClassesInvalid(loginInput, loginError, loginImg, "login__input--valid", "login__input--error");
      loginError.textContent = `${loginLabel.textContent} must have at least ${element.dataset.length} characters long`;
      isValidCheck = false;
      return isValidCheck;
    } else {
      addRemoveClassesValid(loginInput, loginError, loginImg, "login__input--valid", "login__input--error");
      return isValidCheck;
    }
  });
  return isValidCheck;
}
