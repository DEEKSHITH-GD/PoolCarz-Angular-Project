const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve your Angular app
app.use(express.static(path.join(__dirname, 'POOLCARZ')));

const ridesFilePath = path.join(__dirname, 'public', 'rides.json');
let rides = [];

fs.readFile(ridesFilePath, 'utf8', (err, data) => {
  if (!err) {
    rides = JSON.parse(data);
  }
});

app.get('/', (req, res) => {
  res.send('Hello, this is your Express server!');
});

// Serve the rides.json file
app.get('/rides', (req, res) => {
  res.sendFile(ridesFilePath);
});

app.post('/rides', (req, res) => {
  const newRide = req.body;
  newRide.id = rides.length + 1;

  // Additional logic for setting pickUp, seatsLeft, and category

  rides.push(newRide);

  fs.writeFile(ridesFilePath, JSON.stringify(rides), (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update rides.json' });
    } else {
      res.json(newRide);
    }
  });
});

app.put('/rides/:id', (req, res) => {
  const rideId = parseInt(req.params.id);
  const updatedRide = req.body;

  const index = rides.findIndex(ride => ride.id === rideId);
  if (index !== -1) {
    // Update the ride in the array
    rides[index] = updatedRide;

    // Write the updated rides array back to rides.json
    fs.writeFile(ridesFilePath, JSON.stringify(rides), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update rides.json' });
      } else {
        res.json(updatedRide);
      }
    });
  } else {
    res.status(404).json({ error: 'Ride not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
