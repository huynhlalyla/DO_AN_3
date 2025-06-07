const Transactions = require('../models/Transactions');
const Users = require('../models/Users');
const Categories = require('../models/Categories');
const Budgets = require('../models/Budgets');
const Notifies = require('../models/Notifies');
// POST /transactions/add
async function addTransaction(req, res) {
    try {
        const { categoryId, amount, userId, date, note } = req.body;

        const category = await Categories.findById(categoryId);
        if (!category) {
            return res.status(400).json({ status: 'fail', message: 'Không tìm thấy danh mục' });
        }

        const transaction = new Transactions({
            user_id: userId,
            category_id: categoryId,
            amount,
            date,
            note,
            type: category.type, // Lấy từ danh mục: 'income' hoặc 'expense'
        });

        await transaction.save();

        // Cập nhật thông tin vào user & category
        await Users.findByIdAndUpdate(userId, {
            $push: { created_transactions: transaction._id }
        });

        const updatedCategory = await Categories.findByIdAndUpdate(categoryId, {
            $push: { transactions: transaction._id }
        }, { new: true });

        // Nếu là chi tiêu, cập nhật ngân sách và kiểm tra cảnh báo
        if (transaction.type === 'expense') {
            const budget = await Budgets.findById(updatedCategory.budget_id);
            if (budget) {
                budget.transactions.push(transaction._id);
                await budget.save();

                const populatedCategory = await Categories.findById(categoryId)
                    .populate("transactions", "amount");
                const transactions = populatedCategory.transactions;

                let total = 0;
                transactions.forEach(t => total += parseFloat(t.amount));

                let status = 'success';
                let notify = null;

                if (total > parseFloat(budget.limit_amount)) {
                    status = 'warning';
                    notify = new Notifies({
                        user_id: userId,
                        message: `Bạn đã vượt quá ngân sách ${budget.limit_amount} VND của ${category.name}`,
                        type: 'warning',
                        date: new Date()
                    });
                } else if (total > parseFloat(budget.limit_amount) * 0.8) {
                    status = 'danger';
                    const formattedLimit = new Intl.NumberFormat('vi-VN').format(budget.limit_amount);
                    notify = new Notifies({
                        user_id: userId,
                        message: `Bạn đã vượt quá 80% ngân sách ${formattedLimit} VND của ${category.name}`,
                        type: 'danger',
                        date: new Date()
                    });
                }

                if (notify) {
                    const savedNotify = await notify.save();
                    await Users.findByIdAndUpdate(userId, {
                        $push: { notifies: savedNotify._id }
                    });
                    return res.status(200).json({ status, message: notify.message });
                }
            }
        }

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

        // Tìm transaction
        const transaction = await Transactions.findOne({ _id: transactionId, user_id: userId })
            .populate('category_id');

        if (!transaction) {
            return res.status(404).json({ status: 'failed', message: 'Không tìm thấy giao dịch' });
        }

        const category = transaction.category_id;

        // Lấy budget từ category
        const budget = await Budgets.findOne({ _id: category.budget_id });

        return res.status(200).json({
            status: 'success',
            message: 'Lấy dữ liệu giao dịch thành công',
            transaction: {
                _id: transaction._id,
                name: transaction.name,
                amount: transaction.amount,
                type: transaction.type,
                date: transaction.date,
                user_id: transaction.user_id,
                category: {
                    _id: category._id,
                    name: category.name,
                    budget_id: category.budget_id,
                    ...category._doc  // Trả về các trường khác nếu có
                },
                budget: budget ? {
                    _id: budget._id,
                    name: budget.name,
                    limit_amount: budget.limit_amount,
                    ...budget._doc // Trả về các trường khác nếu có
                } : null
            }
        });

    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Có lỗi xảy ra', error: error.message });
    }
}

// POST /transactions/info/all
async function getUserTransactions(req, res) {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                status: 'error',
                message: 'Thiếu userId trong body request'
            });
        }

        const transactions = await Transactions.find({ user_id: userId })
            .populate('user_id')
            .populate('category_id');

        return res.status(200).json({
            status: 'success',
            message: 'Lấy tất cả giao dịch thành công',
            data: transactions
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Lỗi khi lấy giao dịch',
            error: error.message
        });
    }
}

// POST /transactions/delete/:transactionId
async function deleteTransaction(req, res) {
    const transactionId = req.params.transactionId;
    const { userId } = req.body;

    try {
        const transaction = await Transactions.findById(transactionId);
        if (!transaction) {
            return res.status(404).json({ status: 'error', message: 'Không tìm thấy giao dịch' });
        }

        // Kiểm tra quyền user
        if (transaction.user_id.toString() !== userId) {
            return res.status(403).json({ status: 'error', message: 'Bạn không có quyền xóa giao dịch này' });
        }

        // Xóa transaction khỏi category
        await Categories.findByIdAndUpdate(transaction.category_id, {
            $pull: { transactions: transaction._id }
        });

        // Xóa transaction khỏi budget (nếu là expense)
        if (transaction.type === 'expense') {
            await Budgets.findOneAndUpdate(
                { category_id: transaction.category_id },
                { $pull: { transactions: transaction._id } }
            );
        }

        // Xóa transaction khỏi user
        await Users.findByIdAndUpdate(transaction.user_id, {
            $pull: { created_transactions: transaction._id }
        });

        // Xóa transaction
        await Transactions.findByIdAndDelete(transactionId);

        return res.status(200).json({ status: 'success', message: 'Đã xóa giao dịch thành công' });

    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Lỗi khi xóa giao dịch', error: error.message });
    }
}

// POST /transactions/delete/all/:categoryId
async function deleteAllTransactionsByCategory(req, res) {
    const categoryId = req.params.categoryId;
    const { userId } = req.body;

    try {
        // Tìm tất cả giao dịch thuộc category và của user
        const transactions = await Transactions.find({ category_id: categoryId, user_id: userId });

        if (transactions.length === 0) {
            return res.status(404).json({ status: 'error', message: 'Không tìm thấy giao dịch nào trong danh mục này' });
        }

        // Lặp qua từng transaction để xóa liên kết và xóa transaction
        for (const transaction of transactions) {
            // Xóa transaction khỏi category
            await Categories.findByIdAndUpdate(transaction.category_id, {
                $pull: { transactions: transaction._id }
            });

            // Xóa transaction khỏi budget (nếu là expense)
            if (transaction.type === 'expense') {
                await Budgets.findOneAndUpdate(
                    { category_id: transaction.category_id },
                    { $pull: { transactions: transaction._id } }
                );
            }

            // Xóa transaction khỏi user
            await Users.findByIdAndUpdate(transaction.user_id, {
                $pull: { created_transactions: transaction._id }
            });

            // Xóa transaction
            await Transactions.findByIdAndDelete(transaction._id);
        }

        return res.status(200).json({ status: 'success', message: 'Đã xóa tất cả giao dịch của danh mục' });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Lỗi khi xóa giao dịch', error: error.message });
    }
}

module.exports = {
    addTransaction,
    getTransactionInfo,
    getUserTransactions,
    deleteTransaction,
    deleteAllTransactionsByCategory
};