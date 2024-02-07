import { getDb } from "./fetch.js";
import {
  searchStartDate,
  searchEndDate,
  timeStart,
  timeEnd,
  hourlyWage,
  workplace,
  shift,
  comments,
  addShift,
  modal,
  closeModal,
  dataLength,
  deleteModal,
  confirmDelete,
  cancelDelete,
  shiftBox,
  errorTimeEnd,
  errorTimeStart,
  imgErrorTimeStart,
  imgErrorTimeEnd,
  startDate,
  endDate,
} from "./tags.js";
import { validateShift } from "./validateShift.js";
import { showBestMonth } from "./validateShift.js";
import { getUser } from "./fetch.js";

//import { checkShift } from "../addShits.js";
//import { shiftBox } from "./tags.js";
// de ce daca decomentez sus imi da eroare in index.html???

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
      if (
        item !== "comment" &&
        item !== "shift" &&
        item !== "hourlyWage" &&
        item !== "timeStartShift" &&
        item !== "timeEndShift"
      ) {
        const tdTag = document.createElement("td");
        if (item === "dateStartShift") {
          tdTag.textContent = `${shiftObj[item]} ${shiftObj["timeStartShift"]}`;
          trTag.appendChild(tdTag);
        } else if (item === "dateEndShift") {
          tdTag.textContent = `${shiftObj[item]} ${shiftObj["timeEndShift"]}`;
          trTag.appendChild(tdTag);
        } else {
          tdTag.textContent = shiftObj[item];
          trTag.appendChild(tdTag);
        }
      }
    }
    if (window.location.pathname === "/myShifts.html") {
      if (item !== "username" && item !== "comment" && item !== "shift" && item !== "timeStartShift" && item !== "timeEndShift") {
        const tdTag = document.createElement("td");
        if (item === "workplace") {
          tdTag.textContent = shiftObj[item];
          tdTag.classList.add("shifts__workplace");
          trTag.appendChild(tdTag);
        }
        if (item === "hourlyWage") {
          tdTag.textContent = `${shiftObj[item]} $`;
          trTag.appendChild(tdTag);
        } else if (item === "dateStartShift") {
          tdTag.textContent = `${shiftObj[item]} ${shiftObj["timeStartShift"]}`;
          trTag.appendChild(tdTag);
        } else if (item === "dateEndShift") {
          tdTag.textContent = `${shiftObj[item]} ${shiftObj["timeEndShift"]}`;
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
      openDeleteModal(sortedShifts, shiftObj);
    });
    tdTagBtn.append(buttonEdit, buttonDelete);
    trTag.appendChild(tdTagBtn);
  }
  parentTag.appendChild(trTag);
}

export function calculateProfit(shiftObj) {
  const startDate = shiftObj.dateStartShift + " " + shiftObj.timeStartShift;
  const endDate = shiftObj.dateEndShift + " " + shiftObj.timeEndShift;
  const startDateFormat = new Date(startDate);
  const endDateFormat = new Date(endDate);
  const timeWork = (endDateFormat.getTime() - startDateFormat.getTime()) / 3600000;
  return (timeWork * shiftObj.hourlyWage).toFixed(2);
}

function openEditModal(sortedShifts, shiftObj) {
  // let isValid = true;
  startDate.value = shiftObj.dateStartShift;
  timeStart.value = shiftObj.timeStartShift;
  endDate.value = shiftObj.dateEndShift;
  timeEnd.value = shiftObj.timeEndShift;
  hourlyWage.value = shiftObj.hourlyWage;
  workplace.value = shiftObj.workplace;
  shift.value = shiftObj.shift;
  comments.value = shiftObj.comment;

  modal.classList.remove("hide");

  const shiftDb = getDb("shiftDb");
  const shiftDbTemp = [...shiftDb];
  const index = shiftDbTemp.findIndex((element) => element.shift === shift.value);
  shiftDbTemp.splice(index, 1);
  let shiftTemp = shift.value;
  closeModal.addEventListener("click", () => {
    modal.classList.add("hide");
    resetInput("shift__input--valid", "shift__input--error");
  });

  const clickHandler = (e) => {
    e.preventDefault();
    if (validateShift(shiftDbTemp)) {
      shiftDb.forEach((element) => {
        if (element.shift === shiftTemp) {
          element.dateStartShift = startDate.value;
          element.timeStartShift = timeStart.value;
          element.dateEndShift = endDate.value;
          element.timeEndShift = timeEnd.value;
          element.workplace = workplace.value;
          element.hourlyWage = hourlyWage.value;
          element.comment = comments.value;
          element.shift = shift.value;
        }
      });
      resetInput("shift__input--valid", "shift__input--error");
      localStorage.setItem("shiftDb", JSON.stringify(shiftDb));
      //daca am comentat linia de jos si dau update de 2 ori dispare. de ce?
      modal.classList.add("hide");
      tbody.innerHTML = "";
      sortedShifts = shiftDb.filter((element) => element.username === getUser().username);
      showShifts(sortedShifts, tbody);
      showBestMonth(sortedShifts);
      addShift.removeEventListener("click", clickHandler);
    }
  };
  addShift.addEventListener("click", clickHandler);
}

function openDeleteModal(sortedShifts, shiftObj) {
  deleteModal.classList.remove("hide");
  confirmDelete.addEventListener("click", () => {
    let shiftDb = getDb("shiftDb");
    console.log(shiftDb[0].username, shiftObj.username);
    sortedShifts = sortedShifts.filter((element) => element.shift !== shiftObj.shift);
    shiftDb = shiftDb.filter((element) => element.shift !== shiftObj.shift);
    console.log(shiftDb);
    localStorage.setItem("shiftDb", JSON.stringify(shiftDb));
    deleteModal.classList.add("hide");
    tbody.innerHTML = "";
    showShifts(sortedShifts, tbody);
    showBestMonth(sortedShifts);
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
    //When I have an error and i want to edit input, must eliminate error style
    loginInput.addEventListener("input", () => {
      loginError.classList.add("hide");
      loginInput.classList.remove("login__input--error");
      loginImg.classList.add("hide");
    });
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

//functii folosite in index si in myshift pentru cautare dupa workplace si dupa data
export function searchWorkplace(searchTag, shiftDb) {
  searchTag.addEventListener("click", (e) => {
    e.preventDefault();
    // selectez din nou baza de date pentru ca intre timp e posibil sa fi editat un shift si sa nu fie actualizata cautarea
    const filteredShifts = shiftDb.filter((element) => element.workplace === workplaceFilter.value);
    if (filteredShifts.length) {
      tbody.innerHTML = "";
      showShifts(filteredShifts, tbody);
    } else {
      tbody.innerHTML = "No results";
    }
  });
}

export function searchByDate(searchTag, shiftDb) {
  searchTag.addEventListener("click", (e) => {
    e.preventDefault();
    const startDateFormat = new Date(searchStartDate.value);
    const endDateFormat = new Date(searchEndDate.value);
    // selectez din nou baza de date pentru ca intre timp e posibil sa fi editat un shift si sa nu fie actualizata cautarea
    const filteredShifts = shiftDb.filter((element) => {
      const dateFormat = new Date(element.dateStartShift);
      return dateFormat.getTime() <= endDateFormat.getTime() && dateFormat.getTime() >= startDateFormat.getTime();
    });
    tbody.innerHTML = "";
    showShifts(filteredShifts, tbody);
  });
}
