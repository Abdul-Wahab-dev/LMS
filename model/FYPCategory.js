const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fypCategory = Schema({
  category: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = FYPCategory = mongoose.model("fypCategory", fypCategory);
