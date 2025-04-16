const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const passportStrategy = require('./helpers/pasportStrategy');
const authRouter = require('./routes/authRouter');
const accountRouter = require('./routes/accountRouter');
const brandRouter = require('./routes/brandRouter');
const { swaggerSpec, swaggerUiOptions } = require('./docs/apiDoc');
const { SECRET } = require('./utils/const.env');

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: SECRET, resave: true, saveUninitialized: true }));
app.use(passportStrategy.initialize());
app.use(passportStrategy.session());

/**
 * Landing Page Static Routes
 */
app.use(express.static('src/public'));

/**
 * Auth Routes
 */
app.use('/auth', authRouter);

/**
 * API Routes
 */
app.use('/api/v1/account', accountRouter);
app.use('/api/v1/brand', brandRouter);

/**
 * Swagger Documentation
 */
app.use(
  '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec, swaggerUiOptions)
);

module.exports = app;
