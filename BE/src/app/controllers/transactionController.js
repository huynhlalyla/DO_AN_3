const Transactions = require('../models/Transactions');
const Users = require('../models/Users');
const Categories = require('../models/Categories');
const Budgets = require('../models/Budgets');

// POST /transactions/add
async function addTransaction(req, res) {
    try {
        const { categoryId, amount, userId, date, note } = req.body;

        // Validation đầu vào
        if (!categoryId || !amount || !userId) {
            return res.status(400).json({ 
                status: 'fail', 
                message: 'Thiếu thông tin bắt buộc: categoryId, amount, userId' 
            });
        }

        if (amount <= 0) {
            return res.status(400).json({ 
                status: 'fail', 
                message: 'Số tiền phải lớn hơn 0' 
            });
        }

        // Kiểm tra user có tồn tại không
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ 
                status: 'fail', 
                message: 'Không tìm thấy người dùng' 
            });
        }

        // Kiểm tra category có tồn tại không
        const category = await Categories.findById(categoryId);
        if (!category) {
            return res.status(404).json({ 
                status: 'fail', 
                message: 'Không tìm thấy danh mục' 
            });
        }

        // Tạo transaction mới
        const transaction = new Transactions({
            user_id: userId,
            category_id: categoryId,
            amount,
            date: date || new Date(),
            note: note || '',
            type: category.type
        });

        const savedTransaction = await transaction.save();
        
        // Cập nhật liên kết
        await Categories.findByIdAndUpdate(categoryId, {
            $push: { transactions: savedTransaction._id }
        });

        // Populate để trả về thông tin đầy đủ
        const populatedTransaction = await Transactions.findById(savedTransaction._id)
            .populate('category_id');

        return res.status(201).json({ 
            status: 'success', 
            message: 'Thêm giao dịch thành công',
            data: {
                transaction: {
                    _id: populatedTransaction._id,
                    amount: populatedTransaction.amount,
                    type: populatedTransaction.type,
                    date: populatedTransaction.date,
                    note: populatedTransaction.note,
                    user_id: populatedTransaction.user_id,
                    category_id: populatedTransaction.category_id._id
                },
                category: {
                    _id: populatedTransaction.category_id._id,
                    name: populatedTransaction.category_id.name,
                    type: populatedTransaction.category_id.type,
                    budget_id: populatedTransaction.category_id.budget_id
                }
            }
        });

    } catch (err) {
        console.error('Lỗi thêm giao dịch:', err);
        return res.status(500).json({ 
            status: 'fail', 
            message: 'Đã xảy ra lỗi khi thêm giao dịch',
            error: err.message 
        });
    }
}

// POST /transactions/info/:transactionId
async function getTransactionInfo(req, res) {
    try {
        const transactionId = req.params.transactionId;
        const { userId } = req.body;

        // Tìm transaction của user
        const transaction = await Transactions.findOne({ 
            _id: transactionId, 
            user_id: userId 
        }).populate('category_id');

        if (!transaction) {
            return res.status(404).json({ 
                status: 'fail', 
                message: 'Không tìm thấy giao dịch' 
            });
        }

        const category = transaction.category_id;
        
        // Lấy budget liên quan
        const budget = await Budgets.findById(category.budget_id);

        return res.status(200).json({
            status: 'success',
            message: 'Lấy dữ liệu giao dịch thành công',
            data: {
                transaction: {
                    _id: transaction._id,
                    amount: transaction.amount,
                    type: transaction.type,
                    date: transaction.date,
                    note: transaction.note,
                    user_id: transaction.user_id,
                    category_id: transaction.category_id._id
                },
                category: {
                    _id: category._id,
                    name: category.name,
                    type: category.type,
                    budget_id: category.budget_id
                },
                budget: budget ? {
                    _id: budget._id,
                    name: budget.name,
                    limit_amount: budget.limit_amount,
                    category_id: budget.category_id
                } : null
            }
        });

    } catch (error) {
        return res.status(500).json({ 
            status: 'fail', 
            message: 'Có lỗi xảy ra', 
            error: error.message 
        });
    }
}

// POST /transactions/info/all
async function getUserTransactions(req, res) {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                status: 'fail',
                message: 'Thiếu userId trong body request'
            });
        }

        // Tìm tất cả transactions của user
        const transactions = await Transactions.find({ user_id: userId })
            .populate('category_id');

        // Lấy tất cả budget IDs từ categories
        const budgetIds = [...new Set(transactions
            .map(t => t.category_id?.budget_id)
            .filter(Boolean))];
        
        const budgets = await Budgets.find({ _id: { $in: budgetIds } });

        // Tạo map budgets để dễ lookup
        const budgetMap = {};
        budgets.forEach(budget => {
            budgetMap[budget._id.toString()] = budget;
        });

        // Format data theo yêu cầu
        const formattedData = transactions.map(transaction => {
            const category = transaction.category_id;
            const budget = category?.budget_id ? 
                budgetMap[category.budget_id.toString()] : null;

            return {
                transaction: {
                    _id: transaction._id,
                    amount: transaction.amount,
                    type: transaction.type,
                    date: transaction.date,
                    note: transaction.note,
                    user_id: transaction.user_id,
                    category_id: transaction.category_id?._id
                },
                category: category ? {
                    _id: category._id,
                    name: category.name,
                    type: category.type,
                    budget_id: category.budget_id
                } : null,
                budget: budget ? {
                    _id: budget._id,
                    name: budget.name,
                    limit_amount: budget.limit_amount,
                    category_id: budget.category_id
                } : null
            };
        });

        return res.status(200).json({
            status: 'success',
            message: 'Lấy tất cả giao dịch thành công',
            data: formattedData
        });

    } catch (error) {
        return res.status(500).json({
            status: 'fail',
            message: 'Lỗi khi lấy giao dịch',
            error: error.message
        });
    }
}

// POST /transactions/delete/:transactionId
async function deleteTransaction(req, res) {
    try {
        const transactionId = req.params.transactionId;
        const { userId } = req.body;

        // Validation đầu vào
        if (!transactionId) {
            return res.status(400).json({ 
                status: 'fail', 
                message: 'Thiếu transactionId' 
            });
        }

        if (!userId) {
            return res.status(400).json({ 
                status: 'fail', 
                message: 'Thiếu userId' 
            });
        }

        // Tìm transaction
        const transaction = await Transactions.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({ 
                status: 'fail', 
                message: 'Không tìm thấy giao dịch' 
            });
        }

        // Kiểm tra quyền sở hữu
        if (transaction.user_id.toString() !== userId) {
            return res.status(403).json({ 
                status: 'fail', 
                message: 'Bạn không có quyền xóa giao dịch này' 
            });
        }

        // Xóa liên kết từ category
        await Categories.findByIdAndUpdate(transaction.category_id, {
            $pull: { transactions: transaction._id }
        });

        // Xóa transaction
        await Transactions.findByIdAndDelete(transactionId);

        return res.status(200).json({ 
            status: 'success', 
            message: 'Đã xóa giao dịch thành công',
            data: {
                deletedTransactionId: transactionId
            }
        });

    } catch (error) {
        console.error('Lỗi khi xóa giao dịch:', error);
        return res.status(500).json({ 
            status: 'fail', 
            message: 'Lỗi khi xóa giao dịch', 
            error: error.message 
        });
    }
}

// POST /transactions/delete/all/:categoryId
async function deleteAllTransactionsByCategory(req, res) {
    try {
        const categoryId = req.params.categoryId;
        const { userId, categoryId: bodyCategoryId } = req.body;

        // Sử dụng categoryId từ params hoặc body
        const targetCategoryId = categoryId || bodyCategoryId;
        
        if (!targetCategoryId) {
            return res.status(400).json({ 
                status: 'fail', 
                message: 'Thiếu categoryId' 
            });
        }

        // Tìm tất cả giao dịch của user trong category
        const transactions = await Transactions.find({ 
            category_id: targetCategoryId, 
            user_id: userId 
        });

        if (transactions.length === 0) {
            return res.status(404).json({ 
                status: 'fail', 
                message: 'Không tìm thấy giao dịch nào trong danh mục này' 
            });
        }

        // Xóa từng transaction và cập nhật liên kết
        for (const transaction of transactions) {            // Xóa liên kết từ category
            await Categories.findByIdAndUpdate(transaction.category_id, {
                $pull: { transactions: transaction._id }
            });

            // Xóa transaction
            await Transactions.findByIdAndDelete(transaction._id);
        }

        return res.status(200).json({ 
            status: 'success', 
            message: 'Đã xóa tất cả giao dịch của danh mục' 
        });    } catch (error) {
        return res.status(500).json({ 
            status: 'fail', 
            message: 'Lỗi khi xóa giao dịch', 
            error: error.message 
        });
    }
}

// Helper function để format transaction data
function formatTransactionData(transaction, includePopulated = true) {
    const data = {
        transaction: {
            _id: transaction._id,
            amount: transaction.amount,
            type: transaction.type,
            date: transaction.date,
            note: transaction.note,
            user_id: transaction.user_id,
            category_id: includePopulated && transaction.category_id ? 
                transaction.category_id._id : transaction.category_id
        }
    };

    if (includePopulated && transaction.category_id && transaction.category_id.name) {
        data.category = {
            _id: transaction.category_id._id,
            name: transaction.category_id.name,
            type: transaction.category_id.type,
            budget_id: transaction.category_id.budget_id
        };
    }

    return data;
}

// Helper function để validate transaction input
function validateTransactionInput(data, isUpdate = false) {
    const errors = [];

    if (!isUpdate && !data.categoryId) {
        errors.push('categoryId là bắt buộc');
    }
    
    if (!isUpdate && !data.userId) {
        errors.push('userId là bắt buộc');
    }

    if (data.amount !== undefined) {
        if (typeof data.amount !== 'number' || data.amount <= 0) {
            errors.push('amount phải là số dương');
        }
    } else if (!isUpdate) {
        errors.push('amount là bắt buộc');
    }

    if (data.date && !isValidDate(data.date)) {
        errors.push('date không hợp lệ');
    }

    return errors;
}

// Helper function để kiểm tra ngày hợp lệ
function isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

// POST /transactions/update/:transactionId
async function updateTransaction(req, res) {
    try {
        const transactionId = req.params.transactionId;
        const { userId, categoryId, amount, date, note } = req.body;

        // Tìm transaction hiện tại
        const existingTransaction = await Transactions.findById(transactionId);
        if (!existingTransaction) {
            return res.status(404).json({ 
                status: 'fail', 
                message: 'Không tìm thấy giao dịch' 
            });
        }

        // Kiểm tra quyền sở hữu
        if (existingTransaction.user_id.toString() !== userId) {
            return res.status(403).json({ 
                status: 'fail', 
                message: 'Bạn không có quyền sửa giao dịch này' 
            });
        }

        // Kiểm tra category mới có tồn tại không (nếu có thay đổi)
        let newCategory = null;
        if (categoryId && categoryId !== existingTransaction.category_id.toString()) {
            newCategory = await Categories.findById(categoryId);
            if (!newCategory) {
                return res.status(400).json({ 
                    status: 'fail', 
                    message: 'Không tìm thấy danh mục mới' 
                });
            }
        }

        // Chuẩn bị dữ liệu cập nhật
        const updateData = {};
        if (amount !== undefined) updateData.amount = amount;
        if (date !== undefined) updateData.date = date;
        if (note !== undefined) updateData.note = note;

        // Nếu có thay đổi category
        if (categoryId && categoryId !== existingTransaction.category_id.toString()) {
            updateData.category_id = categoryId;
            updateData.type = newCategory.type;

            // Xóa liên kết từ category cũ
            await Categories.findByIdAndUpdate(existingTransaction.category_id, {
                $pull: { transactions: transactionId }
            });

            // Thêm liên kết vào category mới
            await Categories.findByIdAndUpdate(categoryId, {
                $push: { transactions: transactionId }
            });
        }

        // Cập nhật transaction
        const updatedTransaction = await Transactions.findByIdAndUpdate(
            transactionId,
            updateData,
            { new: true }
        ).populate('category_id');

        return res.status(200).json({ 
            status: 'success', 
            message: 'Cập nhật giao dịch thành công',
            data: {
                transaction: {
                    _id: updatedTransaction._id,
                    amount: updatedTransaction.amount,
                    type: updatedTransaction.type,
                    date: updatedTransaction.date,
                    note: updatedTransaction.note,
                    user_id: updatedTransaction.user_id,
                    category_id: updatedTransaction.category_id._id
                },
                category: {
                    _id: updatedTransaction.category_id._id,
                    name: updatedTransaction.category_id.name,
                    type: updatedTransaction.category_id.type,
                    budget_id: updatedTransaction.category_id.budget_id
                }
            }
        });

    } catch (error) {
        console.error('Lỗi cập nhật giao dịch:', error);
        return res.status(500).json({ 
            status: 'fail', 
            message: 'Đã xảy ra lỗi khi cập nhật giao dịch',
            error: error.message 
        });    }
}

// POST /transactions/search
async function searchTransactions(req, res) {
    try {
        const { 
            userId, 
            categoryId, 
            type, 
            startDate, 
            endDate, 
            minAmount, 
            maxAmount, 
            searchText,
            page = 1,
            limit = 10
        } = req.body;

        if (!userId) {
            return res.status(400).json({
                status: 'fail',
                message: 'Thiếu userId'
            });
        }

        // Tạo query filter
        const filter = { user_id: userId };

        if (categoryId) {
            filter.category_id = categoryId;
        }

        if (type && ['income', 'expense'].includes(type)) {
            filter.type = type;
        }

        if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate);
            if (endDate) filter.date.$lte = new Date(endDate);
        }

        if (minAmount !== undefined || maxAmount !== undefined) {
            filter.amount = {};
            if (minAmount !== undefined) filter.amount.$gte = Number(minAmount);
            if (maxAmount !== undefined) filter.amount.$lte = Number(maxAmount);
        }

        if (searchText) {
            filter.note = { $regex: searchText, $options: 'i' };
        }

        // Tính pagination
        const skip = (page - 1) * limit;

        // Tìm transactions
        const transactions = await Transactions.find(filter)
            .populate('category_id')
            .sort({ date: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        // Đếm tổng số records
        const totalRecords = await Transactions.countDocuments(filter);
        const totalPages = Math.ceil(totalRecords / limit);

        // Format data
        const formattedData = transactions.map(transaction => {
            const category = transaction.category_id;
            return {
                transaction: {
                    _id: transaction._id,
                    amount: transaction.amount,
                    type: transaction.type,
                    date: transaction.date,
                    note: transaction.note,
                    user_id: transaction.user_id,
                    category_id: transaction.category_id?._id
                },
                category: category ? {
                    _id: category._id,
                    name: category.name,
                    type: category.type,
                    budget_id: category.budget_id
                } : null
            };
        });

        return res.status(200).json({
            status: 'success',
            message: 'Tìm kiếm giao dịch thành công',
            data: {
                transactions: formattedData,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages,
                    totalRecords,
                    hasNextPage: page < totalPages,
                    hasPrevPage: page > 1
                }
            }
        });

    } catch (error) {
        console.error('Lỗi khi tìm kiếm giao dịch:', error);
        return res.status(500).json({
            status: 'fail',
            message: 'Lỗi khi tìm kiếm giao dịch',
            error: error.message
        });
    }
}

// POST /transactions/statistics
async function getTransactionStatistics(req, res) {
    try {
        const { userId, startDate, endDate } = req.body;

        if (!userId) {
            return res.status(400).json({
                status: 'fail',
                message: 'Thiếu userId'
            });
        }

        // Tạo query filter
        const dateFilter = {};
        if (startDate || endDate) {
            dateFilter.date = {};
            if (startDate) dateFilter.date.$gte = new Date(startDate);
            if (endDate) dateFilter.date.$lte = new Date(endDate);
        }

        // Lấy tất cả giao dịch trong khoảng thời gian
        const transactions = await Transactions.find({
            user_id: userId,
            ...dateFilter
        }).populate('category_id');

        // Tính toán thống kê
        let totalIncome = 0;
        let totalExpense = 0;
        const categoryStats = {};
        const monthlyStats = {};

        transactions.forEach(transaction => {
            const amount = transaction.amount;
            const type = transaction.type;
            const category = transaction.category_id;
            const date = new Date(transaction.date);
            const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

            // Tổng thu nhập và chi tiêu
            if (type === 'income') {
                totalIncome += amount;
            } else if (type === 'expense') {
                totalExpense += amount;
            }

            // Thống kê theo category
            if (category) {
                const categoryName = category.name;
                if (!categoryStats[categoryName]) {
                    categoryStats[categoryName] = {
                        name: categoryName,
                        type: category.type,
                        totalAmount: 0,
                        transactionCount: 0
                    };
                }
                categoryStats[categoryName].totalAmount += amount;
                categoryStats[categoryName].transactionCount += 1;
            }

            // Thống kê theo tháng
            if (!monthlyStats[monthKey]) {
                monthlyStats[monthKey] = {
                    month: monthKey,
                    income: 0,
                    expense: 0,
                    balance: 0
                };
            }
            
            if (type === 'income') {
                monthlyStats[monthKey].income += amount;
            } else if (type === 'expense') {
                monthlyStats[monthKey].expense += amount;
            }
            monthlyStats[monthKey].balance = monthlyStats[monthKey].income - monthlyStats[monthKey].expense;
        });

        const response = {
            status: 'success',
            message: 'Lấy thống kê thành công',
            data: {
                summary: {
                    totalIncome,
                    totalExpense,
                    balance: totalIncome - totalExpense,
                    transactionCount: transactions.length
                },
                categoryStatistics: Object.values(categoryStats),
                monthlyStatistics: Object.values(monthlyStats).sort((a, b) => a.month.localeCompare(b.month))
            }
        };

        return res.status(200).json(response);

    } catch (error) {
        console.error('Lỗi khi lấy thống kê:', error);
        return res.status(500).json({
            status: 'fail',
            message: 'Lỗi khi lấy thống kê giao dịch',
            error: error.message
        });
    }
}

module.exports = {
    addTransaction,
    getTransactionInfo,
    getUserTransactions,
    updateTransaction,
    deleteTransaction,
    deleteAllTransactionsByCategory,
    searchTransactions,
    getTransactionStatistics
};