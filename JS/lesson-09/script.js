// const cars = ["BMW", "Infinity", "Audi"];

// const car = {
//   brand: "Infinity",
//   model: "q60",
//   volume: 3.0,
// };

// console.log(car.model);

// const { model: carModel, brand, volume } = car; // деструктуризація
// // const brand = car.brand
// // const carModel = car.model

// console.log(carModel);
// console.log(brand);
// console.log(volume);

// const rgb = [50, 43, 122];

// // console.log(rgb[0])
// // console.log(rgb[1])
// // console.log(rgb[2])

// const [red, green, blue] = rgb;
// //const red = rgb[0]

// console.log(`rgb(${red}, ${green}, ${blue})`);

// const student = {
//   firstName: "Ivan",
//   lastName: "Ivanov",
//   mark: 99,
// };

// // "Student Ivan Ivanov has 99 points!"

// function showStudentMsg({ firstName, lastName, mark }) {
//   console.log(`Student ${firstName} ${lastName} has ${mark} points`);
// }

// showStudentMsg(student);
// showStudentMsg({
//   firstName: "Oleg",
//   lastName: "Petrow",
//   mark: 84,
// });

//! =====

// //code
// function sum({ a, b }) {
//   console.log(a + b);
// }

// sum({
//   a: 5,
//   b: 10,
// }); // 15

// sum({
//   a: 7,
//   b: 13,
// }); // 20

//! ========
//...
//* spread - розбити(розпилити) масив або обʼєкт на окремі значення

//* rest - зібрати окремі значення в масив

// const arr = [6, 4, 3, 6, 34, 6, 34, 6, 324, 2364, 66, 234, 235, 6];

// const arrCopy = [...arr];
// console.log(arrCopy);

// console.log(Math.max(...arr));
// console.log(Math.min(...arr));

// const student = {
//   firstName: "Oleg",
//   lastName: "Petrow",
//   mark: 84,
// };

// const student2 = {
//   ...student,
//   raiting: 19,
// };

// console.log(student);
// console.log(student2);

// function sum(...numbers) {
//   let sum = 0;
//   for (let i = 0; i < numbers.length; i += 1) {
//     sum += numbers[i];
//   }
//   console.log(sum);
// }

// sum(4, 5); // 9
// sum(6, 4, 2, 5, 3); // 20
// sum(6, 4, 2, 5, 3, 34, 2, 3, 5, 235, 5);
// sum(6, 4, 2);
