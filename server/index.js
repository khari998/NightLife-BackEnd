require('dotenv').config();
const express = require('express')
const db = require('../db/index.js')
const bodyParser = require('body-parser');

const {
    signUpUser,
    saveLocation,
    getRatings,
    getLocID,
} = require('../db/dbHelpers/helpers.js');

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname))
const PORT = process.env.PORT || 8080;


// create new entry in db for new user
app.post('/signup', (req, res) => {
    const { name, phone, email } = req.body;
    signUpUser(name, phone, email)
        .then( () => {
        res.sendStatus(201);
        })
        .catch(e => console.log(e));
})

//login

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
})

// update location ratings
app.put('/ratings', (req, res) => {
    const { location, rate } = req.body;
    getLocID(location).then((id) => {
        console.log(id);
        return getRatings(id);
    }).catch((err) => {
        
    });




    getRatings()
});
// create entry for guardians

// create entry for reviews















app.listen(PORT, () => { console.log(`listening on port ${PORT}`); });

