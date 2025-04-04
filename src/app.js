const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());

/**
 * Landing Page Static Routes
 */
app.use(express.static('src/public'));

module.exports = app;
