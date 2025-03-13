const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // Store time as "HH:mm"
}, { timestamps: true });

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
