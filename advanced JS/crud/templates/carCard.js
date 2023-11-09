export default function createCarCardMarkup({ mark, model, id, img }) {
  return `
    <div class="car-card" data-id="${id}">
        <img src="${img}" alt="${mark} ${model}">
       <div class="car-card-titles">
        <h2>${mark}</h2>
        <h3>${model}</h3>
       </div>
        <button type="button" class="delete-car">X</button>
    </div>
    `;
}
