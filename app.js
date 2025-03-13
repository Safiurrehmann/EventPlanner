const express = require("express");
const mongoose = require("mongoose");
const eventRoutes = require("./Routes/eventRoutes");
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());




app.use("/events", eventRoutes);

app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Not Found' });
  });


  module.exports = app;
