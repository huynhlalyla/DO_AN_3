const addBudget = async (req, res) => {
    try {
        const { name, amount, type } = req.body;

        // Validate required fields
        if (!name || !amount || !type) {
            return res.status(400).json({ error: 'Name, amount, and type are required.' });
        }

        // Simulate database operation
        const newBudget = { id: Date.now(), name, amount, type };
        budgets.push(newBudget);

        res.status(201).json({ status: 'success', data: newBudget });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while adding the budget.' });
    }
}

module.exports = {
    addBudget,
}