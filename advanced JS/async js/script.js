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

const refs = {
  carsContainer: document.getElementById("carsContainer"),
  balance: document.getElementById("balance"),
};

const bankAccount = {
  balance: 10000,
  bet() {
    if (this.balance >= 100) {
      this.balance -= 100;
      Notiflix.Notify.success("Успішна ставка!");
      return 100;
    } else {
      Notiflix.Notify.failure("Недостатньо коштів!");
      return 0;
    }
  },
};

const cars = [
  {
    img: "https://porsche.ua/storage/local/assetPreview/image/porsche-911-carrera.webp",
    name: "Porsche 911 carrera",
    price: 250000,
    bet: 250100,
    id: 0,
    time: 30,
  },
  {
    img: "https://www.mrcollection.com/wp-content/uploads/2018/03/lamborghini-huracan-performante-spyder_06.jpg",
    name: "Lamborghini huracan spider",
    price: 350000,
    bet: 350100,
    id: 1,
    time: 40,
  },
  {
    img: "https://imgd.aeplcdn.com/1280x720/n/cw/ec/50723/m5-exterior-right-front-three-quarter-2.jpeg?q=80",
    name: "BMW M5 competition",
    price: 150000,
    bet: 150100,
    id: 2,
    time: 50,
  },
  {
    img: "https://d2ivfcfbdvj3sm.cloudfront.net/7fc965ab77efe6e0fa62e4ca1ea7673bb25e4758081e3d8e88cb10/stills_0640_png/MY2021/14693/14693_st0640_116.png",
    name: "Audi rs7",
    price: 180000,
    bet: 180100,
    id: 3,
    time: 60,
  },
  {
    img: "https://purepng.com/public/uploads/large/purepng.com-tesla-model-x-white-carcarvehicletransporttesla-961524644652ppllh.png",
    name: "Tesla model x",
    price: 120000,
    bet: 120100,
    id: 4,
    time: 20,
  },
  {
    img: "https://media.sketchfab.com/models/d51fcd44b74f4daf8012c41e0400c041/thumbnails/9391e698146043e5a46477b5aa2d1293/08a1328593d7452eab8d66b869d3fa47.jpeg",
    name: "Mazda miata",
    price: 50000,
    bet: 50100,
    id: 5,
    time: 20,
  },
];

updateBalance(bankAccount);
fillCarsList(cars);
startCountDownTime(cars);

refs.carsContainer.addEventListener("click", handleBet);

function handleBet(event) {
  if (!event.target.classList.contains("car-bet-button")) return;

  const amount = bankAccount.bet();
  updateBalance(bankAccount);

  const carItem = event.target.closest(".car-item");
  const carBet = Number(carItem.dataset.bet) + amount;
  carItem.dataset.bet = carBet;
  event.target.parentElement.children[0].children[1].children[0].textContent =
    carBet;

  const findCar = cars.find((el) => el.id === Number(carItem.dataset.id));

  setCarTimer(findCar);
}

function fillCarsList(cars) {
  const markup = createCarsMarkup(cars);
  refs.carsContainer.innerHTML = markup;
}

function createCarsMarkup(cars) {
  return cars
    .map(
      ({ img, name, price, id, bet, time }) => `
    <div class="car-item" data-id="${id}" data-bet="${bet}">
          <div>
            <h2 class="car-name">${name}</h2>
            <img
              src="${img}"
              alt="${name}"
            />
          </div>
          <div class="rigth-side">
            <div>
              <h2 class="car-price dollar-sign">Ціна: ${price}</h2>
              <h3 class="car-bet dollar-sign">Ставка: <span>${bet}</span></h3>
            </div>
            <button class="car-bet-button" type="button">Підняти ставку</button>
          </div>
          <p class="count-down-time">
            До кінця лоту лишилось <span id="time-${id}">${time}</span> секунд
          </p>
        </div>
    `
    )
    .join("");
}

function startCountDownTime(cars) {
  for (const car of cars) {
    setCarTimer(car);
  }
}

function setCarTimer(car) {
  const carsContainer = [...refs.carsContainer.children];

  const findCar = carsContainer.find((el) => Number(el.dataset.id) === car.id);
  const carTime = findCar.children[2].children[0];
  clearTimeout(findCar.dataset.timeoutId);
  clearInterval(findCar.dataset.intervalId);
  carTime.textContent = car.time;

  const intervalId = setInterval(() => {
    carTime.textContent = Number(carTime.textContent) - 1;
  }, 1000);
  findCar.dataset.intervalId = intervalId;

  const timeoutId = setTimeout(() => {
    clearInterval(intervalId);
    findCar.remove();
    Notiflix.Notify.success(`Ви викупили машину ${car.name}`);
  }, car.time * 1000);

  findCar.dataset.timeoutId = timeoutId;
}

function updateBalance({ balance }) {
  refs.balance.textContent = balance;
}
