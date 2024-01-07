import { getDb, getUser } from "./modules/fetch.js"; // de ce merge daca nu e importat userSpan???
import { tbody, workplaceFilter, searchShift, startDate, endDate, searchDate } from "./modules/tags.js";
import { showShifts } from "./modules/functions.js";

let userShifts = getDb("shiftDb").filter((element) => element.email === getUser().email);
console.log(userShifts);

searchShift.addEventListener("click", (e) => {
  e.preventDefault();
  // selectez din nou baza de date pentru ca intre timp e posibil sa fi editat un shift si sa nu fie actualizata cautarea
  const filteredShifts = getDb("shiftDb").filter(
    (element) => element.email === getUser().email && element.workplace === workplaceFilter.value
  );
  if (filteredShifts.length) {
    tbody.innerHTML = "";
    showShifts(filteredShifts, tbody);
    console.log("filtered", filteredShifts, workplaceFilter.value);
  } else {
    tbody.innerHTML = "No results";
  }
});

searchDate.addEventListener("click", (e) => {
  e.preventDefault();
  const startDateFormat = new Date(startDate.value);
  const endDateFormat = new Date(endDate.value);
  const sss = Date(endDate.value);
  console.log(sss, endDateFormat);
  // selectez din nou baza de date pentru ca intre timp e posibil sa fi editat un shift si sa nu fie actualizata cautarea
  const filteredShifts = getDb("shiftDb").filter((element) => {
    const dateFormat = new Date(element.dateCreatedShift);
    return dateFormat.getTime() <= endDateFormat.getTime() && dateFormat.getTime() >= startDateFormat.getTime();
  });
  tbody.innerHTML = "";
  showShifts(filteredShifts, tbody);

  console.log(filteredShifts);
});

showShifts(userShifts, tbody);
