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
