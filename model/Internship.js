const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const internshipSchema = Schema({
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
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
  },
  company: {
    type: String,
  },
  enrollmentNo: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  fileName: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Internship = mongoose.model("internship", internshipSchema);
