const express =require('express')
const { createProducts } = require('../controllers/ProductController')
const passport = require('passport')

const Router=express.Router()

Router.get('/',(req,res)=>{
    return res.status(200).json({
        message:"Home Page"
    })
})

Router.use('/products',require('./ProductRoutes'))
Router.use('/brands'  ,require('./Brands.js'))

Router.use('/categories',require('./Categories'))


Router.use('/users'  ,require('./User'))
Router.use('/cart'   ,require('./cart'))
Router.use('/auth'   ,require('./Auth'))
Router.use('/orders' ,require('./Order'))

//routes to call all routes related to api/v1

Router.use('/api',require('./api'))


module.exports = Router

function isAuth(req,res,done){
    return passport.authenticate('jwt')
}