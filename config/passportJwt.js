const passport = require('passport');
const { User } = require('../models/User');
const jwt = require('jsonwebtoken');
const { cookieExtractor } = require('../SERVICES/common');

const SECRET_Key ='SECRET_KEY'

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_Key;

passport.use('jwt',new JwtStrategy(opts, async function(jwt_payload, done) {
    console.log("././...",{jwt_payload})
    try{
        console.log('jwt_sub',jwt_payload.sub)
        console.log('jwt_id',jwt_payload.id)
        // const user = await User.findOne({id: jwt_payload.sub})
        
        const user = await User.findById(jwt_payload.id)
        if (user) {
            console.log("PASSPOSRT JWT Line :23",user)
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