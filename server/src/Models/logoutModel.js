const mongoose = require('mongoose');

const logoutSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        ref: "User"
    },
},
{ timestamps: true }
);

module.exports = mongoose.model('Logout', logoutSchema);