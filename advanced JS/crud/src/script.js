/*
* CRUD

- C - CREATE (створення) - метод POST - посилає запит на сервер вказуючи дані і на сервері створюється новий ресур з цими даними
- R - READ (читання) - метод GET - посилає запит на сервер для взяття інформації
- U - UPDATE (оновлення) - методи PATCH/PUT
    - PUT: посилає запит на сервер вказуючи дані і на сервері оновлюється вже щось існуюче і воно замінюється на ті дані, які ви вказали(повне оновлення ресурсу)
    - PATCH: посилає запит на сервер вказуючи дані і на сервері оновлюється вже щось існуюче на основі тих даних, які ви передали, але воно оновлюється чакстково, тобто якщо ви щось не передали, то воно не буде видалятись.
- D - DELETE (видалення) - метод DELETE - посилає запит на сервер, вказуючи айді ресурсу та видаляє всю інформацію з серверу.
*/

import {
  isModelValid,
  isMarkValid,
  isImgValid,
} from "./functions/validation.js";
import {
  createNewCar,
  getAllCars,
  deleteCar,
  updateCar,
} from "./services/apiService.js";
import createModalWindow from "./templates/modalWindow.js";
import createCarCardMarkup from "./templates/carCard.js";

const refs = {
  addCarBtn: document.getElementById("addCarBtn"),
  carsContainer: document.getElementById("carsContainer"),
  msg: document.getElementById("msg"),
  markFilter: document.getElementById("markFilter"),
  sortFilter: document.getElementById("sortFilter"),
  resetBtn: document.getElementById("resetBtn"),
};

const instance = createModalWindow();

loadFirstData();

refs.sortFilter.addEventListener("change", handleSortChange);
refs.markFilter.addEventListener("change", handleMarkChange);
refs.addCarBtn.addEventListener("click", handleClick);
refs.carsContainer.addEventListener("click", handleCarsClick);

function disableResetButton() {
  refs.resetBtn.disabled = true;
  refs.addCarBtn.disabled = false;

  refs.resetBtn.removeEventListener("click", handleReset);
}

function enableResetButton() {
  refs.resetBtn.disabled = false;
  refs.addCarBtn.disabled = true;
  refs.resetBtn.addEventListener("click", handleReset);
}

function handleReset() {
  refs.sortFilter.value = "default";
  refs.markFilter.value = "default";
  refs.sortFilter.dispatchEvent(new Event("change"));
  refs.markFilter.dispatchEvent(new Event("change"));
}

async function handleSortChange(event) {
  const cars = await getAllCars();

  console.log(event.target.value);
  if (event.target.value === "default") {
    disableResetButton();
  } else {
    enableResetButton();
  }

  switch (event.target.value) {
    case "az":
      cars.sort((a, b) => a.mark.localeCompare(b.mark));
      break;
    case "za":
      cars.sort((a, b) => b.mark.localeCompare(a.mark));
      break;
  }

  const carsMarkup = cars.map((car) => createCarCardMarkup(car)).join("");
  refs.carsContainer.innerHTML = carsMarkup;
}

async function handleMarkChange(event) {
  const cars = await getAllCars();

  let filteredCars = cars;
  if (event.target.value === "default") {
    refs.sortFilter.disabled = false;
    disableResetButton();
  } else {
    refs.sortFilter.disabled = true;
    enableResetButton();
    filteredCars = cars.filter(({ mark }) => mark === event.target.value);
    refs.sortFilter.value = "default";
  }

  const carsMarkup = filteredCars
    .map((car) => createCarCardMarkup(car))
    .join("");
  refs.carsContainer.innerHTML = carsMarkup;
}

function handleCarsClick(event) {
  if (event.target.classList.contains("delete-car")) {
    return deleteMarkupCar(event);
  }

  if (event.target.classList.contains("edit-car")) {
    return editMarkupCar(event);
  }
}

async function deleteMarkupCar(event) {
  const targetCar = event.target.closest(".car-card");
  const deleteId = targetCar.dataset.id;

  try {
    await deleteCar(deleteId);
    Notiflix.Notify.success(`Car successfully delete!`);

    if (refs.markFilter.value !== "default") {
      const carMark = targetCar.children[1].children.mark.textContent;
      await addCarMarksToFilter(carMark);
      refs.markFilter.dispatchEvent(new Event("change"));
    } else {
      await addCarMarksToFilter();
    }

    if (refs.carsContainer.children.length - 1 === 0) {
      refs.markFilter.value = "default";
      refs.markFilter.dispatchEvent(new Event("change"));
    }

    targetCar.remove();
  } catch (err) {
    Notiflix.Notify.failure(`Error! We can't delete this car`);
  }
  return;
}

async function editMarkupCar(event) {
  const targetCar = event.target.closest(".car-card");
  const carId = targetCar.dataset.id;
  const cars = await getAllCars();
  const currentCar = cars.find(({ _id }) =>_id === carId);
  console.log(currentCar, cars, carId);
  console.log(targetCar);
  instance.show();

  const carForm = document.getElementById("carForm");

  carForm.elements.mark.value = currentCar.mark;
  carForm.elements.model.value = currentCar.model;
  carForm.elements.img.value = currentCar.img;
  carForm.elements.submit.textContent = "Edit car";

  carForm.removeEventListener("submit", handleSubmit);

  carForm.addEventListener("submit", (event) => {
    console.log("Edit!");
    handleEditCarForm(event, carId, targetCar);
  });
}

async function loadFirstData() {
  refs.msg.textContent = "Loading...";
  const cars = await getAllCars();
  const carsMarkup = cars.map((car) => createCarCardMarkup(car)).join("");
  addCarToPage(carsMarkup);
  refs.msg.textContent = "";

  addCarMarksToFilter();
}

async function addCarMarksToFilter(currentCar = "default") {
  const cars = await getAllCars();
  const carsMarks = cars.map(({ mark }) => mark);
  const uniqueCarsMarks = carsMarks.filter(
    (car, i) => carsMarks.indexOf(car) === i
  );

  const markup = uniqueCarsMarks
    .map((mark) => `<option value="${mark}">${mark}</option>`)
    .join("");

  refs.markFilter.innerHTML = ` <option value="default">Filter cars by mark</option> ${markup}`;
  refs.markFilter.value = currentCar;
}

function addCarToPage(markup) {
  refs.carsContainer.insertAdjacentHTML("beforeend", markup);
}

function handleClick() {
  instance.show();

  const carForm = document.getElementById("carForm");
  carForm.reset();
  carForm.elements.submit.textContent = "Add car";

  carForm.addEventListener("submit", handleSubmit);
}

async function handleSubmit(event) {
  event.preventDefault(); // відміняє поведінку браузера за замовчуванням (наприклад, коли відбувається подія сабміту, тобто, відправка форми - браузер за замовчуванням перезавантажує сторінку)
  const { mark, model, img } = event.currentTarget.elements;
  console.log(mark.value, model.value, img.value);

  if (
    !isMarkValid(mark.value, mark) ||
    !isModelValid(model.value, model) ||
    !isImgValid(img.value, img)
  ) {
    return;
  }

  const newCar = {
    mark: mark.value,
    model: model.value,
    img: img.value,
  };

  try {
    const {
      data: { _id },
    } = await createNewCar(newCar);

    await addCarMarksToFilter();
    event.target.reset();
    Notiflix.Notify.success("Added new car!");
    instance.close();
    addCarToPage(createCarCardMarkup({ ...newCar, _id }));
  } catch (err) {
    Notiflix.Notify.failure("Can not add a new car!");
    return;
  }
}

async function handleEditCarForm(event, carId, targetCar) {
  event.preventDefault();
  const { mark, model, img } = event.currentTarget.elements;

  if (
    !isMarkValid(mark.value, mark) ||
    !isModelValid(model.value, model) ||
    !isImgValid(img.value, img)
  ) {
    return;
  }

  const updatedCar = {
    mark: mark.value,
    model: model.value,
    img: img.value,
  };

  try {
    // console.log(refs.markFilter.value);
    // if (refs.markFilter.value !== "default") {
    //   // console.log(refs.markFilter.value);
    //   refs.markFilter.value = updatedCar.mark;
    //   console.log(refs.markFilter.value);
    // }
    console.log(updatedCar.mark, "IMPORTANT!!!");
    await updateCar(carId, updatedCar);
    if (refs.markFilter.value !== "default") {
      await addCarMarksToFilter(updatedCar.mark);
      refs.markFilter.dispatchEvent(new Event("change"));
    } else {
      await addCarMarksToFilter();
    }
  } catch (err) {
    Notiflix.Notify.failure(`Error! We can't delete this car`);
    return;
  }

  const { img: imgEl, titles } = targetCar.children;
  const { mark: markEl, model: modelEl } = titles.children;

  imgEl.src = updatedCar.img;
  markEl.textContent = updatedCar.mark;
  modelEl.textContent = updatedCar.model;

  event.target.reset();
  Notiflix.Notify.success("Successfully updated car!");
  instance.close();
}
