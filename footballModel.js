// MongoDB connection setup
const mongoose = require('mongoose');


// Define schema for football data
const footballSchema = new mongoose.Schema({
    Team: { type: String, required: true },
    GamesPlayed: { type: Number, required: true },
    Win: { type: Number, required: true },
    Draw: { type: Number, required: true },
    Loss: { type: Number, required: true },
    GoalsFor: { type: Number, required: true },
    GoalsAgainst: { type: Number, required: true },
    Points: { type: Number, required: true }
  });
  
// Create model from schema
const Football = mongoose.model('Football', footballSchema);

module.exports = Football;
