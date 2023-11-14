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
};

const instance = createModalWindow();

loadFirstData();

refs.addCarBtn.addEventListener("click", handleClick);
refs.carsContainer.addEventListener("click", handleCarsClick);

async function handleCarsClick(event) {
  //TODO: винести в окрему фн
  if (event.target.classList.contains("delete-car")) {
    const targetCar = event.target.closest(".car-card");
    const deleteId = Number(targetCar.dataset.id);
    console.log(deleteId);
    try {
      await deleteCar(deleteId);
      Notiflix.Notify.success(`Car successfully delete!`);
    } catch (err) {
      Notiflix.Notify.failure(`Error! We can't delete this car`);
    }
    targetCar.remove();
    return;
  }

  if (event.target.classList.contains("edit-car")) {
    const targetCar = event.target.closest(".car-card");
    const carId = targetCar.dataset.id;
    console.log(carId);
    const cars = await getAllCars();
    console.log(cars);
    const currentCar = cars.find(({ id }) => id === carId);
    console.log(currentCar);
    instance.show();

    const carForm = document.getElementById("carForm");

    carForm.elements.mark.value = currentCar.mark;
    carForm.elements.model.value = currentCar.model;
    carForm.elements.img.value = currentCar.img;
    carForm.elements.submit.textContent = "Edit car";

    carForm.addEventListener("submit", (event) =>
      handleEditCarForm(event, carId, targetCar)
    );
  }
}

async function loadFirstData() {
  refs.msg.textContent = "Loading...";
  const cars = await getAllCars();
  console.log(cars);
  const carsMarkup = cars.map((car) => createCarCardMarkup(car)).join("");
  addCarToPage(carsMarkup);
  refs.msg.textContent = "";
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
  addCarToPage(createCarCardMarkup(newCar));
}

function handleEditCarForm(event, carId, targetCar) {
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

  updateCar(carId, updatedCar);

  const { img: imgEl, titles } = targetCar.children;
  const { mark: markEl, model: modelEl } = titles.children;

  imgEl.src = updatedCar.img;
  markEl.textContent = updatedCar.mark;
  modelEl.textContent = updatedCar.model;

  event.currentTarget.reset();
  Notiflix.Notify.success("Successfully updated car!");
  instance.close();
}
