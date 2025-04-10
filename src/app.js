const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./docs/apiDoc');
const accountRouter = require('./routes/accountRouter');
const brandRouter = require('./routes/brandRouter');

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());

/**
 * Landing Page Static Routes
 */
app.use(express.static('src/public'));

/**
 * Swagger Documentation
 */
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use('/api/v1/account', accountRouter);
app.use('/api/v1/brand', brandRouter);

module.exports = app;
