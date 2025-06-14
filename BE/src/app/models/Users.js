const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    phone: {
        type: String, 
        required: true,
        unique: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    name: {
        type: String, 
        default: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User);