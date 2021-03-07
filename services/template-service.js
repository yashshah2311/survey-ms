const { logger, httpStatusCode, generateSuccessResponse, generateErrorResponse } = require('../lib/utils');
const template = require('../models/templates');
const user = require('../models/user');

const save = async (body, id) => {
    try {
        let objectId = await user.findOne({ userid: id }, { _id: 1 })
        body['userid'] = objectId['_id'];
        let response = await (new template(body)).save();
        return generateSuccessResponse(response, 'Template Saved Successfully', httpStatusCode.OK);
    } catch (error) {
        console.log(error);
        logger.error('Error while inserting agency', error);
        return generateErrorResponse(error, 'Error while inserting user', httpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

const getTemplateByUserId = async (id) => {
    try {
        let objectId = await user.findOne({ userid: id, is_delete: false }, { _id: 1 })
        console.log(objectId);
        let response
        if (id) response = await template.find({ userid: objectId['_id'], is_delete: false }, { _id: 1, templateid: 1, is_delete: 1, formHeading: 1});
        else response = await template.find();
        return generateSuccessResponse(response, 'Template List found', httpStatusCode.OK);
    } catch (error) {
        console.log(error);
        logger.error('Error while fetching template', error);
        return generateErrorResponse(error, 'Error while fetching template', httpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

const getTemplateByTemplateId = async (id) => {
    try {
        let response
        if (id) response = await template.find({ _id: id, is_delete: false });
        else response = await template.find();
        return generateSuccessResponse(response, 'Template List found', httpStatusCode.OK);
    } catch (error) {
        console.log(error);
        logger.error('Error while fetching template', error);
        return generateErrorResponse(error, 'Error while fetching template', httpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    save,
    getTemplateByUserId,
    getTemplateByTemplateId
}