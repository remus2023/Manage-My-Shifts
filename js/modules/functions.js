export function addRemoveClassesInvalid(input, error, img) {
  error.classList.remove("hide");
  input.classList.remove("login__input--valid");
  input.classList.add("login__input--error");
  img.src = "./images/nok.png";
  img.classList.remove("hide");
}
export function addRemoveClassesValid(input, error, img) {
  input.classList.add("login__input--valid");
  input.classList.remove("login__input--error");
  error.classList.add("hide");
  img.classList.remove("hide");
  img.src = "./images/ok.png";
}
