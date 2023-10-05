import BankAccount from "./services/bankAccountService.js";

const account = new BankAccount();

console.log(account);

/*
1. отримаємо посилання на всі дом елементи через id
2. вішаємо обробник подій (addEventListener) на форму по події submit
  2.1. зчитати дані з поля вводу
  2.2. робимо перевірку на вхідні данні, якщо ми ввели не число, або число менше або ріне 0 - кажемо користувачу що це невірна інформація + очищуємо поле
  2.3. робимо перевірку на тип операції (поповнення чи зняття)
  2.4. в залежності від операції виконуємо відповідну операцію + повідомляємо про це користувача
*/

const refs = {
  balance: document.getElementById("balance"),
  form: document.getElementById("form"),
  transactionsHistory: document.getElementById("transactionsHistory"),
};

refs.form.addEventListener("submit", handleSumbit);

function handleSumbit(event) {
  event.preventDefault(); // заборона дій браузера за замовчуванням під час події (в даному випадку заборона на перезавантаження сторінки під час події сабміту форми)

  const { amount, type } = event.currentTarget.elements;

  if (amount.value <= 0 || isNaN(Number(amount.value))) {
    Notiflix.Notify.failure("Invalid data! Try again!");
    event.currentTarget.reset();
    return;
  }

  if (type.value === BankAccount.TRANSACTIONS_TYPE.deposit) {
    account.deposit(Number(amount.value));
  } else {
    account.withdraw(Number(amount.value));
  }

  event.currentTarget.reset();
  updateBalanceText();
}

function updateBalanceText() {
  refs.balance.textContent = account.balance;
}
