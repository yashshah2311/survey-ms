const path = require('path')

module.exports = {
    logger: require('./logger'),
    msgCons: require('../constants/message-constants'),
    httpStatusCode: require('http-status-codes'),
    dbCons: require('../constants/db-constants'),
    generateSuccessResponse: function (data, msg, httpCode) {
        const response = {}
        response.data = data || []
        response.message = msg || ""
        response.error = []
        response.error_status = false
        response.status_code = httpCode
        return response
    },
    generateErrorResponse: function (data, msg, httpCode) {
        const response = {}
        response.data = []
        response.message = msg || ""
        response.error = data || []
        response.error_status = true
        response.status_code = httpCode
        return response
    },
    convertIntoArray: function (data) {
        if (Array.isArray(data)) {
            return data
        }
        return [data]
    },
    generateSendSuccessResponse: function (data, msg) {
        const response = {}
        response.data = data
        response.message = msg
        response.error_status = false
        return response
    },
    generateSendErrorResponse: function (data, msg) {
        const response = {}
        response.data = data
        response.message = msg
        response.error_status = true
        return response
    },
    getFileNameWithoutExtension: function (filepath) {
        return path.basename(filepath, path.extname(filepath))
    },
    getFileExtension: function (filepath) {
        return path.extname(filepath)
    }
}