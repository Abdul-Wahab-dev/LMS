const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = Schema({
  eventProvider: {
    providerId: String,
    providerName: String,
  },
  eventName: {
    type: String,
  },

  eventType: {
    type: String,
  },
  eventDate: {
    type: String,
  },
  display: {
    type: Boolean,
    required: true,
    default: false,
  },
  fileName: String,
  body: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Events = mongoose.model("events", eventSchema);
