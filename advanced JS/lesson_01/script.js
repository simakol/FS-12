// ***************Прототипне наслідування та метод Object.create***************\\
// const user = {
//   name: "Alice",
//   age: 23,
//   sayHello() {
//     console.log(`Hello my name is ${this.name}`);
//   },
//   getAge() {
//     console.log(`my age ${this.age}`);
//   },
// };

// const student = Object.create(user); // створюю новий пустий обʼєкт student і вказую обʼєкт user як прототип

// console.log(student);
// student.sayHello();

// student.name = "Kate";
// student.sayHello();

// student.getAge();

// student.age = 30;
// student.getAge();

// const arr = [1, 2, 3];

// arr.push(4);

// console.log(arr);

// *********************************ES6 Class*********************************\\

// *****Публічні властивості та методи***** \\
// class User {
//   // конструктор - це метод, який викликається під час створення нового екземпляру класу (екземпляр класу - це новий обʼєкт, який створено за шаблоном самого класу)
//   constructor(name) {
//     this.name = name;
//   }

//   showName() {
//     console.log(`Hello my name is ${this.name}`);
//     // this посилається на обʼєкт, який викликав функцію, тобто, на тей обʼєкт, який стоїть зліва від крапки
//   }
// }

// const student = new User("Alice");
// // { name: "Alice" }
// // new - оператор, який робить декілька важливих дій:
// // 1. він створює пустий обʼєкт - екземпляр класу
// // 2. він викликає constructor і вказує що this буде посилатися на цей пустий обʼєкт (екземпляр)
// console.log(student);
// student.showName();

// const student2 = new User("Alex")
// console.log(student2)
// student2.showName()

// **********Наслідування класів********* \\

// class Rectangle {
//   constructor(height, width) {
//     this.name = "Rectangle";
//     this.height = height;
//     this.width = width;
//   }

//   getArea() {
//     return this.width * this.height;
//   }

//   getPerimetr() {
//     return this.width * 2 + this.height * 2;
//   }

//   sayHello() {
//     console.log(
//       `Hello, I am ${
//         this.name
//       }. My area is ${this.getArea()}. My perimetr is ${this.getPerimetr()}`
//     );
//   }
// }

// extends - розширює - це наслідування класів
// при наслідуванні класів обовʼязково потрібно викликати конструктор батька в конструкторі дитини за допомогою функції super()

// class Square extends Rectangle {
//   constructor(length) {
//     super(length, length);
//     this.name = "Square";
//   }
// }

// const rectangle = new Rectangle(5, 10);
// console.log(rectangle);
// rectangle.sayHello();

// const square = new Square(5);
// console.log(square)
// square.sayHello();

// ***********************Практика*********************** \\

// *******Task-2******* \\
// Реалізуйте клас Student, який успадковуватиметься від класу User. Цей клас повинен мати такі властивості:
// name властивість (ім'я, успадковується від User),
// surname властивість (прізвище, успадковується від User),
// year (рік вступу до вузу).

// Клас повинен мати метод getFullName() (успадковується від User), за допомогою якого можна вивести одночасно ім'я та прізвище студента.
// Також клас повинен мати метод getCourse(), який виводитиме поточний курс студента (від 1 до 5, якщо значення перевищує 5  курс виводити що студент являється випускником).
// Курс обчислюється так: потрібно від поточного року відняти рік вступу до вузу. Поточний рік отримаєте самостійно
// Приклад ініціалізації екземпляру класа:
// const student = new Student('Петрик', 'Пяточкин', 2019);

// class User {
//   constructor(firstName, lastName) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//   }

//   getFullName() {
//     return `${this.firstName} ${this.lastName}`;
//   }
// }

// class Student extends User {
//   constructor(firstName, lastName, year) {
//     super(firstName, lastName);
//     this.year = year;
//   }

//   getCourse() {
//     const today = new Date();
//     const currentYear = today.getFullYear();
//     const diff = currentYear - this.year;
//     if (currentYear < this.year) {
//       return "Студент ще не вступив до ВУЗУ";
//     }

//     if (diff > 5) {
//       return "Студент вже випускник!";
//     }

//     return `${diff} курс`;
//   }
// }

// const student = new Student("Петрик", "Пяточкин", 2019);
// console.log(student);
// console.log(student.getFullName()); //поверне 'Петрик Пяточкин'
// console.log(student.getCourse()); //поверне 4

// *******Task-4******* \\

// Необхідно створити клас BankAccount, який представляє банківський рахунок. Клас повинен мати властивість balance, яка представляє баланс рахунку. Клас повинен також мати публічні методи deposit та withdraw, які дозволяють здійснювати операції з депозитом та зняттям коштів з рахунку.

const TRANSACTIONS_TYPE = {
  deposit: "deposit",
  withdraw: "withdraw",
};

class BankAccount {
  constructor() {
    this.balance = 0;
    this.transactionHistory = [];
  }

  createTransaction(amount, type) {
    const transaction = this.createTransactionObject(amount, type);
    this.transactionHistory.push(transaction);
  }

  createTransactionObject(amount, type) {
    return {
      amount,
      type,
      id: this.transactionHistory.length,
    };
  }

  deposit(amount) {
    if (amount <= 0) {
      console.log(`❌ Не можна покласти відʼємну суму! ${this.getBalance()}`);
      return;
    }

    this.balance += amount;
    console.log(`✅ 💵 Успішно зачислено ${amount} грн. ${this.getBalance()}`);
    this.createTransaction(amount, TRANSACTIONS_TYPE.deposit);
  }

  withdraw(amount) {
    if (amount <= 0) {
      console.log(`❌ Не можна зняти відʼємну суму! ${this.getBalance()}`);
    } else if (amount > this.balance) {
      console.log(`❌ Недостаньо коштів! ${this.getBalance()}`);
    } else {
      this.balance -= amount;
      console.log(`✅ 💸 Успішно знято ${amount} грн. ${this.getBalance()}`);
      this.createTransaction(amount, TRANSACTIONS_TYPE.withdraw);
    }
  }

  getBalance() {
    return `Поточний баланс: ${this.balance} грн.`;
  }
}

const instance = new BankAccount();
instance.deposit(-100);
instance.deposit(1200);
instance.withdraw(1000);
instance.withdraw(-1000);
instance.withdraw(500);
instance.deposit(10000);
instance.withdraw(10000);
console.log(instance);
