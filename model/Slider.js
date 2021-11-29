const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sliderSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  fileName: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = slider = mongoose.model("slides", sliderSchema);
