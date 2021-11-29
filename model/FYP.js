const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fypSchema = Schema({
  eventProvider: {
    providerId: String,
    providerName: String,
  },
  eventName: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  eventFor: {
    type: String,
    required: true,
    default: "student",
  },
  projects: [
    {
      presentationDate: {
        type: String,
      },
      presentationTime: {
        type: String,
      },
      idea: {
        type: String,
      },
      eventMembers: [
        {
          name: String,
          enrollmentNo: String,
        },
      ],
      supervisor: {
        name: String,
        enrollmentNo: String,
      },
      remarks: [
        {
          comment: String,
          Satisification: String,
          name: String,
          enrollmentNo: String,
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = FYP = mongoose.model("fyp", fypSchema);
