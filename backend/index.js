const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const Comment = require("./models/comments");

const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

require("dotenv").config();
const app = express();
const port = 3000 || process.env.PORT;
const cors = require("cors");

app.use(cors());
app.use(express.json()); //useful for working with req.body obj

mongoose.set("strictQuery", true);

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    process.env.MONGOSTRING,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Mongoose is connected")
  );
} catch (e) {
  console.log("could not connect");
}

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
  },
});

const upload = multer({ storage: storage });

app.post("/article/add/img", upload.single("picture"), async (req, res) => {
  res.json({
    msg: "SET",
    CoverImg: req.file.path,
  });
});

app.post("/article/add", async (req, res) => {
  res.json({
    msg: "SET",
    title: req.body.title,
    description: req.body.description,
  });
});

// Add an article to db (given imageurl, title and description)
app.post("/article/AddToDb", async (req, res) => {
  const article = new Article({
    coverImgUrl: req.body.image,
    title: req.body.title,
    description: req.body.description,
  });
  await article.save();

  res.json({
    msg: "Done",
  });
});

// Post comment
app.post("/article/comment/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  const comment = new Comment({
    username: req.body.username,
    comment: req.body.comment,
  });
  article.comments.push(comment);
  article.save();
  comment.save();

  res.json({ msg: "Done" });
});

// Edit (given no image is provided)

app.put("/article/edit/titleDescription/:id", async (req, res) => {
  // find the default image in monogodb using id
  const article = await Article.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
  });
  res.json({ msg: "done" });
});

// Edit (fiven image is provided)

app.put("/article/edit/titleDescriptionImg/:id", async (req, res) => {
  // find the default image in monogodb using id
  const article = await Article.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    description: req.body.description,
    coverImgUrl: req.body.newImageUrl,
  });
  res.json({ msg: "done" });
});

// Delete an article (given an id)

app.delete("/article/:id", async (req, res) => {
  const article = await Article.findByIdAndDelete(req.params.id);
  res.json({ msg: "DELETED" });
});

// fetch all the articles
app.get("/", async (req, res) => {
  const articles = await Article.find({});
  res.json({ data: articles });
});

// fetch an article (given an id)

app.get("/article/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate("comments");
    res.json({ article: article });
  } catch (err) {
    res.json({ article: null });
  }
});

app.delete("/api/:id", (req, res) => {
  DATA = DATA.filter((item) => item.id !== parseInt(req.params.id));
  // res.send(req.params.id)
  res.json(DATA);
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.json({ msg: "Set", data: req.body });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
