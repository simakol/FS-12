const refs = {
  count: document.getElementById("count"),
  list: document.getElementById("list"),
  errorText: document.getElementById("errorText"),
  paginationContainer: document.getElementById("pagination"),
  currentPage: document.getElementById("currentPage"),
  buttons: document.querySelectorAll(".pagination-page"),
};

refs.paginationContainer.children[0].disabled = true;

refs.paginationContainer.addEventListener("click", handlePagination);

let page = 1;
let maxPage = 0;

getCharacters()
  .then((data) => {
    count.textContent = data.info.count;
    console.log(data);
    refs.list.innerHTML = createMarkup(data.results);
    maxPage = data.info.pages;
  })
  .catch((err) => {
    console.log(err);
    refs.errorText.textContent = err;
  });

function createMarkup(arr) {
  return arr
    .map(
      ({ id, name, gender, image, species, status }) => `
  <li data-id="${id}">
    <img src="${image}" alt="${name}">
    <h2>${name}</h2>
    <p>Gender: <span>${gender}</span></p>
    <p>Species: <span>${species}</span></p>
    <p>Status: <span>${status}</span></p>
  </li>
  `
    )
    .join("");
}

function getCharacters(page = 1) {
  const BASE_URL = "https://rickandmortyapi.com/api";
  const ENDPOINT = "character";
  // fetch(url) - функція, яка повертає проміс(обʼєкт, який представляє результат асинхронної операції). Ця функція посилає запит на ваш url. Якщо запит успішний - ми рухаємось в метод then() і оброблюємо його результат. Якщо запит не успішний - ми рухаємось в метод catch() і там оброблюємо помилку. Кожен наступний then працює з результатом роботи попереднього.
  return fetch(`${BASE_URL}/${ENDPOINT}/?page=${page}`).then((data) => {
    if (!data.ok) {
      // перевіряю, якщо data.ok === false, тобто запит виконався неуспішно (наприклад, помилка 404)
      throw new Error("Fetch error"); // то я вручну викидую помилку, яка потім зловиться в блоці catch
    }

    return data.json(); // дістаємо відповідь від серверу з обʼєкту Response і перетворюємо JSON на звичайний javascript (тому що дані на сервері у 99% випадках зберігаються у форматі JSON, але треба читати документацію щоб точно в цьому переконатись!)
  });
}

function handlePagination(event) {
  if (event.target.id === "next") {
    nextPage(event.target);
  } else if (event.target.id === "prev") {
    prevPage(event.target);
  } else if (event.target.classList.contains("pagination-page")) {
    page = Number(event.target.dataset.page);
    currentPage.textContent = page;

    getCharacters(page)
      .then((data) => {
        refs.list.innerHTML = createMarkup(data.results);

        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch((err) => {
        console.log(err);
        refs.errorText.textContent = err;
      });
  }
}

function nextPage(btn) {
  btn.parentElement.children[0].disabled = false;

  for (const button of refs.buttons) {
    button.dataset.page = Number(button.dataset.page) + 1;
    button.textContent = Number(button.textContent) + 1;

    if (Number(button.dataset.page) === maxPage) {
      btn.disabled = true;
    }
  }
}

function prevPage(btn) {
  btn.parentElement.children[
    btn.parentElement.children.length - 1
  ].disabled = false;

  for (const button of refs.buttons) {
    button.dataset.page = Number(button.dataset.page) - 1;
    button.textContent = Number(button.textContent) - 1;
    if (Number(button.dataset.page) <= 1) {
      btn.disabled = true;
    }
  }
}
