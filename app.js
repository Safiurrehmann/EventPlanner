const express = require('express');
const app = express();

const path = require('path');




// Catch-all route for undefined endpoints
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Not Found' });
});

module.exports = app;