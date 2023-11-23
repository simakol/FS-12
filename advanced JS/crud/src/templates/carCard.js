export default function createCarCardMarkup({ mark, model, id, img }) {
  return `
    <div class="car-card" data-id="${id}">
        <img src="${img}" alt="${mark} ${model}" name="img">
       <div class="car-card-titles" name="titles">
        <h2 name="mark">${mark}</h2>
        <h3 name="model">${model}</h3>
       </div>
        <button type="button" class="delete-car">Delete</button>
        <button type="button" class="edit-car">Edit</button>
    </div>
    `;
}
