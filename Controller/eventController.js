const Event = require("../Model/Event");

// Create a new event
exports.createEvent = async (req, res) => {
  try {
    const { name, description, date, time } = req.body;
    const newEvent = new Event({ name, description, date, time });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an event
exports.updateEvent = async (req, res) => {
  try {
    const { name, description, date, time } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { name, description, date, time },
      { new: true, runValidators: true }
    );
    if (!updatedEvent) return res.status(404).json({ message: "Event not found" });
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: "Event not found" });
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
