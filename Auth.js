const bcrypt = require('bcryptjs');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
const passport = require("passport");

require("dotenv").config();
const jwtKey = process.env.jwtEncryptionKey;

const login = async (req, res) => {
    try {
        const username = req.body?.Username;
        const password = req.body?.Password;
        let user = await User.findOne({ Username: username });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        // const passwordMatch = await bcrypt.compare(password, user.Password);
        const passwordMatch = (password === user.Password);
        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Invalid password' });
        }
        let token = jwt.sign(
            {
                user_id: user._id,
                username: user.Username,
                UserRole: user.Role
            },
            jwtKey
        );

        res.status(200).json({ success: true, message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Failed to login', error: err.message });
    }
};

const Authentication = passport.authenticate("jwt", { session: false });

function AuthenticateUser(req, res, next) {

    const header = req.headers.authorization;
    const token = header.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        // Verify the token and extract user information
        const Validity = jwt.verify(token, "Route-Token");
        if (Validity) {
            const decodedToken = jwt.decode(token);
            req.user = decodedToken.user_id;
            next();
        }
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}


module.exports = {
    Authentication,
    login,
    AuthenticateUser
};