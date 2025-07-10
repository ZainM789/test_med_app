const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
    email: { 
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['Doctor', 'Patient'],
        default: 'Patient'
    }
}, {timestamps: true});

module.exports = mongoose.model('user', userSchema);
