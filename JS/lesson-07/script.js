// function logMsg() {
//   console.log("111 Hello world!");
//   console.log("second msg");
// }

// logMsg();
// console.log("===========");
// logMsg();

// console.log(5 ** 2)
// console.log(5 * 5)
// console.log(Math.pow(5, 2))

// console.log(5 * 5 + 4 * 4);
// console.log(10 * 10 + 2 * 2);
// console.log(7 * 7 + 9 * 9);

// function calcSumOfSquares(a, b) {
//   console.log(a * a + b * b);
// }

// calcSumOfSquares(10, 9);
// calcSumOfSquares(7, 3);
// calcSumOfSquares(12, 5);

//! ===============

// Напиши функцію min(a,b), яка повертає найменше з чисел a та b.

// function min(a, b) {
//   if (a < b) {
//     return a;
//   } else {
//     return b;
//   }
//   //   return Math.min(a, b);
// }

// console.log(min(2, 5)); // 2
// console.log(min(3, -1)); // -1
// console.log(min(1, 1)); // 1

// let sumOfMin = min(-9, 4) + min(2, 10); // -9 + 2 -> -7

// console.log(sumOfMin);

//! ===============

// напишіть функцію, яка перевіряє чи входить якесь число в заданий діапазон, наприклад checkNumber(1, 100, -5) -> return false. checkNumber(5, 15, 8) -> return true

// checkNumber(min, max, number)

//* if else, && (Logical AND), return

// function checkNumber(min, max, number) {
//   //   if (number >= min && number <= max) {
//   //     return true;
//   //   } else {
//   //     return false;
//   //   }

//   return number >= min && number <= max;
// }

// 50 >= 1 && 50 <= 100 -> true && true -> true
// -101 >= -100 && -101 <= 100 -> false && true -> false

// console.log(checkNumber(1, 100, 50));
// console.log(checkNumber(-100, 100, -101));

// напиати функцію calculateSquare(a, b), a та b - сторони прямокутника. Функція повинна повернути площу цього прямокутника

function calculateSquare(a, b) {

    
}

console.log(calculateSquare(4, 5)); // 20
console.log(calculateSquare(7, 3)); // 21
