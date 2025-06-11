
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Transaction = new Schema({
    amount: {
        type: Number, 
        required: true
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date, 
        default: Date.now
    },
    note: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Transaction', Transaction);