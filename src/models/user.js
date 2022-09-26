const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    ci: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);