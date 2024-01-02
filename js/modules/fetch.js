let headerTag = localStorage.getItem("headerTag") || "";
async function header() {
  try {
    const result = await fetch("../header.html");
    const headerTag = await result.text();
    localStorage.setItem("headerTag", headerTag);
    document.querySelector("header").innerHTML = headerTag;
    // return headerTag;
  } catch (error) {
    console.log(error);
  }
}
if (!headerTag) header();
export let headerTagContent = (document.querySelector("header").innerHTML = headerTag);

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
