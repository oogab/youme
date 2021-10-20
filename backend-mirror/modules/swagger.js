const swaggerUI = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  swaggerDefinition: {
    openapi: '3.0.0', 
    info: {
      title: 'MYME API',
      version: '1.0.0',
      description: 'MYME API with Express',
    },
    host: 'localhost:3300',
    basePath: '/',
  },
  apis: ['./routes/*.js', './swagger/*', './models/*.js']
}

const specs = swaggerJsdoc(options)

module.exports = {
  swaggerUI,
  specs
}