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
