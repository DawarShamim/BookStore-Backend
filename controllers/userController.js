const User = require('../models/User'); // Import your User model
const bcrypt = require('bcryptjs');

exports.updatePassword = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const oldPassword = req.body?.oldPassword;
        const newPassword = req.body?.newPassword;
        // Find the user by their ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if the old password matches the stored hashed password
        const passwordMatch = await bcrypt.compare(oldPassword, user.Password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Old password is incorrect' });
        }
        user.Password = newPassword;
        await user.save();
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        next(error);
    }
};
