const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  coverImgUrl: { type: String, required: true },
  title: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: () => Date.now() },
  // comments: {},
});

module.exports = mongoose.model("Article", articleSchema);

// module.exports = mongoose.model("Magazine", bookSchema);
// const bookSchema = new mongoose.Schema({
//   title: String,
//   description: String
// })
