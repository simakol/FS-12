/*
* CRUD

- C - CREATE (створення) - метод POST - посилає запит на сервер вказуючи дані і на сервері створюється новий ресур з цими даними
- R - READ (читання) - метод GET - посилає запит на сервер для взяття інформації
- U - UPDATE (оновлення) - методи PATCH/PUT
    - PUT: посилає запит на сервер вказуючи дані і на сервері оновлюється вже щось існуюче і воно замінюється на ті дані, які ви вказали(повне оновлення ресурсу)
    - PATCH: посилає запит на сервер вказуючи дані і на сервері оновлюється вже щось існуюче на основі тих даних, які ви передали, але воно оновлюється чакстково, тобто якщо ви щось не передали, то воно не буде видалятись.
- D - DELETE (видалення) - метод DELETE - посилає запит на сервер, вказуючи айді ресурсу та видаляє всю інформацію з серверу.
*/

const BASE_URL = "https://65411cb8f0b8287df1fdd3be.mockapi.io";
const ENDPOINT = "cars";

const car1 = {
  mark: "Nissan",
  model: "GTR",
  img: "https://pngimg.com/d/nissan_PNG68.png",
};

// createNewCar(car1);

function createNewCar(carObj) {
  console.log("POST: \n\tvalue:", carObj);
  //   return fetch(`${BASE_URL}/${ENDPOINT}`, {
  //     method: "POST", // вказуємо HTTP-метод
  //     body: JSON.stringify(carObj), // передаємо дані у форматі JSON,
  //     headers: {
  //       //хедер(заголовки) - це технічна інформація для серверу
  //       "Content-Type": "application/json", // це заголовок який вказує у якому форматі передаються дані на сервер, зараз ми вручну вказали що це буде формат JSON
  //     },
  //   });

  return axios.post(`${BASE_URL}/${ENDPOINT}`, carObj);
}

const refs = {
  addCarBtn: document.getElementById("addCarBtn"),
};

refs.addCarBtn.addEventListener("click", handleClick);

function handleClick() {
  const instance = basicLightbox.create(`
	<form class="add-car-form" id="carForm">
        <input type="text" placeholder="Mark" name="mark" required>
        <input type="text" placeholder="Model" name="model" required>
        <input type="text" placeholder="Image URL" name="img" required>
        <button type="submit">Add car</button>
    </form>
`);

  instance.show();

  const carForm = document.getElementById("carForm");
  carForm.addEventListener("submit", handleSubmit);
}

function handleSubmit(event) {
  event.preventDefault(); // відміняє поведінку браузера за замовчуванням (наприклад, коли відбувається подія сабміту, тобто, відправка форми - браузер за замовчуванням перезавантажує сторінку)
  const { mark, model, img } = event.currentTarget.elements;
  console.log(mark.value, model.value, img.value);

  /*
валідація полів:
1. назва машини і посилання не може бути числом
2. перевірка на те, що ми взагалі щось ввели в поле вводу (для всіх полів)
*/


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
}

//TODO: зробити рефактор коду для того, щоб у нас не було дублювання коду!

function isMarkValid(value, input) {
  if (value.trim() === "") {
    Notiflix.Notify.failure("Car mark must be not an empty string!");
    input.classList.add("incorrect");
    return false;
  }

  if (!isNaN(Number(value))) {
    Notiflix.Notify.failure("Car mark must be a string!");
    input.classList.add("incorrect");
    return false;
  }

  input.classList.remove("incorrect");

  return true;
}

function isModelValid(value, input) {
  if (value.trim() === "") {
    Notiflix.Notify.failure("Car model must be not an empty string!");
    input.classList.add("incorrect");
    return false;
  }

  input.classList.remove("incorrect");
  return true;
}

function isImgValid(value, input) {
  if (value.trim() === "") {
    Notiflix.Notify.failure("Car image must be not an empty string!");
    input.classList.add("incorrect");
    return false;
  }

  if (!isNaN(Number(value))) {
    Notiflix.Notify.failure("Car image must be a string!");
    input.classList.add("incorrect");
    return false;
  }

  input.classList.remove("incorrect");

  return true;
}
