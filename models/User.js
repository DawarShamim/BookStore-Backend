const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    Role: {
        type: String,
        enum: ['Client', 'Employee'],
        default: 'Client'
    },
    // ReferenceId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     refPath: 'role' // Default reference to the Employee model
    // }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
