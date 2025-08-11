
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Transaction = new Schema({
    amount: {
        type: Number, 
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
    },
}, {
    timestamps: true
});

//dùng cho thanh tìm kiếm
Transaction.index(
  { note: 'text' },
  { name: 'transaction_text_idx', default_language: 'none' }
);

module.exports = mongoose.model('Transaction', Transaction);