const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const officalDocsSchema = Schema({
  from: {
    providerId: String,
    providerName: String,
  },
  to: {
    id: String,
    name: String,
  },
  documentFor: {
    type: String,
    required: true,
  },
  fileName: String,
  title: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = OfficalDocs = mongoose.model("OfficalDocs", officalDocsSchema);
