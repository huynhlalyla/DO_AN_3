const Categories = require('../models/Categories'); // Assuming you have a Categories model
const Transactions = require('../models/Transactions'); // Assuming you have a Transactions model
const getAllCategories = async (req, res) => {
    try {
        const userId = req.query.user; // Get user ID from query parameters
        const categories = await Categories.find({ user_id: userId });
        res.status(200).json({ status: 'success', data: categories });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching categories.' });
    }
};

const getCategoriesByType = async (req, res) => {
    try {
        const userId = req.query.user; // Get user ID from query parameters
        const { type } = req.params;
        const categories = await Categories.find({ type, user_id: userId });
        res.status(200).json({ status: 'success', data: categories });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching categories by type.' });
    }
};

const createCategory = async (req, res) => {
    try {
        const {
            name,
            type,
            description,
            icon,
            color,
            limit_amount,
            user_id,
            start_date,
            end_date
        } = req.body;
        console.log({ name, type, description, icon, color, limit_amount, user_id });
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
        // Dates handling
        let finalStart = start_date ? new Date(start_date) : new Date();
        let finalEnd;
        if (end_date) {
            finalEnd = new Date(end_date);
        } else {
            finalEnd = new Date(finalStart);
            finalEnd.setMonth(finalEnd.getMonth() + 1);
        }
        if(finalEnd < finalStart){
            // auto-correct by setting end = start + 1 month
            finalEnd = new Date(finalStart);
            finalEnd.setMonth(finalEnd.getMonth() + 1);
        }
        const category = new Categories({
            name,
            type,
            description,
            icon,
            color,
            limit_amount,
            start_date: finalStart,
            end_date: finalEnd,
            user_id
        });
        await category.save();
        res.status(201).json({ status: 'success', data: category });
    } catch (error) {
        res.status(500).json({ error: error });
    }
}
const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type, description, icon, color, limit_amount } = req.body
        console.log({ id, name, type, description, icon, color, limit_amount });
        // Validate required fields
        if(!id) {
            return res.status(400).json({ error: 'Category ID is required.' });
        }
        //chỉ cập nhật khi dữ liệu thật sự thay đổi, ít nhất một trường
        const updatedFields = {};
        if (name) updatedFields.name = name;
        if (type) updatedFields.type = type;
        if (description) updatedFields.description = description;
        if (icon) updatedFields.icon = icon;
        if (color) updatedFields.color = color;
        if (limit_amount) updatedFields.limit_amount = limit_amount;

        // Simulate database operation
        const updatedCategory = await Categories.findByIdAndUpdate(id, updatedFields, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ error: 'Category not found.' });
        }

        return res.status(200).json({ status: 'success', data: updatedCategory });

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
        const deleteTransaction = await Transactions.deleteMany({ category_id: id });
        const deletedCategory = await Categories.findByIdAndDelete(id);
        if (!deletedCategory || !deleteTransaction) {
            return res.status(404).json({ error: 'Category not found.' });
        }

        res.status(200).json({ status: 'success', data: deletedCategory });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    deleteCategory,
    editCategory,
    getCategoriesByType
}