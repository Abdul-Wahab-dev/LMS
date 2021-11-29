const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pecDocType = Schema({
  type: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = PECTYPE = mongoose.model("pecdoctype", pecDocType);
