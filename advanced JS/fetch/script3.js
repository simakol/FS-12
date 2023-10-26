// ця конструкція створена для того, щоб зловити помилку, яку генерує код(наприклад викид помилки вручну, або неуспішне виконання промісу). Це забезпечує працездатність нашого коду, бо коли викидується помилка - скрипт перестає працювати, а за допомогою цієї конструкції ми можемо вберегти наш код від крашу.
// try - блок у якому пишемо код, який потенційно може викинути помилку
// catch(err) - блок у якому пишемо код, який буде оброляти помилку

// try {
//   const random = Math.random(); // [0, 1) - генерує випадкову цифру від 0 до 1 не включно
//   if (random > 0.5) {
//     console.log("Все добре, помилок немає!");
//   } else {
//     throw new Error("Упс, сталася помилка!"); // оператор thow робить ручний викид помилки
//   }
// } catch (err) {
//   console.error(err);
// }

const refs = {
  count: document.getElementById("count"),
  list: document.getElementById("list"),
  errorText: document.getElementById("errorText"),
  paginationContainer: document.getElementById("pagination"),
  currentPage: document.getElementById("currentPage"),
  buttons: document.querySelectorAll(".pagination-page"),
};

refs.paginationContainer.children[0].disabled = true;
refs.paginationContainer.style.display = "none";
refs.paginationContainer.addEventListener("click", handlePagination);

let page = 1;
let maxPage = 0;

loadFirstContent();

async function loadFirstContent() {
  try {
    const data = await getCharacters();

    count.textContent = data.info.count;
    maxPage = data.info.pages;
    refs.list.innerHTML = createMarkup(data.results);

    refs.paginationContainer.style.display = "block";
  } catch (err) {
    handleError(err);
  }
}

function handleError(err) {
  console.log(err);
  refs.errorText.textContent = err;
  refs.paginationContainer.style.display = "none";
}
function createMarkup(arr) {
  return arr
    .map(({ id, name, gender, image, species, status }) => {
      return `
        <li data-id="${id}">
          <img src="${image}" alt="${name}">
          <h2>${name}</h2>
          <p>Gender: <span>${gender}</span></p>
          <p>Species: <span>${species}</span></p>
          <p>Status: <span>${status}</span></p>
        </li>
        `;
    })
    .join("");
}

/*
* async - оголошує асинхронну функцію. Всередині асинхронних функцій можна використовувати оператор await. Асинхронна функція завжди повертає Promise (обʼєкт з результатом асинхронної операції)

* await - це оператор який можна викликати тільки всередині асинхронної функції. Його задача - заморозити виконання функції до тих пір поки не виконається проміс який ви напишете після цього оператору. Як тільки проміс виконається, await поверне його результат.

* асинхронні функції потрібні для того, щоб позбавитись .then(), та вкладених колбек функцій. Це імітація синхронного(послідовного) виконання асинхронного(непослідовного) коду.

*/

async function getCharacters(page = 1) {
  const BASE_URL = "https://rickandmortyapi.com/api";
  const ENDPOINT = "character";

  const { data } = await axios.get(`${BASE_URL}/${ENDPOINT}/?page=${page}`);
  return data;
}

async function handlePagination(event) {
  if (event.target.id === "next") {
    nextPage(event.target);
  } else if (event.target.id === "prev") {
    prevPage(event.target);
  } else if (event.target.classList.contains("pagination-page")) {
    page = Number(event.target.dataset.page);
    currentPage.textContent = page;
    const buttons = [...refs.paginationContainer.children];
    try {
      buttons.forEach((button) => (button.disabled = true));
      const data = await getCharacters(page);

      refs.list.innerHTML = createMarkup(data.results);

      window.scrollTo({ top: 0, behavior: "smooth" });

      buttons.forEach((button) => (button.disabled = false));
    } catch (err) {
      handleError(err);
    }
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
