'use strict'

const express = require('express');
const routes = express.Router();
const templateController = require('../controllers/template-controller');

routes.post('/templates/save/:userid', templateController.saveTemplate);
routes.get('/templates/getTemplates/:userid', templateController.getTemplates);
routes.get('/templates/getTemplate/:templateid', templateController.getTemplate);
routes.put('/templates/updateTemplate/:templateid', templateController.updateTemplate);
routes.delete('/templates/delete/:templateid', templateController.deleteTemplate);
// routes.post('', templateController.login);

module.exports = routes;