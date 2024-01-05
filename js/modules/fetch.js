import { logOut } from "./functions.js";

//let htmlTags = localStorage.getItem("htmlTags") || [];
let headerTag = localStorage.getItem("headerTag") || "";
export let logOutBtn = localStorage.getItem("logOutBtn") || "";
export let userSpan = localStorage.getItem("userSpan") || "";
async function header() {
  try {
    const result = await fetch("../header.html");
    const headerTag = await result.text();

    localStorage.setItem("headerTag", headerTag);
    document.querySelector("header").innerHTML = headerTag;
    const logOutBtn = document.querySelector("#logOutBtn");
    const userSpan = document.querySelector("#userSpan");
    userSpan.textContent = `Buna, ${getUser().username}`;
    // dupa ce m-am logat daca nu fac aici actiunea pe butonul de log-ul nu merge delogarea
    // doar daca se mai face un refresh ca sa se incarce key-ul logOutBtn din localstorage
    logOutBtn.addEventListener("click", logOut);
    console.log("fetch >>> ", logOutBtn);
    localStorage.setItem("logOutBtn", logOutBtn);
    localStorage.setItem("userSpan", userSpan);

    // let htmlTagsObj = { headerTagKey: headerTag, logOutBtnKey: logOutBtn };
    // htmlTags.push(htmlTagsObj);
    // htmlTags.push(logOutBtn);
    // localStorage.setItem("htmlTags", htmlTags);
    // console.log(">>>???>>>", htmlTags);
    // console.log(">>> ", localStorage.getItem("htmlTags")[1]);
    // return headerTag;
  } catch (error) {
    console.log(error);
  }
}
if (!headerTag) header();
export let headerTagContent = (document.querySelector("header").innerHTML = headerTag);
//export const logOutBtn = document.querySelector("#logOutBtn");

let footerTag = localStorage.getItem("footerTag") || "";
async function footer() {
  try {
    const result = await fetch("../footer.html");
    const footerTag = await result.text();
    localStorage.setItem("footerTag", footerTag);
    document.querySelector("footer").innerHTML = footerTag;
  } catch (error) {
    console.log(error);
  }
}
if (!footerTag) footer();
export let footerTagContent = (document.querySelector("footer").innerHTML = footerTag);

export function getUser() {
  if (localStorage.getItem("loggedUser")) return JSON.parse(localStorage.getItem("loggedUser"));
}
export function getDb(dbName) {
  return JSON.parse(localStorage.getItem(dbName)) || [];
}
