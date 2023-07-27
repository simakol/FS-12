// window.addEventListener("keydown", handleKeydown);

// function handleKeydown(event) {
//   if (event.key === "Escape") {
//     alert("Ви натиснули клавішу esc");
//   }
// }

// document.body.classList.add("open");
// document.body.classList.remove("ksdjfksdjhfkjsdhfkjsdhf");

const refs = {
  overlay: document.getElementById("overlay"),
  closeBtn: document.getElementById("closeBtn"),
  openModalBtn: document.getElementById("openModalBtn"),
};
const OPEN_CLASS = "open";

refs.openModalBtn.addEventListener("click", openWindow);
refs.closeBtn.addEventListener("click", closeWindow);
refs.overlay.addEventListener("click", closeWindow);

function openWindow() {
  document.body.classList.add(OPEN_CLASS);
  window.addEventListener("keydown", closeWindowOnESC);
}

function closeWindow() {
  document.body.classList.remove(OPEN_CLASS);
  window.removeEventListener("keydown", closeWindowOnESC);
}

function closeWindowOnESC(event) {
  if (event.key === "Escape") {
    closeWindow();
  }
}
