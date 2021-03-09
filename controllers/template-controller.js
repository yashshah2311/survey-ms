'use strict'

const { httpStatusCode, generateSendErrorResponse } = require('../lib/utils')
const templateService = require('../services/template-service')

const saveTemplate = async (req, res) => {
    try {
        const id = req.params.userid;
        let response = await templateService.save(req.body.data, id)
        return res.status(httpStatusCode.OK).send(response)
    } catch (error) {
        console.log(error)
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(generateSendErrorResponse(error, 'Error while inserting template data'))
    }
}

const getTemplates = async (req, res) => {
    try {
        let response = await templateService.getTemplateByUserId(req.params.userid);
        const statusCode = response.status_code || httpStatusCode.OK;
        return res.status(statusCode).send(response);
    } catch (error) {
        console.log(error);
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(generateSendErrorResponse(error, 'Error while fething Template list'))
    }
}

const getTemplate = async (req, res) => {
    try {
        let response = await templateService.getTemplateByTemplateId(req.params.templateid);
        const statusCode = response.status_code || httpStatusCode.OK;
        return res.status(statusCode).send(response);
    } catch (error) {
        console.log(error);
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(generateSendErrorResponse(error, 'Error while fething Template list'))
    }
}

const updateTemplate = async (req, res) => {
    try {
        let response = await templateService.updateTemplate(req.params.templateid,req.body);
        const statusCode = response.status_code || httpStatusCode.OK;
        return res.status(statusCode).send(response);
    } catch (error) {
        console.log(error);
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(generateSendErrorResponse(error, 'Error while fething unActive User list'))
    }
}

const deleteTemplate = async (req, res) => {
    try {
        let response = await templateService.deleteTemplate(req.params.templateid, req.body);
        const statusCode = response.status_code || httpStatusCode.OK;
        return res.status(statusCode).send(response);
    } catch (error) {
        console.log(error);
        res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(generateSendErrorResponse(error, 'Error while fething match list'))
    }
}

module.exports = {
    saveTemplate,
    getTemplates,
    getTemplate,
    updateTemplate,
    deleteTemplate
}
