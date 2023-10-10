// ***********setTimeout*********** \\

// setTimeout(callback, time) - функція для відкладених викликів інших функцій (тобто, ми можемо передати туди якусь функцію і вона буде викликана через якийсь час, який ми самі задамо). callback - функція, яка буде викликана, time - час в мілісекундах через який викличеться функція

// console.log(1);

// setTimeout(() => {
//   console.log(2);
// }, 1000);

// console.log(3);

// 1 3 2
// так відбувається тому, що setTimeout це асинхронна функція, а код console.log(1 і 2); це синхронний код.
//! асинхронний код завжди виконується ТІЛЬКИ після того, як закінчився весь синхронний

// ***********setInterval*********** \\

// setInterval(callback, time) - функція, яка викликає колбек функцію раз на якусь кількість часу. callback - функція, яка буде викликана, time - час в мілісекундах, це інтервал з яким буде викликатися наша колбек функція

// console.log("Start");

// let i = 1;

// const id = setInterval(() => {
//   console.log(
//     `Привіт! Ви всередині інтервалу, функція викликалась вже: ${i} разів`
//   );
//   i += 1;
// }, 1000);

// console.log("End");

// console.log(`== Interval id: ${id} ==`);

// setTimeout(() => {
//   console.log("Очищуємо інтервал");
//   clearInterval(id);
// }, 10e3);

//? setTimeout та setInterval завжди повертають числове айді для того, щоб ми потім змогли видалити(зупинити) виклик внутрішніх колбеків. Для зупинки використовуються дві відповідні функції: clearTimeout(id) та clearInterval(id), id - це унікальний числовий індетифікатор нашого таймауту або інтервалу.

//! =========
// зробити зворотній відлік до зникнення рекламного баннеру через 10 секунд

// const refs = {
//   modal: document.getElementById("modal"),
//   text: document.getElementById("text"),
// };

// let counter = 10;
// refs.text.textContent = counter;

// const id = setInterval(() => {
//   counter -= 1;
//   refs.text.textContent = counter;
// }, 1000);

// setTimeout(() => {
//   clearInterval(id);
//   refs.modal.style.display = "none";
// }, 1000 * counter);

//! Аукціон автомобілів: Є карточки з автомобілями під якими є поточна ставка, кнопка підвищити ставку і таймер. При натисканні на кнопку підвищити ставку з нашого балансу списується 100 у. о. і таймер повертається назад. Початково таймер заданий у 30 секунд, якщо час вийде, то машина повинна пропадати, а нам повинні сказати, що ми виграли аукціон.