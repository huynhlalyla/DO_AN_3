const Transactions = require('../models/Transactions');
const Categories = require('../models/Categories');


const getHomePage = (req, res) => {
    res.status(200).json({ message: 'Welcome to the Home Page!' });
};

const search = async (req, res) => {
    console.log(req.query);
    const query = (req.query.q || "").trim();

    try {
        if (!query) {
            return res.status(200).json({ categories: [], transactions: [] });
        }

        let typeFilter = {};
        let keywords = query.split(/\s+/).filter(Boolean);

        // Kiểm tra loại giao dịch
        if (keywords.includes("chi") && keywords.includes("tiêu") || query.includes("chi tiêu")) {
            typeFilter = { type: 'expense' };
            keywords = keywords.filter(word => word !== "chi" && word !== "tiêu" && word !== "chi tiêu");
        } else if (keywords.includes("thu") && keywords.includes("nhập") || query.includes("thu nhập")) {
            typeFilter = { type: 'income' };
            keywords = keywords.filter(word => word !== "thu" && word !== "nhập" && word !== "thu nhập");
        }

        // Nếu không còn từ khóa nào để tìm thì bỏ qua phần regex tìm kiếm
        const categoryConditions = keywords.length > 0
            ? keywords.flatMap(word => ([
                { name: { $regex: word, $options: 'i' } },
                { description: { $regex: word, $options: 'i' } }
            ]))
            : [{}]; // {} để match tất cả khi chỉ lọc type

        const transactionConditions = keywords.length > 0
            ? keywords.map(word => ({
                note: { $regex: word, $options: 'i' }
            }))
            : [{}];

        // Query MongoDB
        const categories = await Categories.find({
            $and: [
                typeFilter,
                { $or: categoryConditions }
            ]
        });

        const transactions = await Transactions.find({
            $and: [
                typeFilter,
                { $or: transactionConditions }
            ]
        }).populate('category_id');

        res.status(200).json({ categories, transactions });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }


};

module.exports = {
    getHomePage,
    search
};