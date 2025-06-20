const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: String,
  rotate: Number,
  archived: Boolean,
  position: { left: Number, top: Number },
});

module.exports = mongoose.model("Note", noteSchema);
