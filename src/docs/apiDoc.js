const swaggerJsDoc = require('swagger-jsdoc');
const { SERVER_URL } = require('../utils/const.env');
const { apiDocDescription } = require('../utils/const');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Inventory API',
      version: '1.0.0',
      description: apiDocDescription,
    },
    tags: [
      { name: 'Accounts', description: 'Operations related to accounts' },
      { name: 'Brands', description: 'Operations related to brands' },
    ],
    servers: [
      {
        url: SERVER_URL,
      },
    ],
    components: {},
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
