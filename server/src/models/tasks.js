const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  user: { type: String, default: null },
  title: String,
  description: String,
  status: { type: String, enum: ["pending", "approved", "rejected"] },
  token: String,
  created_by: Schema.Types.ObjectId,
  created_date: { type: Date, default: Date.now },
});

module.exports = model("tasks", taskSchema);
