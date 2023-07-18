// const text = document.getElementById("text");

// console.dir(text);

// text.textContent = "Хей! Цей текст було змінено за допомогою JS!!!";

// const btnContainer = document.getElementById("btnContainer");
// const color = "red";
// const button = `<button class='button' style="background-color: ${color}">Це кнопка</button>`;

// btnContainer.insertAdjacentHTML("beforeend", button);

//! ========================

// Task: у вас є масив з технологій, потрібно через js ствоити список (ul li) і додати технології на сторінку

// const technologies = ["HTML", "CSS", "JS", "GIT", "React.js"];

/*
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JS</li>
  <li>GIT</li>
  <li>React.js</li>
</ul>
*/

// 1 спосіб

// const container = document.getElementById("container");
// let list = "";

// for (let i = 0; i < technologies.length; i += 1) {
//   list += `<li>${technologies[i]}</li>`;
// }

// container.insertAdjacentHTML("beforeend", `<ul>${list}</ul>`);

// 2 спосіб

// const container = document.getElementById("container");
// const ulEl = document.createElement("ul");

// for (let i = 0; i < technologies.length; i += 1) {
//   const liEl = document.createElement("li");
//   liEl.textContent = technologies[i];
//   liEl.style.color = "red";
//   ulEl.appendChild(liEl);
// }

// container.appendChild(ulEl);

//! ========================

//Task: Створити кілька кнопок на основі масива з обєктами використовуючи createElement

const colors = [
  {
    label: "red",
    color: "#FF0000",
  },
  {
    label: "green",
    color: "#00FF00",
  },
  {
    label: "blue",
    color: "#0000FF",
  },
  {
    label: "yellow",
    color: "#FFFF00",
  },
];

/*
<button style="background-color: #FF0000">red</button>
*/

const container = document.createElement("div");

for (const button of colors) {
  const buttonEL = document.createElement("button");
  buttonEL.textContent = button.label;
  buttonEL.style.backgroundColor = button.color;
  container.appendChild(buttonEL);
}

document.body.appendChild(container);
