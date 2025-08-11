const express = require('express');
const route = express.Router();

const homeController = require('../app/controllers/homeController');

route.get('/', homeController.getHomePage);
route.get('/search', homeController.search);
module.exports = route;