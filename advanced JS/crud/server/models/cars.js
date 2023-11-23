const mongoose = require("mongoose"); // підключаємо бібліотеку для БД
const Schema = mongoose.Schema;

const carsSchema = new Schema({
  mark: {
    required: true,
    type: String,
  },
  model: {
    required: true,
    type: String,
  },
  img: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("Cars", carsSchema);
