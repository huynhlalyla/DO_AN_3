const Transactions = require('../models/Transactions');
const Users = require('../models/Users');
const Categories = require('../models/Categories');
const Budgets = require('../models/Budgets');

// POST /transactions/add
async function addTransaction(req, res) {
    try {
        const { categoryId, amount, userId, date, note } = req.body;

        // Kiểm tra category có tồn tại không
        const category = await Categories.findById(categoryId);
        if (!category) {
            return res.status(400).json({ status: 'fail', message: 'Không tìm thấy danh mục' });
        }

        // Tạo transaction mới
        const transaction = new Transactions({
            user_id: userId,
            category_id: categoryId,
            amount,
            date,
            note,
            type: category.type
        });

        await transaction.save();        // Cập nhật liên kết
        await Categories.findByIdAndUpdate(categoryId, {
            $push: { transactions: transaction._id }
        });

        return res.status(200).json({ status: 'success', message: 'Thêm giao dịch thành công' });

    } catch (err) {
        console.error('Lỗi thêm giao dịch:', err);
        return res.status(500).json({ status: 'fail', message: 'Đã xảy ra lỗi khi thêm giao dịch' });
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
        }        // Xóa liên kết từ category
        await Categories.findByIdAndUpdate(transaction.category_id, {
            $pull: { transactions: transaction._id }
        });

        // Xóa transaction
        await Transactions.findByIdAndDelete(transactionId);

        return res.status(200).json({ 
            status: 'success', 
            message: 'Đã xóa giao dịch thành công' 
        });

    } catch (error) {
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
        });

    } catch (error) {
        return res.status(500).json({ 
            status: 'fail', 
            message: 'Lỗi khi xóa giao dịch', 
            error: error.message 
        });
    }
}

module.exports = {
    addTransaction,
    getTransactionInfo,
    getUserTransactions,
    deleteTransaction,
    deleteAllTransactionsByCategory
};