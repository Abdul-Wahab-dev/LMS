const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PECDocsSchema = Schema({
  from: {
    providerId: String,
    providerName: String,
  },
  to: String,
  program: {
    type: String,
  },
  batch: {
    type: String,
  },
  type: String,
  documentFor: [
    {
      name: String,
      enrollmentNo: String,
    },
  ],
  fileName: String,
  title: {
    type: String,
    required: true,
  },

  docSubmittedBy: [
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = PECDocs = mongoose.model("pecdocs", PECDocsSchema);
