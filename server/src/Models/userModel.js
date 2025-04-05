const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 100
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 200
    },
}, 
{
    timestamps: true
});

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;