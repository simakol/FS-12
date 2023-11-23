const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Model = require("./models/cars");

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());
app.use("/api", router);

app.listen(3000, () => {
  console.log("\nServer started at port 3000\n");
});

//guqN1MxGXYe7BlqQ
//alexsim
const db =
  "mongodb+srv://alexsim:guqN1MxGXYe7BlqQ@cluster0.cc3nitm.mongodb.net/?retryWrites=true&w=majority"; // ключ доступу до БД

mongoose
  .connect(db)
  .then(() => console.log("\nConnected to DB\n"))
  .catch((err) => console.log(err));

router.post("/cars", async (req, res) => {
  const data = new Model({
    mark: req.body.mark,
    model: req.body.model,
    img: req.body.img,
  });

  try {
    const saved = await data.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/cars", async (req, res) => {
  try {
    const data = await Model.find();

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
