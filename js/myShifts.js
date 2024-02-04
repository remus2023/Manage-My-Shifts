import { getDb, getUser } from "./modules/fetch.js"; // de ce merge daca nu e importat userSpan???
import { tbody, workplaceFilter, searchShift, startDate, endDate, searchDate, maxMonthProfit } from "./modules/tags.js";
import { showShifts, calculateProfit, searchWorkplace } from "./modules/functions.js";
import { showBestMonth } from "./modules/validateShift.js";

let userShifts = getDb("shiftDb").filter((element) => element.username === getUser().username);
console.log(userShifts);

searchWorkplace(searchShift, userShifts);
// searchShift.addEventListener("click", (e) => {
//   e.preventDefault();
//   // selectez din nou baza de date pentru ca intre timp e posibil sa fi editat un shift si sa nu fie actualizata cautarea
//   const filteredShifts = userShifts.filter((element) => element.workplace === workplaceFilter.value);
//   if (filteredShifts.length) {
//     tbody.innerHTML = "";
//     showShifts(filteredShifts, tbody);
//     console.log("filtered", filteredShifts, workplaceFilter.value);
//   } else {
//     tbody.innerHTML = "No results";
//   }
// });

searchDate.addEventListener("click", (e) => {
  e.preventDefault();
  const startDateFormat = new Date(startDate.value);
  const endDateFormat = new Date(endDate.value);
  const sss = Date(endDate.value);
  console.log(sss, endDateFormat);
  // selectez din nou baza de date pentru ca intre timp e posibil sa fi editat un shift si sa nu fie actualizata cautarea
  const filteredShifts = userShifts.filter((element) => {
    const dateFormat = new Date(element.dateCreatedShift);
    return dateFormat.getTime() <= endDateFormat.getTime() && dateFormat.getTime() >= startDateFormat.getTime();
  });
  tbody.innerHTML = "";
  showShifts(filteredShifts, tbody);

  console.log(filteredShifts);
});

showShifts(userShifts, tbody);

// function showBestMonth() {
//   userShifts.forEach((element) => {
//     const date = new Date(element.dateCreatedShift);
//     monthObj.forEach((item, index) => {
//       if (index === date.getMonth()) {
//         item[Object.keys(item)] += Number(calculateProfit(element));
//         if (item[Object.keys(item)] > max) {
//           max = item[Object.keys(item)];
//           month = Object.keys(item);
//         }
//       }
//     });
//   });
//   maxMonthProfit.innerHTML = `The best profitable month is ${month} with a total earn of ${max}$`;
// }

showBestMonth(userShifts);
