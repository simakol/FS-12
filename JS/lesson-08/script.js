// const cars = ["BMW", "Infinity", "Audi", "Mercedes"];

// console.log(cars[2]);

// const car = {
//   brand: "BMW",
//   model: "330i",
//   volume: 3.0,
//   hp: 400,
// };

// console.log(car.model);

// const cars = [
//   {
//     brand: "BMW",
//     model: "330i",
//     volume: 3.0,
//     hp: 400,
//   },
//   {
//     brand: "Infinity",
//     model: "Q60s",
//     volume: 3.0,
//     hp: 500,
//   },
//   {
//     brand: "Audi",
//     model: "RS8",
//     volume: 2.4,
//     hp: 350,
//   },
// ];

// console.log(cars[2].brand)

// 10 літрів на 100 кілометрів. нам треба проїхати 1000 кілометрів. скільки літрів бензину нам потрібно? 100 літрів

// function calculateFuelConsumption(consumption, distance) {
//   return (distance * consumption) / 100;
// }

// console.log(calculateFuelConsumption(15, 600));

//! =============

// this - контекст виклику функції. Він вказує на тей обʼєкт, який цю саму функцію (або метод) викликав

// const car = {
//   brand: "BMW",
//   model: "330i",
//   volume: 2.0,
//   hp: 500,
//   consumption: 15,
//   calculateFuelConsumption(distance) {
//     const consumption = (distance * this.consumption) / 100;
//     console.log(
//       `The car ${this.brand} ${this.model} will consume ${consumption} liters of gasoline per ${distance} kiliometers`
//     );
//     return consumption;
//   },
// };

// car.calculateFuelConsumption(3479);

// const car1 = {
//   brand: "Infinity",
//   model: "Q60s",
//   volume: 3.0,
//   hp: 550,
//   consumption: 17,
//   calculateFuelConsumption: car.calculateFuelConsumption,
// };

// car1.calculateFuelConsumption(678);
// car1.calculateFuelConsumption(10000);

//! =========

//* Example 3 - Масив об'єктів
// Напишіть функцію calcTotalPrice(stones, stoneName), яка приймає масив об'єктів та рядок з назвою каменю. Функція рахує і повертає загальну вартість каміння з таким ім'ям, ціною та кількістю з об'єкта

const stones = [
  { name: "Смарагд", price: 1300, quantity: 4 },
  { name: "Діамант", price: 2700, quantity: 3 },
  { name: "Сапфір", price: 400, quantity: 7 },
  { name: "Щебінь", price: 200, quantity: 2 },
];


function calcTotalPrice(stones, stoneName){

}

calcTotalPrice(stones, "Смарагд") // 5200
calcTotalPrice(stones, "Щебінь") // 400

// for, if(stoneName === stone.name)