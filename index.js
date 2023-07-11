// <---------       IMPORTS ---------------->
require('dotenv').config()
const express = require('express')
const PORT =process.env.PORT
const db= require('./config/mongoose')
const cors=require('cors')
const session = require('express-session')
const passport =require('passport')
const MongoStore =require('connect-mongo')
const passportLocal =require('./config/passportLocal')
const passportJwt   =require('./config/passportJwt')
const cookieParser = require('cookie-parser')

// <-----  FIRMWARE----->

        const app = express()
        app.use(express.json())
        app.use(express.urlencoded({extended:false}))

//  .......... Middlewares
        app.use(express.static("build"))
        
        app.use(cookieParser())
        app.use(cors({
            exposedHeaders:['X-Total-Count']
        }))

        app.use(session({
            name:'user',
            secret:'qwerty12345',
            saveUninitialized:false,
            resave:false,
            cookie:{
                    maxAge:1000*60*2
            },
            //do not use new keyword, it will throw error 
            //refer to :: "https://stackoverflow.com/questions/66398388/typeerror-mongostore-is-not-a-constructor"
            // store:MongoStore.create({
            //         mongoUrl:'mongodb+srv://admin:rootrootrt@app1.shxgdxt.mongodb.net/?retryWrites=true&w=majority',
            //         autoRemove:'disabled'
            //       },
            //       function(err){
            //          console.log(err ||'Connected to mongostore db');
            //       }
            // )
        }))
        
        app.use(passport.initialize())
        app.use(passport.session())
        app.use(passport.setAuthenticatedUser)

    
//  Routes
        app.use('/',require('./routes'))

//  SERVER LISTENING
app.listen(process.env.PORT,(err)=>{
    if(err){
        console.log("Error while starting server");
    }
    console.log(`Server running at port ${PORT}`);

})
