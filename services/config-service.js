'use strict'

const { logger, httpStatusCode, generateSuccessResponse } = require('../lib/utils');
const config = require('../models/agency');

const addconfig = async (body) => {
    try {
        let response;
        console.log(body.data)
        response = await config.insertMany(body.data)
        logger.debug('Inserted config from service = %j', response);
        return generateSuccessResponse(response, 'config added succesfully');
    } catch (error) {
        console.log(error);
        logger.eroor('Error while inserting User details from service = %j', error, error);
        return generateSuccessResponse(error, 'Error while inserting User', httpStatusCode.INTERNAL_SERVER_ERROR);
    }
}
const deleteconfig = async (name = null, id = null) => {
    try {
        let response;
        if (name != null) await config.update({ name: name }, { $set: { is_delete: true } });
        else if (id != null) await config.update({ id: id }, { $set: { is_delete: true } });
        logger.debug('Deleted config from service = %j', response);
        return generateSuccessResponse({}, 'User deleted succesfully');
    } catch (error) {
        console.log(error);
        logger.eroor('Error while inserting User details from service = %j', error, error);
        return generateSuccessResponse(error, 'Error while inserting User', httpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

const updateconfig = async (name, id, body) => {
    try {
        let response;
        if (id) await config.update({ id: id }, { $set: body });
        else if (name) await config.update({ name: name }, { $set: body });
        logger.debug('Operation acted on User from service = %j', response);
        return generateSuccessResponse({}, 'config updated succesfully');
    } catch (error) {
        console.log(error);
        logger.eroor('Error while updating User details from service = %j', error, error);
        return generateSuccessResponse(error, 'Error while updating User', httpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

const fetchconfig = async (name = null, id = null) => {
    try {
        let result
        if (name != null) result = await config.aggregate([
            { $match: { name: name } },
            { $lookup: { from: 'user', localField: 'userid', foreignField: 'id', as: 'user' } },
            {
                "$project": {
                    "userid": 1,
                    "id": 1,
                    "name": 1,
                    "config": 1,
                    "user.user_name": 1,
                    "user.name": 1
                }
            }
        ]).exec()
        else if (id != null) result = await config.aggregate([
            { $match: { userid: parseInt(id) } },
            { $lookup: { from: 'user', localField: 'userid', foreignField: 'id', as: 'user' } },
            {
                "$project": {
                    "userid": 1,
                    "id": 1,
                    "name": 1,
                    "config": 1,
                    "user.user_name": 1,
                    "user.name": 1
                }
            }
        ]).exec()
        else result = await config.aggregate([
            { $match: { is_delete: 0 } },
            { $lookup: { from: 'user', localField: 'userid', foreignField: 'id', as: 'user' } },
            {
                "$project": {
                    "userid": 1,
                    "id": 1,
                    "name": 1,
                    "config": 1,
                    "user.user_name": 1,
                    "user.name": 1
                }
            }
        ]).exec()
        console.log(result)
        return generateSuccessResponse(result, 'configs fetched succesfully');
    } catch (error) {
        console.log(error);
        logger.error('Error while getting user', error, error);
        return generateSuccessResponse(error, 'Error while getting user', httpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    addconfig,
    deleteconfig,
    updateconfig,
    fetchconfig
}
