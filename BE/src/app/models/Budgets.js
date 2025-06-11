const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Budget = new Schema({
    name: {
        type: String,
        required: true
    },
    limit_amount: {
        type: Number,
        required: true,
        default: 0
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
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Budget', Budget);