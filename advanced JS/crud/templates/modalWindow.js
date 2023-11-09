export default function createModalWindow() {
  return basicLightbox.create(
    `
      <form class="add-car-form" id="carForm">
            <input type="text" placeholder="Mark" name="mark" required>
            <input type="text" placeholder="Model" name="model" required>
            <input type="url" placeholder="Image URL" name="img" required>
            <button type="submit">Add car</button>
        </form>
      `
  );
}
