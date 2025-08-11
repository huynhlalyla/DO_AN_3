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
    },
    resetOtp: {
        type: String,
        default: null
    },
    resetOtpExpires: {
        type: Date,
        default: null
    },
    resetSessionToken: {
        type: String,
        default: null
    },
    resetSessionExpires: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User);