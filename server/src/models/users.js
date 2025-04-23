const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  email: { type: String, unique: true },
  first_name: String,
  last_name: String,
  password: String,
  created_by: Schema.Types.ObjectId,
  created_date: { type: Date, default: Date.now },
});

module.exports = model("users", userSchema);
