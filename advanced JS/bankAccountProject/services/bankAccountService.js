// експорт за дефолтом (за замовчуванням), тобто ми з файлу експортуємо тільки одну сутність (БІЛЬШЕ ОДНОГО ДЕФОЛТНОГО ЕКСПОРТУ БУТИ НЕ МОЖЕ)

export default class BankAccount {
  static TRANSACTIONS_TYPE = {
    deposit: "deposit",
    withdraw: "withdraw",
  };

  // конструктор - це метод, який викликається під час створення екземпляру класу через оператор new
  constructor({ balance, transactionHistory }) {
    this.balance = balance ?? 0;
    this.transactionHistory = transactionHistory ?? [];
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
      currentBalance: this.balance,
    };
  }

  deposit(amount) {
    if (amount <= 0) {
      Notiflix.Notify.failure(
        `Не можна покласти відʼємну суму! ${this.balance}`
      );
    }

    this.balance += amount;
    this.createTransaction(amount, BankAccount.TRANSACTIONS_TYPE.deposit);
    Notiflix.Notify.success(
      `💵 Успішно зачислено ${amount} грн. ${this.balance}`
    );
  }

  withdraw(amount) {
    if (amount <= 0) {
      Notiflix.Notify.failure(`Не можна зняти відʼємну суму! ${this.balance}`);
    } else if (amount > this.balance) {
      Notiflix.Notify.failure(`Недостаньо коштів! ${this.balance}`);
    } else {
      this.balance -= amount;
      this.createTransaction(amount, BankAccount.TRANSACTIONS_TYPE.withdraw);
      Notiflix.Notify.success(
        `💸 Успішно знято ${amount} грн. ${this.balance}`
      );
    }
  }
}
