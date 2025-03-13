const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server"); // Adjust path based on your server file
const Event = require("../Model/Event");

let mongoServer;

beforeAll(async () => {
  // Start in-memory MongoDB instance
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  // Connect Mongoose to in-memory database
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
});

beforeEach(async () => {
  // Seed the database with a test event
  await Event.create({ name: "Test Event", description: "Test Description", date: "2025-06-10", time: "12:00 PM" });
});

afterEach(async () => {
  // Clear the database after each test
  await Event.deleteMany();
});

afterAll(async () => {
  // Close database connection
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Event Planner API", () => {
  
  // Test GET /events
  it("should return a list of events", async () => {
    const res = await request(app).get("/events");

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty("name", "Test Event");
  });

  // Test POST /events
  it("should create a new event", async () => {
    const newEvent = {
      name: "Hackathon 2025",
      description: "Coding competition",
      date: "2025-08-15",
      time: "10:00 AM",
    };

    const res = await request(app).post("/events").send(newEvent);

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe(newEvent.name);
    expect(res.body.description).toBe(newEvent.description);
  });

  // Test invalid event creation (missing name)
  it("should return 500 for missing event name", async () => {
    const invalidEvent = {
      description: "Missing name field",
      date: "2025-08-20",
      time: "03:00 PM",
    };

    const res = await request(app).post("/events").send(invalidEvent);

    expect(res.status).toBe(500);
    expect(res.body).toHaveProperty("error");
  });

});
