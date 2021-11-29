const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cspSchema = Schema({
  from: {
    Id: String,
    Name: String,
  },
  program: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  enrollmentNo: {
    type: String,
    required: true,
  },
  deadLineDate: {
    type: String,
    required: true,
  },
  fileName: String,
  remarks: {
    message: String,
    satisfaction: String,
  },
  fileNameFromUser: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = CSP = mongoose.model("csp", cspSchema);
