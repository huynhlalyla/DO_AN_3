const Transactions = require('../models/Transactions');

async function getAllTransactions(req, res) {
    try {
        const transactions = await Transactions.find().populate('category_id').populate('user_id');
        res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function addTransaction (req, res) {
    try {
        const data = req.body;

        // const data = {
        //     amount: 100000,
        //     category_id: '68886b0da7680b02b1f10b4e', // Example category ID
        //     user_id: '683ec8c76004833c5be4a7c8', // Example user ID
        //     date: new Date(),
        //     note: 'Example transaction note'
        // }
        const newTransaction = new Transactions(data);
        await newTransaction.save();
        res.status(201).json(newTransaction);
    } catch (error) {
        console.error('Error adding transaction:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteTransaction(req, res) {
    try {
        const { id } = req.params;
        const deletedTransaction = await Transactions.findByIdAndDelete(id);
        
        if (!deletedTransaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateTransaction(req, res) {
    try {
        const { id } = req.params;
        const data = req.body;

        const updatedTransaction = await Transactions.findByIdAndUpdate(id, data, { new: true });
        if (!updatedTransaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.status(200).json(updatedTransaction);
    } catch (error) {
        console.error('Error updating transaction:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    addTransaction,
    getAllTransactions,
    deleteTransaction,
    updateTransaction
};