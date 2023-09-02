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
            await User.findById(payload.user_id)
                .then((user) => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch((err) => {
                    return done(null, false);
                });
        })
    );
};
