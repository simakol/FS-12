function sum(a, b) {
  return a + b;
}

function mult(a, b) {
  return a * b;
}

function divide(a, b) {
  return a - b;
}

function division(a, b) {
  return a / b;
}

function sumAll(arr) {
  //   let sum = 0;

  //   for (const num of arr) {
  //     sum += num;
  //   }
  //   return sum;

  return arr.reduce((sum, num) => sum + num, 0);
}

export { sum, mult, divide, division, sumAll }; // named export(іменований експорт), пишеться тоді, коли ми хочемо експортувати відразу декілька елементів
