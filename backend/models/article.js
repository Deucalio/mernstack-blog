const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  coverImgUrl: { type: String, required: true },
  title: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: () => Date.now() },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

module.exports = mongoose.model("Article", articleSchema);
