
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
    description: {
        type: String,
    },
    icon: {
        type: String,
        default: 'default-icon'
    },
    color: {
        type: String,
        default: 'gray'
    },
    limit_amount: {
        type: Number,
        default: 0
    },
    start_date: {
        type: Date,
        default: Date.now
    },
    end_date: {
        type: Date,
        default: function() {
            const date = new Date();
            date.setMonth(date.getMonth() + 1);
            return date;
        }
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

Category.index(
  { name: 'text', description: 'text', type: 'text' }
);

module.exports = mongoose.model('Category', Category);