// експорт за дефолтом (за замовчуванням), тобто ми з файлу експортуємо тільки одну сутність (БІЛЬШЕ ОДНОГО ДЕФОЛТНОГО ЕКСПОРТУ БУТИ НЕ МОЖЕ)
export default class BankAccount {
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
