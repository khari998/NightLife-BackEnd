require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const db = require('../db/index.js');

const corsOptions = {
  origin: 'ngrok-host-url',
  optionsSuccessStatus: 200 
};


const {
  signUpUser,
  saveLocation,
  getRatings,
  getLocID,
  bulkLocations,
} = require('../db/dbHelpers/helpers.js');

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.static(__dirname));


const PORT = process.env.PORT || 8080;


// create new entry in db for new user
app.post('/signup', (req, res) => {
  const { name, phone, email } = req.body;
  signUpUser(name, phone, email)
    .then(() => {
      res.sendStatus(201);
    })
    .catch(e => console.log(e));
});


// create new entry for comments at a location

// save location
app.post('/location', (req, res) => {
  const { loc } = req.body;
  saveLocation(loc)
    .then(() => {
      res.sendStatus(201);
    }).catch((err) => {
      console.log(err);
    });
});

// update location ratings
app.put('/ratings', (req, res) => {
  const { location, rate } = req.body;
  getLocID(location).then((id) => {
    console.log(id);
    return getRatings(id);
  }).catch((err) => {
    console.error(err);
  });


  getRatings();
});


// get request for /locations that sends back  locations
// for recomendation
app.get('/locations', (req, res) => {
  // query database and send back all locations
  db.Location.findAll({})
    .then(data => {
      res.send(data);
    })
})

app.post('/locations', (req, res) => {
  // saveLocation(req.body)
  bulkLocations(req.body)
    .then(() => {
      res.status(200)
        .send({name: 'test' });
    })
  // .then(() => {
  //     console.log('bulk creation successful');
  //     return db.Location.findAll({})
  // })
  // .then(data => {
  //     res.send(data);
  // })
})


// create entry for guardians

// create entry for reviews




app.listen(PORT, () => { console.log(`listening on port ${PORT}`); });

