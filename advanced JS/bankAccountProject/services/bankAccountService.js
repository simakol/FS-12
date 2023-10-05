// експорт за дефолтом (за замовчуванням), тобто ми з файлу експортуємо тільки одну сутність (БІЛЬШЕ ОДНОГО ДЕФОЛТНОГО ЕКСПОРТУ БУТИ НЕ МОЖЕ)
export default class BankAccount {
  static TRANSACTIONS_TYPE = {
    deposit: "deposit",
    withdraw: "withdraw",
  };
  #balance;

  // конструктор - це метод, який викликається під час створення екземпляру класу через оператор new
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
      Notiflix.Notify.failure(
        `Не можна покласти відʼємну суму! ${this.getBalance()}`
      );
    }

    this.#balance += amount;
    this.createTransaction(amount, BankAccount.TRANSACTIONS_TYPE.deposit);
    Notiflix.Notify.success(
      `💵 Успішно зачислено ${amount} грн. ${this.getBalance()}`
    );
  }

  withdraw(amount) {
    if (amount <= 0) {
      Notiflix.Notify.failure(
        `Не можна зняти відʼємну суму! ${this.getBalance()}`
      );
    } else if (amount > this.#balance) {
      Notiflix.Notify.failure(`Недостаньо коштів! ${this.getBalance()}`);
    } else {
      this.#balance -= amount;
      this.createTransaction(amount, BankAccount.TRANSACTIONS_TYPE.withdraw);
      Notiflix.Notify.success(
        `💸 Успішно знято ${amount} грн. ${this.getBalance()}`
      );
    }
  }

  getBalance() {
    return `Поточний баланс: ${this.#balance} грн.`;
  }

  get balance() {
    return this.#balance;
  }
}
