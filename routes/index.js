'use strict'

const authRoutes = require('./auth-routes')

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger')
module.exports = function (app) {
    app.use('/api', authRoutes)
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}
