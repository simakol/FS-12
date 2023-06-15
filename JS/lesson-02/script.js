// let age = 28;

// string - "string" 'string'
// number - -10, 10, 0, 4.5
// boolean - true/false
// null - empty
// undefined - присутність відсутності

// let a;

// console.log(a); // undefined

// console.log(typeof "10"); // string

// console.log(5 == "5"); // true
// console.log(7 === "7"); // false
// console.log(10 >= 10); // true
// console.log(10 % 3) // 1
// console.log(15 % 13) // 2
// console.log(100 % 2) // 0

//! ==============================

// явне зведення типів
// Number() - намагається перетворити будь-що на число
// String() -  намагається перетворити будь-що на строку
// Boolean() -  намагається перетворити будь-що на буліан

// let number = Number(prompt("Введіть будь-яке число від 1 до 10"));

// console.log(number + 4);

// console.log(Number("hello"));
// console.log(String(100))
// console.log(Boolean(" "));

/*
True: будь-яка цифра чи число (ціле, дробове, відʼємне), крім нуля | будь-яка строка з символами |
False: 0, пуста строка, null, undefined
*/

//! ==============================

// неявне зведення типів
// ==
// + - унарний плюс(неявно перетворює на число)
// + "" - неявне перетворення на строку
// !! - неявне перетворення на буліан

// console.log(+"15");
// console.log(150 + "");

//! ==============================

//? Логічні оператори

//* Логічне НІ - ! - змінює логічний тип на зворотній (був тру - стане фолз і навпаки)

// console.log(!true)
// console.log(!false)

// console.log(!0) // true | 0 -> false -> !false -> true

// console.log(!" ") // false | " " -> true -> !true -> false

// console.log(!-69) // false | -69 -> true -> !true -> false

// console.log(!!"") // false | "" -> false -> !(!false) -> !true -> false

//* Логічне АБО - || -> повертає перший true з переліку, якщо ні одного true не знайдено - повертає останній

// console.log(0 || 4 || false); // 4

// console.log("" || false || " " || undefined); // " "

// console.log(false || "" || null || 0) // 0

//* Логічне І - && -> повертає перший false з переліку, якщо ні одного false не знайдено - повертає останній

// console.log(4 && -9 && true && 0 && "hello"); // 0

// console.log(10 && " " && "0" && -1 && false && null); // false

// console.log(true && 1 && "null" && " " && -9); // -9

// console.log(4 || (0 && 1) || "ooo"); //  4 || 0 || "ooo" -> 4

// console.log("I" || ("hate" && "love") || 5); // I

// console.log(0 || (1 && null && false) || 5 || -9); // 5
/*
1. (1 && null && false) -> null
2. 0 || null || 5 || -9 -> 5

*/

/*
1. запитайте у користувача два числа
2. потрібно вивести суму, різницю, добуток і ділення цих двух чисел (можна в консоль, можна в алерт)
*/

// Введи два числа: 5 8

// 5 + 8 = 13
// 5 - 8 = -3
//...
