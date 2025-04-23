const { Schema, model } = require("mongoose");

const blacklistSchema = new Schema({
  token: String,
});

module.exports = model("blacklist", blacklistSchema);
