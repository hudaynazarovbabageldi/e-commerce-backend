module.exports = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'To do list',
      version: '1.0',
      description: 'To do list documentation.',
      contact: {
        name: 'Babageldi Hudaynazarov',
        email: 'hudaynazarovbabageldi1@gmail.com',
      },
    },

    components: {
      securitySchemes: {
        user: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: "All user api's user this tokken",
        },
      },
      parameters: {
        offsetParam: {
          in: 'query',
          name: 'offset',
          description: 'The number of items to skip before starting to collect the result set',
          schema: {
            type: 'integer',
            minimum: 0,
          },
        },
        limitParam: {
          in: 'query',
          name: 'limit',
          description: 'The numbers of items to return.',
          schema: {
            type: 'integer',
            minimum: 1,
            default: 20,
          },
        },
        languageParam: {
          in: 'query',
          name: 'language',
          description: 'Used program language',
          schema: {
            type: 'string',
            enum: ['tm', 'ru', 'eng', 'tr'],
            default: 'tm',
          },
        },
        orderTypeParam: {
          in: 'query',
          name: 'orderType',
          description: 'Order by desc or asc',
          schema: {
            type: 'string',
            enum: ['asc', 'desc'],
            default: 'asc',
          },
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Authentication information is missing or invalid',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    example: 'fail',
                  },
                  message: {
                    type: 'string',
                    example: 'Unauthorized user',
                  },
                },
              },
            },
          },
        },
        PathIdRequiredError: {
          description: 'ID is required',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    example: 'fail',
                  },
                  message: {
                    type: 'string',
                    example: 'Id is required',
                  },
                },
              },
            },
          },
        },
        NotFoundError: {
          description: '[Model] is not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    example: 'fail',
                  },
                  message: {
                    type: 'string',
                    example: '[Model] is not found',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [`${__dirname}/routes/*.yaml`, `${__dirname}/models/*.yaml`],
};
