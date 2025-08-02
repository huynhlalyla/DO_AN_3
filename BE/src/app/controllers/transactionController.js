const Transactions = require('../models/Transactions');

async function getAllTransactions(req, res) {
    try {
        const transactions = await Transactions.find()
            .populate('category_id')
            .populate('user_id')
            .sort({ date: -1 }); // Sort by date descending (newest first)
            
        res.status(200).json({
            status: 'success',
            data: {
                transactions: transactions
            }
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ 
            status: 'error',
            message: 'Internal Server Error',
            error: error.message 
        });
    }
}

async function addTransaction (req, res) {
    try {
        const data = req.body;
        console.log('Received transaction data:', data);

        // Validate required fields
        if (!data.amount || !data.category_id || !data.user_id) {
            return res.status(400).json({ 
                status: 'error',
                message: 'Missing required fields: amount, category_id, user_id' 
            });
        }

        const newTransaction = new Transactions(data);
        await newTransaction.save();
        
        // Populate để lấy thông tin category bao gồm type
        const populatedTransaction = await Transactions.findById(newTransaction._id)
            .populate('category_id')
            .populate('user_id');

        res.status(201).json({
            status: 'success',
            message: 'Transaction added successfully',
            data: {
                transaction: populatedTransaction
            }
        });
    } catch (error) {
        console.error('Error adding transaction:', error);
        res.status(500).json({ 
            status: 'error',
            message: 'Internal Server Error',
            error: error.message 
        });
    }
}

async function deleteTransaction(req, res) {
    try {
        const { id } = req.params;
        const deletedTransaction = await Transactions.findByIdAndDelete(id);
        
        if (!deletedTransaction) {
            return res.status(404).json({ 
                status: 'error',
                message: 'Transaction not found' 
            });
        }
        
        res.status(200).json({ 
            status: 'success',
            message: 'Transaction deleted successfully' 
        });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ 
            status: 'error',
            message: 'Internal Server Error',
            error: error.message 
        });
    }
}


module.exports = {
    addTransaction,
    getAllTransactions,
    deleteTransaction
};