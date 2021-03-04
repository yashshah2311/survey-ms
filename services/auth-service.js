const { logger, httpStatusCode, generateSuccessResponse, generateErrorResponse } = require('../lib/utils');
const user = require('../models/user');
const bcrypt = require('bcrypt');

const addUser = async (body) => {
    try {
        if (await user.findOne({ email: body.email })) {
            throw 'Email ID: "' + body.email + '" already registered';
        }
        let response = await (new user(body)).save();
        return generateSuccessResponse(response, 'Registration Successfull', httpStatusCode.OK);
    } catch (error) {
        console.log(error);
        logger.error('Error while inserting agency', error);
        return generateErrorResponse(error, 'Error while inserting user', httpStatusCode.INTERNAL_SERVER_ERROR);
    }
}

const authenticate = async ({ email, password }) => {
    try {
        let response = await user.findOne({ email }, { email:1,password:1 });
        if (response) {
            if(bcrypt.compareSync(password, response.password)){
                return generateSuccessResponse({email:response['email']}, 'User Authentication Successfull', httpStatusCode.OK);
            }else {
                return generateErrorResponse({email:response['email']}, 'User Authentication Not Successfull', httpStatusCode.UNAUTHORIZED);
            }
        }
        else {
            return generateErrorResponse({email:email}, 'Email is not registered', httpStatusCode.UNAUTHORIZED);
        }
    } catch (error) {
        console.log(error);
        logger.error('Error while fetching user', error);
        return generateErrorResponse(error, 'Error while fetching user', httpStatusCode.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    addUser,
    authenticate
}