
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Category = new Schema({
    name: {
        type: String, 
        required: true
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true,
        default: 'expense'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    budget_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Budget'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', Category);