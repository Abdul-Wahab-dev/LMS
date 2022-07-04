const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const complainSchema = Schema({
  from: {
    complainerId: String,
    complainerName: String,
  },
  to: {
    complaineeId: String,
    complaineeName: String,
  },
  complainFor: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  reply: [
    {
      from: {
        userId: String,
        name: String,
      },
      answer: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Complain = mongoose.model("complain", complainSchema);
