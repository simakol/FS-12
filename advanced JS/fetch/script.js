getCharacters()
  .then((data) => {
    console.log(data);
  })
  .catch((err) => console.log(err));

function getCharacters() {
  const BASE_URL = "https://rickandmortyapi.com/api";
  const ENDPOINT = "character";
  // fetch(url) - функція, яка повертає проміс(обʼєкт, який представляє результат асинхронної операції). Ця функція посилає запит на ваш url. Якщо запит успішний - ми рухаємось в метод then() і оброблюємо його результат. Якщо запит не успішний - ми рухаємось в метод catch() і там оброблюємо помилку. Кожен наступний then працює з результатом роботи попереднього.

  return fetch(`${BASE_URL}/${ENDPOINT}`).then((data) => {
    if (!data.ok) {
      // перевіряю, якщо data.ok === false, тобто запит виконався неуспішно (наприклад, помилка 404)
      throw new Error(`Fetch error: ${data.statusText}`); // то я вручну викидую помилку, яка потім зловиться в блоці catch
    }

    return data.json(); // дістаємо відповідь від серверу з обʼєкту Response і перетворюємо JSON на звичайний javascript (тому що дані на сервері у 99% випадках зберігаються у форматі JSON, але треба читати документацію щоб точно в цьому переконатись!)
  });
}
