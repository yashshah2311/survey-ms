const request = require('../swagger/request')
const response = require('../swagger/response')
module.exports = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'Codify APIs Document',
        description: 'Codify Coding Assignment',
        termsOfService: '',
        contact: {
            name: 'Harshil Kothari',
            email: 'harshilkothari1995@gmail.com',
        }
    },
    servers: [
        {
            url: 'http://localhost:3001/api',
            description: 'Local server'
        },
        {
            url: 'http://34.72.47.80/api',
            description: 'DEV Environment'
        }
    ],
    paths: {
        "/register": {
            "post": {
                tags: ['Client', 'Agency'],
                description: "Register Client and Agency",
                requestBody: {
                    "content": {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: request.post_register.schema
                            },
                            example: request.post_register.examples
                        }
                    }
                },
                parameters: [],
                responses: {
                    "200": {
                        description: "success of register client and agency",
                        "content": {
                            "application/json": {
                                examples: response.post_register
                            }
                        }
                    }
                }
            }
        },
        "/client/{clientId}": {
            "put": {
                tags: ['Client'],
                description: "Update Client",
                requestBody: {
                    "content": {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: request.put_client.schema
                            },
                            example: request.put_client.examples
                        }
                    }
                },
                parameters: [{
                    'in': 'path',
                    'name': 'clientId',
                    'schema': {
                        'type': 'integer',
                        'required': 'true'
                    }
                }],
                responses: {
                    "200": {
                        description: "success of register client and agency",
                        "content": {
                            "application/json": {
                                examples: response.put_client
                            }
                        }
                    }
                }

            }
        },
        "/clients/{maxIncome}": {
            "get": {
                tags: ['Client',],
                description: "Fetch Client with max income with respect to agency name",
                parameters: [{
                    'in': 'path',
                    'name': 'maxIncome',
                    'schema': {
                        'type': 'integer',
                        'required': 'true'
                    }
                }],
                responses: {
                    "200": {
                        description: "success of register client and agency",
                        "content": {
                            "application/json": {
                                examples: response.put_client
                            }
                        }
                    }
                }

            }
        }

    }
}