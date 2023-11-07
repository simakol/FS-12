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
import { createNewCar } from "./services/apiService.js";

const refs = {
  addCarBtn: document.getElementById("addCarBtn"),
};

const instance = basicLightbox.create(
  `
<form class="add-car-form" id="carForm">
      <input type="text" placeholder="Mark" name="mark" required>
      <input type="text" placeholder="Model" name="model" required>
      <input type="url" placeholder="Image URL" name="img" required>
      <button type="submit">Add car</button>
  </form>
`
);

refs.addCarBtn.addEventListener("click", handleClick);

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
