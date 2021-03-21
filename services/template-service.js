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
        // console.log(objectId);
        let response
        if (id) response = await template.find({ userid: objectId['_id'], is_delete: false }, { _id: 1, templateid: 1, is_delete: 1, formHeading: 1, formColor: 1});
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
        if (id) response = await template.findOne({ templateid: id, is_delete: false });
        else response = await template.find();
        return generateSuccessResponse(response, 'Template List found', httpStatusCode.OK);
    } catch (error) {
        console.log(error);
        logger.error('Error while fetching template', error);
        return generateErrorResponse(error, 'Error while fetching template', httpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

const updateTemplate = async (id, body) => {
    try {
        let result = await template.update({ templateid: id, is_delete: false }, { $set: body });
        if (result['nModified'] > 0) {
            return generateSuccessResponse(body, 'Template updated', httpStatusCode.OK);
        }
        else {
            return generateSuccessResponse(body, 'Template not updated', httpStatusCode.OK);
        }
    } catch (error) {
        console.log(error);
        logger.error('Error while updating Template', error);
        return generateErrorResponse(error, 'Error while updating Template', httpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

const deleteTemplate = async (id, body) => {
    try {
        let result = await template.update({ templateid: id }, { $set: { is_delete: true } });
        return generateSuccessResponse(result, 'Template deleted', httpStatusCode.OK);
    } catch (error) {
        logger.error('Error while deleting Template', error);
        return generateErrorResponse(error, 'Error while deleting Template', httpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    save,
    getTemplateByUserId,
    getTemplateByTemplateId,
    updateTemplate,
    deleteTemplate
}