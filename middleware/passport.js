const Employee = require("../models/Employee");
const User = require("../models/User");
const { Strategy, ExtractJwt } = require("passport-jwt");
require("dotenv").config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.jwtEncryptionKey,
};

module.exports = (passport) => {
    passport.use(
        new Strategy(options, async (payload, done) => {
            try {
                const user = await User.findById(payload.user_id);

                if (!user) {
                    return done(null, false);
                }
                if (user.Role === 'Employee') {
                    const employee = await Employee.findById(payload.user_id);
                    if (!employee || !employee.Active) {
                        return done(null, false);
                    }
                }
                return done(null, user);
            } catch (err) {
                return done(err, false);
            }
        })
    );
};    