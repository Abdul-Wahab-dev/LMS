const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const programSchema = Schema({
  program: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Program = mongoose.model("program", programSchema);
