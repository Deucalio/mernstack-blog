const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  username: String,
  comment: String,
  commentedAt: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model("Comment", commentsSchema);
