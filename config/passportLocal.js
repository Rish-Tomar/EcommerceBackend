const passport = require('passport');
const { User } = require('../models/User');
const LocalStrategy= require('passport-local').Strategy;


//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'
    },
    //finding user establish identity
    async function(email,password,done){
        console.log("Varifying")
        const user=await User.findOne({email:email});
        if(!user){
            console.log('user not found')
            return done(null,false)
        }
        if(user.password===password){
            console.log('authenticaed should be redirected to profile page')
            return done(null,user)
        }  
        console.log('invalid username or passpword',user.password,password)
        return done(null,false);
    }
))

//serialize the user, decide the key to be set in cookie
passport.serializeUser(function(user,done){
    // console.log('serialise user',user)
    process.nextTick(()=>{
        return done(null,{id:user.id,role:user.role,addresses:user.addresses,orders:user.orders,email:user.email,name:user.name})
        // return done(null,user.id)
    })
})

//desearialize user key to user identification by populating user
passport.deserializeUser(function(user,done){
    // console.log('de-serialise user',user)
    process.nextTick(()=>{
        return done(null,user)
    })
})

//check if user is authenticated (this will be used as middleware)
passport.checkAuthentication = function(req,res,next){
    console.log('is authenticated')
    if(req.isAuthenticated()){
        return next()
    }
    // return res.redirect('users/login')
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