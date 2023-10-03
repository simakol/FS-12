import BankAccount from "./services/bankAccountService.js";

const account = new BankAccount();

console.log(account);

/*
1. отримаємо посилання на всі дом елементи через id
2. вішаємо обробник подій (addEventListener) на форму по події submit

*/

const refs = {
  balance: document.getElementById("balance"),
  form: document.getElementById("form"),
  transactionsHistory: document.getElementById("transactionsHistory"),
};

refs.form.addEventListener("submit", handleSumbit);

function handleSumbit(event) {
  event.preventDefault(); // заборона дій браузера за замовчуванням під час події (в даному випадку заборона на перезавантаження сторінки під час події сабміту форми)
  console.log(event);
}
