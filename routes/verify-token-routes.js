'use strict'

const express = require('express');
const routes = express.Router();
const jwt = require('../authentication/jwt')

routes.get('/me', jwt.verifyToken, function (req, res) {
    res.status(200).send({ key: true });

});


module.exports = routes;
