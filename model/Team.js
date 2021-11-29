const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = Schema({
  teamName: {
    type: String,
    required: true,
  },
  semesterType: {
    type: String,
    required: true,
  },
  createdBy: {
    id: String,
    name: String,
  },
  members: [
    {
      name: String,
      enrollmentNo: String,
      personalEmail: String,
      universtyEmail: String,
      phone: String,
      program: String,
      batch: String,
      designation: String,
      memberAddedBy: {
        name: String,
        enrollmentNo: String,
      },
    },
  ],
  assignment: [
    {
      fileName: String,
      title: String,
      batch: String,
      program: String,
      deadline: String,
      enrollmentNo: String,
      assignmentCreatedBy: {
        name: String,
        enrollmentNo: String,
      },
      assignmentSubmitBy: [
        {
          name: String,
          enrollmentNo: String,
          fileName: String,
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Team = mongoose.model("teams", teamSchema);
