// server.js
const express = require('express');

const main = require('./atlas_uri');

const Football = require('./footballModel');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
main();

// ... REST API endpoints (continued in next sections)
app.post('/api/football/add', async (req, res) => {
    const Football = new Football(req.body);
  
    try {
      await Football.save();
      res.json({ message: 'Data added successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  app.post('/api/football/update', async (req, res) => {
    try {
      const updatedRecord = await Football.findOneAndUpdate(
        { team: req.body.team, year: req.body.year },
        { $set: req.body },
        { new: true }
      );
      res.json(updatedRecord);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/football/delete', async (req, res) => {
    try {
      await Football.deleteOne({ team: req.body.team, year: req.body.year });
      res.json({ message: 'Record deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
// Get Total Games Played, Draws, and Won for a Given Year:
  app.get('/api/football/totals/:year', async (req, res) => {
    const year = req.params.year;
  
    try {
      const totals = await Football.aggregate([
        { $match: { year: parseInt(year) } },
        {
          $group: {
            _id: null,
            totalGamesPlayed: { $sum: '$gamesPlayed' },
            totalDraws: { $sum: '$draws' },
            totalWins: { $sum: '$wins' }
          }
        }
      ]);
  
      res.json(totals[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

  //Get First 10 Teams with Wins Greater Than a Value
  app.get('/api/football/top-wins/:value', async (req, res) => {
    const value = parseInt(req.params.value);
  
    try {
      const teams = await Football.find({ wins: { $gt: value } })
        .limit(10)
        .sort({ wins: -1 });
  
      res.json(teams);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  //Get Teams with Average Goal For Greater Than a Value for a Given Year
  app.get('/api/football/avg-goals/:year/:value', async (req, res) => {
    const year = parseInt(req.params.year);
    const value = parseInt(req.params.value);
  
    try {
      const teams = await Football.aggregate([
        { $match: { year: year } },
        {
          $group: {
            _id: '$team',
            avgGoalsFor: { $avg: '$goalsFor' }
          }
        },
        { $match: { avgGoalsFor: { $gt: value } } }
      ]);
  
      res.json(teams);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
