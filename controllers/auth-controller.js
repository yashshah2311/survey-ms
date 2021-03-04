'use strict'

const { httpStatusCode, generateSendErrorResponse } = require('../lib/utils')
const authService = require('../services/auth-service')

const register = async (req, res) => {
    try {
        let userResponse = await authService.addUser(req.body.data)
        return res.status(httpStatusCode.OK).send(userResponse)
    } catch (error) {
        console.log(error)
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(generateSendErrorResponse(error, 'Error while inserting user data'))
    }
}

const login = async (req, res) => {
    try {
        let userResponse = await authService.authenticate(req.body.data)
        return res.status(userResponse.status_code).send(userResponse)
    } catch (error) {
        console.log(error)
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(generateSendErrorResponse(error, 'Error while fetching user data'))
    }
}
module.exports = {
    register,
    login
}
