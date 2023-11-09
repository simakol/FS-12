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
import { createNewCar, getAllCars } from "./services/apiService.js";
import createModalWindow from "./templates/modalWindow.js";
import createCarCardMarkup from "./templates/carCard.js";

const refs = {
  addCarBtn: document.getElementById("addCarBtn"),
  carsContainer: document.getElementById("carsContainer"),
};

const instance = createModalWindow();

loadFirstData();

refs.addCarBtn.addEventListener("click", handleClick);

async function loadFirstData() {
  const cars = await getAllCars();
  console.log(cars);
  const carsMarkup = cars.map((car) => createCarCardMarkup(car)).join("");
  addCarToPage(carsMarkup);
}

function addCarToPage(markup) {
  refs.carsContainer.insertAdjacentHTML("beforeend", markup);
}

function handleClick() {
  instance.show();

  const carForm = document.getElementById("carForm");
  carForm.addEventListener("submit", handleSubmit);
}

function handleSubmit(event) {
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

  createNewCar(newCar);
  event.currentTarget.reset();
  Notiflix.Notify.success("Added new car!");
  instance.close();
}
