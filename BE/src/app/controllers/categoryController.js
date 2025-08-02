const Categories = require('../models/Categories'); // Assuming you have a Categories model

const getAllCategories = async (req, res) => {
    try {
        const categories = await Categories.find();
        res.status(200).json({ status: 'success', data: categories });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching categories.' });
    }
};

const addCategory = async (req, res) => {
    try {
        const {
            name,
            type,
            description,
            icon,
            color,
            limit_amount,
            user_id
        } = req.body;

        // const name = 'Đầu tư';
        // const type = 'income';
        // const description = 'Lợi nhuận từ đầu tư';
        // const icon = 'investment';
        // const color = 'green';
        // const limit_amount = 1000000;
        // const user_id = '683ec8c76004833c5be4a7c8';

        // Validate required fields
        if (!name || !type || !limit_amount || !user_id) {
            return res.status(400).json({ error: 'Name, type, limit_amount, and user_id are required.' });
        }

        // Simulate database operation
        const newCategory = {
            id: Date.now(),
            name,
            type,
            description,
            icon,
            color,
            limit_amount,
            user_id
        };
        const category = new Categories(newCategory);
        await category.save();

        res.status(201).json({ status: 'success', data: newCategory });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, description, icon, color, limit_amount } = req.body
        // Validate required fields
        if(!id) {
            return res.status(400).json({ error: 'Category ID is required.' });
        }
        if (!name || !type || !limit_amount || !description || !icon || !color) {
            return res.status(400).json({ error: 'At least one field (name, type, limit_amount) is required for update.' });
        }

        // Simulate database operation
        const updatedCategory = await Categories.findByIdAndUpdate(id, {
            name,
            type,
            description,
            icon,
            color,
            limit_amount
        }, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ error: 'Category not found.' });
        }

        res.status(200).json({ status: 'success', data: updatedCategory });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID
        if (!id) {
            return res.status(400).json({ error: 'Category ID is required.' });
        }

        // Simulate database operation
        const deletedCategory = await Categories.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ error: 'Category not found.' });
        }

        res.status(200).json({ status: 'success', data: deletedCategory });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}

module.exports = {
    addCategory,
    getAllCategories,
    deleteCategory,
    editCategory
}