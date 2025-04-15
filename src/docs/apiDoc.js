const swaggerJsDoc = require('swagger-jsdoc');
const { SERVER_URL } = require('../utils/const.env');
const { apiDocDescription } = require('../utils/const');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WareMaster API',
      version: '1.0.0',
      description: apiDocDescription,
    },
    tags: [
      {
        name: 'Accounts',
        description: 'Operations related to <strong>Accounts</strong>',
      },
      {
        name: 'Users',
        description: 'Operations related to <strong>Users</strong>',
      },
      {
        name: 'Brands',
        description: 'Operations related to <strong>Brands</strong>',
      },
      {
        name: 'Products',
        description: 'Operations related to <strong>Products</strong>',
      },
      {
        name: 'Warehouses',
        description: 'Operations related to <strong>Warehouse</strong>',
      },
      {
        name: 'Inventory',
        description: 'Operations related to <strong>Inventory</strong>',
      },
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
              required: true,
            },
            size: {
              type: 'string',
              enum: ['individual', 'family', 'organization', 'enterprise'],
              example: 'organization',
              required: true,
            },
            plan: {
              type: 'string',
              enum: ['free', 'pro', 'enterprise'],
              example: 'pro',
              required: true,
            },
          },
        },
        AccountResponse: {
          allOf: [
            { $ref: '#/components/schemas/AccountRequest' },
            {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  example: '660fc4fcf62aeac252e7a2ff',
                },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                },
                updatedAt: {
                  type: 'string',
                  format: 'date-time',
                },
              },
            },
          ],
        },
        UserRequest: {
          type: 'object',
          properties: {
            fName: {
              type: 'string',
              example: 'John',
              required: true,
            },
            lName: {
              type: 'string',
              example: 'Dow',
              required: true,
            },
            role: {
              type: 'string',
              enum: ['owner', 'admin', 'member'],
              example: 'member',
              required: true,
            },
            status: {
              type: 'string',
              enum: ['active', 'suspended', 'pending', 'deleted'],
              example: 'active',
              required: true,
            },
            accountId: {
              type: 'string',
              example: '660fc4fcf62aeac252e7a2ff',
              required: true,
            },
          },
        },
        UserResponse: {
          allOf: [
            {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  example: '660fc4fcf62aeac252e7a2ff',
                },
              },
            },
            { $ref: '#/components/schemas/UserRequest' },
            {
              type: 'object',
              properties: {
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                },
                updatedAt: {
                  type: 'string',
                  format: 'date-time',
                },
              },
            },
          ],
        },
        BrandRequest: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'LEGO',
              required: true,
            },
            description: {
              type: 'string',
              example:
                'Global entertainment brand focused on brick toys to build stuff',
            },
          },
        },
        BrandResponse: {
          allOf: [
            { $ref: '#/components/schemas/BrandRequest' },
            {
              type: 'object',
              properties: {
                _id: {
                  type: 'string',
                  example: '6615460dc6cfb49aa14d287f',
                },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                },
                updatedAt: {
                  type: 'string',
                  format: 'date-time',
                },
              },
            },
          ],
        },
        ErrorExample: {
          type: 'object',
          properties: {
            value: {
              type: 'string',
              example: 'Must be a valid value',
            },
          },
        },
        UnprocessableContent: {
          type: 'object',
          properties: {
            errors: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/ErrorExample',
              },
            },
          },
        },
        ObjectNotFound: {
          type: 'object',
          properties: {
            msg: {
              type: 'string',
              example: 'User not found',
            },
          },
        },
        ServerError: {
          type: 'object',
          properties: {
            status: {
              type: 'integer',
              example: 500,
              description: 'HTTP status code',
            },
            message: {
              type: 'string',
              example: 'Internal server error',
              description: 'Description of the error',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

const swaggerUiOptions = {
  customJs: '/plugins/top-bar-plugin.js',
  swaggerOptions: {
    plugins: [() => window.TopBarPlugin],
  },
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = { swaggerSpec, swaggerUiOptions };
