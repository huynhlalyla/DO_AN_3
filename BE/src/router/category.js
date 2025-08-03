const express = require('express');
const route = express.Router();
const categoryController = require('../app/controllers/categoryController');


route.get('/', categoryController.getAllCategories);
route.get('/type/:type', categoryController.getCategoriesByType);
route.post('/add', categoryController.addCategory);
route.get('/delete/:id', categoryController.deleteCategory);
route.get('/edit/:id', categoryController.editCategory);

module.exports = route;