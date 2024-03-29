/*
У грі є набір зі слів. Коли гра починається - вибирається випадкове слово з існуючих. Далі у гравця питають якусь букву і показуємо пусте слово (_ _ _)
Якщо користувач ввів більше ніж 1 букву - питаємо ще раз. Якщо користувач натиснув кнопку cancel - закінчуємо гру. Якщо ж користувач ввів букву, яка є у слові - ми відкриваємо всі ці букви в рядку. І так до тих пір, поки він не вгадає всі букви.

=====

- _ _ _
- Вгадай букву
- л
- л _ _
- Вгадай букву
- і
- л і _
- Вгадай букву
- с
- Вітаю! Слово ліс

*/

const words = [
  "дерево",
  "стіл",
  "підлога",
  "дім",
  "велосипед",
  "літак",
  "машина",
  "яблуко",
];

const word = words[Math.floor(Math.random() * words.length)];

const answerArr = [];
for (let i = 0; i < word.length; i += 1) {
  answerArr.push("_");
}

while (answerArr.join("") !== word) {
  alert(answerArr.join(" "));
  const letter = prompt(
    "Вгадайте букву, або натисніть cancel для завершення гри"
  );
  if (letter === "" || letter === null) {
    break;
  } else if (letter.length !== 1) {
    alert("Будь ласка, введіть тільки одну букву");
  } else {
    for (let i = 0; i < word.length; i += 1) {
      if (word[i] === letter) {
        answerArr[i] = letter;
      }
    }
  }
}

if (answerArr.join("") === word) {
  alert("Ви відгадали! Було загадано слово " + word);
}
