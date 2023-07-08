const passport = require('passport');
const { User } = require('../models/User');
const LocalStrategy= require('passport-local').Strategy;
const crypto =require('crypto')

//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'
    },
    //finding user establish identity
    async function(email,password,done){
       try{
        console.log("Varifying")
        const user=await User.findOne({email:email});
        if(!user){
            console.log('user not found')
            return done(null,false,{message:"User Not Found"})
        }

        crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
            if (err) { return done(err); }
            if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
              return done(null, false, { message: 'Incorrect username or password.' });
            }
            return done(null,user); //this line calls serializer
          });
       }catch(err){
        console.log(err)
       }
    }
))

//serialize the user, decide the key to be set in cookie
passport.serializeUser(function(user,done){
    process.nextTick(()=>{
        return done(null,{id:user.id,
                          role:user.role,
                          addresses:user.addresses,
                          orders:user.orders,
                          email:user.email,
                          name:user.name})
        // return done(null,user.id)
    })
})

//desearialize user key to user identification by populating user
passport.deserializeUser(function(user,done){
    process.nextTick(()=>{
        console.log("Deserialise user", user)
        return done(null,user)
    })
})

//check if user is authenticated (this will be used as middleware)
passport.checkAuthentication = function(req,res,next){
    console.log('is authenticated')
    if(req.isAuthenticated()){
        return next()
    }
    res.status(400).json({message:"Authentication fail"})
}

passport.setAuthenticatedUser = function(req,res,next){
    // console.log('set Auth User',req.user)
    if(req.isAuthenticated()){
        res.locals.user=req.user
    }
    next()
}

module.exports=passport