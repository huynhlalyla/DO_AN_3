const express = require('express');
const route = express.Router();
const transactionController = require('../app/controllers/transactionController');

// Thêm giao dịch
route.get('/', transactionController.getAllTransactions);
route.post('/add', transactionController.addTransaction);
route.delete('/delete/:id', transactionController.deleteTransaction);

module.exports = route;