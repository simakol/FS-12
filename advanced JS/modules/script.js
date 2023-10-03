// import { sum, mult, divide, division, sumAll } from "./function.js"; // іменований імпорт, імпортуємо декілька елементів

// console.log(sum(1, 5));
// console.log(mult(4, 5));
// console.log(divide(10, 3));
// console.log(division(15, 3));

// const nums = [4, 3, 5, 2, 5, 35, 33, 23]
// console.log(sumAll(nums));

import * as math from "./function.js";
// іменований імпорт, але всі елементи імпортуються у вигляді обʼєкту який я назвав math

console.log(math)
console.log(math.sum(6, 9))
console.log(math.mult(6, 9))
