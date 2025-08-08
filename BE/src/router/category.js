const express = require('express');
const route = express.Router();
const categoryController = require('../app/controllers/categoryController');


route.get('/', categoryController.getAllCategories);
route.get('/type/:type', categoryController.getCategoriesByType);
route.post('/create', categoryController.createCategory);
route.delete('/delete/:id', categoryController.deleteCategory);
route.put('/edit/:id', categoryController.editCategory);

module.exports = route;