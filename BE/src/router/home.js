const express = require('express');
const route = express.Router();

const homeController = require('../app/controllers/homeController');

route.get('/', homeController.getHomePage);
module.exports = route;