require('dotenv').config();
const express = require('express')
const db = require('../db/index.js')

const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => { console.log(`listening on port ${PORT}`); });

