const passport = require('passport');
const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
const { cookieExtractor } = require('../SERVICES/common');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.SECRET_KEY_JWT

passport.use('jwt',new JwtStrategy(opts, async function(jwt_payload, done) {
    try{     
        const user = await User.findById(jwt_payload.id)
        if (user) {
            return done(null,{id:user.id,role:user.role}); //this also calls searilizer
        }else{
            return done(null, false);
            // or you could create a new account
        }
    }catch(err){
        if (err) {
            return done(err, false);
        }
    }   
}));
