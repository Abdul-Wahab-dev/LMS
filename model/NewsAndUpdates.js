const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsAndUpdate = Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  createBy: {
    userID: String,
    name: String,
  },
  deadline: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = NewsAndUpdate = mongoose.model(
  "newsandupdates",
  newsAndUpdate
);
