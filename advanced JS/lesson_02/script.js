// //! Приватні властивості та методи

// class User {
//   #password;
//   constructor(firstName, lastName, password) {
//     this.firstName = firstName; // публічна властивість (доступні через екземпляр і всередині класу)
//     this.lastName = lastName;
//     this.#password = password; // приватна властивість (доступна тільки всередині класу + її потрібно оголосити за межами конструктору через #)
//   }

//   getFullName() {
//     // публічний метод
//     // if (this.#checkPassword()) {
//     //   return `${this.firstName} ${this.lastName}`;
//     // } else {
//     //   return "Who are you?";
//     // }

//     // тернарний оператор
//     return this.#checkPassword()
//       ? `${this.firstName} ${this.lastName}`
//       : "Who are you?";
//   }

//   #checkPassword() {
//     // приватний метод
//     const password = prompt("Enter your password:");
//     return password === this.#password;
//   }
// }

// const user1 = new User("Oleg", "Ivanov", "qwerty");

// console.log(user1);
// console.log(user1.getFullName());

//! Геттери і Сеттери

// class User {
//   #password;
//   #email;
//   constructor({ firstName, lastName, password, email }) {
//     this.firstName = firstName; // публічна властивість (доступні через екземпляр і всередині класу)
//     this.lastName = lastName;
//     this.#password = password; // приватна властивість (доступна тільки всередині класу + її потрібно оголосити за межами конструктору через #)
//     this.#email = email;
//   }

//   getFullName() {
//     // публічний метод

//     // тернарний оператор
//     return this.#checkPassword()
//       ? `${this.firstName} ${this.lastName}`
//       : "Who are you?";
//   }

//   #checkPassword() {
//     // приватний метод
//     const password = prompt("Enter your password:");
//     return password === this.#password;
//   }

//   // геттер, я створив публічне поле, яке я назвав email і якщо пароль вірний - то я отримаю доступ до пошти
//   get email() {
//     if (this.#checkPassword()) {
//       return this.#email;
//     }
//   }

//   // сеттер, я створив публічне поле, яке я назвав email і якщо пароль вірний - то я отримаю доступ до пошти і зможу її перезаписати
//   set email(newEmail) {
//     if (this.#checkPassword()) {
//       this.#email = newEmail; // перезаписую приватне поле всередині класу
//     }
//   }
// }

// const user1 = new User({
//   firstName: "Oleg",
//   lastName: "Ivanov",
//   password: "qwerty",
//   email: "example@gmail.com",
// });

// console.log(user1);
// console.log(user1.email);
// user1.email = "newemail@gmail.com";
// console.log(user1.email);

// *******Task-4******* \\

// Необхідно створити клас BankAccount, який представляє банківський рахунок. Клас повинен мати властивість balance, яка представляє баланс рахунку. Клас повинен також мати публічні методи deposit та withdraw, які дозволяють здійснювати операції з депозитом та зняттям коштів з рахунку.

class BankAccount {
  //статичні властивості (не змінюються) вони створюються в самому класі і можуть бути доступні ТІЛЬКИ через сам клас (їх немає у екземплярів)
  static TRANSACTIONS_TYPE = {
    deposit: "deposit",
    withdraw: "withdraw",
  };
  #balance;

  constructor() {
    this.#balance = 0;
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

    this.#balance += amount;
    console.log(`✅ 💵 Успішно зачислено ${amount} грн. ${this.getBalance()}`);
    this.createTransaction(amount, BankAccount.TRANSACTIONS_TYPE.deposit);
  }

  withdraw(amount) {
    if (amount <= 0) {
      console.log(`❌ Не можна зняти відʼємну суму! ${this.getBalance()}`);
    } else if (amount > this.#balance) {
      console.log(`❌ Недостаньо коштів! ${this.getBalance()}`);
    } else {
      this.#balance -= amount;
      console.log(`✅ 💸 Успішно знято ${amount} грн. ${this.getBalance()}`);
      this.createTransaction(amount, BankAccount.TRANSACTIONS_TYPE.withdraw);
    }
  }

  getBalance() {
    return `Поточний баланс: ${this.#balance} грн.`;
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

console.log(BankAccount.TRANSACTIONS_TYPE.deposit);
