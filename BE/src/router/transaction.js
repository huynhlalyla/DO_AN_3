const express = require('express');
const route = express.Router();
const Transactions = require('../app/models/Transactions');
const transactionController = require('../app/controllers/transactionController');

// Thêm giao dịch
route.post('/add', transactionController.addTransaction);

// Lấy thông tin giao dịch theo id
route.post('/info/:transactionId', transactionController.getTransactionInfo);

// Lấy tất cả giao dịch của user
route.post('/info/all', transactionController.getUserTransactions);

// Tìm kiếm giao dịch
route.post('/search', transactionController.searchTransactions);

// Lấy thống kê giao dịch
route.post('/statistics', transactionController.getTransactionStatistics);

// Cập nhật giao dịch
route.post('/update/:transactionId', transactionController.updateTransaction);

// Xóa 1 giao dịch
route.post('/delete/:transactionId', transactionController.deleteTransaction);

// Xóa tất cả giao dịch của 1 category
route.post('/delete/all/:categoryId', transactionController.deleteAllTransactionsByCategory);


module.exports = route;