const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = Schema({
  eventProvider: {
    providerId: String,
    providerName: String,
  },
  eventName: {
    type: String,
    required: true,
  },

  eventType: {
    type: String,
    required: true,
  },
  eventDate: {
    type: String,
    required: true,
  },
  display: {
    type: Boolean,
    required: true,
    default: false,
  },
  fileName: String,
  body: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Events = mongoose.model("events", eventSchema);
