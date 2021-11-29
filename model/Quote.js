const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quoteSchema = Schema({
  Provider: {
    providerId: String,
    providerName: String,
  },

  display: {
    type: Boolean,
    required: true,
    default: false,
  },

  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Quote = mongoose.model("quotes", quoteSchema);
