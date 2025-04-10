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
    components: {
      schemas: {
        AccountRequest: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Company Inc',
              required: true
            },
            size: {
              type: 'string',
              enum: ['individual', 'family', 'organization', 'enterprise'],
              example: 'organization',
              required: true
            },
            plan: {
              type: 'string',
              enum: ['free', 'pro', 'enterprise'],
              example: 'pro',
              required: true
            }
          }
        },
        AccountResponse: {
          allOf: [
            { $ref: '#/components/schemas/AccountRequest' },
            {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  example: '660fc4fcf62aeac252e7a2ff'
                },
                createdAt: {
                  type: 'string',
                  format: 'date-time'
                },
                updatedAt: {
                  type: 'string',
                  format: 'date-time'
                }
              }
            }
          ]
        },
        BrandRequest: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'LEGO',
              required: true
            },
            description: {
              type: 'string',
              example: 'Global entertainment brand focused on brick toys to build stuff'
            }
          }
        },
        BrandResponse: {
          allOf: [
            { $ref: '#/components/schemas/BrandRequest' },
            {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  example: '6615460dc6cfb49aa14d287f'
                },
                createdAt: {
                  type: 'string',
                  format: 'date-time'
                },
                updatedAt: {
                  type: 'string',
                  format: 'date-time'
                }
              }
            }
          ]
        }
      }
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;
