const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignmentSchema = Schema({
  from: {
    providerId: String,
    providerName: String,
  },
  program: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  deadLineDate: {
    type: String,
    required: true,
  },
  assignmentSubmitBy: [
    {
      enrollmentNo: String,
      name: String,
      fileName: String,
      remarks: {
        message: String,
        satisfaction: String,
      },
    },
  ],
  assignmentFor: {
    type: String,
    required: true,
    default: "student",
  },
  title: {
    type: String,
    required: true,
  },
  fileName: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Assignment = mongoose.model("assignments", assignmentSchema);
