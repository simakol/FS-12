const refs = {
  count: document.getElementById("count"),
  list: document.getElementById("list"),
  errorText: document.getElementById("errorText"),
  loadMoreBtn: document.getElementById("loadMoreBtn"),
};

refs.loadMoreBtn.addEventListener("click", handleLoadMore);

let page = 1;

loadBtn();

getCharacters()
  .then((data) => {
    count.textContent = data.info.count;
    console.log(data);
    refs.list.insertAdjacentHTML("beforeend", createMarkup(data.results));
    if (!data.info.next) {
      refs.loadMoreBtn.hidden = true;
    }
    activeBtn();
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

function handleLoadMore() {
  page += 1;
  loadBtn();

  getCharacters(page)
    .then((data) => {
      refs.list.insertAdjacentHTML("beforeend", createMarkup(data.results));
      activeBtn();

      if (!data.info.next) {
        refs.loadMoreBtn.hidden = true;
      }
    })
    .catch((err) => {
      console.log(err);
      refs.errorText.textContent = err;
    });
}

function loadBtn() {
  refs.loadMoreBtn.disabled = true;
  refs.loadMoreBtn.textContent = "Loading...";
}
function activeBtn() {
  refs.loadMoreBtn.disabled = false;
  refs.loadMoreBtn.textContent = "Load More";
}
