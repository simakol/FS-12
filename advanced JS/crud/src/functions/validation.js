const className = "incorrect";

function isValueEmpty(value, input, msg) {
  if (value.trim() === "") {
    Notiflix.Notify.failure(msg);
    input.classList.add(className);
    return true;
  }

  input.classList.remove(className);

  return false;
}

function isValueNumber(value, input, msg) {
  if (!isNaN(Number(value))) {
    Notiflix.Notify.failure(msg);
    input.classList.add(className);
    return true;
  }

  input.classList.remove(className);

  return false;
}

export function isMarkValid(value, input) {
  return (
    !isValueEmpty(value, input, "Car mark must be not an empty string!") &&
    !isValueNumber(value, input, "Car mark must be a string!")
  );
}

export function isModelValid(value, input) {
  return !isValueEmpty(value, input, "Car model must be not an empty string!");
}

export function isImgValid(value, input) {
  return (
    !isValueEmpty(value, input, "Car image must be not an empty string!") &&
    !isValueNumber(value, input, "Car image must be a string!")
  );
}
