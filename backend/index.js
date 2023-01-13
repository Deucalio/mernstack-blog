const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

// app.use(cors());
app.use(cors());
app.use(express.json()) //useful for working with req.body obj

let DATA = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
  },
  {
    id: 2,
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
  },
  {
    id: 3,
    title: "Samsung Universe 9",
    description:
      "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249,
  },
];

app.get("/api", (req, res) => {
  res.json(DATA);
});

app.delete("/api/:id", (req, res) => {
  DATA = DATA.filter((item) => item.id !== parseInt(req.params.id));
  // res.send(req.params.id)
  res.json(DATA);
});

app.post("/login", (req,res) => {
    console.log(req.body)
    res.json({msg: "Set", data: req.body})
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
