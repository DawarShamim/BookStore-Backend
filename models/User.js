const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
        unique: true,
        lowercase:true
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
});

userSchema.pre('save', async function (next) {
    // Only hash the password if it's modified (or new)
    if (!this.isModified('password')) {
        return next();
    }

    const passwordRegex = /^(?=(.*\d){1,})(?=(.*\W){1,})(?!.*\s).{8,20}$/;
    if (!passwordRegex.test(this.password)) {
        const error = new Error('Password does not meet the requirements.');
        return next(error);
    }

    try {
        // hashing the password with 10 salt rounds
        const hashedPassword = await bcrypt.hash(this.password, 10);

        // Replace the plain password with the hashed one
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});


const User = mongoose.model('User', userSchema);
module.exports = User;
