export function getUser() {
  if (localStorage.getItem("loggedUser")) return JSON.parse(localStorage.getItem("loggedUser"));
}
export function getDb(dbName) {
  return JSON.parse(localStorage.getItem(dbName)) || [];
}
