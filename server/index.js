require('dotenv').config();
const express = require('express')
const db = require('../db/index.js')
const bodyParser = require('body-parser');

const {
    signUpUser,
} = require('../db/dbHelpers/helpers.js');

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname))
const PORT = process.env.PORT || 8080;

app.post('/signup', (req, res) => {

    const { name, phone, email } = req.body;
    signUpUser(name, phone, email)
        .then( () => {
        res.sendStatus(301);
        })
        .catch(e => console.log(e));

})
















app.listen(PORT, () => { console.log(`listening on port ${PORT}`); });

