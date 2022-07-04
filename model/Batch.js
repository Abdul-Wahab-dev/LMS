const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const batchSchema = Schema({
  batch: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Batch = mongoose.model("batch", batchSchema);
